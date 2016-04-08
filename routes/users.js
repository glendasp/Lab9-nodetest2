var express = require('express');
var router = express.Router();

/*
 * GET userlist.
 */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('userlist');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});



/*
 * POST to adduser.
 */
router.post('/adduser', function(req, res) {
    var db = req.db;
    var collection = db.get('userlist');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

/*
 * DELETE to deleteuser.
 */
router.delete('/deleteuser/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('userlist');
    var userToDelete = req.params.id;
    collection.remove({ '_id' : userToDelete }, function(err) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
});

app.put("/updateuser/:id", function(req, res) {
    //Filter is the flower with the given name
    console.log(req.body);
    var filter = { "name" : req.body.name }
    var update = { $set : req.body } ;
    //By default, findOneAndUpdate replaces the record with the update.
    //So, here, need to use $set parameter to specify we want to update only the fields given.
    db.collection("flowers").findOneAndUpdate(filter, update, function(err, result) {
        if (err) {
            console.log("Error when updating color " + err);
            return res.sendStatus(500);
        } else {
            console.log("Updated - result: " + result)
            return res.send({"color" : req.body.color});
            //Send the updated color back. AJAX is expecting a response.
        }
    });
});




module.exports = router;
