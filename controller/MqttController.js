const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://broker.emqx.io');

client.on('connect', () => {
    console.log('MQTT connected');
    client.subscribe('ITSS_JP_2_2');
}
);


// send message
const sendmessage = async (req, res) => {
    const { message } = req.body;
    client.publish('ITSS_JP_2', message);
    res.send('Message sent');
};

// test message
const testmessage = async (req, res) => {
    res.send('Test message');
};
// get message
const getmessage = async (req, res) => {
    res.send('Get message');
};
module.exports = {
    sendmessage,
 testmessage
};