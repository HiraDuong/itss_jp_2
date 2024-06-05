const mqtt = require('mqtt')

const clientId = `mqtt_${Math.random().toString(16).slice(3)}`

const connectUrl = `ws://broker.hivemq.com:8000/mqtt`

const client = mqtt.connect(connectUrl, {
    clientId,
    clean: true,
    connectTimeout: 4000,
    reconnectPeriod: 1000,
});


const connectMqtt = async () => {
    client.on('connect', () => {
        console.log('Connected to MQTT broker');
    })
    client.on('error', (error) => {
        console.error('MQTT connection error:', error);
    });

};


module.exports = {
    connectMqtt,
    client
}