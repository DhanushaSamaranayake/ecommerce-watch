import { Watch } from "./watch";

export class CartItem{

  constructor(public watch:Watch){}

  quantity:number = 1;
  price:number = this.watch.price;
}
