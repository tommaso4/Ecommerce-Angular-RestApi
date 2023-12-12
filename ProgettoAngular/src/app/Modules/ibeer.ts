export interface Ibeer {
  "id": number,
  "nome": string,
  "slogan": string,
  "first_brewed": string
  "descrizione": string,
  "url_immagine": string,
  "abv": number,
  "ibu": number,
  "target_fg": number,
  "target_og": number,
  "ebc": number,
  "srm": number,
  "ph": number,
  "livello_attenuazione": number,
  "volume": {
    "valore": number,
    "unità": string,
    "tipologia": string
  },
  "volume_bollire": {
    "valore": number,
    "unità": string
  },
  "metodo": {
    "mash_temp": [
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
}
