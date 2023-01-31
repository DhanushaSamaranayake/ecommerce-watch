import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { WatchService } from 'src/app/services/watch.service';
import { Watch } from 'src/app/shared/model/watch';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  watches  : Watch[] = [];

  constructor(private watchService:WatchService, activated:ActivatedRoute) {
    let watchObservable = Observable<Watch[]>;

    let watchsObservalbe:Observable<Watch[]>;
    activated.params.subscribe((params) => {
      if (params.searchTerm)
      watchsObservalbe = this.watchService.getWatchesAllBySearch(params.searchTerm);
      else if (params.tag)
      watchsObservalbe = this.watchService.getWatchesByTag(params.tag);
      else
      watchsObservalbe = watchService.getWatches();

      watchsObservalbe.subscribe((serverWatchs) => {
          this.watches = serverWatchs;
        })
    })
  }

  ngOnInit(): void {
  }

}


