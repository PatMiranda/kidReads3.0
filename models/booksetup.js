module.exports = function(sequelize, DataTypes) {
    var Booksetup = sequelize.define("LibraryBooks_Setup", {
      
      ISBN: { type: DataTypes.STRING, primaryKey: true },
      PageNumber: DataTypes.STRING,
      PageText: DataTypes.TEXT,
      PageFont: DataTypes.STRING,
      PageFontColor: DataTypes.STRING,
      PageFontSize: DataTypes.STRING,
      PageImageFilePath: DataTypes.STRING,
      PageAudioFilePath: DataTypes.STRING
    },
    {
      tableName: 'LibraryBooks_Setup'
    });

    return Booksetup;
};
