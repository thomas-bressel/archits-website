import { Component, inject, signal } from '@angular/core';
import { Button } from '../ui/button/button';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { Interface } from '../../shared/services/interface';
import { SelectField } from '../ui/select-field/select-field';

@Component({
  selector: 'header[app-header]',
  imports: [Button, SelectField, RouterLink],
  host: {
    'class': 'header'
  },
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {

  interfaceService = inject(Interface);
  isMenuOpen = signal(false);
  currentRoute = signal('');



  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute.set(event.url);
      }
    });
  }

  /**
   * Toggle burger menu
   */
  public toggleBurger() {
    this.isMenuOpen.set(!this.isMenuOpen());
  }


  public closeMenu() {
    this.isMenuOpen.set(false);
  }

  /**
   * Listen to change language
   * @param languageValue 
   */
  public onLanguageChange(languageValue: string) {
    this.interfaceService.setLanguage(languageValue);
  }

}


