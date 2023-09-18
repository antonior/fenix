const mongoose = require("mongoose")

const bookmarkSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true }
}, { 
    versionKey: false, 
    virtuals: {
        id: {
            get() {
                return this._id
            }
        }
    } 
})
.set('toJSON', { virtuals: true })
.set('toObject', { virtuals: true })

const bookmark = mongoose.model("bookmarks", bookmarkSchema)

module.exports = bookmark