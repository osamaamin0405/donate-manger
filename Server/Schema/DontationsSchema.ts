import mongoose, { Schema, model } from "mongoose";
import categorySchema from "./CategorySchema";
import caseSchema from "./CaseSchema";
import userSchema from "./UserSchema";


export const donationsSchema = new Schema({
    number: {
        type: Number,
        unique: true,
        require: true,
    },
    value: {
        type: String,
        require: true,
    },
    note: {
        type: String,
    },
    docs: {
        type: [String]
    },
    case: {
        type: mongoose.Schema.ObjectId,
        require: true,
        ref: 'cases',
        // localField: "case_id",
        // foreignField: "_id"
    },
    category: {
        type: mongoose.Schema.ObjectId,
        require: true,
        ref: "categories",
        // localField: '_id',
        // foreignField: 'categoryID'        
    },
    created_user: {
        type: mongoose.Schema.ObjectId,
        require: true,
        ref: 'users',
        // localField: '_id',
        // foreignField: 'created_user'   
    },
    created_at: {
        type: Date,
        default: Date.now(),
        require: true,
    },
    updated_at: {
        type: Date,
    },
}, {
    methods: {
        async findByCategoryName(name:string){
            const id = await model('categories', categorySchema).find({category_name: new RegExp(name)}).select("_id").exec();
            return id.map(i=>i._id);
        },
        async findByCaseName(name:string){
            const id = await model('cases', caseSchema).find({name: new RegExp(name)}).select("_id").exec();
            return id.map(i=>i._id);
        },
        async findByCreatedUser(username:string){
                    const id = await model('users', userSchema)
                        .find()
                        .where("username", username)
                        .select("_id").exec();
            return id.map(i=>i._id);
        }
    }
})