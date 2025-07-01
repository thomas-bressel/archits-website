import { Injectable, signal } from '@angular/core';
import { ButtonsList } from '../../shared/models/button.models';

@Injectable({
  providedIn: 'root'
})
export class Interface {

  public readonly buttonsList = signal<ButtonsList[]>(
    [
      {
        icon: 'github.svg',
        iconColor: 'grey',
        text: 'GitHub'
      },
      {
        icon: 'forum.svg',
        iconColor: 'grey',
        text: 'Discussions'
      },
      {
        icon: 'earth.svg',
        iconColor: 'grey',
        text: 'Français'
      }
    ]
  )

  constructor() { }
}
