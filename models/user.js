module.exports = function(sequelize, Sequelize) {
    var User = sequelize.define('ParentUsers', {
 
        ParentId: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        lastname: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        firstname: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        username: {
            type: Sequelize.TEXT
        },
        about: {
            type: Sequelize.TEXT
        },
        email: {
            type: Sequelize.STRING,
            validate: {
                isEmail: true
            }
        },
        password: {
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
        status: {
            type: Sequelize.ENUM('active', 'inactive'),
            defaultValue: 'active'
        },
    },
    {
            tableName: 'ParentUsers'
    });
    
    return User;
};
