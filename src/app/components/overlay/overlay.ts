import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Overlay as OverlayModel } from '../../shared/models/interface.models';
@Component({
  selector: 'aside[app-overlay]',
  imports: [RouterLink],
  host : {
    'class':'overlay'
  },
  templateUrl: './overlay.html',
  styleUrl: './overlay.scss'
})
export class Overlay {

  interfaceService = input<OverlayModel[] | undefined>();





}
