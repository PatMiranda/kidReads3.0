module.exports = function(sequelize, Sequelize) {
    var Librarybooks = sequelize.define("LibraryBooks", {
      
      BookId: { type: Sequelize.INTEGER, primaryKey: true },
      ISBN: Sequelize.STRING,
      Title: Sequelize.STRING,
      Author: Sequelize.STRING,
      Description: Sequelize.TEXT,
      Available: Sequelize.TINYINT,
      PageCount: Sequelize.INTEGER,
      CoverImageFilePath: Sequelize.STRING,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    },
    {
      tableName: 'LibraryBooks'
    });

    return Librarybooks;
};