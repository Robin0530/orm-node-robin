
// socket.io 패키지를 참조합니다.
const SocketIO = require('socket.io');

const moment = require('moment');
const jwt = require('jsonwebtoken');

// DB 객체 참조하기
var db = require('./models/index');


module.exports =(server)=>{

    /*
    - SocketIO('서버소켓이 실행될 백엔드서버 객체',
    웹브라우저 클라이언트에 제공될 클라이언트스크립트 SOcket라이브러리 경로)
    - 클라이언트스크립트 SOcket라이브러리 http://localhost:3000/socket.io/socket.io.js(Client측 socket.io통신모듈)
    */

    // 일반적으로 사용
    // const io = SocketIO(server, {path:"/socket.io"});

    // CORS 이슈 처리 적용한 io객체 생성
  const io = SocketIO(server, {
    path: "/socket.io",
    cors: {
      origin: "*", // 모든 웹페이지 다 접속가능
      methods: ["GET", "POST"],
    },
  });

  /*
      io.on("이벤트명",이벤트처리 콜백함수())
      io서버소켓이 클라이언트와 연결이 완료되면 메시지 수발신 기능을 제공합니다.
      소켓은 반드시 클라이언트와 연결이 된상태에서만 메싲지를 주고받을 수 있다.
      그래서 io 서버소켓이 connection 이벤트가 발생한 스코프(범위)안에서 각종 메시지 수발신 처리기능을 구현합니다.
      클라이언트와 서버소켓간 연결이 완료되면 클라이언트/서버연결 정보를 가진 socket이란 객체가 전달됨
      io는 서버소켓 자체이고(상위개념), socket은 각각의 클라이언트와 연결된 연결정보객체입니다.
  */
  io.on("connection", async(socket)=>{

    // 소켓Req객체
    const req = socket.request;

    // 현재 연결되는 사용자들 기반을 사용할 전역변수 정의 사용
    const socketId = socket.id; // 현재 연결 사용자의 고유한 connctionId값 조회
    
    // 접속 클라이언트 IP주소
    const userIP = req.headers["x-forwarded-for"] || req.connection.remoteAddress;  // 사용자IP

    // 시스템 소켓 이벤트 재정의하기
    // 웹브라우저와 서버소켓이 끊어질때마다 자동으로 발생하는 이벤트
    // 사용자가 채팅중에 웹브라우저를 닫거나/ 탭을 닫거나 일시적 네트워크 장애가 발생해 웹소켓이 끊기는 경우 
    // 서버소켓에서 자동 소켓 끊김 감지 기능제공
    socket.on('disconnect', async()=>{
      // 개발자 정의 현재 접속자 연결 끊김처리 함수
      await UserConnectionOut();

      // 소켓 끊김시 서버측 자원정리 기능제공
      clearInterval(socket.interval);
    });

    // 소켓통신 에러 감지 이벤트 핸들러
    socket.on('error', async(error)=>{
      console.log('서버 소켓 에러발생 이벤트 감지기');
    });



    // 서버소켓과 연결된 각각의 클라이언트간 수발신 기능구현
    socket.on("broadcast", async(msg)=>{
        // io.emit("클라이언트이벤트수신기명",data)은 현재 서버소켓인 io에 연결된 모든 사용자에게
        // 지정한 클라이언트 이벤트 수신기명에 해당 메시지 데이터를 보낸다.
        // io.emit(); 서버소켓에 연결된 모든 클라이언트 사용자에게 메시지 발송함
        io.emit("receiveAll", msg);
    });

    // 테스트용 서버측 이벤트 수신기 정의와 클라이언트 메시지 보내기 샘플
    socket.on("test", async(nickName, msg)=>{

        var sendDate = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');

        io.emit("receiveTest",nickName, msg, sendDate);
    });

    // 채팅방 개설 및 채팅방 입장하기 기능 처리하기
    socket.on("entry", async(channelId, nickName)=>{
      socket.join(channelId);

      socket.emit("entryok", `${nickName} 대화명으로 입장했습니다.`);

      socket.to(channelId).emit("entryok", `${nickName}님이 채팅방에 입장했습니다.` );
    });

    // 채팅방 기준 사용자 메시지 수.발신 처리
    socket.on("groupmsg", async(msgData)=>{
      var sendMsg = `${msgData.nickName}:${msgData.message}`;
      
      io.to(msgData.channelId).emit("receiveGroupMsg", sendMsg);
    });

    // 채팅방 입장하기
    socket.on("entryChannel", async(channel)=>{

      try{
        var currentUser = jwt.verify(channel.token, process.env.JWT_SECRET);

        var channelData = {};

        if(channel.channelType == 1) {
          // 일대일 채널의 채널명 생성하기 : 회원번호가 작은게 앞으로 구성된 1-100과 같은 문자열 생성
          var channelName = channel.targetMemberId < currentUser.member_id ? `${channel.targetMemberId}-${currentUser.member_id}`
          :`${currentUser.member_id}-${channel.targetMemberId}`;

          // 1이면 일대일 채널 존재여부 체크 후 없으면 생성
          channelData = await db.Channel.findOne({
              // category_code도 박아놓지말고 Object 객체로 만들어서 사용하기
              where:{channel_name:channelName, category_code:1}
          });

          // 동일한 일대일 채널정보가 존재하지 않으면 일대일 채널 생성하기
          if(channelData == null) {

            var channelInfo = {
              community_id: 1,
              category_code: channel.channelType,
              channel_name: channelName,
              channel_img_path: "",
              user_limit: 2, // 일대일 채널이니까 최대 제한2명
              channel_state_code: 1,
              reg_date: Date.now(),
              reg_member_id: currentUser.member_id
            }
            // 신규 일대일 채널 생성
            var registedChannel = await db.Channel.create(channelInfo);
            // 채널데이터 업데이트
            channelData = registedChannel;

            // 일대일 채널 구성원 정보 등록
            var currentMember = {
              channel_id: registedChannel.channel_id,
              member_id: currentUser.member_id,
              nick_name: currentUser.name,
              member_type_code: 1, // 관리자 방장
              active_state_code: 0,
              connection_id: "",
              ip_address: "",
              edit_date: Date.now(),
              edit_member_id: currentUser.member_id
            };

            await db.ChannelMember.create(currentMember);

            var targetMember = {
                channel_id: registedChannel.channel_id,
                member_id: channel.targetMemberId,
                nick_name: channel.targetNickName,
                member_type_code: 0, // 일반사용자
                active_state_code: 0,
                connection_id: "",
                ip_address: "",
                edit_date: Date.now(),
                edit_member_id: currentUser.member_id
            }
            await db.ChannelMember.create(targetMember);
          }
        } else {
          // 2이면 그룹채널 정보 조회
          // 전달된 채널 고유번호로 조회해서 channelData에 할당하면 됩니다.
        }
        // STEP2: 현재 채팅방 접속자 정보 조회 및 정보 업데이트
        // 현재 접속자의 접속상태와 접속일시 정보 업데이트 처리
        var updateMember = {
          active_state_code: 1,
          last_contact_date: Date.now(),
          connection_id: socketId,
          ip_address: userIP
        };
        
        await db.ChannelMember.update(updateMember, {
          where:{channel_id:channelData.channel_id, member_id:currentUser.member_id}
        });

        // STEP3: 채널 조인(채팅방입장)
        socket.join(channelData.channel_id);

        // STEP4: 채널 조인결과 메시지 발송
        // 현재 접속자에게 메시지 발송하기
        socket.emit("entryok", `${currentUser.name} 대화명으로 입장했습니다.`, currentUser.name, channelData);

        // 채팅방에 나를 제외한 모든 채팅방 사용자에게 입장사실 알림
        socket.to(channelData.channel_id).emit("entryok", `${currentUser.name}님이 채팅방에 입장했습니다.`, currentUser.name, channelData);


        // 채팅방입장 로그 기록하기
        await ChattingMsgLogging(channelData.channelId, currentUser.member_id, currentUser.name, 1, `${currentUser.name}님이 채팅방에 입장했습니다.`)  

      } catch(err) {
        console.log('채널 입장에러')
        // 현재 사용자에게 서버에러로 채널 입장 실패메시지
        socket.emit("entryok", `채널 접속오류가 발생했습니다.`);
      }

    });

    // 채팅방 메시지 수발신 처리
    socket.on("channelMsg", async(channelId, memberId, nickName, profile, message)=>{

      var sendDate = moment(Date.now()).format('HH:mm');

        // 해당 채널의 모든 사용자들에게 메시지 발송하기
        io.to(channelId).emit("reciveChannelMsg", nickName, profile, message, sendDate);

        // 채팅이력 로그 기록하기
        await ChattingMsgLogging(channelId, memberId, nickName, 2, message)    
    })

    // 채팅 이력 정보 기록처리 함수
    async function ChattingMsgLogging(channelId, memberId, nickName, msgTypeCode, msg){
      
      var msg = {
        channel_id: channelId,
        member_id: memberId,
        nick_name: nickName,
        msg_type_code: msgTypeCode,
        connection_id: socketId,
        ip_address: userIP,
        message: msg,
        msg_state_code: 1,
        msg_date: Date.now(),
      }

      await db.ChannelMsg.create(msg);

    }

    // 사용자 나가기 정보처리 함수
    async function UserConnectionOut() {
      // 현재 접속이 끊어지는 사용자의 Connectionid 기반으로 현재 사용자 정보조회
      var member = await db.ChannelMember.findOne({where:{connection_id:socketId}});
      
      if(member != null) {
        // 사용자 연결 끊김 정보 수정반영하기
        var updateMember = {
          active_state_code: 1,
          last_out_date: Date.now(),
          connection_id: socketId,
          ip_address: userIP
        };
        
        await db.ChannelMember.update(updateMember, {
          where:{connection_id:socketId}
        });

        // 채팅방퇴장 로그 기록하기
        await ChattingMsgLogging(member.channel_id, member.member_id, member.nick_name, 0, `${member.nick_name}님이 채팅방이 퇴장했습니다.`)  

      }
    }

  });

}