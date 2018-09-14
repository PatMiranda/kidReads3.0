module.exports = function(sequelize, Sequelize) {
    var ChildUser = sequelize.define("ChildUser", {
      
      ChildId: { type: Sequelize.INTEGER, primaryKey: true },
      ParentId: Sequelize.INTEGER,
      FirstName: Sequelize.STRING,
      LastName: Sequelize.STRING,
      Birthday: Sequelize.DATE,
      FavoriteAnimal: Sequelize.STRING,
      SiteTheme: Sequelize.STRING
    },
    {
      tableName: 'ChildUser'
    });

    return ChildUser;
};