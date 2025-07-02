import { Component, input, effect } from '@angular/core';
import { CardContent } from '../../shared/models/interface.models';
@Component({
  selector: 'div[app-card]',
  imports: [],
  host: {
    'class':'card',
    '[id]': 'cardContent()?.id'
  },
  templateUrl: './card.html',
  styleUrl: './card.scss'
})
export class Card {

public readonly cardContent = input<CardContent>();

constructor() {}

}