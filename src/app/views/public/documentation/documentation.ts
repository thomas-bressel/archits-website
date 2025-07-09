import { Component, inject, computed, signal, OnInit } from '@angular/core';
import { Overlay } from '../../../components/overlay/overlay';
import { Interface } from '../../../shared/services/interface';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'main[app-documentation]',
  imports: [Overlay, CommonModule],
  host: {
    'class': 'main'
  },
  templateUrl: './documentation.html',
  styleUrl: './documentation.scss'
})
export class Documentation implements OnInit {

  isOverlayOpen = signal(false);



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

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        setTimeout(() => {
          const el = document.getElementById(fragment);
          if (el) {
            const yOffset = -200;
            const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
            window.scrollTo({ top: y, behavior: 'instant' });
          }
        }, 50); 
      }
    });
  }

  
  toggleOverlay(isOpen: boolean) {
    this.isOverlayOpen.set(isOpen);
  }
}
