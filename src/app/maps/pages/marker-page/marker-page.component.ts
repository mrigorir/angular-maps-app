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

  zoom: number = 2;
  map?: Map;
  currentLnglat: LngLat = new LngLat(-74.5, 40);
  markers: Marker[] = [];

  ngAfterViewInit(): void {
    if (!this.divMap) throw 'Elemento HTML no encontrado';
    console.log(this.divMap.nativeElement);
    this.map = new Map({
      container: this.divMap.nativeElement, //NOTA: la idea es quitar el id="map" del div pero sion el no funciona
      style: 'https://demotiles.maplibre.org/style.json', // stylesheet location
      center: this.currentLnglat, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    });
  }

  createMarker(): void {
    if (!this.map) return;

    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );
    const lngLat = this.map?.getCenter();

    this.addMarker(lngLat, color);
  }

  addMarker(LngLat: LngLat, color: string):void {
    if (!this.map) return;

    const marker = new Marker({
      color: color,
      draggable: true,
    })
      .setLngLat(LngLat)
      .addTo(this.map);

    this.markers.push(marker);
  }

  flyTo(marker: Marker): void {
    this.map?.flyTo({
      zoom: 5,
      center: marker.getLngLat()
    });
  }

  deleteMarker(pos: number): void {
    this.markers[pos].remove();
    this.markers.splice(pos, 1);
  }
}
