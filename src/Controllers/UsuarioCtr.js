const { Usuario, Conferencia } = require("../database/database").models;
const ConferenciaCtr = require("./ConferenciaCtr");

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
	async registrar(data) {
		let usuario = null;
		try {
			usuario = await Usuario.create(data);
		} catch (error) {
			console.log(error);
		}
		return usuario;
	},
	async verConferencia(req, res) {
		try {
			const conferencia = await ConferenciaCtr.consultar(req.params.id);
			if (conferencia) {
				const programacion = await Conferencia.getProgramacion(conferencia.id);
				return res.render("usuario/ver-conferencia", {
					conferencia,
					programacion,
					usuario: req.user,
				});
			}
			return res.render("e404");
		} catch (error) {
			console.log(error);
		}
	},
};
