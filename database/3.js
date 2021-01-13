const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => { console.log('连接成功'); })
  .catch(err => { console.log(err, '连接失败'); })

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema)

Course.create({
  name: 'java',
  author: 'lihaiyan',
  isPublished: falseb
}, (err, result) => {
  console.log(err)
  console.log(result);;
})