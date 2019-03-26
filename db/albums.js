const mongo = require("./connect");
const { DB_NAME } = require("./config");

module.exports ={

    getAll: function () {
        const db = mongo.instance().db(DB_NAME);
        const albums = db.collection('albums').find({}).toArray();
        return albums;
    },
    getAllByUserId: function (id) {
        const db = mongo.instance().db(DB_NAME);  
        userId = Number(id);     
        const albums = db.collection('albums').find({ 'userId' : userId  }).toArray();
        return albums;
    },
    getById: function (id) {
        const db = mongo.instance().db(DB_NAME);
        albumId = Number(id);     
        const albums = db.collection('albums').findOne({ 'id' : albumId});
        return albums;
    },
    create: function (params) {
        const db = mongo.instance().db(DB_NAME);
        db.collection('albums').save(params,function (err) {
            if(err) throw err;
        });
    },
    updatePermision: function (params) {
        const db = mongo.instance().db(DB_NAME);
        const querySearch ={ 'id': params.id };
        console.log('permission ',params.permissions);
        
        const queryUpdate = { $push: {'permission': params.permissions } };
        db.collection('albums').updateOne(querySearch,queryUpdate,function (err) {
            if(err) throw err;
            console.log("Los datos han sido actualizados satisfactoriamente!");
        });
        return {'status':'success'};
    },
    createMany: function (albumsData) {
        const db = mongo.instance().db(DB_NAME);
        db.collection("albums").insertMany(albumsData, (err, result)=>{
            if (err) throw err;
            console.log("Los datos han sido insertados satisfactoriamente!");
        });
    }
}