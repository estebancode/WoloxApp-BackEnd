const { Router } = require('express');
const db = require('../db/users');

const router = new Router();

router.get('/', async (req, res) => {
    const response = await db.getAll();
    res.json(response);
});

router.post('/', async (req, res) => {
    const response = await db.create(req.body);
    res.json({'SuccessOperation': true});
});

router.get('/:id', async (req, res) => {
    const response = req.params.id;
    res.json(response);
});

router.put('/:id', async (req, res) => {
    const response = req.params.id;
    res.json(response);
});

module.exports = router;