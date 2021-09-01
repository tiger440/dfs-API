const Sequelize = require("sequelize");

const db = {};

const dbinfo = new Sequelize("db_formation", "root", "", {
    host: "localhost",
    dialect: "mysql",
    port: 3306,
    pool: {
        max: 5,
        min: 0
    }
});

dbinfo
    .authenticate()
    .then(() => {
        console.log("Connection has been establshed successfully.");
    })
    .catch(err => {
        console.error('unable to connect to the database:' + err)
    });

db.formation = require("..//models/Formation")(dbinfo, Sequelize);
db.pdf = require("..//models/Pdf")(dbinfo, Sequelize);
db.image = require("..//models/Image")(dbinfo, Sequelize);
db.video = require("..//models/Video")(dbinfo, Sequelize);


db.formation.hasMany(db.image, {foreignKey: "formationId"});
db.formation.hasMany(db.pdf, {foreignKey: "formationId"});
db.formation.hasMany(db.video, {foreignKey: "formationId"});

db.info = dbinfo;
db.Sequelize = Sequelize;

//dbinfo.sync({force: true});

//db.info.sync();

module.exports = db;