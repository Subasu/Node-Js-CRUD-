const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data.json');
const getData = () => JSON.parse(fs.readFileSync(dataPath, 'utf8'));

exports.getUsers = (req, res) => {
  const data = getData();
  res.json(data.users);
};

exports.getUserById = (req, res) => {
  const data = getData();
  const user = data.users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send('User not found');
  res.json(user);
};

exports.createUser = (req, res) => {
  const data = getData();
  const newUser = {
    id: data.users.length + 1,
    ...req.body
  };
  data.users.push(newUser);
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  res.status(201).json(newUser);
};

exports.updateUser = (req, res) => {
  const data = getData();
  const user = data.users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send('User not found');

  Object.assign(user, req.body);
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  res.json(user);
};

exports.deleteUser = (req, res) => {
  const data = getData();
  const userIndex = data.users.findIndex(u => u.id === parseInt(req.params.id));
  if (userIndex === -1) return res.status(404).send('User not found');

  const deletedUser = data.users.splice(userIndex, 1);
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  res.json(deletedUser);
};
