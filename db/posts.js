const mongo = require("./connect");
const { DB_NAME } = require("./config");

module.exports ={

    getAll: function () {
        const db = mongo.instance().db(DB_NAME);
        const posts = db.collection('posts').find({}).toArray();
        return posts;
    },
    getAllByAlbumId: function (id) {
        const db = mongo.instance().db(DB_NAME);  
        userId = Number(id);     
        const posts = db.collection('posts').find({ 'userId' : userId  }).toArray();
        return posts;
    },
    create: function (params) {
        const db = mongo.instance().db(DB_NAME);
        db.collection('posts').save(params,function (err) {
            if(err) throw err;
        });
    },
    createMany: function (postsData) {
        const db = mongo.instance().db(DB_NAME);
        db.collection("posts").insertMany(postsData, (err, result)=>{
            if (err) throw err;
            console.log("Los datos han sido insertados satisfactoriamente!");
        });
    }
}