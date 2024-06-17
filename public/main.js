
const apiUrl = `${window.location.origin}/api/mqtt`; // Sử dụng window.location.origin để lấy base URL
const wsUrl = 'wss://broker.hivemq.com:8884/mqtt'; // Tương tự cho WebSocket URL
document.addEventListener('DOMContentLoaded', function () {
    console.log('main.js is loaded');
  
    const RBtn = document.getElementById('Rbtn');
    const GBtn = document.getElementById('Gbtn');
    const YBtn = document.getElementById('Ybtn');
    const select = document.getElementById('select');
  
    const D9Info = document.getElementById('D9-info');
    const C7Info = document.getElementById('C7-info');
    const D3Info = document.getElementById('D3-info');

    RBtn.addEventListener('click', async () => {
      
      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: select.value + "R",
          }),
        });
      } catch (error) {
        console.error('Error:', error);
      }

    });
  
    GBtn.addEventListener('click', async () => {
      
      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: select.value + "G", // Corrected the message value
          }),
        });
      } catch (error) {
        console.error('Error:', error);
      }
  
    });
  
    YBtn.addEventListener('click', async () => {
      
      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: select.value + "Y", // Corrected the message value
          }),
        });
      } catch (error) {
        console.error('Error:', error);
      }
    });


  });
  
  const client = mqtt.connect(wsUrl)
  client.on('connect', () => {
    console.log('MQTT over socket connected');
    client.subscribe('ITSS_JP_2');
  });

  client.on('message', (topic, message) => {
 
    if (topic === 'ITSS_JP_2') {
      
      const D9Info = document.getElementById('D9-info');
      const C7Info = document.getElementById('C7-info');
      const D3Info = document.getElementById('D3-info');

      if (message.includes('D9')) {
          if(message.includes('100')){
            D9Info.innerHTML = "Đang tắc";
            D9Info.style.color = "#e63946";
          }
          if(message.includes('010')){
            D9Info.innerHTML = "Không tắc";
            D9Info.style.color = "#588c7e";
          }
          if(message.includes('001')){
            D9Info.innerHTML = "Có thể tắc";
            D9Info.style.color = "#ddb71e";
          }
      } else if (message.includes('C7')) {
        if(message.includes('100')){
          C7Info.innerHTML = "Đang tắc";
          C7Info.style.color = "#e63946";
        }
        if(message.includes('010')){
          C7Info.innerHTML = "Không tắc";
          C7Info.style.color = "#588c7e";
        }
        if(message.includes('001')){
          C7Info.innerHTML = "Có thể tắc";
          C7Info.style.color = "#ddb71e";
        }
      } else if (message.includes('D3')) {
        if(message.includes('100')){
          D3Info.innerHTML = "Đang tắc";
          D3Info.style.color = "#e63946";
        }
        if(message.includes('010')){
          D3Info.innerHTML = "Không tắc";
          D3Info.style.color = "#588c7e";
        }
        if(message .includes('001')){
          D3Info.innerHTML = "Có thể tắc";
          D3Info.style.color = "#ddb71e";
        }
      }
    }
  });