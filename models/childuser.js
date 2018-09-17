module.exports = function(sequelize, Sequelize) {
    var ChildUser = sequelize.define("ChildUsers", {
      
      ChildId: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      ParentId: Sequelize.INTEGER,
      FirstName: Sequelize.STRING,
      LastName: Sequelize.STRING,
      Birthday: Sequelize.DATE,
      FavoriteAnimal: Sequelize.STRING,
      ProfilePhotoURL: Sequelize.STRING,
      SiteTheme: Sequelize.STRING
    },
    {
      tableName: 'ChildUsers'
    });

    return ChildUser;
};