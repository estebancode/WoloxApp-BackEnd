const { Router } = require('express');
const db = require('../db/comments');

const router = new Router();

router.get('/', async (req, res) => {
    const response = db.getAll();
    res.json(response);
});

router.get('/GetAllByPostId/:id', async (req, res) => {
    const id = req.params.id;
    if (id>0) {
        const response = await db.getAllByPostId(id);
        res.json(response);
    }else{
        res.status(404).json({'message':'id is required'});
    }
});


router.get('/GetAllByPostId/:filter', async (req, res) => {
    const filter = req.params.filter;
    if (filter) {
        const response = await db.getAllByPostNameAndBody(filter);
        res.json(response);
    }else{
        res.status(404).json({'message':'filter is required'});
    }
});

module.exports = router;