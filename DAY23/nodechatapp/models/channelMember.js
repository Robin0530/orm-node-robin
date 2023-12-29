module.exports = function(sequelize, DataTypes) {
    return sequelize.define(
        'channel_member',
        {
            channel_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
                comment: '채널고유번호',
            },
            member_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                comment: '사용자고유번호',
            },
            nick_name: {
                type: DataTypes.STRING(100),
                allowNull: false,
                comment: '사용자닉네임',
            },
            msg_type_code: {
                type: DataTypes.TINYINT,
                allowNull: false,
                comment: '사용자유형',
            },
            active_state_code: {
                type: DataTypes.TINYINT,
                allowNull: false,
                comment: '접속상태코드',
            },
            last_contact_date: {
                type: DataTypes.DATE,
                allowNull: true,
                comment: '최근접속일시',
            },
            last_out_date: {
                type: DataTypes.DATE,
                allowNull: true,
                comment: '최근아웃일시',
            },
            connection_id: {
                type: DataTypes.STRING(100),
                allowNull: false,
                comment: '커넥션아이디',
            },
            ip_address: {
                type: DataTypes.STRING(50),
                allowNull: false,
                comment: '아이피주소',
            },
            edit_member_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: '수정자아이디',
            },
            edit_date: {
                type: DataTypes.DATE,
                allowNull: true,
                comment: '수정일시',
            },
        },
        {
            sequelize,
            tableName: 'channel_member',
            comment: '채널채팅사용자정보',
            timestamps: false,   // 등록일시(createAT), 수정일시(updateAT) 컬럼 자동생성
            paranoid: true      // 데이터 삭제 컬럼 자동생성(deletedAT) 및 물리적 데이터 삭제안함 기능제공
        }
    );
};
