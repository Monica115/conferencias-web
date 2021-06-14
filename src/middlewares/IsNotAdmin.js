module.exports = async (req, res, next) => {
	if (req.isAuthenticated() && !req.user.idTipo === 1) {
		return next();
	}
	req.logout();
	return res.redirect("/usuario/login");
};
