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


router.put('/updateuser/:id', function(req, res) {
    //console.log(req.body);
    var db = req.db;
    var collection = db.get('userlist');
    var userToDelete = req.params.id;

    collection.update({ '_id' : userToDelete }, function(err, result) {
        if (err) {
            console.log("Error when updating user " + err);
            res.sendStatus(500);
        } else {
            console.log("Updated - result: " + result);
            res.send((err === null)? { msg: '' } : { msg:'error: ' + err });
            //Send the updated. AJAX is expecting a response.
        }
    });
});

module.exports = router;
