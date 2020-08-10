const logsMongo = require('../models/logs');
const getIpFunc = require('../middleware/getIp');

class guest {
    constructor(ip, time, login = null){
        this.ip = ip;
        this.time = time;
        this.login = login;
    }
} 


function logsFunc(req){
    let time = `${new Date().getDate()}.${new Date().getMonth()}.${new Date().getFullYear()} : ${new Date().getHours()}h`;
    let ip = getIpFunc(req);
    if(req.session.isAuthenticated){
        let login = req.session.login;
    }

}