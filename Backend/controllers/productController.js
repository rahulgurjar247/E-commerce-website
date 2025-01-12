import { Product } from '../models/Product.js';
import User from '../models/User.js';
import {uploadToS3}  from "../utilis/uploadToS3.js"
import dotenv from "dotenv"
import {S3Client ,GetObjectCommand} from "@aws-sdk/client-s3"
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';


dotenv.config();

const s3 = new S3Client({
    credentials :{
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    } ,
    region: process.env.AWS_REGION
 });

 export const getProducts = async (req, res) => {
    try {
        const userId = req.query.userId;
        const products = await Product.find();
        console.log(userId)

        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found' });
        }

        const productsWithUrls = await Promise.all(
            products.map(async (product) => {
                const productData = {
                    _id: product._id,
                    name: product.name,
                    price: product.price,
                    description: product.description,
                }
                productData.isBuyer = product.buyer.includes(userId);

                if (!product.image) {
                    return productData;
                }

                const key = product.image.replace('https://my-ecommerce-rahul.s3.ap-south-1.amazonaws.com/', '');
                const command = new GetObjectCommand({
                    Bucket: process.env.BUCKET_NAME,
                    Key: key,
                });

                const presignedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });
                productData.image = presignedUrl;

                return productData;
            })
        );

        res.status(200).json(productsWithUrls);

    } catch (error) {
        console.error('Error while fetching products:', error);
        res.status(500).json({ error: 'Error while fetching products' });
    }
};



export const addProduct = async (req, res) => {
    try {
        const { name, price, description } = req.body;

        if (!name || !price || !description) {
            return res.status(400).json({ error: 'Name, price, and description are required' });
        }

        if (isNaN(price) || price <= 0) {
            return res.status(400).json({ error: 'Price must be a positive number' });
        }

        if (!req.file) {
            return res.status(400).json({ error: 'Image is required' });
        }

        const fileBuffer = req.file.buffer;
        const fileName = `products/${Date.now()}_${req.file.originalname}`;
        const imageUrl = await uploadToS3(fileBuffer, fileName);  // Upload the image to S3

        const product = new Product({
            name,
            price,
            description,
            image: imageUrl,  // Store the S3 URL of the uploaded image
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
        product.buyer.push(userId);
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
        const { productId,userId } = req.params;
        const product = await Product.findById(productId)
            .populate({
                path: 'reviews.userId',
                select: 'name email'
            });
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }
        const responseData = {
            _id: product._id,
            name: product.name,
            price: product.price,
            description: product.description,
            reviews: product.reviews,
            isBuyer: product.buyer.includes(userId),
        }
        res.status(200).json({
            data: responseData,
            msg: 'Product details fetched successfully',
            succeed: true
        });

    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({
            error: ' Error  while fetching the product detail',
        });
    }
}

