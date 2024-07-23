import { Component, ElementRef, ViewChild } from '@angular/core';
import { LngLat, Map } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

@Component({
  selector: 'app-zoom-range-page',
  templateUrl: './zoom-range-page.component.html',
  styleUrl: './zoom-range-page.component.css'
})
export class ZoomRangePageComponent {
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

    this.mapListeners();
  }

  ngOnDestroy():void {
    this.map?.remove();
  }

  mapListeners () {
    if (!this.map) throw 'Mapa no inicializado';

    this.map.on('zoom', (ev) => {
      this.zoom = this.map!.getZoom();
    });

    this.map.on('zoomend', (ev) => {
      if (this.map!.getZoom() < 18) return;

      this.map?.zoomTo(18);
    });

    this.map.on('move', (ev) => {
      this.currentLnglat = this.map!.getCenter();
      const { lng, lat } = this.currentLnglat; // Referencia de como tomar la latitud y longitud de este listener mediante la desestructuración
    })
  }

  zoomIn() {
    this.map?.zoomIn();
  }

  zoomOut() {
    this.map?.zoomOut();
  }

  zoomChange(value: string) {
    this.zoom = Number(value);
    this.map?.zoomTo(this.zoom);
  }
}
