const express = require("express")
const booksRoute = require("./routes/books")
const bookmarksRoute = require("./routes/bookmarks")
const cors = require("cors")

const app = express()
const port = 8000;

//initialize database
(async () => {
    const database = require('./database/db');
    const Book = require('./database/book');
    const Bookmark = require('./database/bookmark');

    try {
        const result = await database.sync();
        console.log(result);
    } catch (error) {
        console.log(error);
    }
})();

app.use(express.json())
app.use(cors({origin: "*"}))
app.use("/books", booksRoute)
app.use("/bookmarks", bookmarksRoute)

app.listen(port, () => {
    console.log(`Listening port ${port}`)
})