import { Component, Input } from '@angular/core';
import { SideMenuComponent } from "../side-menu/side-menu.component";

@Component({
  selector: 'counter-alone',
  standalone: true,
  imports: [SideMenuComponent],
  templateUrl: './counter-alone.component.html',
  styleUrl: './counter-alone.component.css'
})
export class CounterAloneComponent {
  @Input()
  counter: number = 10;
}
