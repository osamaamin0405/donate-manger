import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema({
    category_name: {
        type: String,
        require: true,
        unique: true,
    },
    description: {
        type: String,
    },
    image: {
        type: String
    },
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
    show_report_card: { type: Boolean, default: true },
    deleted: { type: Number, enum: [0, 1], default: 0 },
});

export default categorySchema;
