const { DataTypes, QueryTypes } = require("sequelize");
const { sequelize } = require("../database");
const Usuario = require("./Usuario");

const Ponencia = sequelize.define(
	"ponencia",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		nombre: {
			type: DataTypes.STRING(50),
			allowNull: false,
			unique: true,
		},
		descripcion: {
			type: DataTypes.STRING(500),
			allowNull: false,
		},
		idPonente: {
			type: DataTypes.INTEGER,
			references: {
				model: Usuario,
				key: "id",
			},
		},
	},
	{
		freezeTableName: true,
		timestamps: true,
	}
);

module.exports = Ponencia;
