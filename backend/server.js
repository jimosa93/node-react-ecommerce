import express from 'express';
import data from './data';
import dotenv from 'dotenv';
import config from './config';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import useRoute from './routes/userRoute';
import productRoute from './routes/productRoute';

dotenv.config();

const mongodbUrl = config.MONGODB_URL;
mongoose
  .connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .catch(error => console.log(error.reason));

const app = express();
app.use(bodyParser.json());
app.use('/api/users', useRoute);
app.get('/api/products', productRoute);
// app.get('/api/products/:id', (req, res) => {
//   const productId = req.params.id;
//   const product = data.products.find(x => x._id === productId);
//   if (product) res.send(product);
//   else res.status(404).send({ msg: 'Product not found' });
// });

app.listen(5000, () => console.log('Server started at htt://localhost:5000'));
