import { computed, Injectable, signal } from '@angular/core';
import { ButtonsList, TerminalContent, BlocContent, LanguageConfig } from '../models/interface.models';

@Injectable({
  providedIn: 'root'
})
export class Interface {
  // Default language
  public readonly currentLanguage = signal('français');

  // Computed to get the header top buttons
  public readonly headerTopButtons = computed<ButtonsList[]>(() => {
    const currentLang = this.interface().find(lang => lang.language === this.currentLanguage());
    return currentLang?.headerTop || [];
  });

  // Computed to get the navigation 
  public readonly headerBotNavigation = computed(() => {
    const currentLang = this.interface().find(lang => lang.language === this.currentLanguage());
    return currentLang?.navigation || [];
  });

  // Computed to get the CTA buttons
  public readonly headerBotCta = computed(() => {
    const currentLang = this.interface().find(lang => lang.language === this.currentLanguage());
    return currentLang?.cta || [];
  });

  // Computed to get the blocs on the home page
  public readonly homePageBlocContent = computed<BlocContent[]>(() => {
    const langue = this.interface().find(lang => lang.language === this.currentLanguage());
    const pages = langue?.pages.find(page => page.id === 'home');
    return pages?.blocs || [];
  });

  // Computed to get the label of the current language
  public readonly currentLanguageLabel = computed(() => {
    const langMap: { [key: string]: string } = {
      'français': 'Français',
      'english': 'English', 
      'español': 'Español',
      'русский': 'Русский',
      '日本語': '日本語',
      'română': 'Română',
    };
    return langMap[this.currentLanguage()] || this.currentLanguage();
  });

  // Computed to get page from the current language
  public readonly currentPages = computed(() => {
    const currentLang = this.interface().find(lang => lang.language === this.currentLanguage());
    return currentLang?.pages || [];
  });


  // Computed to get footer from the current language
  public readonly footer = computed(() => {
    const currentLang = this.interface().find(lang => lang.language === this.currentLanguage());
    return currentLang?.footer || [];
  });

  /**
   * Method to get the whole page object by its ID
   * @param id 
   * @returns the whole page content
   */
  public getPageById(id: string) {
    return this.currentPages().find(page => page.id === id);
  }

  /**
   * To get a specific bloc by its id
   * @param id 
   * @returns 
   */
  public getBlocById(id: string): BlocContent | undefined {
    return this.homePageBlocContent().find(bloc => bloc.id === id);
  }

  /**
   * Récupère le premier terminal d'un bloc par son ID
   * @param blocId 
   * @returns 
   */
  public getTerminalByBlocId(blocId: string): TerminalContent | undefined {
    const bloc = this.getBlocById(blocId);
    return bloc?.terminal?.[0] || undefined;
  }

  /**
   * Récupère tous les terminaux d'un bloc par son ID
   * @param blocId 
   * @returns 
   */
  public getTerminalsByBlocId(blocId: string): TerminalContent[] {
    const bloc = this.getBlocById(blocId);
    return bloc?.terminal || [];
  }

  // Method to change language
  public setLanguage(language: string) {
    this.currentLanguage.set(language);
  }


  // Data interface
  public readonly interface = signal<LanguageConfig[]>([
    {
      version: "1.7.0",
      language: "français",
      headerTop: [
        {
          icon: 'github.svg',
          iconColor: 'grey',
          bgColor: '',
          borderColor: '',
          text: 'GitHub',
          textColor: 'white',
          link: 'https://github.com/thomas-bressel/archi-ts-cli'
        },
        {
          icon: 'forum.svg',
          iconColor: 'grey',
          bgColor: '',
          borderColor: '',
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
          link: 'https://github.com/sponsors/thomas-bressel',
          anchor: ''
        },
        {
          icon: 'arrow-start.svg',
          iconColor: 'white',
          text: 'Commencer',
          textColor: 'white',
          bgColor: 'linear-blue',
          link: '',
          anchor: 'start'

        }
      ],
      pages: [
        {
          id: 'home',
          pageTitle: 'accueil',
          h1Title: 'ArchiTS CLI',
          subtitle: "Générateur d'Architecture Backend",
          hook: "Créez des structures backend robustes avec TypeScript ou JavaScript. Trois architectures éprouvées, configuration automatisée, prêt en 30 secondes.",
          blocs: [
            {
              id: 'bloc1',
              h2Title: 'Pourquoi choisir ArchiTS ?',
              hook: 'Un CLI moderne pour des architectures backend professionnelles',
              cards: [
                {
                  id: 'card1',
                  icon: 'layer.svg',
                  h3Title: 'Architectures Professionnelles',
                  hook: 'Choisissez parmi 3 patterns architecturaux éprouvés pour structurer votre backend de manière optimale.',
                  checklists: [
                    {
                      id: 'check1',
                      text: 'Layered Architecture - Structure en couches classique'
                    },
                    {
                      id: 'check2',
                      text: 'Clean Architecture - Séparation domain/infrastructure'
                    },
                    {
                      id: 'check3',
                      text: 'Hexagonal Architecture - Ports & Adapters pattern'
                    },
                  ]
                },
                {
                  id: 'card2',
                  icon: 'setting.svg',
                  h3Title: 'Configuration Automatisée',
                  hook: 'Tous les outils modernes configurés automatiquement pour un développement productif immédiat.',
                  checklists: [
                    {
                      id: 'check4',
                      text: 'TypeScript/JavaScript - Support complet'
                    },
                    {
                      id: 'check5',
                      text: 'ExpressJS - Framework optionnel intégré'
                    },
                    {
                      id: 'check6',
                      text: 'ESLint, Jest, Nodemon - Tooling inclus'
                    },
                  ]
                },
                {
                  id: 'card3',
                  icon: 'flash.svg',
                  h3Title: 'Productivité Maximale',
                  hook: 'Interface CLI intuitive et génération automatique pour démarrer vos projets en quelques secondes.',
                  checklists: [
                    {
                      id: 'check7',
                      text: 'CLI intuitif - Interface en ligne de commande simple'
                    },
                    {
                      id: 'check8',
                      text: 'Templates prêts - Fichiers de base générés'
                    },
                    {
                      id: 'check9',
                      text: 'Dépendances gérées - Installation automatique'
                    },
                  ]
                }
              ],
              terminal: []
            },
            {
              id: 'bloc2',
              h2Title: 'Installation Rapide',
              hook: 'Commencez à utiliser ArchiTS en quelques commandes',
              cards: [],
              terminal: [
                {
                  type: 'bash',
                  content: `# Cloner le repository
git clone https://github.com/thomas-bressel/archi-ts-cli.git
cd archi-ts-cli

# Installation
make install
source ~/.bashrc

# Créer votre premier projet
archi create`
                }
              ],
            }
          ],
        },
        {
          id: 'documentation',
          pageTitle: 'documentation'
        }, 
      ],
      footer: [
        {
          line1: '©2025 ArchiTS CLI – Développé par Thomas Bressel',
          line2: 'Publié sous licence MIT.',
        }
      ],      
    },

  ]);
}
