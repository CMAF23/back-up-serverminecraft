const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

let startTime = Date.now();

app.get('/status', (req, res) => {
    res.json({ running: true, uptime: (Date.now() - startTime) / 1000 });
});

app.get('/start', (req, res) => {
    // Asegúrate de que esta ruta a tu start.sh sea correcta
    exec('cd ~/minecraft && ./start.sh', (err, stdout, stderr) => {
        if (err) console.log("Error al arrancar:", err);
    });
    res.json({ message: "Servidor arrancando..." });
});

app.post('/command', (req, res) => {
    console.log("Comando recibido: " + req.body.command);
    res.json({ message: "Comando enviado" });
});

app.listen(port, () => {
    console.log(`API Samanuel Hub corriendo en http://localhost:${port}`);
});
