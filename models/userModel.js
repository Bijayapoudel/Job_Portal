import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';


//schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is Required'],
        minlength: [3, 'min length is 3'],
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: [true, 'Email is Required'],
        unique: true,
        validate: validator.isEmail
    },
    password: {
        type: String,
        minlength: [5, "Password length should be greater than 5 character"],
        required: [true, "Password <PASSWORD>"],
    },
    location: {
        type: String,

        default: 'Nepal',
    },
},
    {
        timestamp: true

    });

//middlewares ..............Hashing and salting!
userSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = bcrypt.hashSync(this.password, salt);
});


//compare password....
userSchema.methods.comparePassword = async function (userPassword) {
    const isMatch = await bcrypt.compare(userPassword, this.password)
    return isMatch;
}



//JSON Webtoke....
userSchema.methods.createJWT = function () {
    return JWT.sign({ userID: this._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });
};

export default mongoose.model('User', userSchema)