const {Router} = require('express');
const router = Router();

router.get('/base', (req, resp)=>{
    if(req.session.isAdmin){
       resp.render('dataBase', {
            title: 'Add words',
            isBase: true,
            name: 'base'
        });  
    } else {
        resp.redirect('/');
    }
   
})

module.exports = router;