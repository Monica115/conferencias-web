const { Administrador, Usuario, Ponencia, Conferencia, Sesion } =
	require("../database/database").models;
const ConferenciaCtr = require("./ConferenciaCtr");
const PonenciaCtr = require("./PonenciaCtr");

module.exports = {
	async consultar(id) {
		let administradorVO = null;
		try {
			administradorVO = await Administrador.findByPk(id);
		} catch (error) {
			console.log(error);
		}
		return administradorVO;
	},
	async consultarPorCorreo(correo) {
		let administradorVO = null;
		try {
			administradorVO = await Administrador.findOne({
				where: { correo },
			});
		} catch (error) {
			console.log(error);
		}
		return administradorVO;
	},
	async gestionConferencias(req, res) {
		try {
			const listaConferencias = await ConferenciaCtr.listar();
			res.render("admin/conferencias", {
				listaConferencias,
				usuario: req.user,
			});
		} catch (error) {
			console.log(error);
		}
	},
	async verConferencia(req, res) {
		try {
			const conferencia = await ConferenciaCtr.consultar(req.params.id);
			if (conferencia) {
				const programacion = await Conferencia.getProgramacion(conferencia.id);
				return res.render("admin/ver-conferencia", {
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
	async eliminarConferencia(req, res) {
		try {
			await ConferenciaCtr.eliminar(req.params.id);
			res.redirect("/admin");
		} catch (error) {
			console.log(error);
		}
	},
	async agregarConferencia(req, res) {
		const data = req.body;
		await ConferenciaCtr.agregar(data);
		res.redirect("/admin");
	},
	async agregarPonencia(req, res) {
		const data = req.body;
		await PonenciaCtr.agregar(data);
		res.redirect("/admin");
	},
	async viewAgrPonencia(req, res) {
		try {
			const ponentes = await Usuario.findAll({ where: { idTipo: 3 } });
			res.render("admin/agregar-ponencia", {
				ponentes,
				usuario: req.user,
			});
		} catch (error) {
			console.log(error);
		}
	},
	async viewEditarProgramacion(req, res) {
		try {
			const conferencia = await ConferenciaCtr.consultar(req.params.id);
			if (conferencia) {
				const programacion = await Conferencia.getProgramacion(conferencia.id);
				const ponencias = await Ponencia.findAll();
				return res.render("admin/editar-programacion", {
					conferencia,
					programacion,
					ponencias,
				});
			}
			return res.render("e404");
		} catch (error) {
			console.log(error);
		}
	},
	async guardarProgramacion(req, res) {
		const idConferencia = req.params.id;
		const data = req.body;
		data.idConferencia = idConferencia;
		const sesion = await Sesion.create(data);
		if (sesion) {
			res.redirect("/admin/editar-programacion/" + idConferencia);
		}
	},
};
