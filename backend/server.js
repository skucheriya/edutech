import dotenv from 'dotenv'
import express from 'express';
import mongoose  from 'mongoose';
import seedRouter from './routes/seedRoutes';
import productRouter from './routes/productRoutes';
import userRouter from './routes/userRoutes';
import orderRouter from './routes/orderRoutes';
import paymentRouter from './routes/paymentRoutes';
import cors from 'cors';
import path from 'path';
import dropdownRoutes from './routes/dropdownRoutes';



dotenv.config()

const url = process.env.MONGODB_URI

mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(()=>{
    console.log('connected to mongodb')
}).catch((e)=>{
    console.log(e.message)
})

const app = express();

app.use(cors());

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get("/", (req, res) => {
    res.json({ message: "Hello from server!" });
  });
  
app.use('/api/seed',seedRouter)

app.use('/api/products',productRouter)

app.use('/api/users',userRouter)

app.use('/api/order',orderRouter)

app.use('/api/payment',paymentRouter)

app.use('/api',dropdownRoutes)


const __dirname = path.resolve()
const buildPath = path.join(__dirname, '..', 'build');
console.log("buildPath",buildPath)
app.use(express.static(buildPath));
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'../build/index.html'))
})


app.use((err, req, res, next)=>{
    res.status(500).send({message: err.message})
})

const port = process.env.PORT || 5000;

app.listen(port,()=>{
    console.log(`served at http://localhost:${port}`)
})