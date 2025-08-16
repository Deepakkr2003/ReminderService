const express = require('express');
const bodyParser = require('body-parser');

const {PORT}  = require('./config/serverConfig');
const {subscribedMesssage,createChannel} = require('./utils/messageQueue')

const TicketController = require('./controllers/ticket-controller')
const EmailService = require('./services/email-service')


const jobs = require('./utils/job')

const {REMINDER_BINDING_KEY} = require('./config/serverConfig')


const setupAndStartServer = async() => {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));



    app.post('/api/v1/tickets',TicketController.create);

    const channel= await createChannel();
    subscribedMesssage(channel, EmailService.subscribedEvents, REMINDER_BINDING_KEY);

    app.listen(PORT,()=>{
        console.log(`Server started at port ${PORT}`);
        // jobs();
    })
}

setupAndStartServer();