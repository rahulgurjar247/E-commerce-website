import  express from  'express';
import  { getProducts,addProduct } from  '../controllers/productController.js';

const productRouter = express.Router();

productRouter.get('/get_product', getProducts);
productRouter.post('/add_product', addProduct);

export default productRouter;
