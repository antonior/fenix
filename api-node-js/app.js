const express = require("express")
const booksRoute = require("./routes/books")
const app = express()
const port = 8000;

//initialize database
(async () => {
    const database = require('./database/db');
    const Book = require('./database/book');

    try {
        const result = await database.sync();
        console.log(result);
    } catch (error) {
        console.log(error);
    }
})();

app.use(express.json())
app.use("/books", booksRoute)

app.listen(port, () => {
    console.log(`Listening port ${port}`)
})