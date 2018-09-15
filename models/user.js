module.exports = function(sequelize, Sequelize) {
 
    var User = sequelize.define('user', {
 
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        firstname: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        lastname: {
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
        }
    });
    
    return User;
}

// module.exports = function(sequelize, DataTypes) {
//     var User = sequelize.define("user", {
      
//       ParentId: { type: DataTypes.INTEGER, primaryKey: true },
//       ChildId: DataTypes.INTEGER,
//       EmailAddress: DataTypes.STRING,
//       UserName: DataTypes.STRING,
//       Password: DataTypes.TEXT,
//       FirstName: DataTypes.STRING,
//       LastName: DataTypes.STRING,
//       AddressStreet1: DataTypes.STRING,
//       AddressStreet2: DataTypes.STRING,
//       AddressCity: DataTypes.STRING,
//       AddressState: DataTypes.STRING,
//       AddressZip: DataTypes.STRING,
//       LastSignOn: DataTypes.DATE,
//       createdAt: DataTypes.DATE,
//       updatedAt: DataTypes.DATE
//     },
//     {
//       tableName: 'ParentUser'
//     });

//     return User;
// };
