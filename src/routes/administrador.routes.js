const { Router } = require("express");
const IsAdmin = require("../middlewares/IsAdmin");
const passport = require("passport");
const router = Router();
const AdministradorCtr = require("../Controllers/AdministradorCtr");

router
	.route("/login")
	.get((req, res) => res.render("admin/login", { title: "Admin || Login" }))
	.post(
		passport.authenticate("administrador-signin", {
			successRedirect: "/admin",
			failureRedirect: "/admin/login",
			passReqToCallback: true,
		})
	);

router.use(IsAdmin);

router.route("/").get(AdministradorCtr.gestionConferencias);
router.route("/ver-conferencia/:id").get(AdministradorCtr.verConferencia);
router
	.route("/eliminar-conferencia/:id")
	.get(AdministradorCtr.eliminarConferencia);
router
	.route("/agregar-conferencia")
	.get((req, res) =>
		res.render("admin/agregar-conferencia", {
			title: "Admin || Agregar conferencia",
		})
	)
	.post(AdministradorCtr.agregarConferencia);
router
	.route("/agregar-ponencia")
	.get(AdministradorCtr.viewAgrPonencia)
	.post(AdministradorCtr.agregarPonencia);
router
	.route("/editar-programacion/:id")
	.get(AdministradorCtr.viewEditarProgramacion)
	.post(AdministradorCtr.guardarProgramacion);
module.exports = router;
