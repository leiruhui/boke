const express = require('express')
const app = express()
const bodyParser = require('body-parser')
// 引入数据模版
const mysql = require('mysql')
// 创建数据连接
const conn = mysql.createConnection({
host:'127.0.0.1',
database:'boke',
user:'root',
password:'root' 
})
// 设置默认采取的的模版引擎名称
app.set('view engine','ejs')
// 设置模版引擎的路径
app.set('views','./views')

// 注册表单中的中间件
app.use(bodyParser.urlencoded({extended:false}))
// 把node_modules托管为静态资源
app.use('/node_modules',express.static('./node_modules'))
// 用户请求是首页页面
app.get('/',(req,res)=>{
    res.render('./index.ejs',{name:'zs',age:22})
})
// 用户请求是注册页面
app.get('/register',(req,res)=>{

    res.render('./user/register.ejs',{})
})
// 用户请求的是登录页面
app.get('/login',(req,res)=>{
    res.render('./user/login.ejs',{})
})
// 完成注册业务模版
app.post('/register',(req,res)=>{
    const body = req.body
    // console.log(body)
    if(body.username.trim().length <=0 || body.password.trim().length <=0 || body.nickname.trim().length <=0){
        return res.send({msg:'请填写完整的表单数据在注册用户',status:501})
    }
    // 查询是否重复
    const sql = 'select count(*) as count from blog_users where username = ?'
    conn.query(sql,body.username,(err,result)=>{
        if(err) return res.send({msg:'用户名查重失败',status:502})
        console.log(result)
    })
    res.send({msg:'ok',status:200})
})
app.listen(80,()=>{
    console.log('http://127.0.0.1')
})
