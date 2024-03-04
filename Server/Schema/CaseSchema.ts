import mongoose, { Schema } from "mongoose";
const depensSchema = new Schema({
  name: String,
  relative_degree: { type: Number, enum: [1, 2, 3, 4] },
});
const caseSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  national_id: {
    type: String,
    require: true,
    unique: true,
  },
  phone: {
    type: String,
    unique: true
  },
  address: {
    require: true,
    type: String
  },
  dob: {
    type: Date,
    require: true,
  },
  marital_status: { type: Number, enum: [1, 2, 3, 4], default: 1, require: true },
  gender: { type: Number, enum: [1, 2], default: 1, require: true },
  id_photo: [String],
  image: String,
  created_at: { type: Date, default: Date.now() },
  updated_at: Date,
  created_user: {
    type: mongoose.Types.ObjectId,
    require: true,
    ref: 'users',
    localField: '_id',
    foreignField: 'created_user'
  },
  status: { type: Number, enum: [1, 2], default: 1 },
  deleted: { type: Number, enum: [0, 1], default: 0 },
  // isDepens: { type: Boolean, default: false },
  // dependsNames: { type: [depensSchema], default: {} },
});

export default caseSchema;
