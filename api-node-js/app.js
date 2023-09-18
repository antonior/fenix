require("dotenv/config")


//initialize dependency injection container
const awilix = require('awilix')
const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY
});
const BookController = require('./controllers/BookController')
const BookService = require('./services/BookService')
const BookDAO = process.env.DATABASE_OF_CHOICE === "postgres" ? require('./database/postgres/DAO/BookDAO') : require('./database/mongodb/DAO/BookDAO')
const BookmarkController = require('./controllers/BookmarkController')
const BookmarkService = require('./services/BookmarkService')
const BookmarkDAO = process.env.DATABASE_OF_CHOICE === "postgres" ? require('./database/postgres/DAO/BookmarkDAO') : require('./database/mongodb/DAO/BookmarkDAO')
container.register({
    BookDAO: awilix.asClass(BookDAO).setLifetime("SINGLETON"),
    BookService: awilix.asClass(BookService).setLifetime("SINGLETON"),
    BookController: awilix.asClass(BookController).setLifetime("SINGLETON"),
    BookmarkDAO: awilix.asClass(BookmarkDAO).setLifetime("SINGLETON"),
    BookmarkService: awilix.asClass(BookmarkService).setLifetime("SINGLETON"),
    BookmarkController: awilix.asClass(BookmarkController).setLifetime("SINGLETON")
});


//initialize database
(async () => {
    if (process.env.DATABASE_OF_CHOICE === "postgres") {
        const initializeDatabase = require("./database/postgres/dbInitializer")
        await initializeDatabase()
    }
    if (process.env.DATABASE_OF_CHOICE === "mongodb") {
        const initializeDatabase = require("./database/mongodb/dbInitializer")
        const connection = await initializeDatabase()
    }
})();


//initialize express
const express = require("express")
const cors = require("cors")
const app = express()
const port = 8000;
app.use(express.json())
app.use(cors({origin: "*"}))


//initialize routes
const booksRouter = require("./routes/books")
const bookmarksRouter = require("./routes/bookmarks")
app.use("/books", booksRouter(container.cradle.BookController))
app.use("/bookmarks", bookmarksRouter(container.cradle.BookmarkController))


//start server
app.listen(port, () => {
    console.log(`Listening port ${port}`)
})