const { DataTypes, QueryTypes } = require("sequelize");
const { sequelize } = require("../database");

const Conferencia = sequelize.define(
	"conferencia",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		nombre: {
			type: DataTypes.STRING(100),
			allowNull: false,
			unique: true,
		},
		descripcion: {
			type: DataTypes.STRING(100),
			allowNull: false,
		},
		enlace: {
			type: DataTypes.STRING(500),
			allowNull: false,
		},
		fechaInicio: {
			type: DataTypes.DATEONLY,
			allowNull: false,
		},
		fechaFin: {
			type: DataTypes.DATEONLY,
			allowNull: false,
		},
	},
	{
		freezeTableName: true,
		timestamps: true,
	}
);

Conferencia.getProgramacion = async (id) => {
	return await sequelize.query(
		`SELECT P.nombre, S.fechaInicio, S.horaInicio, S.horaFin 
		FROM SESION S
		INNER JOIN PONENCIA P ON P.ID = S.IDPONENCIA
		WHERE S.IDCONFERENCIA = ${id} ORDER BY fechaInicio`,
		{
			type: QueryTypes.SELECT,
		}
	);
};

module.exports = Conferencia;
