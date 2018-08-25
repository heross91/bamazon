var mysql = require('mysql');
var inquirer = require('inquirer');


var connection = mysql.createConnection({
    host: "localhost",
    port: 8808,
    user: "root",
    password: "password",
    database: "bamazon"
})


connection.connect(function(err) {
    if (err) throw err;
    displayProducts();
})


var displayProducts = function() {
  var query = 'SELECT * FROM Products'
  connection.query(query, function(err, res) {
      for (var i = 0; i < res.length; i++) {
          console.log("Item ID: " + res[i].itemID + " || Product: " + res[i].productName + " || Department: " + res[i].productDepartment + " || Price: " + res[i].price + " || Stock: " + res[i].stockQuantity);
      }
      shoppingCart();
    })
};
var shoppingCart = function() {
    inquirer.prompt([{
        name: "ProductID",
        type: "input",
        message: "What is the ID of the product you would like to buy?",
        validate: function(value) {
            if (isNaN(value) == false) {
                return true;
            } else {
                return false;
            }
        }
    }, {
        name: "Quantity",
        type: "input",
        message: "How many would you like to buy?",
        validate: function(value) {
            if (isNaN(value) == false) {
                return true;
            } else {
                return false;
            }
        }
    }]).then(function(answer) {


        var query = 'SELECT * FROM Products WHERE itemID=' + answer.Quantity;
        connection.query(query, function(err, res) {
          if (answer.Quantity <= res) {
            for (var i = 0; i < res.length; i++) {
                console.log("We currently have " + res[i].stockQuantity + " " + res[i].productName + ".");
                console.log("Thank you for your order of "+ res[i].stockQuantity + " " + res[i].productName + " is now being processed.");
              }
            } else {
              console.log("No product in stock.");
            }
            displayProducts();
        })
    })
};
