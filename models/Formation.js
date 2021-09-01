module.exports = (dbinfo, Sequelize) => {
    return dbinfo.define(
        "formation", {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            nom: {
                type: Sequelize.DataTypes.STRING(45),
                allowNull: true
            },
            description: {
                type: Sequelize.DataTypes.TEXT,
                allowNull: false,
                unique: true,
            },
            duree: {
                type: Sequelize.DataTypes.INTEGER,
                allowNull: true
            },
            Status: {
                type: Sequelize.DataTypes.BOOLEAN,
                allowNull: false,
            },
        }, {
            timestamps: true,
            underscored: true
        }
    );
};