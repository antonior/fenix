const mongoose = require("mongoose")

const bookSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String }
}, { 
    versionKey: false
})

const book = mongoose.model("books", bookSchema)

module.exports = book