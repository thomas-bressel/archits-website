import { Component, inject } from '@angular/core';
import { Interface } from '../../shared/services/interface';
@Component({
  selector: 'footer[app-footer]',
  imports: [],
  host: {
    'class':'footer'
  },
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class Footer {
interfaceService = inject(Interface);




}
