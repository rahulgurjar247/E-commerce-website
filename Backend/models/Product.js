import  mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    comment: { 
        type: String,
        required: true 
    },
    rating :{
        type: Number,
        required: false,
        min: 1,
        max: 5
    }
}, { timestamps: true });

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
    },
    reviews: [reviewSchema],
    buyer : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
})

const Review = mongoose.model('Review', reviewSchema);
const Product = mongoose.model('Product', productSchema);

export { Review, Product };