import { Product } from '../models/Product.js';
import User from '../models/User.js';



export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found' });
        }
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error While fetching products' });
    }
};

export const addProduct = async (req, res) => {
    try {
        const { name, price, description, image } = req.body;

        if (!name || !price || !description) {
            return res.status(400).json({ error: 'Name, price, and description are required' });
        }

        if (isNaN(price) || price <= 0) {
            return res.status(400).json({ error: 'Price must be a positive number' });
        }

        const product = new Product({
            name,
            price,
            description,
            image,
        });

        const newProduct = await product.save();

        res.status(201).json({
            message: 'Product added successfully',
            product: newProduct,
        });
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({
            error: 'An error occurred while adding the product. Please try again later.',
        });
    }
};

export const buyProduct = async (req, res) => {
    console.log('buyProduct');
    try {
        const { productId, userId } = req.params;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: 'You are not valid user' });
        }
        product.buyer.push = userId;
        await product.save();
        res.status(200).json({ msg: 'Product bought successfully' });


    } catch (error) {
        console.error('Error buying product:', error);
        res.status(500).json({
            error: 'An error occurred while buying the product. Please try again later.',
        });

    }
}

export const getProductdetail = async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }
        res.status(200).json({ 
            data :product,
            msg: 'Product details fetched successfully' ,
            succeed: true
        });
        
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({
            error: ' Error  while fetching the product detail',
        });
    }
}

