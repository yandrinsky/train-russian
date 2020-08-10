const {Router} = require('express');
const router = Router();
router.get('/', (req, resp)=>{
       resp.render('index', {
            title: 'Train-Russian', 
            isIndex: true,
            isSimulatorMain: true,
            name: 'index',
        }); 
    
    
})

module.exports = router;