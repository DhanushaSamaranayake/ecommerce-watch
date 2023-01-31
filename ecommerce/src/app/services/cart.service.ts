import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem } from '../shared/model/cartitems';
import { Cart } from '../shared/model/carts';
import { Watch } from '../shared/model/watch';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Cart = this.getCartFromLocalStorage();
  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart);
  constructor() { }

  addToCart(watch: Watch): void {
    let cartItem = this.cart.items
      .find(item => item.watch.id === watch.id);
    if (cartItem)
      return;

    this.cart.items.push(new CartItem(watch));
    this.setCartToLocalStorage();
  }

  removeFromCart(watchId: string): void {
    this.cart.items = this.cart.items
      .filter(item => item.watch.id != watchId);
    this.setCartToLocalStorage();
  }

  changeQuantity(watchId: string, quantity: number) {
    let cartItem = this.cart.items
      .find(item => item.watch.id === watchId);
    if (!cartItem) return;

    cartItem.quantity = quantity;
    cartItem.price = quantity * cartItem.watch.price;
    this.setCartToLocalStorage();
  }

  clearCart() {
    this.cart = new Cart();
    this.setCartToLocalStorage();
  }

  getCartObservable(): Observable<Cart> {
    return this.cartSubject.asObservable();
  }

  getCart(): Cart{
    return this.cartSubject.value;
  }

  private setCartToLocalStorage(): void {
    this.cart.totalPrice = this.cart.items
      .reduce((prevSum, currentItem) => prevSum + currentItem.price, 0);
    this.cart.totalQuantity = this.cart.items
      .reduce((prevSum, currentItem) => prevSum + currentItem.quantity, 0);

    const cartJson = JSON.stringify(this.cart);
    localStorage.setItem('Cart', cartJson);
    this.cartSubject.next(this.cart);
  }

  private getCartFromLocalStorage(): Cart {
    const cartJson = localStorage.getItem('Cart');
    return cartJson ? JSON.parse(cartJson) : new Cart();
  }
}
