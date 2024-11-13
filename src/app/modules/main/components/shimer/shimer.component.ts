import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-shimer',
  templateUrl: './shimer.component.html',
  styleUrls: ['./shimer.component.css']
})
export class ShimerComponent {
  @Input() item:number=5;
}
