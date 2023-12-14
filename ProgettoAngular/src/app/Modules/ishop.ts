import { Ibeer } from "./ibeer";

export interface IShop {
  id?: number;
  beerId: number;
  userId?:number|undefined
  nameBeer: string;
  numberBeer: number;
  beer?: Ibeer;
  price: number;
  img: string;
  totalPrice: number;
}
