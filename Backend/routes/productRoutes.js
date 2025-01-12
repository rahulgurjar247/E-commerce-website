import  express from  'express';
import  { getProducts,addProduct ,buyProduct,getProductdetail } from  '../controllers/productController.js';
import { uploadToS3 } from '../utilis/uploadToS3.js';
import multer from 'multer';
const upload = multer({ storage: multer.memoryStorage() });

const productRouter = express.Router();

productRouter.get('/get_product', getProducts);
productRouter.post('/add_product', upload.single('image'),addProduct);
productRouter.post('/buy_product/:userId/:productId', buyProduct);
productRouter.get('/get_product/:productId', getProductdetail);


export default productRouter;
