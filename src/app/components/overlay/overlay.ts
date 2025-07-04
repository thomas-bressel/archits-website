import { Component, input, signal, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Overlay as OverlayModel } from '../../shared/models/interface.models';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'aside[app-overlay]',
  imports: [RouterLink, CommonModule],
  host : {
    'class':'overlay'
  },
  templateUrl: './overlay.html',
  styleUrl: './overlay.scss'
})
export class Overlay {
  overlayToggled = output<boolean>();
  interfaceService = input<OverlayModel[] | undefined>();

  isOverlayOpen = signal(false);

  public toggleOverlay(event: MouseEvent) {
    this.isOverlayOpen.set(!this.isOverlayOpen());
    this.overlayToggled.emit(this.isOverlayOpen());
  }



}
