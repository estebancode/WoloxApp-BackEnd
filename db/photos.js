const mongo = require("./connect");
const { DB_NAME } = require("./config");

module.exports ={

    getAll: function () {
        const db = mongo.instance().db(DB_NAME);
        const users = db.collection('photos').find({}).toArray();
        return users;
    },
    getAllByAlbumId: function (id) {
        const db = mongo.instance().db(DB_NAME);  
        albumId = Number(id);     
        const photos = db.collection('photos').find({ 'albumId' : albumId  }).toArray();
        return photos;
    },
    create: function (params) {
        const db = mongo.instance().db(DB_NAME);
        db.collection('photos').save(params,function (err) {
            if(err) throw err;
        });
    },
    createMany: function (photosData) {
        const db = mongo.instance().db(DB_NAME);
        db.collection("photos").insertMany(photosData, (err, result)=>{
            if (err) throw err;
            console.log("Los datos han sido insertados satisfactoriamente!");
        });
    }
}