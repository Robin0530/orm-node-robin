module.exports = function(sequelize, DataTypes) {
    return sequelize.define(
        'article_file',
        {
            article_file_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
                comment: '첨부파일고유번호',
            },
            article_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                comment: '게시글고유번호',
            },
            file_name: {
                type: DataTypes.STRING(100),
                allowNull: false,
                comment: '파일명',
            },
            file_size: {
                type: DataTypes.INTEGER,
                allowNull: true,
                comment: '파일사이즈',
            },
            file_path: {
                type: DataTypes.STRING(500),
                allowNull: true,
                comment: '저장경로',
            },
            file_type: {
                type: DataTypes.INTEGER,
                allowNull: true,
                comment: '파일유형',
            },
            reg_date: {
                type: DataTypes.DATE,
                allowNull: false,
                comment: '업로드일시',
            },
            reg_member_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                comment: '등록자고유번호',
            },
        },
        {
            sequelize,
            tableName: 'article_file',
            comment: '게시글 첨부파일정보',
            timestamps: false,   // 등록일시(createAT), 수정일시(updateAT) 컬럼 자동생성
            paranoid: true      // 데이터 삭제 컬럼 자동생성(deletedAT) 및 물리적 데이터 삭제안함 기능제공
        }
    );
};
