import { Schema } from "mongoose";

const userSchema = new Schema({
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
    type:Number,
    require: true,
    enum: [1,2]
  },
  image: {type: String, default: null},
  role: { type: Number, default: 2 },
  created_at: { type: Date, default: Date.now() },
  updated_at: Date,
  status: {
    type: Number,
    enum: [1,2,3], // 1 is active 2 suspended 3 deactive
    default: 1 // active
  }
},
// {
//   virtuals: {
//     fullName: {
//       get(){
//         return this.fname + ' ' + this.lname;
//       },
//     }
//   }
// }
).pre("save", function(){
  if(this.$isEmpty("username"))
  {
    this.username = `${this.fname}_${this.lname?.split(" ")[0]}${Math.floor(Math.random()*5000)}`
  }
});

export default userSchema;
