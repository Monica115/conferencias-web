const { DataTypes, QueryTypes } = require("sequelize");
const { sequelize } = require("../database");
const TipoUsuario = require("./TipoUsuario");

const Administrador = sequelize.define(
	"administrador",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		correo: {
			type: DataTypes.STRING(60),
			allowNull: false,
			unique: true,
		},
		contrasena: {
			type: DataTypes.STRING(6),
			allowNull: false,
		},
		idTipo: {
			type: DataTypes.INTEGER,
			references: {
				model: TipoUsuario,
				key: "id",
			},
		},
	},
	{
		freezeTableName: true,
		timestamps: true,
	}
);

module.exports = Administrador;
