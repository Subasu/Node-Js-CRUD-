const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data.json');
const getData = () => JSON.parse(fs.readFileSync(dataPath, 'utf8'));

exports.getProducts = (req, res) => {
  const data = getData();
  res.json(data.products);
};

exports.getProductById = (req, res) => {
  const data = getData();
  const product = data.products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).send('Product not found');
  res.json(product);
};

exports.createProduct = (req, res) => {
  const data = getData();
  const newProduct = {
    id: data.products.length + 1,
    ...req.body
  };
  data.products.push(newProduct);
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  res.status(201).json(newProduct);
};

exports.updateProduct = (req, res) => {
  const data = getData();
  const product = data.products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).send('Product not found');

  Object.assign(product, req.body);
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  res.json(product);
};

exports.deleteProduct = (req, res) => {
  const data = getData();
  const productIndex = data.products.findIndex(p => p.id === parseInt(req.params.id));
  if (productIndex === -1) return res.status(404).send('Product not found');

  const deletedProduct = data.products.splice(productIndex, 1);
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  res.json(deletedProduct);
};
