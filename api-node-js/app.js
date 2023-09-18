require("dotenv/config")
const express = require("express")
const booksRoute = require("./routes/books")
const bookmarksRoute = require("./routes/bookmarks")
const cors = require("cors")

const app = express()
const port = 8000;

(async () => {

    //initialize database
    if (process.env.DATABASE_OF_CHOICE === "postgres") {
        const initializeDatabase = require("./database/postgres/dbInitializer")
        await initializeDatabase()
    }
    if (process.env.DATABASE_OF_CHOICE === "mongodb") {
        const initializeDatabase = require("./database/mongodb/dbInitializer")
        const connection = await initializeDatabase()
    }

})();

app.use(express.json())
app.use(cors({origin: "*"}))
app.use("/books", booksRoute)
app.use("/bookmarks", bookmarksRoute)

app.listen(port, () => {
    console.log(`Listening port ${port}`)
})