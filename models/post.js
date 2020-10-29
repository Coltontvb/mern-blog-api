const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;

const postSchema = new Schema ({
    title: { 
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 100 
    },
    content: {
        type: String,
        required: true,
        minlength: 3
    },
 }, {timestamps: true,
});

const Post = mongoose.model(`Post`, postSchema);

module.exports = Post;