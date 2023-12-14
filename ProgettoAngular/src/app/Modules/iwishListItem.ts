import { Ibeer } from "./ibeer";

export type  IwishListItem = {
  shopId:number,
  userId:number,
  id:number,
  beerId:number,
  beer?:Ibeer;
}
