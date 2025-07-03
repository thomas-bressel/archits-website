import { Component, inject, computed } from '@angular/core';
import { Overlay } from '../../../components/overlay/overlay';
import { Interface } from '../../../shared/services/interface';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'main[app-documentation]',
  imports: [Overlay, CommonModule],
  host: { 
    'class':'main'
  },
  templateUrl: './documentation.html',
  styleUrl: './documentation.scss'
})
export class Documentation {

public readonly interfaceService = inject(Interface);
overlayDatas = computed(() => {
  const docPage = this.interfaceService.getPageById('documentation');
  return docPage?.overlay || [];
});

// Computed for Bloc
blocsData = computed(() => {
  const docPage = this.interfaceService.getPageById('documentation');
  return docPage?.blocs || [];
});

}
