const {Router} = require('express');
const router = Router();
router.get('/theory', (req, resp)=>{
    resp.render('index', {
        title: 'Train-Russian', 
        isIndex: true,
        isTheoryMain: true,
        name: 'index',
    });   
})

module.exports = router;