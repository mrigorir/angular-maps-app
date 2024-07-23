import { Component, ElementRef, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

@Component({
  selector: 'app-marker-page',
  templateUrl: './marker-page.component.html',
  styleUrl: './marker-page.component.css',
})
export class MarkerPageComponent {
  @ViewChild('map') divMap?: ElementRef;

  zoom: number = 10;
  map?: Map;
  currentLnglat: LngLat = new LngLat(-74.5, 40);

  ngAfterViewInit(): void {
    if (!this.divMap) throw 'Elemento HTML no encontrado';
    console.log(this.divMap.nativeElement);
    this.map = new Map({
      container: this.divMap.nativeElement, //NOTA: la idea es quitar el id="map" del div pero sion el no funciona
      style: 'https://demotiles.maplibre.org/style.json', // stylesheet location
      center: this.currentLnglat, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    });

    const marker = new Marker().setLngLat(this.currentLnglat).addTo(this.map);
  }
}
