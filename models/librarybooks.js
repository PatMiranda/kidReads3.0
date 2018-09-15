module.exports = function(sequelize, Sequelize) {
    var Librarybooks = sequelize.define("LibraryBooks", {
      
      ISBN: { type: Sequelize.STRING, primaryKey: true },
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