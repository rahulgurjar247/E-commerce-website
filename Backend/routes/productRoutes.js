import  express from  'express';
import  { getProducts,addProduct ,buyProduct} from  '../controllers/productController.js';

const productRouter = express.Router();

productRouter.get('/get_product', getProducts);
productRouter.post('/add_product', addProduct);
productRouter.post('/buy_product/:userId/:productId', buyProduct);


export default productRouter;
