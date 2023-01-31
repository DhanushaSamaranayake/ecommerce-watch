import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';
import { Order } from 'src/app/shared/model/order';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent implements OnInit {
  order: Order = new Order();
  checkoutForm!: FormGroup;

  constructor(cartserv:CartService,private formbuilder:FormBuilder,private userserv:UserService,
    private toastserv:ToastrService,private orderserv:OrderService,private router:Router
    ) {
    const cart = cartserv.getCart();
    this.order.items = cart.items;
    this.order.totalPrice = cart.totalPrice;
   }

  ngOnInit(): void {
    let {name,address} = this.userserv.currentUser;
    this.checkoutForm = this.formbuilder.group({
      name:[name,Validators.required],
      address:[address,Validators.required]
    });
  }

  get formcontrols(){
    return this.checkoutForm.controls;
  }

  createOrder(){
    if(this.checkoutForm.invalid){
      this.toastserv.warning('Please fill the inputs', 'Invalid Inputs');
      return;
    }

    if(!this.order.addressLatLng){
      this.toastserv.warning('Please select your location on the map', 'Location');
      return;
    }

    this.order.name = this.formcontrols.name.value;
    this.order.address = this.formcontrols.address.value;

    this.orderserv.create(this.order).subscribe({
      next:() => {
        this.router.navigateByUrl('/payment');
      },
      error:(errorResponse) => {
        this.toastserv.error(errorResponse.error, 'Cart');
      }
    })
  }

}
