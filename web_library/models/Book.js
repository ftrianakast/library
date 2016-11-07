/**
 * Created by ftrianakast on 6/11/16.
 */
var keystone = require('keystone'),
	Types = keystone.Field.Types;

var Book = new keystone.List('Book');

Book.add({
	isbn: {type: Types.Key, required: true, index: true, initial: true},
	name: {type: Types.Text, required: true},
	description: {type: Types.Markdown, required: true, initial: true},
	author: {type: Types.Name, required: true, initial: true},
	borrowed: {type: Types.Boolean, initial: false, default: false},
	borrower: {type: Types.Relationship, ref: 'User'}
});

/**
 * Registration
 */
Book.defaultColumns = 'isbn, name, author, borrowed, borrower';
Book.register();
