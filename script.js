document.getElementById('matchForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Förhindrar att sidan laddas om

    const resultat = document.getElementById('resultat').value;
    const bollinnehav = document.getElementById('bollinnehav').value;
    const xg = document.getElementById('xg').value;
    const resultatError = document.getElementById('resultatError');

    // Validera resultatformatet
    const resultatRegex = /^\d+-\d+$/; // Regex för formatet "siffra-siffra"
    if (!resultatRegex.test(resultat)) {
        resultatError.textContent = 'Felaktigt format. Använd formatet "siffra-siffra".';
        return; // Avbryt formulärskickning
    } else {
        resultatError.textContent = ''; // Rensa eventuellt tidigare felmeddelande
    }

    const matchData = {
        resultat: resultat,
        bollinnehav: bollinnehav,
        xg: xg
    };

    try {
        const response = await fetch('http://localhost:3000/match', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(matchData)
        });

        const responseMessage = document.getElementById('responseMessage'); // Hämta elementet för att visa meddelande

        if (response.ok) {
            responseMessage.textContent = 'Matchdata skickad!'; // Visa meddelande på sidan
            responseMessage.style.color = 'green'; // Gör texten grön
        } else {
            const errorText = await response.text(); // Läs felmeddelandet från servern
            responseMessage.textContent = `Något gick fel: ${response.status} - ${errorText}`;
            responseMessage.style.color = 'red'; // Gör texten röd
        }
    } catch (error) {
        console.error('Fel vid kommunikation med servern:', error);
        document.getElementById('responseMessage').textContent = 'Fel vid kommunikation med servern.';
        document.getElementById('responseMessage').style.color = 'red'; // Gör texten röd
    }
});
