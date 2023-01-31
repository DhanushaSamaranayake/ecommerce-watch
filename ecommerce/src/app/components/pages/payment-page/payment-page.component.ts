import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/shared/model/order';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css']
})
export class PaymentPageComponent implements OnInit {

  order:Order = new Order();

  constructor(orderServ:OrderService,router:Router) {
    orderServ.getnewOrderForCurrentUser().subscribe({
      next:(order) => {
        this.order = order;
      },
      error:()=>{
        router.navigateByUrl('/checkout');

      }
    })
   }

  ngOnInit(): void {
  }

}
