
const { MongoClient, ServerApiVersion, ObjectId, ObjectID } = require('mongodb');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

// mongodb config
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.udusb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// middleware
app.use(cors());
app.use(express.json());

console.log(uri);

async function run() {
    try {
        await client.connect();
        const taskCollection = client.db('todo-2').collection('tasks');

        // post new task
        app.post('/tasks', async (req, res) => {
            const task = req.body;
            const result = await taskCollection.insertOne(task);
            res.send(result);
        })
    }

    catch { }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Server is running for todo list');
});

app.listen(port, () => {
    console.log('Server is running on port', port);
});