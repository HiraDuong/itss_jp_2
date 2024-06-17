const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const mqttRouter = require('./routes/MqttRoute');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('./node_modules'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/api', mqttRouter);
app.get('/', (req, res) => {
    res.render('index');
});

// MQTT connection
const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://broker.emqx.io');
const client2 = mqtt.connect('wss://broker.hivemq.com:8884/mqtt');
// WebSocket Server
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



client.on('connect', () => {
    console.log('MQTT connected');
    client.subscribe('ITSS_JP_2');
    client.subscribe('ITSS_JP_2_2');
    client.publish('ITSS_JP_2', 'Hello MQTT');
});
client2.on('connect', () => {
    console.log('MQTT connected');
    client2.subscribe('ITSS_JP_2');
    client2.subscribe('ITSS_JP_2_2');
    client2.publish('ITSS_JP_2', 'Hello MQTT');
});

client.on('message', (topic, message) => {
    const messageString = message.toString();
    

    if (topic === 'ITSS_JP_2_2') {
        client2.publish('ITSS_JP_2', messageString);
    }
});

module.exports=  app;