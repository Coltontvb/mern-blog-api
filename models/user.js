const { validateEmail } = require(`../util/validation`);
const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    username: { 
        type: String,
        required: [true, `A user name is required!`],
        index: { unique: true },
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: [true, `An email is required!`],
        index: { unique: true },
        validate: {
            validator: (input) => {
                return validateEmail(input);
            }
        },
        message: props => `${props.value} is not a valid email`
    },
    password: { type: String, required: true }
},
 {
    timestamps: true,
});

const User = mongoose.model(`User`, userSchema);

module.exports = User;