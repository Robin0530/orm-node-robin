var bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;
var db = require('../models/index');

// passport라는 파라메터를 받는 화살표함수
module.exports = passport =>{

    // passport.use('new LocalStrategy('로그인화면의 아이디/암호 UI요소의 네임값설정',
    // 로그인처리함수정의(사용자가입력한아이디값,사용자입력한 암호값,후행콜백함수))');
    passport.use(new LocalStrategy(
        {
            //  로그인페이지의 form태그안에 있는 id,pw input의 name값
            usernameField:'id',
            passwordField:'password'
        },
        async(adminId, adminPWD, done)=>{

            // 사용자가 입력한 아이디/암호를 기반으로 로그인 기능을 구현합니다.
            try{
                // STEP1: 사용자가 입력한 관리자 아이디값을 기준으로 관리자 계정아이디 조회
                const exUser = await db.Admin.findOne({where:{admin_id:adminId}});

                if(exUser){
                    // STEP2-1: 동일한 관리자 계정아이디가 존재하는경우 암호를 체크한다.
                    const result = await bcrypt.compare(adminPWD,exUser.admin_password);

                    // 관리자 아이디/암호가 일치하는경우
                    if(result){
                        // STEP3-1: 관리자 계정 암호가 동일한 경우 서버세션 객체정보의 구조를 정의하고 
                        // 로그인한 사용자의 정보로 세션정보를 생성한다.
                        var sessionUser ={
                            admin_member_id:exUser.admin_member_id,
                            companyCode:exUser.company_code,
                            adminId:exUser.admin_id,
                            adminName:exUser.admin_name,
                            adminEmail:exUser.email,
                        };

                        // done(null, 세션으로 저장할 세션데이터);
                        done(null, sessionUser);

                    }else{
                        // STEP3-2: 사용자 암호가 일치하지 않은 경우
                        // done(null,사용자세션데이터없으면false,추가옵션데이터);
                        done(null, false, {message:'비밀번호가 일치하지 않습니다.'});
                    }
                }else{
                    // STEP2-2: 관리자 아이디가 존재하지 않은경우 
                    // done(null,사용자세션데이터없으면false,추가옵션데이터);
                    done(null, false, {message:'아이디가 존재하지 않습니다.'});
                }
            }catch(err){
                console.error(err);
                done(err);
            }
        }));

};