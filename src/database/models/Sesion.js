const { DataTypes, QueryTypes } = require("sequelize");
const { sequelize } = require("../database");
const Conferencia = require("./Conferencia");
const Ponencia = require("./Ponencia");

const Sesion = sequelize.define(
	"sesion",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		fechaInicio: {
			type: DataTypes.DATEONLY,
			allowNull: false,
		},
		horaInicio: {
			type: DataTypes.TIME,
			allowNull: false,
		},
		horaFin: {
			type: DataTypes.TIME,
			allowNull: false,
		},
		idConferencia: {
			type: DataTypes.INTEGER,
			references: {
				model: Conferencia,
				key: "id",
			},
		},
		idPonencia: {
			type: DataTypes.INTEGER,
			references: {
				model: Ponencia,
				key: "id",
			},
		},
	},
	{
		freezeTableName: true,
		timestamps: true,
	}
);

module.exports = Sesion;
