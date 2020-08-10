module.exports = function(req, resp, next){
    resp.locals.isAuthentificated = req.session.isAuthentificated;
    resp.locals.isAdmin = req.session.isAdmin;
    next();
}