import  express from "express"
import  mongoose from "mongoose"
import  cors from "cors"
import  bodyParser from "body-parser"
import dotenv from "dotenv"
dotenv.config()

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());


mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection failed:', err));

app.listen(PORT, () => console.log(`Server running on port : ${PORT}`));
