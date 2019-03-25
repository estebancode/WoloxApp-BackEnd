const mongo = require("./connect");
const { DB_NAME } = require("./config");

module.exports ={

    getAll: function () {
        const db = mongo.instance().db(DB_NAME);
        const comments = db.collection('comments').find({}).toArray();
        return comments;
    },
    getAllByPostId: function (id) {
        const db = mongo.instance().db(DB_NAME);  
        postId = Number(id);     
        const comments = db.collection('comments').find({ 'postId' : postId  }).toArray();
        return comments;
    },
    getAllByPostNameAndBody: function (filter) {
        const db = mongo.instance().db(DB_NAME);  
        var query = { '$or' :[{'name': `/${filter}/`},{ 'body': filter }] };     
        const comments = db.collection('comments').find(query).toArray();
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