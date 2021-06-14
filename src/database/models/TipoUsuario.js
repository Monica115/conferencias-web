const { DataTypes, QueryTypes } = require("sequelize");
const { sequelize } = require("../database");

const TipoUsuario = sequelize.define(
	"tipousuario",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		nombre: {
			type: DataTypes.STRING(20),
			allowNull: false,
			unique: true,
		},
	},
	{
		freezeTableName: true,
		timestamps: false,
	}
);

module.exports = TipoUsuario;
