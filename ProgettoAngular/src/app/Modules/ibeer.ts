export interface Ibeer {
  id: number;
  nome: string;
  slogan: string;
  primaProduzione: string;
  descrizione: string;
  urlImmagine: string;
  abv: number;
  ibu: number;
  targetFg?: number;
  targetOg?: number;
  ebc: number;
  srm: number;
  ph?: number;
  livelloAttenuazione?: number;
  volume?: {
    valore: number;
    unità: string;
    tipologia: string;
  };
  volumeBollire: {
    valore: number;
    unità: string;
  };
  metodo: {
    mashTemp: [
      {
        temp: {
          valore: number;
          unità: string;
        };
        durata: number;
      }
    ];
    fermentazione: {
      temp: {
        valore: number;
        unità: string;
      };
      torsione: string;
    };
  };
  ingredienti: {
    malto: [
      {
        nome: string;
        quantità: {
          valore: number;
          unità: string;
        };
      }
    ];
    luppolo: [
      {
        nome: string;
        quantità: {
          valore: number;
          unità: string;
        };
        aggiungi: string;
        attributo: string;
      }
    ];
    lievito: string;
  };
  abbinamentoCibo?: string[];
  brewersTips?: string;
  contribuitoDa?: string;
  prezzo: number;
}
