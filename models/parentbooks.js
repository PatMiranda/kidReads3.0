module.exports = function(sequelize, Sequelize) {
    var ParentBook = sequelize.define("ParentBooks", {
      
      id: { type: Sequelize.INTEGER, primaryKey: true },
      ParentId: Sequelize.INTEGER,
      ISBN: Sequelize.STRING
    },
    {
      tableName: 'ParentBooks'
    });

    return ParentBook;
};