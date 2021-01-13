// 搭建网站服务器，实现客户端与服务器端的通信
// 连接数据库，创建用户集合，向集合中插入文档
// 当用户访问/list时，将所有用户信息查询出来
// 	实现路由功能
// 	呈现用户列表页面
// 	从数据库中查询用户信息 将用户信息展示在列表中
// 将用户信息和表格HTML进行拼接并将拼接结果响应回客户端
// 当用户访问/add时，呈现表单页面，并实现添加用户信息功能
// 当用户访问/modify时，呈现修改页面，并实现修改用户信息功能
// 	修改用户信息分为两大步骤
// 		1.增加页面路由 呈现页面
// 			1.在点击修改按钮的时候 将用户ID传递到当前页面
// 			2.从数据库中查询当前用户信息 将用户信息展示到页面中
// 		2.实现用户修改功能
// 			1.指定表单的提交地址以及请求方式
// 			2.接受客户端传递过来的修改信息 找到用户 将用户信息更改为最新的
// 当用户访问/delete时，实现用户删除功能
const http = require('http')
const mongoose = require('mongoose')
const url = require('url')
const queryString = require('querystring')

mongoose.connect('mongodb://localhost:27017/playground', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => { console.log('链接成功'); })
  .catch(() => { console.log('链接失败'); })

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20
  },
  age: {
    type: Number,
    min: 18,
    max: 80
  },
  password: String,
  email: String,
  hobbies: [String]
})

const User = mongoose.model('User', userSchema)

const app = http.createServer()

app.on('request', async (req, res) => {
  const method = req.method
  const { pathname } = url.parse(req.url)
  if (method == 'GET') {
    if (pathname == '/list') {
      let users = await User.find()
      let list = `
        <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <title>用户列表</title>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css">
          </head>
          <body>
            <div class="container">
              <h6>
                <a href="/add" class="btn btn-primary">添加用户</a>
              </h6>
              <table class="table table-striped table-bordered">
                <tr>
                  <td>用户名</td>
                  <td>年龄</td>
                  <td>爱好</td>
                  <td>邮箱</td>
                  <td>操作</td>
                </tr>
      `
      users.forEach((item) => {
        list += `
          <tr>
            <td>${item.name}</td>
            <td>${item.age}</td>
            <td>
        `
        item.hobbies.forEach(item => {
          list += `<span>${item}</span>`
        })
        list += `
          </td>
            <td>${item.email}</td>
            <td>
              <a href="" class="btn btn-danger btn-xs">删除</a>
              <a href="" class="btn btn-success btn-xs">修改</a>
            </td>
          </tr> 
        `
      })
      list += `
          </table>
          </div>
        </body>
        </html>
      `
      res.end(list)
    } else if (pathname == '/add') {
      let add = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>用户列表</title>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css">
        </head>
        <body>
          <div class="container">
            <h3>添加用户</h3>
            <form method = "post" action="/add">
              <div class="form-group">
                <label>用户名</label>
                <input name="name" type="text" class="form-control" placeholder="请填写用户名">
              </div>
              <div class="form-group">
                <label>密码</label>
                <input name="password" type="password" class="form-control" placeholder="请输入密码">
              </div>
              <div class="form-group">
                <label>年龄</label>
                <input name="age" type="text" class="form-control" placeholder="请填写邮箱">
              </div>
              <div class="form-group">
                <label>邮箱</label>
                <input name="email" type="email" class="form-control" placeholder="请填写邮箱">
              </div>
              <div class="form-group">
                <label>请选择爱好</label>
                <div>
                  <label class="checkbox-inline">
                    <input type="checkbox" value="足球" name="hobbies"> 足球
                  </label>
                  <label class="checkbox-inline">
                    <input type="checkbox" value="篮球" name="hobbies"> 篮球
                  </label>
                  <label class="checkbox-inline">
                    <input type="checkbox" value="橄榄球" name="hobbies"> 橄榄球
                  </label>
                  <label class="checkbox-inline">
                    <input type="checkbox" value="敲代码" name="hobbies"> 敲代码
                  </label>
                  <label class="checkbox-inline">
                    <input type="checkbox" value="抽烟" name="hobbies"> 抽烟
                  </label>
                  <label class="checkbox-inline">
                    <input type="checkbox" value="喝酒" name="hobbies"> 喝酒
                  </label>
                  <label class="checkbox-inline">
                    <input type="checkbox" value="烫头" name="hobbies"> 烫头
                  </label>
                </div>
              </div>
              <button type="submit" class="btn btn-primary">添加用户</button>
            </form>
          </div>
        </body>
        </html>
      `
      res.end(add)
    }
  } else if (method == 'POST') {
    if (pathname == '/add') {
      let formData = ''
      req.on('data', (param) => {
        formData += param
      })
      req.on('end', async () => {
        let user = queryString.parse(formData)
        await User.create(user)
        res.writeHead(301, {
          Location: '/list'
        })
        res.end()
      })
    }
  }
})
app.listen(3000)