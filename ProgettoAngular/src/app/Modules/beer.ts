import { Ibeer } from "./ibeer";

export class Beer implements Ibeer {
  constructor(
    public id: number,
    public nome: string,
    public slogan: string,
    public primaProduzione: string, // Rinominato per corrispondere all'interfaccia
    public descrizione: string,
    public url_immagine: string, // Nomina le proprietà in stile camelCase per la convenzione di TypeScript
    public abv: number,
    public ibu: number,
    public targetFg: number, // Nomina le proprietà in stile camelCase
    public targetOg: number, // Nomina le proprietà in stile camelCase
    public ebc: number,
    public srm: number,
    public ph: number,
    public livelloAttenuazione: number, // Nomina le proprietà in stile camelCase
    public volume: {
      valore: number,
      unità: string,
      tipologia: string
    },
    public volumeBollire: {
      valore: number,
      unità: string
    },
    public metodo: {
      mashTemp: [
        {
          temp: {
            valore: number,
            unità: string
          },
          durata: number
        }
      ],
      fermentazione: {
        temp: {
          valore: number,
          unità: string
        },
        torsione: string
      }
    },
    public ingredienti: {
      malto: [
        {
          nome: string,
          quantità: {
            valore: number,
            unità: string
          }
        },
      ],
      luppolo: [
        {
          nome: string,
          quantità: {
            valore: number,
            unità: string
          },
          aggiungi: string,
          attributo: string
        },

      ],
      lievito: string
    },
    public abbinamentoCibo: string[],
    public brewersTips: string,
    public contribuitoDa: string,
    public prezzo: number
  ) {}
}
