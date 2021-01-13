const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/playground', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => { console.log('连接成功'); })
  .catch(err => { console.log(err, '连接失败'); })

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 5,
    trim: true
  },
  age: {
    type: Number,
    min: 18,
    max: 100
  },
  publishDate: {
    type: Date,
    default: Date.now
  },
  category: {
    type: String,
    enum: ['html', 'css', 'javascript']
  },
  author: {
    type: String,
    validate: {
      validator: (v) => {
        return v && v.length > 4
      },
      // 自定义错误信息
      message: '传入的值不符合验证规则'
    }
  }
});

const Post = mongoose.model('Post', postSchema)

Post.create({}, (result) => {
  console.log(result);
})