import { Component } from '@angular/core';
import { MenuItem } from './interfaces/menu.interface';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [RouterModule, CommonModule],
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {
  menuItems: MenuItem[] = [
    {route: '/maps/fullScreen', name: 'Fullscreen'},
    {route: '/maps/zoom-range', name: 'ZoomRange'},
    {route: '/maps/markers', name: 'Markers'},
    {route: '/maps/properties', name: 'Houses'},
    {route: '/alone', name: 'Alone Page'},
  ]
}
