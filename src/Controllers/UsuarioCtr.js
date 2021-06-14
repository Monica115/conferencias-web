const { Usuario } = require("../database/database").models;

module.exports = {
	async consultar(id) {
		let usuario = null;
		try {
			usuario = await Usuario.findByPk(id);
		} catch (error) {
			console.log(error);
		}
		return usuario;
	},
	async consultarPorCorreo(correo) {
		let usuario = null;
		try {
			usuario = await Usuario.findOne({
				where: { correo },
			});
		} catch (error) {
			console.log(error);
		}
		return usuario;
	},
};
