// Express.js + lowdb => todomvc
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

var express = require('express');
const bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());

const adapter = new FileSync('db.json');
const db = low(adapter);

const port = process.env.PORT || 8081;

db.defaults({ todos: [] })
  .write();

app.get('/', function (req, res) {
    res.send('Here is the database of todomvc-database');
});

// Get All todos
app.get('/todos', async function(req, res) {
    const todos = await db.get('todos').value();

    // Query with name
    // i = includes
    if (req.query.name) {
        console.log(`Received with query name: ${req.query.name}`);
        const result = db.get('todos')
            .filter(function(o) {
                // Return the existing todo that includes the query string
                const name = String.prototype.toLowerCase.apply(o.name);
                return name.includes(req.query.name) && !o.isDeleted;
            })
            .value();

        res.send(result);

        return;
    }
    res.send(todos);
});

// Add todos
app.post('/todos', function (req, res) {
    const todo = req.body;
    // The type of id is number
    todo.id = +todo.id;

    // Test whether todo has id and name field
    if (todo.id && todo.name) {
        // Check if the database has existing id
        // If true, update the todo
        if(db.get('todos').filter({id: todo.id}).value().length) {
            // Rewrite the name of that todo
            db.get('todos')
              .find({ id: todo.id })
              .assign({ name: todo.name })
              .write();
            console.log('Update item: ' + todo.name + ' id: ' + todo.id);
        } else {
        // Create the item with that id
        db.get('todos')
            .push({id: todo.id, name: todo.name, isDeleted: false})
            .write();

        console.log('Successfully added todo: ' + todo.name + ' into the database');
        }
    } else {
        console.log(todo);
    }
    res.send(db.get('todos').value());
});

// Delete todo
app.delete('/todos', function(req, res) {
    const todo = req.body;

    // Perform soft delete
    db.get('todos')
        .find({id: todo.id})
        .assign({ isDeleted: true})
        .write();

    res.send(db.get('todos'));
});

app.listen(port, () => {
    console.log(`Listening to ${port}`);
});
