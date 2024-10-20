const express = require('express');
const cors = require('cors'); // Importera CORS
const app = express();
const port = 3000;

app.use(cors()); // Lägg till denna rad för att aktivera CORS
app.use(express.json());

app.post('/match', (req, res) => {
    const { resultat, bollinnehav, xg } = req.body;
    console.log(`Matchdata mottagen: Resultat: ${resultat}, Bollinnehav: ${bollinnehav}, xG: ${xg}`);
    res.send('Matchdata mottagen!');
});

app.listen(port, () => {
    console.log(`Servern körs på http://localhost:${port}`);
});