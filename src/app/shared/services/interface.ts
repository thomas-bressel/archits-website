import { computed, Injectable, signal } from '@angular/core';
import { ButtonsList } from '../models/interface.models';

@Injectable({
  providedIn: 'root'
})
export class Interface {


  // Default language
  public readonly currentLanguage = signal('français');

  // Computed tu get the header top buttons
  public readonly buttonsList = computed<ButtonsList[]>(() => {
    const currentLang = this.interface().find(lang => lang.language === this.currentLanguage());
    return currentLang?.headerTop || [];
  });

  // Computed to get page from the current language
  public readonly currentPages = computed(() => {
    const currentLang = this.interface().find(lang => lang.language === this.currentLanguage());
    return currentLang?.pages || [];
  });

  // Methode to change of language
  public setLanguage(language: string) {
    this.currentLanguage.set(language);
  }


// Data interface
  public readonly interface = signal([
    {
      version: "1.0.0",
      language: "français",
      headerTop: [
        {
          icon: 'github.svg',
          iconColor: 'grey',
          text: 'GitHub',
          link: 'https://github.com/thomas-bressel/archi-ts-cli'
        },
        {
          icon: 'forum.svg',
          iconColor: 'grey',
          text: 'Discussions',
          link: 'https://github.com/thomas-bressel/archi-ts-cli/discussions'
        },
        {
          icon: 'earth.svg',
          iconColor: 'grey',
          text: 'Français',
          link: ''
        }
      ],
      pages: [
        {
          pageTitle: 'accueil'
        },
        {
          pageTitle: 'documentation'
        }
      ]
    },
    {
      version: "1.0.0",
      language: "english",
      headerTop: [
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
      ],
      pages: [
        {
          pageTitle: 'home'
        },
        {
          pageTitle: 'documentation'
        }
      ]
    },
    {
      version: "1.0.0",
      language: "espagnol",
      headerTop: [
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
      ],
      pages: [
        {
          pageTitle: 'inicio'
        },
        {
          pageTitle: 'documentación'
        }
      ]
    }
  ]);
}
