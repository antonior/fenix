const mongoose = require("mongoose")

const bookSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId },
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

const book = mongoose.model("books", bookSchema)

module.exports = book