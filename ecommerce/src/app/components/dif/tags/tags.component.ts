import { Component, OnInit } from '@angular/core';
import { WatchService } from 'src/app/services/watch.service';
import { Tags } from 'src/app/shared/model/tag';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
tags?:Tags[];
  constructor(watchservice:WatchService) {
    watchservice.getTags().subscribe(serverTags => {
      this.tags = serverTags;
    });
   }

  ngOnInit(): void {
  }



}
