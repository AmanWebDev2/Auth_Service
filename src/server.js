const express = require('express');
const bodyParser = require('body-parser');

const { PORT } = require('./config/serverConfig');
const apiRoutes = require('./routes/index');

const { User,Role } = require('./models/index');

const setupAndStartServer = async = () =>{
    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use('/api',apiRoutes);

    if(process.env.DB_SYNC) {
        db.sequelize.sync({ alter: true });
    }

    
    app.listen(PORT,async()=>{
        console.log('server is running at port',PORT);
        // const u1 = await User.findByPk(3);
        // const r1 = await Role.findByPk(1);
        // u1.addRoles(r1);
        // const response =  await u1.getRoles();
        // const response = await r1.getUsers();
        // console.log(response);
    })
};

setupAndStartServer();