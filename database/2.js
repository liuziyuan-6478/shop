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

const course = new Course({
  name: 'node.js',
  author: 'lihaiyang',
  isPublished: true
})

course.save()