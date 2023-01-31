import { Component, ElementRef, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { icon, latLng, LatLng, LatLngExpression, LatLngTuple, LeafletMouseEvent, map, Map, marker, Marker, tileLayer } from 'leaflet';
import { LocationService } from 'src/app/services/location.service';
import { Order } from 'src/app/shared/model/order';

@Component({
  selector: 'map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnChanges {
  @Input()
  order!:Order;

  @Input()
  readonly = false;

  private readonly MARKER_ZOOM_LEVEL = 18;
  private readonly MARKER_ICON = icon({
    iconUrl:
      'https://res.cloudinary.com/foodmine/image/upload/v1638842791/map/marker_kbua9q.png',
    iconSize: [42, 42],
    iconAnchor: [21, 42],
  });
  private readonly DEFAULT_LATITUDE:LatLngTuple = [51.505, -0.09];

  @ViewChild('map', { static: true })
  mapref!: ElementRef;

  map!:Map;
  currentMarker!:Marker;
  constructor(private locationserv:LocationService ) { }

  ngOnChanges(): void {
    if(!this.order)return;
    this.initializeMap();

    if(this.readonly && this.addressLatLng){
      this.showLocationOnReadOnlyMode();
    }
  }
  showLocationOnReadOnlyMode() {
    const m = this.map;
    this.setMarker(this.addressLatLng);
    m.setView(this.addressLatLng, this.MARKER_ZOOM_LEVEL);

    m.dragging.disable();
    m.touchZoom.disable();
    m.doubleClickZoom.disable();
    m.scrollWheelZoom.disable();
    m.boxZoom.disable();
    m.keyboard.disable();
    m.off('click');
    m.tap?.disable();
    this.currentMarker.dragging?.disable();
  }

  initializeMap(){
    if(this.map) return;

    this.map = map(this.mapref.nativeElement,{
      attributionControl: false,
    }).setView(this.DEFAULT_LATITUDE, 1);

    tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map);


    this.map.on('click', (e:LeafletMouseEvent) => {
      this.setMarker(e.latlng);
    })
  }
  findMyLocation(){
    this.locationserv.getCurrentLocation().subscribe({
      next:(position)=>{
        this.map.setView(position, this.MARKER_ZOOM_LEVEL)
        //console.log(position);
        this.setMarker(position);
      }
    })
  }

  setMarker(latlng:LatLngExpression){
    this.addressLatLng = latlng as LatLng;
    if(this.currentMarker){
      this.currentMarker.setLatLng(latlng);
      return;
    }

    this.currentMarker = marker(latlng,{
      draggable:true,
      icon:this.MARKER_ICON

    }).addTo(this.map);

    this.currentMarker.on('dragend',() => {
      this.addressLatLng = this.currentMarker.getLatLng();

    })
  }


  set addressLatLng(latlng:LatLng){
    if(!latlng.lat.toFixed)return;
    latlng.lat = parseFloat(latlng.lat.toFixed(8));
    latlng.lng = parseFloat(latlng.lng.toFixed(8));
    this.order.addressLatLng = latlng;
    console.log(this.order.addressLatLng);
  }

  get addressLatLng(){
    return this.order.addressLatLng!;
  }

}
