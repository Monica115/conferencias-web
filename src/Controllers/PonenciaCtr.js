const { Conferencia, Ponencia } = require("../database/database").models;

module.exports = {
	async listar() {
		try {
			return Ponencia.findAll();
		} catch (error) {
			console.log(error);
		}
	},
	async consultar(id) {
		let ponenciaVO = null;
		try {
			ponenciaVO = await Ponencia.findByPk(id);
		} catch (error) {
			console.log(error);
		}
		return ponenciaVO;
	},
	async agregar(data) {
		try {
			const ponencia = await Ponencia.create(data);
			return ponencia;
		} catch (error) {
			console.log(error);
		}
	},
};
