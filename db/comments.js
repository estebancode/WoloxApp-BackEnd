const mongo = require("./connect");
const { DB_NAME } = require("./config");

module.exports ={

    getAll: function () {
        const db = mongo.instance().db(DB_NAME);
        const comments = db.collection('comments').find({}).toArray();
        return comments;
    },
    create: function (params) {
        const db = mongo.instance().db(DB_NAME);
        db.collection('comments').save(params,function (err) {
            if(err) throw err;
        });
    },
    createMany: function (commentsData) {
        const db = mongo.instance().db(DB_NAME);
        db.collection("comments").insertMany(commentsData, (err, result)=>{
            if (err) throw err;
            console.log("Los datos han sido insertados satisfactoriamente!");
        });
    }
}