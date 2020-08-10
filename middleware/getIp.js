function getIP(req){
    let ip = req.connection.remoteAddress;
    //console.log(ip)
    ip = ip.slice(ip.indexOf('f:') + 2, ip.length);
    return ip
}

module.exports = getIP;