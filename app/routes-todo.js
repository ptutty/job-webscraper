var Todo = require('./models/todo');

// get all todos
function getTodos(res) {
    Todo.find(function (err, todos) {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }
        res.json(todos); // return all todos in JSON format
    });
};

// get single todo
function getTodo(req, res) {

    Todo.findById(req.params.todo_id, function (err, todo) {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }
        // res.json(todos)

        res.json(todo); // returns todo in JSON format
    });
};


// update
function updateTodo(req, res) {

    Todo.findById(req.params.todo_id, function (err, todo) {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }
        todo.text = req.body.text;

        todo.save(function(err) {
          if (err) throw err;
          console.log('User successfully updated!');
        });

        res.json(todo); // returns todo in JSON format
    });
};




module.exports = function (app) {

    // api ---------------------------------------------------------------------

    //get all todos
    app.get('/api/todos', function (req, res) {
        // use mongoose to get all todos in the database
        getTodos(res);
    });


    // get a single todo
    app.get('/api/todos/:todo_id', function (req, res) {
        // use mongoose to get one todo in the database
        getTodo(req, res);
    });


    // create todo and send back all todos after creation
    app.post('/api/todos', function (req, res) {

        // create a todo, information comes from AJAX request from Angular
        Todo.create({
            text: req.body.text,
            done: false
        }, function (err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            getTodos(res);

        });
    });


      // updates a single todo
    app.put('/api/update/:todo_id', function (req, res) {
      updateTodo(req, res);
    });


    // delete a todo
    app.delete('/api/todos/:todo_id', function (req, res) {
        Todo.remove({
            _id: req.params.todo_id
        }, function (err, todo) {
            if (err)
                res.send(err);

            getTodos(res);
        });
    });




};
