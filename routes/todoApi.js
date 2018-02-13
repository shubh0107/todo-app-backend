const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');


// Get all the todos
router.get('/', (req, res) => {
    Todo.find({}, (err, todos) => {
        if (err) {
            console.log('Error in finding todos from DB\n'+ err);
            res.json({'success': false, 'message':'Some error', 'data':err});
        } else {
            res.json({'success': true, 'message':'Todos fetched successfully!', 'data':todos});
        }
    });
});


// Get a specific todo
router.get('/:id', (req, res) => {
    Todo.findById(req.params.id, (err, foundTodo) => {
        if (err) {
            console.log('Error in finding todos from DB\n'+ err);
            res.json({'success': false, 'message':'Some error', 'data':err});
        } else {
            if (foundTodo) {
                res.json({'success': true, 'message':'Todo found!', 'data':foundTodo});
            } else {
                res.json({'success': false, 'message':'Todo with the given id not found.', 'data':'ID not found'});
            }
        }
    });
});


// post a new todo
router.post('/', (req, res) => {
    const newTodo = new Todo(req.body);

    Todo.create(newTodo, (err, newlyCreatedTodo) => {
        if (err) {
            console.log('Error in creating todo\n'+ err);
            res.json({'success': false, 'message':'Some error', 'data':err});
        } else {
            res.json({'success': true, 'message':'Todo created successfully!', 'data':newlyCreatedTodo});
        }
    });
});


// Edit a todo
router.put('/', (req, res) => {
    Todo.findByIdAndUpdate(req.body._id, req.body, (err, updatedTodo) => {
        if (err) {
            console.log('Error while updating todos.\n'+ err);
            res.json({'success': false, 'message':'Some error', 'data':err});
        } else {
            console.log('Updated todo is- '+updatedTodo);
            res.json({'success': true, 'message':'Todo updated successfully!', 'data':updatedTodo});
        }
    });
});


// Delete a specific todo
router.delete('/:id', (req, res) => {
    Todo.findByIdAndRemove(req.params.id, (err, deletedTodo) => {
        if (err) {
            console.log('Error while deleting todo.\n'+ err);
            res.json({'success': false, 'message':'Some error', 'data':err});
        } else {
            res.json({'success': true, 'message': deletedTodo.title + ' deleted successfully!', 'data':deletedTodo});
        }
    });
});


module.exports = router;