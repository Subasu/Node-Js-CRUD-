const express = require('express');
const app = express();
const PORT=27017;
const mongoose=require('mongoose')
mongoose.connect('mongodb://127.0.0.1:21017/ecommerceDatabase')


// Middleware to parse JSON body
app.use(express.json());

// Import routes
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');

// Use routes
app.use('/users', userRoutes);
app.use('/products', productRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
