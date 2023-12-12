const fs = require('fs');

// Carica il modello di traduzione dall'esempio
const traduzioneModello = require('./beerita.json'); // Assicurati di avere il nome del file corretto

// Leggi il file contenente le 300 birre nel secondo formato
fs.readFile('beer.json', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    // Converti il contenuto in un array di oggetti JavaScript
    const birreInglese = JSON.parse(data);

    // Traduci e aggiorna tutte le birre nel formato italiano usando il modello
    const birreItaliano = birreInglese.map(birraInglese => {
        return {
            id: birraInglese.id,
            nome: birraInglese.name,
            slogan: birraInglese.tagline,
            prima_produzione: birraInglese.first_brewed,
            descrizione: birraInglese.description,
            url_immagine: birraInglese.image_url,
            abv: birraInglese.abv,
            ibu: birraInglese.ibu,
            target_fg: birraInglese.target_fg,
            target_og: birraInglese.target_og,
            ebc: birraInglese.ebc,
            srm: birraInglese.srm,
            ph: birraInglese.ph,
            livello_attenuazione: birraInglese.livello_attenuazione,
            volume: {
                valore: birraInglese.volume.value,
                unità: birraInglese.volume.unit,
                tipologia: birraInglese.volume.tipologia
            },
            volume_bollire: {
                valore: birraInglese.boil_volume.value,
                unità: birraInglese.boil_volume.unit
            },
            metodo: {
                mash_temp: birraInglese.method.mash_temp.map(temp => {
                    return {
                        temp: {
                            valore: temp.temp.value,
                            unità: temp.temp.unit
                        },
                        durata: temp.duration
                    };
                }),
                fermentazione: {
                    temp: {
                        valore: birraInglese.method.fermentation.temp.value,
                        unità: birraInglese.method.fermentation.temp.unit
                    }
                },
                torsione: birraInglese.method.twist
            },
            ingredienti: {
                malto: birraInglese.ingredients.malt.map(malto => {
                    return {
                        nome: malto.name,
                        quantità: {
                            valore: malto.amount.value,
                            unità: malto.amount.unit
                        }
                    };
                }),
                luppolo: birraInglese.ingredients.hops.map(luppolo => {
                    return {
                        nome: luppolo.name,
                        quantità: {
                            valore: luppolo.amount.value,
                            unità: luppolo.amount.unit
                        },
                        aggiungi: luppolo.add,
                        attributo: luppolo.attribute
                    };
                }),
                lievito: birraInglese.ingredients.yeast
            },
            abbinamento_cibo: birraInglese.food_pairing,
            brewers_tips: birraInglese.brewers_tips,
            contribuito_da: birraInglese.contributed_by,
            prezzo: birraInglese.price // Se necessario
        };
    });

    // Ora birreItaliano contiene tutte le birre tradotte
    console.log(birreItaliano); // Qui puoi vedere l'array completo delle birre tradotte

    // Salva le birre tradotte in un nuovo file JSON
    fs.writeFile('birre_italiano.json', JSON.stringify(birreItaliano, null, 2), 'utf8', err => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Le birre sono state tradotte con successo e salvate in "birre_italiano.json"!');
    });
});
