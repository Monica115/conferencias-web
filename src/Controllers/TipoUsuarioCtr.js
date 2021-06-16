const { TipoUsuario } = require("../database/database").models;

module.exports = {
	async listar() {
		let listaTipo = null;
		try {
			listaTipo = await TipoUsuario.findAll();
		} catch (error) {
			console.log(error);
		}
		return listaTipo;
	},
};
