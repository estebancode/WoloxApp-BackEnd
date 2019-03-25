const { Router } = require('express');
const db = require('../db/photos');

const router = new Router();

router.get('/', async (req, res) => {
    const response = db.getAll();
    res.json(response);
});

router.get('/getAllByAlbumId/:id', async (req, res) => {
    const id = req.params.id;
    if (id>0) {       
        const response = await db.getAllByAlbumId(id);
        res.json(response);
    }else{
        res.status(404).json({'message':'id is required'});
    }
});

module.exports = router;