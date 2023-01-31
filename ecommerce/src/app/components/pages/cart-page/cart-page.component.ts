import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/shared/model/cartitems';
import { Cart } from 'src/app/shared/model/carts';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
cart! : Cart;
  constructor(private cartService:CartService) {
    this.cartService.getCartObservable().subscribe((cart)=>{
      this.cart = cart;
    })
   }

  ngOnInit(): void {
  }

  removeFromCart(cartItem:CartItem){
    this.cartService.removeFromCart(cartItem.watch.id);
  }

  changeQuantity(cartItem:CartItem,quantityString:string){
    const quantity = parseInt(quantityString);
    this.cartService.changeQuantity(cartItem.watch.id,quantity);
  }


}
