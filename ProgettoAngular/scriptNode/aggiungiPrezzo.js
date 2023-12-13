const jsonfile = require('jsonfile');

const dbFile = 'beer.json';

jsonfile.readFile(dbFile, (err, data) => {
  if (err) {
    console.error('Errore nella lettura del file:', err);
    return;
  }

  const updatedData = data.beer.map(beer => ({
    ...beer,
    price: parseFloat((Math.random() * (10 - 4) + 4).toFixed(2))
  }));

  data.beers = updatedData;

  jsonfile.writeFile(dbFile, data, { spaces: 2 }, err => {
    if (err) {
      console.error('Errore nella scrittura del file:', err);
    } else {
      console.log('Campo "price" aggiunto con successo a tutte le birre!');
    }
  });
});
