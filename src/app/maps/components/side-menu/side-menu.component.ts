import { Component } from '@angular/core';
import { MenuItem } from './interfaces/menu.interface';


@Component({
  selector: 'maps-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {
  menuItems: MenuItem[] = [
    {route: '/maps/fullScreen', name: 'Fullscreen'},
    {route: '/maps/zoom-range', name: 'ZommRange'},
    {route: '/maps/markers', name: 'Markers'},
    {route: '/maps/properties', name: 'Houses'},
  ]
}
