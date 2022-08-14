import mongoose from "mongoose";
import { User } from "./userModel.js";

const productSchema = mongoose.Schema({
    name: {type: String, required: true, unique: true},
    slug: {type: String, required: true, unique: true},
    image: {type: String, required: true},
    brand: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    countInStock: {type: Number, required: true},
    rating: {type: Number, required: true},
    numReviews: {type: Number, required: true},
    user: {ref: User, type: mongoose.Schema.Types.ObjectId, required: true},
    category: {type: String, required: true}
},{
    timestamps: true
})

export const Product = mongoose.model('Product',productSchema)