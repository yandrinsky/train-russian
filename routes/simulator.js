const {Router} = require('express');
const router = Router();

router.get('/simulator', (req, resp)=>{
    resp.render('simulator', {
        title: 'Тренажёр',
        isSimulator: true,
        name: 'simulator'
    });
})

module.exports = router;