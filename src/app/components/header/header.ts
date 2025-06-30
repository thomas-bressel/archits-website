import { Component } from '@angular/core';
import { Button } from '../ui/button/button';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'header[app-header]',
  imports: [Button, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {

}
