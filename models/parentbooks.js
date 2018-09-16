module.exports = function(sequelize, Sequelize) {
    var ParentBook = sequelize.define("ParentBooks", {
      
      BookId: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      ParentId: Sequelize.INTEGER,
      ISBN: Sequelize.STRING
    },
    {
      tableName: 'ParentBooks'
    });

    return ParentBook;
};