const { Conferencia, Ponencia } = require("../database/database").models;

module.exports = {
	async listar() {
		try {
			return Conferencia.findAll();
		} catch (error) {
			console.log(error);
		}
	},
	async consultar(id) {
		let conferenciaVO = null;
		try {
			conferenciaVO = await Conferencia.findByPk(id);
		} catch (error) {
			console.log(error);
		}
		return conferenciaVO;
	},
	async eliminar(id) {
		try {
			let conferenciaVO = await Conferencia.findByPk(id);
			if (conferenciaVO) {
				await conferenciaVO.destroy();
			}
		} catch (error) {
			console.log(error);
		}
	},
	async agregar(data) {
		try {
			const conferencia = await Conferencia.create(data);
			return conferencia;
		} catch (error) {
			console.log(error);
		}
	},
};
