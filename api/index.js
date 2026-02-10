const express = require('express');
const mqtt = require('mqtt');
const app = express();

// Konfigurasi HiveMQ (Sesuai gambar Anda)
const MQTT_URL = 'mqtts://168c324c63f24a7d9e8d7bd93454c1b9.s1.eu.hivemq.cloud:8883';
const MQTT_OPTIONS = {
    username: 'topansidiq',
    password: '@qd@2rP5cDJvxZc',
    rejectUnauthorized: false // Agar tidak error masalah sertifikat di cloud serverless
};

const client = mqtt.connect(MQTT_URL, MQTT_OPTIONS);

client.on('connect', () => {
    console.log('Connected to HiveMQ Cloud');
});

// Endpoint: Error (Buzzer 6x)
app.get('/error', (req, res) => {
    client.publish('mappi32/api/perintah', 'Alarm 6');
    res.json({ status: "success", message: "Error command sent: Buzzer 6x" });
});

// Endpoint: Warning (LED Pin 14 selama 30 menit)
app.get('/warning', (req, res) => {
    client.publish('mappi32/api/perintah', 'WARNING_ON');
    res.json({ status: "success", message: "Warning command sent: LED 14 for 30m" });
});

// Endpoint: Reset (Instruksi ke Mappi untuk bersihkan status)
app.get('/reset', (req, res) => {
    client.publish('mappi32/api/perintah', 'RESET');
    res.json({ status: "success", message: "Reset command sent" });
});

app.listen(3000, () => console.log('Server API jalan di port 3000'));
// Export untuk Vercel
module.exports = app;

// Jalankan lokal untuk tes: node index.js (uncomment line bawah)
