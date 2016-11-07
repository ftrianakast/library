var keystone = require('keystone'),
    Promise = require('bluebird'),
    User = keystone.list('User'),
    Book = keystone.list('Book');

exports.makeLoan = function(req, res) {
    var isbn = req.query.isbn,
        email = req.query.email;

    var userPromise = User.model.findOne().where('email', email);     
    
    userPromise.exec().then(function(user) {
        return Book.model.update({ isbn: isbn }, { borrowed: true, borrower: user._id}).exec();    
    }).then(function(response) {
        console.log('User: ' + user.name + ' made the loan of the book: ' + book.name);
    });

    res.send('OK');
}

exports.deleteLoan = function(req, res) {
    var isbn = req.query.isbn;

    Book.model.update({ isbn: isbn }, { borrowed: false, borrower: null})
              .exec()
              .then(function(){
                   console.log('The book with isbn: ' + isbn + ' was returned to the library');
              });
    res.send('OK');
}