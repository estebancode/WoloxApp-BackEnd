const { Router } = require('express');
const db = require('../db/comments');

const router = new Router();

router.get('/', async (req, res) => {
    const response = db.getAll();
    res.json(response);
});

module.exports = router;