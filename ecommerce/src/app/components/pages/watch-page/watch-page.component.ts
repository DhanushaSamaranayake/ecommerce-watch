import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { WatchService } from 'src/app/services/watch.service';
import { Watch } from 'src/app/shared/model/watch';

@Component({
  selector: 'app-watch-page',
  templateUrl: './watch-page.component.html',
  styleUrls: ['./watch-page.component.css']
})
export class WatchPageComponent implements OnInit {
  watch! : Watch;

  constructor(activate:ActivatedRoute, watchService:WatchService,private cartService:CartService,private router:Router) {
    activate.params.subscribe((params)=>{
      if(params.id){
      watchService.getWatchById(params.id).subscribe(serverWatch => {
        this.watch = serverWatch;
      });
      }
    })
   }

  ngOnInit(): void {
  }

  addToCart(){
    this.cartService.addToCart(this.watch);
    this.router.navigateByUrl('/cart-page');

  }

}
