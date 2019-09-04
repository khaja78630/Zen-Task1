const express = require('express');
const processRouter = require('./processRouter.js');
const app = express();

app.use(express.json());

app.use("/",processRouter);

app.listen(3000,(req,res)=>{
    console.log("server is running on port 3000");
});