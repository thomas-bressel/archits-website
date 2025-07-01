import { computed, Injectable, signal } from '@angular/core';
import { ButtonsList } from '../models/interface.models';

@Injectable({
  providedIn: 'root'
})
export class Interface {


  // Default language
  public readonly currentLanguage = signal('langue');

  // Computed tu get the header top buttons
  public readonly headerTopButtons = computed<ButtonsList[]>(() => {
    const currentLang = this.interface().find(lang => lang.language === this.currentLanguage());
    return currentLang?.headerTop || [];
  });

  public readonly headerBotNavigation = computed(() => {
    const currentLang = this.interface().find(lang => lang.language === this.currentLanguage());
    return currentLang?.navigation || [];
  })

  public readonly headerBotCta = computed(() => {
    const currentLang = this.interface().find(lang => lang.language === this.currentLanguage());
    return currentLang?.cta || [];
  })

  public readonly currentLanguageLabel = computed(() => {
    const langMap: { [key: string]: string } = {
      'français': 'Français',
      'english': 'English', 
      'español': 'Español',
      'русский': 'Русский'
    };
    return langMap[this.currentLanguage()] || this.currentLanguage();
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
        textColor: 'white',
        link: 'https://github.com/thomas-bressel/archi-ts-cli'
      },
      {
        icon: 'forum.svg',
        iconColor: 'grey',
        text: 'Discussions',
        textColor: 'white',
        link: 'https://github.com/thomas-bressel/archi-ts-cli/discussions'
      }
    ],
    headerBot: [
      {
        logo: true,
        navigation: true,
        buttons: true
      }
    ],
    navigation: [
      {
        name: 'Accueil',
        router: '/home'
      },
      {
        name: 'Documentation',
        router: '/documentation'
      }
    ],
    cta: [
      {
        icon: 'heart.svg',
        iconColor: 'white',
        text: 'Sponsor',
        textColor: 'white',
        bgColor: 'linear-red',
        link: 'https://github.com/sponsors/thomas-bressel'
      },
      {
        icon: 'arrow-start.svg',
        iconColor: 'white',
        text: 'Commencer',
        textColor: 'white',
        bgColor: 'linear-blue',
        link: '/documentation'
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
        text: 'GitHub',
        textColor: 'white',
        link: 'https://github.com/thomas-bressel/archi-ts-cli'
      },
      {
        icon: 'forum.svg',
        iconColor: 'grey',
        text: 'Discussions',
        textColor: 'white',
        link: 'https://github.com/thomas-bressel/archi-ts-cli/discussions'
      }
    ],
    headerBot: [
      {
        logo: true,
        navigation: true,
        buttons: true
      }
    ],
    navigation: [
      {
        name: 'Home',
        router: '/home'
      },
      {
        name: 'Documentation',
        router: '/documentation'
      }
    ],
    cta: [
      {
        icon: 'heart.svg',
        iconColor: 'white',
        text: 'Sponsor',
        textColor: 'white',
        bgColor: 'linear-red',
        link: 'https://github.com/sponsors/thomas-bressel'
      },
      {
        icon: 'arrow-start.svg',
        iconColor: 'white',
        text: 'Get Started',
        textColor: 'white',
        bgColor: 'linear-blue',
        link: '/documentation'
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
    language: "español",
    headerTop: [
      {
        icon: 'github.svg',
        iconColor: 'grey',
        text: 'GitHub',
        textColor: 'white',
        link: 'https://github.com/thomas-bressel/archi-ts-cli'
      },
      {
        icon: 'forum.svg',
        iconColor: 'grey',
        text: 'Discusiones',
        textColor: 'white',
        link: 'https://github.com/thomas-bressel/archi-ts-cli/discussions'
      }
    ],
    headerBot: [
      {
        logo: true,
        navigation: true,
        buttons: true
      }
    ],
    navigation: [
      {
        name: 'Inicio',
        router: '/home'
      },
      {
        name: 'Documentación',
        router: '/documentation'
      }
    ],
    cta: [
      {
        icon: 'heart.svg',
        iconColor: 'white',
        text: 'Patrocinar',
        textColor: 'white',
        bgColor: 'linear-red',
        link: 'https://github.com/sponsors/thomas-bressel'
      },
      {
        icon: 'arrow-start.svg',
        iconColor: 'white',
        text: 'Comenzar',
        textColor: 'white',
        bgColor: 'linear-blue',
        link: '/documentation'
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
  },
  {
    version: "1.0.0",
    language: "русский",
    headerTop: [
      {
        icon: 'github.svg',
        iconColor: 'grey',
        text: 'GitHub',
        textColor: 'white',
        link: 'https://github.com/thomas-bressel/archi-ts-cli'
      },
      {
        icon: 'forum.svg',
        iconColor: 'grey',
        text: 'Обсуждения',
        textColor: 'white',
        link: 'https://github.com/thomas-bressel/archi-ts-cli/discussions'
      }
    ],
    headerBot: [
      {
        logo: true,
        navigation: true,
        buttons: true
      }
    ],
    navigation: [
      {
        name: 'Главная',
        router: '/home'
      },
      {
        name: 'Документация',
        router: '/documentation'
      }
    ],
    cta: [
      {
        icon: 'heart.svg',
        iconColor: 'white',
        text: 'Спонсор',
        textColor: 'white',
        bgColor: 'linear-red',
        link: 'https://github.com/sponsors/thomas-bressel'
      },
      {
        icon: 'arrow-start.svg',
        iconColor: 'white',
        text: 'Начать',
        textColor: 'white',
        bgColor: 'linear-blue',
        link: '/documentation'
      }
    ],
    pages: [
      {
        pageTitle: 'главная'
      },
      {
        pageTitle: 'документация'
      }
    ]
  }
]);
}
