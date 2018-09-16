module.exports = function(sequelize, Sequelize) {
    var Booksetup = sequelize.define("LibraryBooks_Setup", {
      
      BookId: { type: Sequelize.INTEGER, primaryKey: true },
      ISBN: Sequelize.STRING,
      PageNumber: Sequelize.STRING,
      PageText: Sequelize.TEXT,
      PageFont: Sequelize.STRING,
      PageFontColor: Sequelize.STRING,
      PageFontSize: Sequelize.STRING,
      PageImageFilePath: Sequelize.STRING,
      PageAudioFilePath: Sequelize.STRING
    },
    {
      tableName: 'LibraryBooks_Setup'
    });

    return Booksetup;
};
