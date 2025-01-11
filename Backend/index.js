import  express from "express"
import  mongoose from "mongoose"
import  cors from "cors"
import  bodyParser from "body-parser"
import dotenv from "dotenv"
import router from "./routes/userRoutes.js"
import productRouter from "./routes/productRoutes.js"
dotenv.config()

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());


app.use('/api', router);
app.use('/api', productRouter);

mongoose.connect(`${process.env.MONGO_URL}/Backend`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection failed:', err));

app.listen(PORT, () => console.log(`Server running on port : ${PORT}`));
