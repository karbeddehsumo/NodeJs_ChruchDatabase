
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ministrySchema = new Schema({
    church: { type: Schema.Types.ObjectId, ref: 'church'},
    ministry: { type: Schema.Types.ObjectId, ref: 'ministry'},
    ministryName: String,
    description: String,
    contact: String,
    email: String,
    phone: String,
    missionStatement: String,
    picture: { type: Schema.Types.ObjectId, ref: 'picture'},
    video: { type: Schema.Types.ObjectId, ref: 'video'},
    members: [{ type: Schema.Types.ObjectId, ref: 'member'}]
},{timestamps: true});