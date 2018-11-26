var express = require("express");
var signUpRouter = new express.Router();

signUpRouter.get('/', function(req, res) {
  let post  = {firstName: "Monkey", lastName: "Sauce"};
  let query = db.query('INSERT INTO people SET ?', post, function(err, result) {
    if (err) throw err;
    console.log(result);
    return true;
});
  console.log(query.sql);

});


module.exports = signUpRouter;
