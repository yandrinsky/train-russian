const {Router} = require('express');
const router = Router();
const mongoose = require('mongoose');
const User = require('../models/user');

router.get('/cabinet', (req, resp)=>{
    if(req.session.isAuthentificated){
       resp.render('cabinet', {
            isCabinet: true, 
            title: 'Кабинет',
            name: 'сabinet'
        }) 
    } else {
        resp.redirect('/');
    }
    
})

module.exports = router;