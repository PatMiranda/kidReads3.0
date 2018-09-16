module.exports = function(sequelize, Sequelize) {
    var ChildBook = sequelize.define("ChildBooks", {
      
      BookId: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      ChildId: Sequelize.INTEGER,
      ISBN: Sequelize.STRING
    },
    {
      tableName: 'ChildBooks'
    });

    return ChildBook;
};