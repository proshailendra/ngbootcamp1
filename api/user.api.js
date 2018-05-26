const express = require('express'),
    HttpStatus = require('http-status-codes'),
    jsonfile = require('jsonfile');

const router = express.Router();
let Users = [];
const filePath = './api/data.json';

function Init() {
    jsonfile.readFile(filePath, (err, data) => {
        if (err)
            console.log(err);
        else
            Users = data;
    });
}

function WriteJsonFile(data) {
    jsonfile.writeFile(filePath, data, (err) => {
        if (err)
            return err;
    });
}
//initialiazing file
Init();

router.get('/user', (req, res) => {
    return res.json(Users);
});
router.get('/user/:id', (req, res) => {
    let id = req.params.id;
    for (let i = 0; i < Users.length; i++) {
        if (id == Users[i].UserId) {
            return res.json(Users[i]);
        }
    }
    return res.status(HttpStatus.NO_CONTENT).send();
});
//POST
router.post("/user", (req, res) => {
    var user = req.body;
    console.log(user);
    var id = 0;
    for (var i = 0; i < Users.length; i++) {
      if (Users[i].UserId > id) {
        id = Users[i].UserId;
      }
    }
    user.UserId = id + 1;
    Users.push(user);
    WriteJsonFile(Users);
    return res.status(HttpStatus.CREATED).send();
  });
  
  router.put("/user/:id", (req, res) => {
    var id = req.params.id;
    var user = req.body;
    for (var i = 0; i < Users.length; i++) {
      if (Users[i].UserId == id) {
        Users[i].Name = user.Name;
        Users[i].Address = user.Address;
        Users[i].Contact = user.Contact;
  
        WriteJsonFile(Users);
        return res.status(HttpStatus.OK).send();
      }
    }
    return res.status(HttpStatus.NOT_MODIFIED).send();
  });
  
  //DELETE
  router.delete("/user/:id", (req, res) => {
    var id = req.params.id;
    for (var i = 0; i < Users.length; i++) {
      if (Users[i].UserId == id) {
        Users.splice(i, 1);  
        WriteJsonFile(Users);
        return res.status(HttpStatus.OK).send();
      }
    }
    return res.status(HttpStatus.NOT_MODIFIED).send();
  });
module.exports = router;