module.exports = function(sequelize, DataTypes) {
    return sequelize.define(
        'channel',
        {
            channel_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false,
                comment: '채널고유번호',
            },
            community_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                comment: '커뮤니티고유번호',
            },
            category_code: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: '채널분류코드',
            },
            channel_name: {
                type: DataTypes.STRING(100),
                allowNull: false,
                comment: '채널명',
            },
            user_limit: {
                type: DataTypes.INTEGER,
                allowNull: true,
                comment: '동시채널접속자수',
            },
            channel_img_path: {
                type: DataTypes.STRING(200),
                allowNull: true,
                comment: '대표이미지주소',
            },
            channel_desc: {
                type: DataTypes.STRING(1000),
                allowNull: true,
                comment: '채널간략소개',
            },
            channel_state_code: {
                type: DataTypes.TINYINT,
                allowNull: false,
                comment: '채널오픈상태코드',
            },
            reg_date: {
                type: DataTypes.DATE,
                allowNull: false,
                comment: '등록일시',
            },
            reg_member_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: '등록자고유번호',
            },
            edit_date: {
                type: DataTypes.DATE,
                allowNull: true,
                comment: '수정일시',
            },
            edit_member_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
                comment: '수정자고유번호',
            },
        },
        {
            sequelize,
            tableName: 'channel',   // 기본 테이블명 옵션이 복수형이 아닌 여기 지정한 테이블명으로 생성됨
            timestamps: false,      // 등록일시(createAT), 수정일시(updateAT) 컬럼 자동생성
            comment: '채널정보마스터',
            paranoid: true,      // 데이터 삭제 컬럼 자동생성(deletedAT) 및 물리적 데이터 삭제안함 기능제공
            indexes: [
                {
                    name: 'PRIMARY',
                    unique: true,
                    using: 'BTREE',
                    fields: [{ name: 'channel_id' }],   // 여러개의  컬럼이 프라이머리키인경우(복합키){} 추가하여 설정가능
                },
            ],
        },
    );
};
