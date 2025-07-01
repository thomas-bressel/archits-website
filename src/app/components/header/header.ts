import { Component, inject } from '@angular/core';
import { Button } from '../ui/button/button';
import { RouterLink } from '@angular/router';
import { Interface } from '../../shared/services/interface';

@Component({
  selector: 'header[app-header]',
  imports: [Button, RouterLink],
  host: {
    'class': 'header'
  },
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {

  interfaceService = inject(Interface);



  
}


