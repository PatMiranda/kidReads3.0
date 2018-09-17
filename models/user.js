module.exports = function(sequelize, Sequelize) {
    var User = sequelize.define('ParentUsers', {
 
        ParentId: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        FirstName: {
            type: Sequelize.STRING,
            notEmpty: true,
            allowNull: false
        },
        LastName: {
            type: Sequelize.STRING,
            notEmpty: true,
            allowNull: false
        },
        Username: {
            type: Sequelize.TEXT
        },
        About: {
            type: Sequelize.TEXT
        },
        Email: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        Password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        AddressStreet1: {
            type: Sequelize.STRING,
        },
        AddressStreet2: {
            type: Sequelize.STRING,
        },
        AddressCity: {
            type: Sequelize.STRING,
        },
        AddressState: {
            type: Sequelize.STRING,
        },
        AddressZip: {
            type: Sequelize.STRING,
        },
        last_login: {
            type: Sequelize.DATE
        },
        Status: {
            type: Sequelize.ENUM('active', 'inactive'),
            defaultValue: 'active'
        },
    },
    {
            tableName: 'ParentUsers'
    });
    
    return User;
};
