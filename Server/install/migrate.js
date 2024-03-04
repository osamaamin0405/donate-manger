
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({
    path: path.join(__dirname, "../", ".env")
});

mongoose.connect(process.env.DB_URL);

const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        require: true,
    },
    lname: {
        type: String,
        require: true
    },
    username: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
        require: true
    },
    phone: {
        type: String,
        unique: true,
        require: true,
    },
    password: {
        type: String,
        require: true
    },
    gender: {
        type: Number,
        require: true,
        enum: [1, 2]
    },
    image: { type: String, default: null },
    role: { type: Number, default: 2 },
    created_at: { type: Date, default: Date.now() },
    updated_at: Date,
    status: {
        type: Number,
        enum: [1, 2, 3],
        default: 1 // active
    }
})

const user = {
    fname: "Admin",
    lname: "Admin",
    username: "admin",
    email: "admin@admin.com",
    phone: "+201111111111",
    password: "$2b$10$Y41cqCpsCWrlHfiuqE1a6elfMlC3mNMsLRZaL7rE6EMMII3CCd/k2", //92215098
    gender: 1,
    image: "",
    role: 1,
}

function createAdmin(){
    console.log("Creating default user Pleas wait.........")
    mongoose.model('users', userSchema).create(user).then(()=>{
        console.log('admin user created succsess');
        console.log('admin user created successfuly')
        console.log("username: admin")
        console.log('password: 92215098')
    }).catch(err=>{
        if(err.code == 11000) return console.error("Admin User is Exist")
        console.error(err);
    }).finally(()=>{
        mongoose.connection.close();
    });
}


module.exports = createAdmin;