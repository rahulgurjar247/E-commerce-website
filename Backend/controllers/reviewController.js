import {Product} from '../models/Product.js';

export const addReview = async (req, res) => {
    try {
        const { productId } = req.params;
        const { userId, comment } = req.body;

        const product = await Product.findById(productId);

        if (!product) return res.status(404).json({
             error: 'Product not found' ,
             success: true
            });

        product.reviews.push({ userId, comment });
        await product.save();

        res.status(201).json({ 
            success : true,
            message: 'Review added successfully'
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ 
            error: 'Error adding review',
            success: false
         });
    }
};
