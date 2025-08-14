const express = require('express');
const bodyParser = require('body-parser');

const {PORT}  = require('./config/serverConfig');
const {createChannel} = require('./utils/messageQueue')

const TicketController = require('./controllers/ticket-controller')

// const cron = require('node-cron')
const jobs = require('./utils/job')

// const {sendBasicEmail} = require('./services/email-service')

const setupAndStartServer = async() => {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));



    app.post('/api/v1/tickets',TicketController.create);

    app.listen(PORT,()=>{
        console.log(`Server started at port ${PORT}`);
        jobs();

        // sendBasicEmail(
        //     'support@admin.com',
        //     'deepshub8883@gmail.com',
        //     'This is a testing email',
        //     'Hey, how are you, I hope you like the support'
        // )
        
        
    })
}

setupAndStartServer();