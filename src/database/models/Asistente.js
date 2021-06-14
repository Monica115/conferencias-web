const { DataTypes, QueryTypes } = require("sequelize");
const { sequelize } = require("../database");
const Usuario = require("./Usuario");
const Conferencia = require("./Conferencia");

const Asistente = sequelize.define(
	"asistente",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		idUsuario: {
			type: DataTypes.INTEGER,
			references: {
				model: Usuario,
				key: "id",
			},
		},
		idConferencia: {
			type: DataTypes.INTEGER,
			references: {
				model: Conferencia,
				key: "id",
			},
		},
	},
	{
		freezeTableName: true,
		timestamps: true,
	}
);

module.exports = Asistente;
