const { DataTypes, QueryTypes } = require("sequelize");
const { sequelize } = require("../database");
const TipoUsuario = require("./TipoUsuario");

const Usuario = sequelize.define(
	"usuario",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		documento: {
			type: DataTypes.STRING(12),
			allowNull: false,
			unique: true,
		},
		nombres: {
			type: DataTypes.STRING(30),
			allowNull: false,
		},
		apellidos: {
			type: DataTypes.STRING(30),
			allowNull: false,
		},
		celular: {
			type: DataTypes.STRING(10),
			allowNull: false,
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
		paginaWeb: {
			type: DataTypes.STRING(175),
			allowNull: true,
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
		timestamps: false,
	}
);

module.exports = Usuario;
