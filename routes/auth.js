const {Router} = require('express');
const router = Router();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('../models/user');

router.get('/', (req, resp)=>{
    resp.render('auth', {
        title: 'auth',
        isAuth: true,
        name: 'auth'
    });
})

router.post('/register', async (req, resp)=>{
    let login = req.body.login;
    let password = req.body.password;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    if(await User.findOne({login: login}) === null){
        User.create({
            login: login,
            password: password,
            firstName: firstName,
            lastName: lastName,
            role: 'user', 
            learn: [],
        }, (err)=>{
            if(!err) resp.redirect('/');
    
        })
    } else {
        resp.send('Такой пользователь уже существует!')
    }
})
router.post('/signin', async (req, resp)=>{
    let login = req.body.login;
    let password = req.body.password;
    let check = await User.findOne({login: login, password: password});
    if(check !== null){
        req.session.isAuthentificated = true;
        req.session.login = login;
        if(check.role === 'admin'){
            req.session.isAdmin = true;
        }
        resp.redirect('/');
    } else {
        resp.send('Неверный логин или пароль');
    }
    
})

router.get('/endSession',async (req, resp)=>{
    req.session.destroy(()=>{
        resp.redirect('/');
    });
    
    
})

module.exports = router;
    
