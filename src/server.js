const express = require('express');
const { PORT } = require('./config/serverConfig');

const setupAndStartServer = async = () =>{
    const app = express();

    app.listen(3001,()=>{
        console.log('server is running at port',PORT);
    })
}