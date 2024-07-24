import { Component, ElementRef, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { PlainMarker } from './interfaces/markers.interface';
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
    this.map = new Map({
      container: this.divMap.nativeElement, //NOTA: la idea es quitar el id="map" del div pero sion el no funciona
      style: 'https://demotiles.maplibre.org/style.json', // stylesheet location
      center: this.currentLnglat, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    });

    this.readFromLocalStorage();
  }

  createMarker(): void {
    if (!this.map) return;

    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );
    const lngLat = this.map?.getCenter();

    this.addMarker(lngLat, color);
  }

  addMarker(LngLat: LngLat, color: string): void {
    if (!this.map) return;

    const marker = new Marker({
      color: color,
      draggable: true,
    })
      .setLngLat(LngLat)
      .addTo(this.map);
    marker.on('dragend', (ev) => {
      this.saveToLocalStorage();
    });
    this.markers.push(marker);
    this.saveToLocalStorage();
  }

  flyTo(marker: Marker): void {
    this.map?.flyTo({
      zoom: 5,
      center: marker.getLngLat(),
    });
  }

  deleteMarker(pos: number): void {
    this.markers[pos].remove();
    this.markers.splice(pos, 1);
    this.saveToLocalStorage();
  }

  saveToLocalStorage() {
    const plainMarkers: PlainMarker[] = this.markers.map((marker) => {
      return {
        color: marker._color,
        lngLat: marker.getLngLat().toArray(),
      };
    });
    localStorage.setItem('plainMarkers', JSON.stringify(plainMarkers));
  }

  readFromLocalStorage() {
    if (!localStorage.getItem('plainMarkers')) return;

    const plainMarkers = JSON.parse(localStorage.getItem('plainMarkers')!);

    plainMarkers.map((marker: PlainMarker) => {
      const [lng, lat] = marker.lngLat; // --> marker.lngLat[0], marker.lngLat[1]
      const coords = new LngLat(lng, lat);

      this.addMarker(coords, marker.color);
    });
  }
}
