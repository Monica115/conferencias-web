const { Router } = require("express");
const administrador = require("./administrador.routes");
const usuario = require("./usuario.routes");
const general = require("./general.routes");
const passport = require("passport");
const router = Router();

router.use("/admin", administrador);
router.use("/usuario", usuario);
router.route("/logout").get((req, res) => {
	req.logout();
	res.redirect("/");
});
router
	.route("/signup")
	.get((req, res) => res.render("/registrar", { title: "Registro" }))
	.post(
		passport.authenticate("local-signup", {
			successRedirect: "/usuario",
			failureRedirect: "/usuario/login",
			passReqToCallback: true,
		})
	);

router.use("/", (req, res) => {
	res.redirect("/usuario/login");
});

router.use("/*", (req, res) => res.status(404).render("e404"));

module.exports = router;
