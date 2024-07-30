import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapsRoutingModule } from './maps-routing.module';
import { MinimapComponent } from './components/mini-map/mini-map.component';
import { MapsLayoutComponent } from './layout/maps-layout/maps-layout.component';
import { FullScreenPageComponent } from './pages/full-screen-page/full-screen-page.component';
import { MarkerPageComponent } from './pages/marker-page/marker-page.component';
import { PropertiesPageComponent } from './pages/properties-page/properties-page.component';
import { ZoomRangePageComponent } from './pages/zoom-range-page/zoom-range-page.component';
import { CounterAloneComponent } from "../alone/components/counter-alone/counter-alone.component";
import { SideMenuComponent } from '../alone/components/side-menu/side-menu.component';


@NgModule({
  declarations: [
    MinimapComponent,
    MapsLayoutComponent,
    FullScreenPageComponent,
    MarkerPageComponent,
    PropertiesPageComponent,
    ZoomRangePageComponent
  ],
  imports: [
    CommonModule,
    MapsRoutingModule,
    SideMenuComponent,
    CounterAloneComponent
]
})
export class MapsModule { }
