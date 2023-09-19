const mongoose = require("mongoose")

const bookmarkSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true }
}, { 
    versionKey: false
})

const bookmark = mongoose.model("bookmarks", bookmarkSchema)

module.exports = bookmark