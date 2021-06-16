const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("conferencias", "root", "", {
	host: "localhost",
	dialect: "mysql",
	logging: false,
});

exports.sequelize = sequelize;

const Administrador = require("./models/Administrador");
const Asistente = require("./models/Asistente");
const Conferencia = require("./models/Conferencia");
const Ponencia = require("./models/Ponencia");
const Sesion = require("./models/Sesion");
const TipoUsuario = require("./models/TipoUsuario");
const Usuario = require("./models/Usuario");

(async () => {
	await sequelize.sync();
	console.log("database connected");
})();

exports.models = {
	Administrador,
	Asistente,
	Conferencia,
	Ponencia,
	Sesion,
	TipoUsuario,
	Usuario,
};
