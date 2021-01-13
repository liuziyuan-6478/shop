const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => { console.log('连接成功'); })
  .catch(err => { console.log(err, '连接失败'); })

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String,
  password: String,
  hobbies: [String]
});

const User = mongoose.model('User', userSchema)

// User.find().then(result => {
//   console.log(result);
// })
// User.find({ _id: '5c09f267aeb04b22f8460968' }).then(result => {
//   console.log(result);
// })
User.find().then(result => { console.log(result); })