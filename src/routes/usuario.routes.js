const { Router } = require("express");
const IsNotAdmin = require("../middlewares/IsNotAdmin");
const passport = require("passport");
const router = Router();
const ConferenciaCtr = require("../Controllers/ConferenciaCtr");

router.get("/", async (req, res) => {
	const listaConferencias = await ConferenciaCtr.listar();
	res.render("usuario/home", { usuario: req.user, listaConferencias });
});

router
	.route("/login")
	.get((req, res) => res.render("usuario/login", { title: "Usuario || Login" }))
	.post(
		passport.authenticate("local-signin", {
			successRedirect: "/usuario",
			failureRedirect: "/sapo",
			passReqToCallback: true,
		})
	);

router.use(IsNotAdmin);

module.exports = router;
