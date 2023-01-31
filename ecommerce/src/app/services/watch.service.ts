import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WATCHES, watch_tags } from 'src/data';
import { WATCHES_ID_URL, WATCHES_TAGS_SEARCH_URL, WATCHES_URL } from '../shared/constants/urls';
import { Tags } from '../shared/model/tag';
import { Watch } from '../shared/model/watch';

@Injectable({
  providedIn: 'root'
})
export class WatchService {

  constructor(private http:HttpClient) { }

  getWatches() : Observable<Watch[]>{
    return this.http.get<Watch[]>( WATCHES_URL);
  }

  //search by id
  getWatchesAllBySearch(search:string){
    return this.http.get<Watch[]>(`${WATCHES_URL}/search/${search}`);
  }
  //tags
  getTags(): Observable< Tags[]> {
    return this.http.get<Tags[]>(`${WATCHES_URL}/tags`);
  }

  getWatchesByTag(tag:string): Observable <Watch[]>{
    return tag === "ALL"? this.getWatches() :
   this.http.get<Watch[]>(WATCHES_TAGS_SEARCH_URL +tag);
  }

  getWatchById(watchId:string): Observable <Watch>{
   return this.http.get<Watch>(WATCHES_ID_URL + watchId);;
  }

}
