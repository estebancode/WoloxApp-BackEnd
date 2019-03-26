const { Router } = require('express');
const db = require('../db/albums');

const router = new Router();

router.get('/', async (req, res) => {
    const response = await db.getAll();
    res.json(response);
});

router.get('/getAllByUserId/:id', async (req, res) => {
    const id = req.params.id;
    if (id>0) {       
        const response = await db.getAllByUserId(id);
        res.json(response);
    }else{
        res.status(404).json({'message':'id is required'});
    }
});

router.get('/GetById/:id', async (req, res) => {
    const id = req.params.id;
    if (id>0) {
        const response = await db.getById(id);
        res.json(response);
    }else{
        res.status(404).json({'message':'id is required'});
    }
});

router.put('/permission/:id', async (req, res) => {
    const id = req.params.id;
    if (id>0) {
        console.log('req.body= ',req.body);
        
        const response = await db.updatePermision(req.body);
        res.json(response);
    }else{
        res.status(404).json({'message':'id is required'});
    }
});

module.exports = router;