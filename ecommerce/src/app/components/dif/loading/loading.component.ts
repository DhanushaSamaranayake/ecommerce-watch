import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  Loading! : boolean;

  constructor(loadingserv:LoadingService) {
    loadingserv.Loading.subscribe((Loading) => {
      this.Loading = Loading;
    });

    //loadingserv.showLoading();
   }

  ngOnInit(): void {
  }

}
