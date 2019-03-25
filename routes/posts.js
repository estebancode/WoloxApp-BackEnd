const { Router } = require('express');
const db = require('../db/posts');

const router = new Router();

router.get('/', async (req, res) => {
    const response = await db.getAll();
    res.json(response);
});

module.exports = router;