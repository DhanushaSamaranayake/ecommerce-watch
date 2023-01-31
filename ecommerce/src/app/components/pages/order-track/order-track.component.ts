import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/shared/model/order';

@Component({
  selector: 'app-order-track',
  templateUrl: './order-track.component.html',
  styleUrls: ['./order-track.component.css']
})
export class OrderTrackComponent implements OnInit {

  order!:Order;
  constructor(activateRoute:ActivatedRoute,orderserv:OrderService) {
    const params = activateRoute.snapshot.params;
    if(!params.orderId) return;

    orderserv.trackOrderById(params.orderId).subscribe(order =>{
      this.order = order;
    })
   }

  ngOnInit(): void {
  }

}
