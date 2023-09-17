const express = require("express")
const booksRoute = require("./routes/books")
const bookmarksRoute = require("./routes/bookmarks")
const cors = require("cors")

const app = express()
const port = 8000;

//initialize database
const initializeDatabase = require("./database/postgres/dbInitializer")
initializeDatabase()

app.use(express.json())
app.use(cors({origin: "*"}))
app.use("/books", booksRoute)
app.use("/bookmarks", bookmarksRoute)

app.listen(port, () => {
    console.log(`Listening port ${port}`)
})

//mongodb+srv://ajrdc:<password>@cluster0.vubgg8e.mongodb.net/?retryWrites=true&w=majority