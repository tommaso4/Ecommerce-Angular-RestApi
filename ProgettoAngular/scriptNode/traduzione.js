const fs = require('fs');
const translate = require('google-translate-api');

// Leggi il file beer.json
fs.readFile('beer.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Errore nella lettura del file:', err);
    return;
  }

  try {
    const beers = JSON.parse(data);

    // Funzione per tradurre una singola birra
    const traduciBirra = async (birra) => {
      const campi = Object.keys(birra);
      for (const campo of campi) {
        if (typeof birra[campo] === 'string') {
          // Traduci solo le stringhe
          birra[campo] = (await translate(birra[campo], { to: 'it' })).text;
        } else if (typeof birra[campo] === 'object') {
          // Se è un oggetto (es. volume, metodo, ingredienti), traduci i valori delle sue proprietà
          const sottoCampi = Object.keys(birra[campo]);
          for (const subCampo of sottoCampi) {
            birra[campo][subCampo] = (await translate(birra[campo][subCampo], { to: 'it' })).text;
          }
        }
      }
      return birra;
    };

    // Traduci ogni birra nel file
    const birreTradotte = beers.map(async (birra) => {
      return await traduciBirra(birra);
    });

    Promise.all(birreTradotte).then((birreTradotteArray) => {
      // Sovrascrivi il file beer.json con le birre tradotte
      fs.writeFile('beer_tradotte.json', JSON.stringify(birreTradotteArray, null, 2), 'utf8', (err) => {
        if (err) {
          console.error('Errore nella scrittura del file:', err);
        } else {
          console.log('Traduzione completata con successo!');
        }
      });
    }).catch(err => {
      console.error('Errore nella traduzione:', err);
    });

  } catch (error) {
    console.error('Errore nel parsing del JSON:', error);
  }
});
