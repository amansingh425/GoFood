const express = require('express');
const app = express();
port = process.env.PORT || 5000;
const db = require('./db.js')

// allowing cors 
app.use((req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Headers',
                'Origin, X-Requested-With, Content-Type, Accept');
                next();
})
  
db();
app.use(express.json());

app.get('/', (req, res)=>{
    res.send("hi"); 
})

app.use('/api', require('./routes/createuser.js'));
app.use('/api', require('./routes/login.js'));
app.use('/api', require('./routes/fooddata.js'));
app.use('/api', require('./routes/orderdata.js'));
app.use('/api', require('./routes/myorders.js'));

app.listen(port, ()=>{
    console.log("express server is ready");
})
