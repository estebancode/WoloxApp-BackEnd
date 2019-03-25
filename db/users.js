const mongo = require("./connect");
const { DB_NAME } = require("./config");

module.exports ={

    getAll: function () {
        const db = mongo.instance().db(DB_NAME);
        const users = db.collection('users').find({}).toArray();
        return users;
    },
    getById: function (id) {
        const db = mongo.instance().db(DB_NAME);
        const users = db.collection('users').find({},{ user: id = id  }).toArray();
        return users;
    },
    create: function (params) {
        const db = mongo.instance().db(DB_NAME);
        db.collection('users').save(params,function (err) {
            if(err) throw err;
        });
    },
    createMany: function (usersData) {
        const db = mongo.instance().db(DB_NAME);
        db.collection("users").insertMany(usersData, (err, result)=>{
            if (err) throw err;
            console.log("Los datos han sido insertados satisfactoriamente!");
        });
    }
}