import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';


@Component({
  selector: 'map-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrl: './mini-map.component.css'
})
export class MinimapComponent implements AfterViewInit {
  @ViewChild('map') divMap?: ElementRef;
  @Input() lngLat?: [number, number];

  zoom: number = 2;
  map?: Map;

  ngAfterViewInit(): void {
    if (!this.divMap) throw 'Elemento HTML no encontrado';
    if (!this.lngLat) throw 'No hay coordenadas';

    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );

    this.map = new Map({
      container: this.divMap.nativeElement, //NOTA: la idea es quitar el id="map" del div pero sion el no funciona
      style: 'https://demotiles.maplibre.org/style.json', // stylesheet location
      center: this.lngLat, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
      interactive: false
    });

    new Marker({
      color: color,
      draggable: true,
    })
      .setLngLat(this.lngLat)
      .addTo(this.map);
  }
}
