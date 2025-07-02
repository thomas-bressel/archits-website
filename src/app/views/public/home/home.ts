import { Component, inject, computed, signal } from '@angular/core';
import { Button } from '../../../components/ui/button/button';
import { Console } from '../../../components/console/console';
import { Card } from '../../../components/card/card';
import { Terminal } from '../../../components/terminal/terminal';
import { Interface } from '../../../shared/services/interface';

@Component({
  selector: 'app-home',
  imports: [Button, Console, Card, Terminal],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

  public readonly interfaceService = inject(Interface);

  homePageData = computed(() => {
    return this.interfaceService.getPageById('home');
  });



}
