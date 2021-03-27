const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const storySchema = new Schema({
    church: { type: Schema.Types.ObjectId, ref: 'church'},
    ministry: { type: Schema.Types.ObjectId, ref: 'ministry'},
    title: String,
    subTitle: String,
    intro: String,
    story: String,
    publishStartDate: Date,
    publishEndDate: Date,
    author: String,
    pictures: [{ type: Schema.Types.ObjectId, ref: 'picture'}],
    status: String,
    enteredBy: { type: Schema.Types.ObjectId, ref: 'user'}
}, { timestamps: true});

const Story = mongoose.model('story', storySchema);
module.exports = Story;