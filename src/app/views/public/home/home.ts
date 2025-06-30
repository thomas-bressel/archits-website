import { Component } from '@angular/core';
import { Button } from '../../../components/ui/button/button';
import { Console } from '../../../components/console/console';
import { Card } from '../../../components/card/card';
import { Terminal } from '../../../components/terminal/terminal';

@Component({
  selector: 'app-home',
  imports: [Button, Console, Card, Terminal],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

}
