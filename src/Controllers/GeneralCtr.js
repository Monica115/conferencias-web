const ConferenciaCtr = require("../Controllers/ConferenciaCtr");

module.exports = {
	async inicio(req, res) {
		try {
			const listaConferencias = await ConferenciaCtr.listar();
			res.render("index", {
				listaConferencias,
			});
		} catch (error) {
			console.log(error);
		}
	},
};
