const { Router } = require('express');
const fetch = require('node-fetch');
const dbUsers = require('../db/users');
const dbAlbums = require('../db/albums');
const dbPhotos = require('../db/photos');
const dbComments = require('../db/comments');
const dbPosts = require('../db/posts');
const _ = require('lodash');

const router = new Router();

router.get('/', async (req, res) => {

    /* ===== load users start ======= */
    const responseUsers = await fetch('https://jsonplaceholder.typicode.com/users').
        catch(err => {
            console.log('there is some err ' + err);
            if (err) throw err;
        });

    const dataUsers = await responseUsers.json();
    dbUsers.createMany(dataUsers);
    /* ===== load users end ======= */


    /* ===== load albums start ======= */
    const responseAlbums = await fetch('https://jsonplaceholder.typicode.com/albums').
        catch(err => {
            console.log('there is some err ' + err);
            if (err) throw err;
        });

    const dataAlbums = await responseAlbums.json();
    dbAlbums.createMany(dataAlbums);
    /* ===== load albums end ======= */

    /* ===== load photos start ======= */
    const responsePhotos = await fetch('https://jsonplaceholder.typicode.com/photos').
        catch(err => {
            console.log('there is some err ' + err);
            if (err) throw err;
        });

    const dataPhotos = await responsePhotos.json();
    dbPhotos.createMany(dataPhotos);
    /* ===== load photos end ======= */

    /* ===== load posts start ======= */
    const responsePosts = await fetch('https://jsonplaceholder.typicode.com/posts').
        catch(err => {
            console.log('there is some err ' + err);
            if (err) throw err;
        });

    const dataPosts = await responsePosts.json();
    dbPosts.createMany(dataPosts);
    /* ===== load posts end ======= */

    /* ===== load comments start ======= */
    const responseComments = await fetch('https://jsonplaceholder.typicode.com/comments').
        catch(err => {
            console.log('there is some err ' + err);
            if (err) throw err;
        });

    const dataComments = await responseComments.json();
    dbComments.createMany(dataComments);
    /* ===== load comments end ======= */

    res.json({ 'SuccessOperation': true });
});

module.exports = router;