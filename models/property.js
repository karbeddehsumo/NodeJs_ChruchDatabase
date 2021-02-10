const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const propertySchema = new Schema({
    church: { type: Schema.Types.ObjectId, ref: 'church'},
    title: String,
    purchaseDate: Date,
    value: Number,
    quantity: Number,
    location: String,
    assignedTo: String,
    condition: String,
    tagNumber: String,
    description: String,
    comment: String,
    lastInventory: Date,
    enteredBy: { type: Schema.Types.ObjectId, ref: 'user'}
}, { timestamps: true});

const Property = mongoose.model('property', propertySchema);
module.exports = Property;