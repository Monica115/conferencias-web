const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const AdministradorCtr = require("../Controllers/AdministradorCtr");
const UsuarioCtr = require("../Controllers/UsuarioCtr");

passport.serializeUser((user, done) => {
	done(null, { id: user.id, tipo: user.idTipo });
});

passport.deserializeUser(async ({ id, tipo }, done) => {
	let userDB;
	if (tipo == 1) {
		userDB = await AdministradorCtr.consultar(id);
	} else {
		userDB = await UsuarioCtr.consultar(id);
	}
	userDB ? done(null, userDB.dataValues) : done(null, false);
});

passport.use(
	"local-signup",
	new LocalStrategy(
		{
			usernameField: "correo",
			passwordField: "contrasena",
			passReqToCallback: true,
		},
		async (req, correo, contrasena, done) => {
			req.logOut();
			const usuarioDB = await UsuarioCtr.consultarPorCorreo(correo);
			const usuario = !usuarioDB ? await ClienteController.create(req) : null;
			return usuario ? done(null, usuario.dataValues) : done(null, false);
		}
	)
);

passport.use(
	"local-signin",
	new LocalStrategy(
		{
			usernameField: "correo",
			passwordField: "contrasena",
			passReqToCallback: true,
		},
		async (req, correo, contrasena, done) => {
			req.logOut();
			const usuarioDB = await UsuarioCtr.consultarPorCorreo(correo);
			return !usuarioDB || (usuarioDB && usuarioDB.contrasena !== contrasena)
				? done(null, false)
				: done(null, usuarioDB.dataValues);
		}
	)
);

passport.use(
	"administrador-signin",
	new LocalStrategy(
		{
			usernameField: "correo",
			passwordField: "contrasena",
			passReqToCallback: true,
		},
		async (req, correo, contrasena, done) => {
			req.logOut();
			const administradorDB = await AdministradorCtr.consultarPorCorreo(correo);
			return !administradorDB ||
				(administradorDB && administradorDB.contrasena !== contrasena)
				? done(null, false)
				: done(null, administradorDB.dataValues);
		}
	)
);
