import { Ibeer } from "./ibeer"


export class Beer implements Ibeer {

  constructor(
  public id: number,
  public nome: string,
  public slogan: string,
  public first_brewed: string,
  public descrizione: string,
  public url_immagine: string,
  public abv: number,
  public ibu: number,
  public target_fg: number,
  public target_og: number,
  public ebc: number,
  public srm: number,
  public ph: number,
  public livello_attenuazione: number,
  public volume: {
    valore: number,
    unità: string,
    tipologia: string
  },
  public volume_bollire: {
    valore: number,
    unità: string
  },
  public metodo: {
    mash_temp: [
      {
        " temp": {
          "valore": number,
          "unità": string
        },
        " durata ": number
      }
    ],
    " fermentazione ": {
      " temp ": {
        " valore ": number,
        " unità ": string
      },
      " torsione ": string
    },
    " ingredienti ": {
      " malto ": [
        {
          " nome ": string,
          " quantità ": {
            " valore ": number,
            " unità ": string
          }
        },
        {
          " nome ": string,
          " quantità ": {
            " valore ": number,
            " unità ": string
          }
        },
        {
          " nome ": string,
          " quantità ": {
            " valore ": number,
            " unità ": string
          }
        }
      ],
      " luppolo ": [
        {
          " nome ": string,
          " quantità ": {
            " valore ": number,
            " unità ": string
          },
          " aggiungi ": string,
          " attributo ": string
        },
        {
          " nome ": string,
          " quantità ": {
            " valore ": number,
            " unità ": string
          },
          " aggiungi ": string,
          " attributo ": string
        },
        {
          " nome ": string,
          " quantità ": {
            " valore ": number,
            " unità ": string
          },
          " aggiungi ": string,
          " attributo ": string
        },
        {
          " nome ": string,
          " quantità ": {
            " valore ": number,
            " unità ": string
          },
          " aggiungi ": string,
          " attributo ": string
        },
        {
          " nome ": string,
          " quantità ": {
            " valore ": number,
            " unità ": string
          },
          " aggiungi ": string,
          " attributo ": string
        }
      ],
      " lievito ": string
    },

    " abbinamento_cibo ": string[],
    " brewers_tips ": string,
    " contribuito_da ": string
  }
  ){}
}
