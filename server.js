const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;

const host = "ws://broker.hivemq.com:8000/mqtt"
const options = {
    clientId: `mqtt_${Math.random().toString(16).slice(3)}`,
    clean: true,
    connectTimeout: 4000,
    reconnectPeriod: 1000,

}
const mqtt = require('mqtt');
const client = mqtt.connect(host, options);
client.on('connect', () => {
    console.log('Connected to MQTT broker');
    client.subscribe('ITSS_JP_2');
    client.subscribe('ITSS_JP_2_2');
    client.publish('ITSS_JP_2', 'Hello MQTT');
});
client.on('message', (topic, message) => {
    const messageString = message.toString();
    
        console.log('received message %s %s', topic, messageString);
    
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

