const mongoose = require("mongoose")

async function initializeDatabase() {
    await mongoose.connect(process.env.DB_CONNECTION_STRING)

    const conn = mongoose.connection

    conn.on("error", (error) => {
        console.error("Database connection error:", error)
    })
    conn.once("open", () => {
        console.log("Database connection succeded!")
    })

    return conn
}

module.exports = initializeDatabase