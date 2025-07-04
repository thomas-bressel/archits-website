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
    return pages?.blocsContent || [];
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

    // FRANCAIS
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
          blocsContent: [
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
                  bgColor: "terminal-black",
                  borderColor: "terminal-black",
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
          pageTitle: 'documentation',
          overlay: [
            {
              h5Title: 'Introduction',
              h5Icon: '',
              h5Anchor: 'introduction',
              items: [
                {
                  id: 'item1',
                  name: 'Qu’est-ce qu’ArchiTS ?',
                  anchor: 'section1'
                },
                {
                  id: 'item2',
                  name: 'Pourquoi ArchiTS ?',
                  anchor: 'section2'
                },
                {
                  id: 'item3',
                  name: 'Fonctionnalités',
                  anchor: 'section3'
                },
              ]
            },
            {
              h5Title: 'Installation',
              h5Icon: '🚀',
              h5Anchor: 'install',
              items: [
                {
                  id: 'item4',
                  name: 'Prérequis',
                  anchor: 'section4'
                },
                {
                  id: 'item5',
                  name: 'Installation Linux',
                  anchor: 'section5'
                },
                {
                  id: 'item6',
                  name: 'Vérification',
                  anchor: 'section6'
                },
              ]
            },
            {
              h5Title: 'Démarrage rapide',
              h5Icon: '⚡',
              h5Anchor: 'starting',
              items: [
                {
                  id: 'item7',
                  name: 'Prérequis',
                  anchor: 'section7'
                },
                {
                  id: 'item8',
                  name: 'Installation Linux',
                  anchor: 'section8'
                },
                {
                  id: 'item9',
                  name: 'Vérification',
                  anchor: 'section9'
                }
              ]
            },
            {
              h5Title: 'Architectures',
              h5Icon: '🏗️',
              h5Anchor: 'archi',
              items: [
                {
                  id: 'item10',
                  name: 'Layered Architecture',
                  anchor: 'section10'
                },
                {
                  id: 'item11',
                  name: 'Clean Architecture',
                  anchor: 'section11'
                },
                {
                  id: 'item12',
                  name: 'Hexagonal Architecture',
                  anchor: 'section12'
                }
              ]
            },
            {
              h5Title: 'Configuration',
              h5Icon: '⚙️',
              h5Anchor: 'archi',
              items: [
                {
                  id: 'item13',
                  name: 'Typescript / Javascript',
                  anchor: 'section13'
                },
                {
                  id: 'item14',
                  name: 'Express JS',
                  anchor: 'section14'
                },
                {
                  id: 'item15',
                  name: 'Variables d’environnements',
                  anchor: 'section15'
                }
              ]
            },
            {
              h5Title: 'Référence CLI',
              h5Icon: '🔧',
              h5Anchor: 'archi',
              items: [
                {
                  id: 'item16',
                  name: 'archi create',
                  anchor: 'section16'
                },
                {
                  id: 'item17',
                  name: 'archi version',
                  anchor: 'section17'
                },
                {
                  id: 'item18',
                  name: 'Dépannage',
                  anchor: 'section18'
                }
              ]
            },
          ],
          blocs: [
            {
              id: 'section1',
              h2Title: 'Documentation ArchiTS CLI',
              text: "Bienvenue dans la documentation complète d'ArchiTS CLI, votre générateur d'architecture backend moderne pour TypeScript et JavaScript.",
              cards: [
                {
                  title: 'Installation Rapide',
                  icon: '🚀',
                  text: "Installez ArchiTS en quelques minutes et créez votre premier projet"
                },
                {
                  title: 'Démarrage Rapide',
                  icon: '⚡',
                  text: "Guide pas à pas pour créer votre première architecture backend"
                },
                {
                  title: 'Architectures',
                  icon: '🏗️',
                  text: "Découvrez les trois patterns architecturaux supportés"
                }
              ],
            },
            {
              id: 'section2',
              h2Title: "Qu'est-ce qu'ArchiTS ?",
              text: "ArchiTS CLI est un outil en ligne de commande développé en Go qui permet de générer automatiquement des structures de projets backend robustes et bien organisées. Il supporte trois patterns architecturaux éprouvés et peut générer du code TypeScript ou JavaScript moderne.",
              alerts: [
                {
                  bgColor: 'alert-blue',
                  borderColor: 'alert-blue',
                  icon: '💡',
                  text: "Philosophie : ArchiTS vous aide à démarrer vos projets backend avec une architecture solide, des bonnes pratiques et une configuration automatisée, vous permettant de vous concentrer sur votre logique métier."
                },
              ],
              subBlocs: [
                {
                  id: 'sub-1',
                  h3Title: 'Pourquoi utiliser ArchiTS ?',
                  subchildBlocs: [
                    {
                      h4Title: 'Avantages',
                      list: [
                        "Gain de temps: Création de projet en 30 secondes",
                        "Bonnes pratiques : Architectures éprouvées et patterns recommandés",
                        "Configuration automatique : ESLint, Jest, TypeScript pré-configurés",
                        "Flexibilité : Support TypeScript/JavaScript et ExpressJS optionnel",
                        "Maintenabilité : Structure claire et séparation des responsabilités",
                      ]
                    },
                    {
                      h4Title: "Cas d’usage",
                      list: [
                        "Démarrage rapide d'APIs REST",
                        "Projets backend avec architectures complexes",
                        "Microservices bien structurés",
                        "Applications suivant les principes SOLID",
                        "Projets nécessitant une forte testabilité",
                      ]
                    },
                  ],
                },
                {
                  id: 'sub-2',
                  h3Title: 'Fonctionnalités principales',
                  arrays: [
                    {
                      headCol: ["Fonctionnalité", "Description", "Support"],
                      rows: [
                        {
                          col1: [
                            {
                              text: "Architectures",
                              label: false,
                            }
                          ],
                          col2: [
                            {
                              text: "3 patterns architecturaux professionnels",
                              label: false,
                            }
                          ],
                          col3: [
                            {
                              text: "✅ Layered, Clean, Hexagonal",
                              label: false,
                            }
                          ]
                        },
                        {
                          col1: [
                            {
                              text: "Langages",
                              label: false,
                            }
                          ],
                          col2: [
                            {
                              text: "Support complet TypeScript et JavaScript",
                              label: false,
                            }
                          ],
                          col3: [
                            {
                              text: "✅ TS/JS avec configuration optimisée",
                              label: false,
                            }
                          ]
                        },
                        {
                          col1: [
                            {
                              text: "Framework",
                              label: false,
                            }
                          ],
                          col2: [
                            {
                              text: "ExpressJS optionnel ou Node.js natif",
                              label: false,
                            }
                          ],
                          col3: [
                            {
                              text: "✅ Choix lors de la création",
                              label: false,
                            }
                          ]
                        },
                        {
                          col1: [
                            {
                              text: "Outils",
                              label: false,
                            }
                          ],
                          col2: [
                            {
                              text: "ESLint, Jest, Nodemon pré-configurés",
                              label: false,
                            }
                          ],
                          col3: [
                            {
                              text: "✅ Configuration automatique",
                              label: false,
                            }
                          ]
                        },
                        {
                          col1: [
                            {
                              text: "Dépendances",
                              label: false,
                            }
                          ],
                          col2: [
                            {
                              text: "Installation automatique des packages",
                              label: false,
                            }
                          ],
                          col3: [
                            {
                              text: "✅ npm + pnpm",
                              label: false,
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },

              ]
            },
            {
              id: 'section3',
              h2Title: "Installation rapide",
              subBlocs: [
                {
                  id: 'sub-1',
                  subchildBlocs: [
                    {
                      h4Title: 'Prérequis',
                      text: "Avant d'installer ArchiTS, assurez-vous d'avoir les outils suivants installés sur votre système :",
                      arrays: [
                        {
                          headCol: ["Outil", "Version minimale", "Vérification"],
                          rows: [
                            {
                              col1: [
                                {
                                  text: "Go",
                                  label: false,
                                }
                              ],
                              col2: [
                                {
                                  text: "1.18+",
                                  label: false,
                                }
                              ],
                              col3: [
                                {
                                  text: "go version",
                                  label: true,
                                }
                              ]
                            },
                            {
                              col1: [
                                {
                                  text: "NodeJS",
                                  label: false,
                                }
                              ],
                              col2: [
                                {
                                  text: "16+ (LTS recommandé)",
                                  label: false,
                                }
                              ],
                              col3: [
                                {
                                  text: "node --version",
                                  label: true,
                                }
                              ]
                            },
                            {
                              col1: [
                                {
                                  text: "npm",
                                  label: false,
                                }
                              ],
                              col2: [
                                {
                                  text: "8+",
                                  label: false,
                                }
                              ],
                              col3: [
                                {
                                  text: "npm --version",
                                  label: true,
                                }
                              ]
                            },
                            {
                              col1: [
                                {
                                  text: "Git",
                                  label: false,
                                }
                              ],
                              col2: [
                                {
                                  text: "2.0+",
                                  label: false,
                                }
                              ],
                              col3: [
                                {
                                  text: "git --version",
                                  label: true,
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    },
                    {
                      h4Title: "Installation sur Linux/WSL",
                      text: "Suivez ces étapes pour installer ArchiTS sur votre système :",
                      terminal: [
                        {
                          borderColor: "terminal-black",
                          bgColor: "terminal-black", 
                          type: "BASH",
                          code: `# 1. Cloner le repository
git clone https://github.com/thomas-bressel/archi-ts-cli.git
cd archi-ts-cli 

# 2. Installation automatique 
make install 

# 3. Recharger votre shell 
# Ou redémarrer votre terminal
source ~/.bashrc`
                        },
                      ],
                      alerts: [
                        {
                          bgColor: 'alert-yellow',
                          borderColor: 'alert-yellow',
                          icon: '⚠️',
                          text: "Note importante : ArchiTS est actuellement optimisé pour Linux et WSL. L'utilisation sur Windows natif nécessite WSL (Windows Subsystem for Linux)."
                        },
                      ],
                    },
                    {
                      h4Title: "Vérification de l'installation",
                      text: "Une fois l'installation terminée, vérifiez que tout fonctionne correctement :",
                      terminal: [
                        {
                          borderColor: "terminal-black",
                          bgColor: "terminal-black", 
                          type: "BASH",
                          code: `# Vérifier la version d'ArchiTS
archi --version

# Sortie attendue: 
archi version 1.7.0

# Afficher l'aide 
archi --help 

# Tester la création d'un projet 
archi create`
                        },
                      ],
                      alerts: [
                        {
                          bgColor: 'alert-green',
                          borderColor: 'alert-green',
                          icon: '✅',
                          text: "Installation réussie ! Si toutes les commandes fonctionnent, ArchiTS est prêt à être utilisé."
                        },
                      ],
                    },
                  ],
                },
              ]
            },
            {
              id: 'section4',
              h2Title: "Démarrage Rapide",
              subBlocs: [
                {
                  id: 'sub-1',
                  subchildBlocs: [
                    {
                      h4Title: 'Créer votre premier projet',
                      text: "Créons ensemble votre premier projet backend avec ArchiTS :",
                      terminal: [
                        {
                          borderColor: "terminal-black",
                          bgColor: "terminal-black", 
                          type: "BASH",
                          code: `# Lancer la création interactive
archi create`
                        },
                      ],
                    },
                    {
                      text: "ArchiTS vous guidera à travers une série de questions :",
                      terminal: [
                        {
                          borderColor: "terminal-black",
                          bgColor: "terminal-black", 
                          type: "BASH",
                          code: `# Vérifier la version d'ArchiTS
archi --version

# Sortie attendue: 
archi version 1.7.0

# Afficher l'aide 
archi --help 

# Tester la création d'un projet 
archi create`
                        },
                      ],
                    },
                    {
                      h4Title: "Commandes de base",
                      text: "Une fois votre projet créé, voici les commandes essentielles :",
                      terminal: [
                        {
                          borderColor: "terminal-black",
                          bgColor: "terminal-black", 
                          type: "BASH",
                          code: `# Se déplacer dans le projet
cd mon-api-backend 

# Installation des dépendances (déjà fait automatiquement)
npm install 

# Développement avec rechargement automatique 
npm run dev 

# Construction du projet (TypeScript uniquement) 
npm run build 

# Démarrer en production 
npm start 

# Exécuter les tests 
npm test 

# Linter le code 
npm run lint`
                        },
                      ],

                    },
                    {
                      h4Title: "Exemple complet",
                      text: "Voici un exemple complet de création et démarrage d'un projet :",
                      terminal: [
                        {
                          borderColor: "terminal-black",
                          bgColor: "terminal-black", 
                          type: "BASH",
                          code: `# 1. Créer le projet
archi create

# → Choisir: Clean Architecture, TypeScript, ExpressJS 

# 2. Naviguer dans le projet
cd mon-api-backend 

# 3. Démarrer le serveur de développement 
npm run dev 

# 4. Tester l'API
curl http://localhost:3000 

# Réponse JSON avec informations du projet
`
                        },
                      ],
                      alerts: [
                        {
                          bgColor: 'alert-blue',
                          borderColor: 'alert-blue',
                          icon: '🎯',
                          text: "Résultat : Vous avez maintenant une API fonctionnelle avec une architecture Clean, TypeScript et ExpressJS, prête à recevoir votre logique métier !"
                        },
                      ],
                    },
                  ],
                },

              ]
            },
            {
              id: 'section5',
              h2Title: "Architectures supportées",
              text: "ArchiTS propose trois patterns architecturaux éprouvés, chacun adapté à différents types de projets et niveaux de complexité.",
              subBlocs: [
                {
                  id: 'sub-1',
                  subchildBlocs: [
                    {
                      h4Title: '1. Layered Architecture (Architecture en couches)',
                      text: "Description : Architecture traditionnelle organisée en couches horizontales avec séparation claire des responsabilités.",
                      h5Title: "Structure générée :",
                      terminal: [
                        {
                          borderColor: "terminal-black",
                          bgColor: "terminal-black", 
                          type: "TEXT",
                          code: `src/ ├── controllers/ # Gestion des requêtes HTTP
     │ └── base/ ├── services/ # Logique métier 
     │ └── base/ ├── repositories/ # Accès aux données 
     │ └── base/ ├── models/ # Entités et DTOs    
     │ ├── entities/ 
     │ ├── dtos/ 
     │ ├── requests/ 
     │ ├── responses/ 
     │ └── database/ 
     ├── middleware/ # Middlewares Express 
     │ ├── auth/ 
     │ ├── validation/ 
     │ └── security/ 
     ├── routes/ # Définition des routes 
     │ ├── api/ 
     │ └── web/ └── utils/ # Utilitaires
`
                        },
                      ],
                    },
                    {
                      h4Title: "Cas d’usage recommandés :",
                      list: [
                        "Applications CRUD simples à moyennes",
                        "APIs REST traditionnelles",
                        "Projets avec équipe junior",
                        "Prototypage rapide",
                      ],
                      alerts: [
                        {
                          bgColor: 'alert-green',
                          borderColor: 'alert-green',
                          icon: '👍',
                          text: "Avantages : Simple à comprendre, rapide à développer, idéal pour débuter"
                        },
                      ],
                    },

                    {
                      h4Title: '2. Clean Architecture ',
                      text: "Description : ---- A CORRIGER -----",
                      h5Title: "Structure générée :",
                      terminal: [
                        {
                          borderColor: "terminal-black",
                          bgColor: "terminal-black", 
                          type: "TEXT",
                          code: `src/ ├── domain/ # Cœur métier pur
     │ └── entities/ 
     ├── data/ # Couche de données 
     │ ├── repositories/ 
     │ ├── data-sources/ 
     │ │ └── local/ 
     │ ├── services/ 
     │ ├── dtos/ 
     │ ├── models/ 
     │ └── mappers/ 
     ├── presentation/ # Interface utilisateur 
     │ ├── controllers/ 
     │ ├── routes/ 
     │ ├── middlewares/ 
     │ └── models/ 
     ├── infrastructure/ # Services externes 
     │ ├── database/ 
     │ ├── cache/ 
     │ ├── email/ 
     │ └── server/ 
     └── shared/ # Code partagé 
     ├── utils/ 
     └── constants/
`
                        },
                      ],
                    },
                    {
                      h4Title: "Cas d’usage recommandés :",
                      list: [
                        "Applications avec domaine métier complexe",
                        "Projets nécessitant une forte testabilité",
                        "Équipes expérimentées",
                        "Applications évolutives",
                      ],
                      alerts: [
                        {
                          bgColor: 'alert-green',
                          borderColor: 'alert-green',
                          icon: '👍',
                          text: "Avantages : Indépendance technologique, testabilité maximale, évolutivité"
                        },
                      ],
                    },
                    {
                      h4Title: '3. Hexagonal Architecture (Ports & Adapters) ',
                      text: "Description : Architecture qui isole complètement le cœur métier des détails techniques via des ports et adaptateurs.",
                      h5Title: "Structure générée :",
                      terminal: [
                        {
                          borderColor: "terminal-black",
                          bgColor: "terminal-black", 
                          type: "TEXT",
                          code: `src/ ├── core/ # Hexagone central
     │ ├── domain/ 
     │ │ ├── entities/ 
     │ │ ├── value-objects/ 
     │ │ ├── services/ 
     │ │ └── exceptions/ 
     │ └── application/ 
     │ ├── use-cases/
     │ ├── commands/ 
     │ ├── queries/ 
     │ ├── handlers/ 
     │ └── dtos/ 
     ├── ports/ # Interfaces 
     │ ├── inbound/ 
     │ │ ├── http/ 
     │ │ └── cli/ 
     │ └── outbound/ 
     │ ├── repositories/ 
     │ ├── external-services/ 
     │ └── infrastructure/ *
     ├── adapters/ # Implémentations 
     │ ├── inbound/ 
     │ │ └── http/ 
     │ │ ├── controllers/ 
     │ │ ├── middleware/ 
     │ │ └── routes/ 
     │ └── outbound/ 
     │ ├── repositories/ 
     │ │ ├── mysql/ 
     │ │ ├── redis/ 
     │ │ └── mappers/ 
     │ └── external-services/ 
     ├── config/ # Configuration et DI 
     │ ├── dependencies/ 
     │ ├── database/ 
     │ └── environment/ 
     └── main/ # Point d'entrée
`
                        },
                      ],
                    },
                    {
                      h4Title: "Cas d’usage recommandés :",
                      list: [
                        "Microservices complexes",
                        "Applications nécessitant multiple interfaces",
                        "Projets avec changements fréquents d'infrastructure",
                        "Architecture modulaire poussée",
                      ],
                      alerts: [
                        {
                          bgColor: 'alert-green',
                          borderColor: 'alert-green',
                          icon: '👍',
                          text: "Avantages : Isolation maximale, flexibilité des adaptateurs, testabilité parfaite"
                        },
                      ],
                      arrays: [
                        {
                          headCol: ["Critère", "Layered", "Clean", "Hexagonal"],
                          rows: [
                            {
                              col1: [
                                {
                                  text: "Complexité",
                                  label: false,
                                }
                              ],
                              col2: [
                                {
                                  text: "⭐⭐",
                                  label: false,
                                }
                              ],
                              col3: [
                                {
                                  text: "⭐⭐⭐⭐",
                                  label: false,
                                }
                              ],
                              col4: [
                                {
                                  text: "⭐⭐⭐⭐⭐",
                                  label: false,
                                }
                              ]
                            },
                            {
                              col1: [
                                {
                                  text: "Testabilité",
                                  label: false,
                                }
                              ],
                              col2: [
                                {
                                  text: "⭐⭐⭐",
                                  label: false,
                                }
                              ],
                              col3: [
                                {
                                  text: "⭐⭐⭐⭐⭐",
                                  label: false,
                                }
                              ],
                              col4: [
                                {
                                  text: "⭐⭐⭐⭐⭐",
                                  label: false,
                                }
                              ]
                            },
                            {
                              col1: [
                                {
                                  text: "Évolutivité",
                                  label: false,
                                }
                              ],
                              col2: [
                                {
                                  text: "⭐⭐",
                                  label: false,
                                }
                              ],
                              col3: [
                                {
                                  text: "⭐⭐⭐⭐",
                                  label: false,
                                }
                              ],
                              col4: [
                                {
                                  text: "⭐⭐⭐⭐⭐",
                                  label: false,
                                }
                              ]
                            },
                            {
                              col1: [
                                {
                                  text: "Courbe d'apprentissage",
                                  label: false,
                                }
                              ],
                              col2: [
                                {
                                  text: "Douce",
                                  label: false,
                                }
                              ],
                              col3: [
                                {
                                  text: "Modérée",
                                  label: false,
                                }
                              ],
                              col4: [
                                {
                                  text: "Steep",
                                  label: false,
                                }
                              ]
                            },
                            {
                              col1: [
                                {
                                  text: "Idéal pour",
                                  label: false,
                                }
                              ],
                              col2: [
                                {
                                  text: "CRUD, APIs simples",
                                  label: false,
                                }
                              ],
                              col3: [
                                {
                                  text: "Domaine complexe",
                                  label: false,
                                }
                              ],
                              col4: [
                                {
                                  text: "Microservices",
                                  label: false,
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    },
                  ],
                },

              ]
            },
            {
              id: 'section6',
              h2Title: "Configuration",
              subBlocs: [
                {
                  id: 'sub-1',
                  subchildBlocs: [
                    {
                      h4Title: 'TypeScript vs JavaScript',
                      text: "ArchiTS supporte complètement TypeScript et JavaScript avec des configurations optimisées pour chaque langage.",
                      h5Title: "TypeScript (Fortement recommandé)",
                      alerts: [
                        {
                          bgColor: 'alert-green',
                          borderColor: 'alert-green',
                          icon: '👍',
                          text: "Avantages TypeScript : Typage statique, IntelliSense amélioré, détection d'erreurs à la compilation, meilleure documentation du code"
                        },
                      ],
                    },
                    {
                      h5Title: "Fichiers générés :",
                      labels: [
                        {
                          label: "tsconfig.json",
                          text: "Configuration TypeScript optimisée",
                        },

                        {
                          label: "src/index.ts",
                          text: "Point d'entrée TypeScript",
                        },
                        {
                          label: "jest.config.ts",
                          text: "Configuration Jest pour TypeScript",
                        },

                      ],
                    },
                    {
                      h5Title: "Typescript : Scripts npm générés :",
                      terminal: [
                        {
                          borderColor: "terminal-black",
                          bgColor: "terminal-black", 
                          type: "JSON",
                          code: `{ "scripts": 
  { "start": "node dist/src/index.js",
    "dev": "nodemon src/index.ts",
    "build": "tsc",
    "watch": "tsc --watch",
    "lint": "eslint src/**/*.ts",
    "lint:fix": "eslint src/**/*.ts --fix"
  }
}`
                        },
                      ],
                    },
                    {
                      h5Title: "Javascript : Scripts npm générés :",
                      terminal: [
                        {
                          borderColor: "terminal-black",
                          bgColor: "terminal-black", 
                          type: "JSON",
                          code: `{ "scripts": 
   { "start": "node src/index.js",
     "dev": "nodemon src/index.js",
     "lint": "eslint src/**/*.js",
     "lint:fix": "eslint src/**/*.js --fix" 
   } 
}`
                        },
                      ],
                    },
                    {
                      h4Title: "Configuration ExpressJS",
                      text: "Vous pouvez choisir d'utiliser ExpressJS ou Node.js natif lors de la création du projet.",
                      terminal: [
                        {
                          borderColor: "terminal-black",
                          bgColor: "terminal-black", 
                          type: "TYPESCRIPT",
                          code: `import express, { Express, Request, Response } from 'express';
const server = express();
const PORT = 3000; // Routes 

server.get('/', (req: Request, res: Response) => { 
    res.json({ 
         message: 'Welcome to Archi API',
         version: '1.0.0', 
         status: 'running', 
         stack: 'NodeJS, Typescript',
         library: 'ExpressJS' 
    });
}); 

// Start server 
server.listen(PORT, () => { 
    console.log('Server running on http://localhost:' + PORT); 
});
`
                        },
                      ],
                    },
                    {
                      h4Title: "Variables d’environnements",
                      text: "ArchiTS génère automatiquement un fichier .env avec toutes les variables essentielles :",
                      terminal: [
                        {
                          borderColor: "terminal-black",
                          bgColor: "terminal-black", 
                          type: "BASH",
                          code: `# Environment 
NODE_ENV=development 

# Server 
LISTEN_PORT="3000" 
SERVER_NAME="ArchiTS API" 
VERSION="1.0.0" 

# Database DB_HOST="localhost" 
DB_PORT="3306" 
DB_NAME="archi_db" 
DB_USER="root" 
DB_PASSWORD="my-super-password" 
DB_CONNEXION_LIMIT="100" 

# Redis 
REDIS_PORT="6379" 
REDIS_HOST="localhost" 
REDIS_PASSWORD="my-super-password" 
REDIS_EXPIRES_IN="3600" 

# JWT 
JWT_SECRET_KEY="your-secret-key" 
JWT_REFRESH_SECRET_KEY="your-refresh-secret-key" 
JWT_DURATION="2h" 
JWT_REFRESH_TOKEN_TIME="20h" 

# CORS 
CORS_ALLOWED_ORIGINS="http://localhost:3000" 
CORS_CREDENTIALS="true" 

# SMTP 
MAIL_HOST="mail.domain.fr" 
MAIL_PORT="465" MAIL_SECURE="true" 
MAIL_AUTH_USER="exemple@domain.fr" 
MAIL_AUTH_PASSWORD="my-super-password"`
                        },
                      ],
                      alerts: [
                        {
                          bgColor: 'alert-red',
                          borderColor: 'alert-red',
                          icon: '🔒',
                          text: "Sécurité : N'oubliez pas de modifier les valeurs par défaut, surtout les mots de passe et clés secrètes avant de passer en production !"
                        },
                      ],
                    },
                  ],
                },

              ]
            },
            {
              id: 'section7',
              h2Title: "Référence CLI",
              subBlocs: [
                {
                  id: 'sub-1',
                  subchildBlocs: [
                    {
                      h4Title: 'archi create',
                      text: "Commande principale pour créer un nouveau projet avec ArchiTS.",
                      terminal: [
                        {
                          borderColor: "terminal-black",
                          bgColor: "terminal-black", 
                          type: "BASH",
                          code: `archi create`
                        },
                      ],
                    },
                    {
                      h5Title: "Processus interactif :",
                      list: ["Nom du projet : Définit le nom du dossier et du package",
                        "Architecture : Choix entre Layered, Clean ou Hexagonal",
                        "Langage : TypeScript ou JavaScript",
                        "ExpressJS : Inclure ou non le framework Express"]

                    },
                    {
                      h5Title: "Actions automatiques :",
                      list: ["Création de la structure de dossiers",
                        "Génération des fichiers de configuration",
                        "Installation des dépendances npm",
                        "Installation de pnpm",
                        "Initialisation Git (si applicable)"]

                    },
                    {
                      h4Title: 'archi version',
                      text: "Affiche les informations détaillées sur la version et l'environnement.",
                      terminal: [
                        {
                          borderColor: "terminal-black",
                          bgColor: "terminal-black", 
                          type: "BASH",
                          code: `# Version courte
archi -v 

# ou 
archi --version 

# Informations détaillées
archi version`
                        },
                      ],
                    },
                    {
                      h4Title: 'Dépanage',
                      h5Title: 'Problèmes courants',
                      text: "Affiche les informations détaillées sur la version et l'environnement.",
                      terminal: [
                        {
                          message: "❌ Erreur : archi: command not found",
                          text: "Solutions:",
                          type: "BASH",
                          bgColor: 'red',
                          borderColor: 'red',
                          code: `# Recharger le shell
source ~/.bashrc 

# Ou vérifier l'installation 
cd archi-ts-cli make install`
                        },
                        {
                          message: "❌ Erreur : archi: command not found",
                          text: "Solutions:",
                          type: "BASH",
                          bgColor: 'red',
                          borderColor: 'red',
                          code: `# Recharger le shell
source ~/.bashrc 

# Ou vérifier l'installation 
cd archi-ts-cli make install`
                        },
                        {
                          message: "❌ Erreur : archi: command not found",
                          text: "Solutions:",
                          type: "BASH",
                          bgColor: 'red',
                          borderColor: 'red',
                          code: `# Donner les permissions d'exécution
chmod +x archi 

# Ou réinstaller 
make clean make install`
                        },
                      ],
                    },
                    {
                      h5Title: "Logs et diagnostic",
                      text: "Pour diagnostiquer les problèmes, vous pouvez :",
                      terminal: [
                        {
                          borderColor: "terminal-black",
                          bgColor: "terminal-black", 
                          type: "BASH",
                          code: `# Vérifier l'installation 
which archi 

# Tester la compilation 
make build 

# Nettoyer et réinstaller 
make clean 
make install`
                        },
                      ],
                    },
                    {
                      h5Title: "Support",
                      text: "Si vous rencontrez des problèmes non couverts ici :",
                    },
                  ],
                },

              ]
            },
          ],

        },

      ],
      footer: [
        {
          line1: '©2025 ArchiTS CLI – Développé par Thomas Bressel',
          line2: 'Publié sous licence MIT.',
        }
      ],
    },
    // ENGLISH
    {
      version: "1.7.0",
      language: "english",
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
          link: 'https://github.com/sponsors/thomas-bressel',
          anchor: ''
        },
        {
          icon: 'arrow-start.svg',
          iconColor: 'white',
          text: 'Get Started',
          textColor: 'white',
          bgColor: 'linear-blue',
          link: '',
          anchor: 'start'
        }
      ],
      pages: [
        {
          id: 'home',
          pageTitle: 'home',
          h1Title: 'ArchiTS CLI',
          subtitle: "Backend Architecture Generator",
          hook: "Create robust backend structures with TypeScript or JavaScript. Three proven architectures, automated configuration, ready in 30 seconds.",
          blocsContent: [
            {
              id: 'bloc1',
              h2Title: 'Why Choose ArchiTS?',
              hook: 'A modern CLI for professional backend architectures',
              cards: [
                {
                  id: 'card1',
                  icon: 'layer.svg',
                  h3Title: 'Professional Architectures',
                  hook: 'Choose from 3 proven architectural patterns to structure your backend optimally.',
                  checklists: [
                    {
                      id: 'check1',
                      text: 'Layered Architecture - Classic layered structure'
                    },
                    {
                      id: 'check2',
                      text: 'Clean Architecture - Domain/infrastructure separation'
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
                  h3Title: 'Automated Configuration',
                  hook: 'All modern tools configured automatically for immediate productive development.',
                  checklists: [
                    {
                      id: 'check4',
                      text: 'TypeScript/JavaScript - Full support'
                    },
                    {
                      id: 'check5',
                      text: 'ExpressJS - Optional integrated framework'
                    },
                    {
                      id: 'check6',
                      text: 'ESLint, Jest, Nodemon - Tooling included'
                    },
                  ]
                },
                {
                  id: 'card3',
                  icon: 'flash.svg',
                  h3Title: 'Maximum Productivity',
                  hook: 'Intuitive CLI interface and automatic generation to start your projects in seconds.',
                  checklists: [
                    {
                      id: 'check7',
                      text: 'Intuitive CLI - Simple command line interface'
                    },
                    {
                      id: 'check8',
                      text: 'Ready templates - Base files generated'
                    },
                    {
                      id: 'check9',
                      text: 'Managed dependencies - Automatic installation'
                    },
                  ]
                }
              ],
              terminal: []
            },
            {
              id: 'bloc2',
              h2Title: 'Quick Installation',
              hook: 'Start using ArchiTS in a few commands',
              cards: [],
              terminal: [
                {
                  type: 'bash',
                  content: `# Clone the repository
  git clone https://github.com/thomas-bressel/archi-ts-cli.git
  cd archi-ts-cli
  
  # Installation
  make install
  source ~/.bashrc
  
  # Create your first project
  archi create`
                }
              ],
            }
          ],
        },
        {
          id: 'documentation',
          pageTitle: 'documentation',
          overlay: [
            {
              h5Title: 'Introduction',
              h5Icon: '',
              h5Anchor: 'introduction',
              items: [
                {
                  id: 'item1',
                  name: 'What is ArchiTS?',
                  anchor: 'section1'
                },
                {
                  id: 'item2',
                  name: 'Why ArchiTS?',
                  anchor: 'section2'
                },
                {
                  id: 'item3',
                  name: 'Features',
                  anchor: 'section3'
                },
              ]
            },
            {
              h5Title: 'Installation',
              h5Icon: '🚀',
              h5Anchor: 'install',
              items: [
                {
                  id: 'item4',
                  name: 'Prerequisites',
                  anchor: 'section4'
                },
                {
                  id: 'item5',
                  name: 'Linux Installation',
                  anchor: 'section5'
                },
                {
                  id: 'item6',
                  name: 'Verification',
                  anchor: 'section6'
                },
              ]
            },
            {
              h5Title: 'Quick Start',
              h5Icon: '⚡',
              h5Anchor: 'starting',
              items: [
                {
                  id: 'item7',
                  name: 'Prerequisites',
                  anchor: 'section7'
                },
                {
                  id: 'item8',
                  name: 'Linux Installation',
                  anchor: 'section8'
                },
                {
                  id: 'item9',
                  name: 'Verification',
                  anchor: 'section9'
                }
              ]
            },
            {
              h5Title: 'Architectures',
              h5Icon: '🏗️',
              h5Anchor: 'archi',
              items: [
                {
                  id: 'item10',
                  name: 'Layered Architecture',
                  anchor: 'section10'
                },
                {
                  id: 'item11',
                  name: 'Clean Architecture',
                  anchor: 'section11'
                },
                {
                  id: 'item12',
                  name: 'Hexagonal Architecture',
                  anchor: 'section12'
                }
              ]
            },
            {
              h5Title: 'Configuration',
              h5Icon: '⚙️',
              h5Anchor: 'archi',
              items: [
                {
                  id: 'item13',
                  name: 'TypeScript / JavaScript',
                  anchor: 'section13'
                },
                {
                  id: 'item14',
                  name: 'Express JS',
                  anchor: 'section14'
                },
                {
                  id: 'item15',
                  name: 'Environment Variables',
                  anchor: 'section15'
                }
              ]
            },
            {
              h5Title: 'CLI Reference',
              h5Icon: '🔧',
              h5Anchor: 'archi',
              items: [
                {
                  id: 'item16',
                  name: 'archi create',
                  anchor: 'section16'
                },
                {
                  id: 'item17',
                  name: 'archi version',
                  anchor: 'section17'
                },
                {
                  id: 'item18',
                  name: 'Troubleshooting',
                  anchor: 'section18'
                }
              ]
            },
          ],
          blocs: [
            {
              id: 'section1',
              h2Title: 'ArchiTS CLI Documentation',
              text: "Welcome to the complete documentation of ArchiTS CLI, your modern backend architecture generator for TypeScript and JavaScript.",
              cards: [
                {
                  title: 'Quick Installation',
                  icon: '🚀',
                  text: "Install ArchiTS in minutes and create your first project"
                },
                {
                  title: 'Quick Start',
                  icon: '⚡',
                  text: "Step-by-step guide to create your first backend architecture"
                },
                {
                  title: 'Architectures',
                  icon: '🏗️',
                  text: "Discover the three supported architectural patterns"
                }
              ],
            },
            {
              id: 'section2',
              h2Title: "What is ArchiTS?",
              text: "ArchiTS CLI is a command-line tool developed in Go that automatically generates robust and well-organized backend project structures. It supports three proven architectural patterns and can generate modern TypeScript or JavaScript code.",
              alerts: [
                {
                  bgColor: 'alert-blue',
                  borderColor: 'alert-blue',
                  icon: '💡',
                  text: "Philosophy: ArchiTS helps you start your backend projects with a solid architecture, best practices, and automated configuration, allowing you to focus on your business logic."
                },
              ],
              subBlocs: [
                {
                  id: 'sub-1',
                  h3Title: 'Why use ArchiTS?',
                  subchildBlocs: [
                    {
                      h4Title: 'Benefits',
                      list: [
                        "Time saving: Project creation in 30 seconds",
                        "Best practices: Proven architectures and recommended patterns",
                        "Automatic configuration: ESLint, Jest, TypeScript pre-configured",
                        "Flexibility: TypeScript/JavaScript support and optional ExpressJS",
                        "Maintainability: Clear structure and separation of concerns",
                      ]
                    },
                    {
                      h4Title: "Use Cases",
                      list: [
                        "Quick start of REST APIs",
                        "Backend projects with complex architectures",
                        "Well-structured microservices",
                        "Applications following SOLID principles",
                        "Projects requiring high testability",
                      ]
                    },
                  ],
                },
                {
                  id: 'sub-2',
                  h3Title: 'Main Features',
                  arrays: [
                    {
                      headCol: ["Feature", "Description", "Support"],
                      rows: [
                        {
                          col1: [
                            {
                              text: "Architectures",
                              label: false,
                            }
                          ],
                          col2: [
                            {
                              text: "3 professional architectural patterns",
                              label: false,
                            }
                          ],
                          col3: [
                            {
                              text: "✅ Layered, Clean, Hexagonal",
                              label: false,
                            }
                          ]
                        },
                        {
                          col1: [
                            {
                              text: "Languages",
                              label: false,
                            }
                          ],
                          col2: [
                            {
                              text: "Full TypeScript and JavaScript support",
                              label: false,
                            }
                          ],
                          col3: [
                            {
                              text: "✅ TS/JS with optimized configuration",
                              label: false,
                            }
                          ]
                        },
                        {
                          col1: [
                            {
                              text: "Framework",
                              label: false,
                            }
                          ],
                          col2: [
                            {
                              text: "Optional ExpressJS or native Node.js",
                              label: false,
                            }
                          ],
                          col3: [
                            {
                              text: "✅ Choice during creation",
                              label: false,
                            }
                          ]
                        },
                        {
                          col1: [
                            {
                              text: "Tools",
                              label: false,
                            }
                          ],
                          col2: [
                            {
                              text: "ESLint, Jest, Nodemon pre-configured",
                              label: false,
                            }
                          ],
                          col3: [
                            {
                              text: "✅ Automatic configuration",
                              label: false,
                            }
                          ]
                        },
                        {
                          col1: [
                            {
                              text: "Dependencies",
                              label: false,
                            }
                          ],
                          col2: [
                            {
                              text: "Automatic package installation",
                              label: false,
                            }
                          ],
                          col3: [
                            {
                              text: "✅ npm + pnpm",
                              label: false,
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
              ]
            },
            {
              id: 'section3',
              h2Title: "Quick Installation",
              subBlocs: [
                {
                  id: 'sub-1',
                  subchildBlocs: [
                    {
                      h4Title: 'Prerequisites',
                      text: "Before installing ArchiTS, make sure you have the following tools installed on your system:",
                      arrays: [
                        {
                          headCol: ["Tool", "Minimum Version", "Verification"],
                          rows: [
                            {
                              col1: [
                                {
                                  text: "Go",
                                  label: false,
                                }
                              ],
                              col2: [
                                {
                                  text: "1.18+",
                                  label: false,
                                }
                              ],
                              col3: [
                                {
                                  text: "go version",
                                  label: true,
                                }
                              ]
                            },
                            {
                              col1: [
                                {
                                  text: "NodeJS",
                                  label: false,
                                }
                              ],
                              col2: [
                                {
                                  text: "16+ (LTS recommended)",
                                  label: false,
                                }
                              ],
                              col3: [
                                {
                                  text: "node --version",
                                  label: true,
                                }
                              ]
                            },
                            {
                              col1: [
                                {
                                  text: "npm",
                                  label: false,
                                }
                              ],
                              col2: [
                                {
                                  text: "8+",
                                  label: false,
                                }
                              ],
                              col3: [
                                {
                                  text: "npm --version",
                                  label: true,
                                }
                              ]
                            },
                            {
                              col1: [
                                {
                                  text: "Git",
                                  label: false,
                                }
                              ],
                              col2: [
                                {
                                  text: "2.0+",
                                  label: false,
                                }
                              ],
                              col3: [
                                {
                                  text: "git --version",
                                  label: true,
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    },
                    {
                      h4Title: "Installation on Linux/WSL",
                      text: "Follow these steps to install ArchiTS on your system:",
                      terminal: [
                        {
                          borderColor: "terminal-black",
                          bgColor: "terminal-black", 
                          type: "BASH",
                          code: `# 1. Clone the repository
  git clone https://github.com/thomas-bressel/archi-ts-cli.git
  cd archi-ts-cli 
  
  # 2. Automatic installation 
  make install 
  
  # 3. Reload your shell 
  # Or restart your terminal
  source ~/.bashrc`
                        },
                      ],
                      alerts: [
                        {
                          bgColor: 'alert-yellow',
                          borderColor: 'alert-yellow',
                          icon: '⚠️',
                          text: "Important note: ArchiTS is currently optimized for Linux and WSL. Using on native Windows requires WSL (Windows Subsystem for Linux)."
                        },
                      ],
                    },
                    {
                      h4Title: "Installation Verification",
                      text: "Once installation is complete, verify that everything works correctly:",
                      terminal: [
                        {
                          borderColor: "terminal-black",
                          bgColor: "terminal-black", 
                          type: "BASH",
                          code: `# Check ArchiTS version
  archi --version
  
  # Expected output: 
  archi version 1.7.0
  
  # Display help 
  archi --help 
  
  # Test project creation 
  archi create`
                        },
                      ],
                      alerts: [
                        {
                          bgColor: 'alert-green',
                          borderColor: 'alert-green',
                          icon: '✅',
                          text: "Installation successful! If all commands work, ArchiTS is ready to use."
                        },
                      ],
                    },
                  ],
                },
              ]
            },
            {
              id: 'section4',
              h2Title: "Quick Start",
              subBlocs: [
                {
                  id: 'sub-1',
                  subchildBlocs: [
                    {
                      h4Title: 'Create your first project',
                      text: "Let's create your first backend project with ArchiTS together:",
                      terminal: [
                        {
                          borderColor: "terminal-black",
                          bgColor: "terminal-black", 
                          type: "BASH",
                          code: `# Launch interactive creation
  archi create`
                        },
                      ],
                    },
                    {
                      text: "ArchiTS will guide you through a series of questions:",
                      terminal: [
                        {
                          borderColor: "terminal-black",
                          bgColor: "terminal-black", 
                          type: "BASH",
                          code: `# Check ArchiTS version
  archi --version
  
  # Expected output: 
  archi version 1.7.0
  
  # Display help 
  archi --help 
  
  # Test project creation 
  archi create`
                        },
                      ],
                    },
                    {
                      h4Title: "Basic commands",
                      text: "Once your project is created, here are the essential commands:",
                      terminal: [
                        {
                          borderColor: "terminal-black",
                          bgColor: "terminal-black", 
                          type: "BASH",
                          code: `# Navigate to the project
  cd my-backend-api 
  
  # Install dependencies (already done automatically)
  npm install 
  
  # Development with automatic reload 
  npm run dev 
  
  # Build the project (TypeScript only) 
  npm run build 
  
  # Start in production 
  npm start 
  
  # Run tests 
  npm test 
  
  # Lint the code 
  npm run lint`
                        },
                      ],
                    },
                    {
                      h4Title: "Complete example",
                      text: "Here's a complete example of project creation and startup:",
                      terminal: [
                        {
                          borderColor: "terminal-black",
                          bgColor: "terminal-black", 
                          type: "BASH",
                          code: `# 1. Create the project
  archi create
  
  # → Choose: Clean Architecture, TypeScript, ExpressJS 
  
  # 2. Navigate to the project
  cd my-backend-api 
  
  # 3. Start the development server 
  npm run dev 
  
  # 4. Test the API
  curl http://localhost:3000 
  
  # JSON response with project information
  `
                        },
                      ],
                      alerts: [
                        {
                          bgColor: 'alert-blue',
                          borderColor: 'alert-blue',
                          icon: '🎯',
                          text: "Result: You now have a functional API with Clean architecture, TypeScript and ExpressJS, ready to receive your business logic!"
                        },
                      ],
                    },
                  ],
                },
              ]
            },
            {
              id: 'section5',
              h2Title: "Supported Architectures",
              text: "ArchiTS offers three proven architectural patterns, each adapted to different types of projects and levels of complexity.",
              subBlocs: [
                {
                  id: 'sub-1',
                  subchildBlocs: [
                    {
                      h4Title: '1. Layered Architecture',
                      text: "Description: Traditional architecture organized in horizontal layers with clear separation of responsibilities.",
                      h5Title: "Generated structure:",
                      terminal: [
                        {
                          borderColor: "terminal-black",
                          bgColor: "terminal-black", 
                          type: "TEXT",
                          code: `src/ ├── controllers/ # HTTP request handling
       │ └── base/ ├── services/ # Business logic 
       │ └── base/ ├── repositories/ # Data access 
       │ └── base/ ├── models/ # Entities and DTOs    
       │ ├── entities/ 
       │ ├── dtos/ 
       │ ├── requests/ 
       │ ├── responses/ 
       │ └── database/ 
       ├── middleware/ # Express middlewares 
       │ ├── auth/ 
       │ ├── validation/ 
       │ └── security/ 
       ├── routes/ # Route definitions 
       │ ├── api/ 
       │ └── web/ └── utils/ # Utilities
  `
                        },
                      ],
                    },
                    {
                      h4Title: "Recommended use cases:",
                      list: [
                        "Simple to medium CRUD applications",
                        "Traditional REST APIs",
                        "Projects with junior teams",
                        "Rapid prototyping",
                      ],
                      alerts: [
                        {
                          bgColor: 'alert-green',
                          borderColor: 'alert-green',
                          icon: '👍',
                          text: "Advantages: Easy to understand, quick to develop, ideal for beginners"
                        },
                      ],
                    },
                    {
                      h4Title: '2. Clean Architecture',
                      text: "Description: Architecture that separates business domain from technical details with clear dependency inversion.",
                      h5Title: "Generated structure:",
                      terminal: [
                        {
                          borderColor: "terminal-black",
                          bgColor: "terminal-black", 
                          type: "TEXT",
                          code: `src/ ├── domain/ # Pure business core
       │ └── entities/ 
       ├── data/ # Data layer 
       │ ├── repositories/ 
       │ ├── data-sources/ 
       │ │ └── local/ 
       │ ├── services/ 
       │ ├── dtos/ 
       │ ├── models/ 
       │ └── mappers/ 
       ├── presentation/ # User interface 
       │ ├── controllers/ 
       │ ├── routes/ 
       │ ├── middlewares/ 
       │ └── models/ 
       ├── infrastructure/ # External services 
       │ ├── database/ 
       │ ├── cache/ 
       │ ├── email/ 
       │ └── server/ 
       └── shared/ # Shared code 
       ├── utils/ 
       └── constants/
  `
                        },
                      ],
                    },
                    {
                      h4Title: "Recommended use cases:",
                      list: [
                        "Applications with complex business domain",
                        "Projects requiring high testability",
                        "Experienced teams",
                        "Scalable applications",
                      ],
                      alerts: [
                        {
                          bgColor: 'alert-green',
                          borderColor: 'alert-green',
                          icon: '👍',
                          text: "Advantages: Technology independence, maximum testability, scalability"
                        },
                      ],
                    },
                    {
                      h4Title: '3. Hexagonal Architecture (Ports & Adapters)',
                      text: "Description: Architecture that completely isolates the business core from technical details via ports and adapters.",
                      h5Title: "Generated structure:",
                      terminal: [
                        {
                          borderColor: "terminal-black",
                          bgColor: "terminal-black", 
                          type: "TEXT",
                          code: `src/ ├── core/ # Central hexagon
       │ ├── domain/ 
       │ │ ├── entities/ 
       │ │ ├── value-objects/ 
       │ │ ├── services/ 
       │ │ └── exceptions/ 
       │ └── application/ 
       │ ├── use-cases/
       │ ├── commands/ 
       │ ├── queries/ 
       │ ├── handlers/ 
       │ └── dtos/ 
       ├── ports/ # Interfaces 
       │ ├── inbound/ 
       │ │ ├── http/ 
       │ │ └── cli/ 
       │ └── outbound/ 
       │ ├── repositories/ 
       │ ├── external-services/ 
       │ └── infrastructure/ 
       ├── adapters/ # Implementations 
       │ ├── inbound/ 
       │ │ └── http/ 
       │ │ ├── controllers/ 
       │ │ ├── middleware/ 
       │ │ └── routes/ 
       │ └── outbound/ 
       │ ├── repositories/ 
       │ │ ├── mysql/ 
       │ │ ├── redis/ 
       │ │ └── mappers/ 
       │ └── external-services/ 
       ├── config/ # Configuration and DI 
       │ ├── dependencies/ 
       │ ├── database/ 
       │ └── environment/ 
       └── main/ # Entry point
  `
                        },
                      ],
                    },
                    {
                      h4Title: "Recommended use cases:",
                      list: [
                        "Complex microservices",
                        "Applications requiring multiple interfaces",
                        "Projects with frequent infrastructure changes",
                        "Advanced modular architecture",
                      ],
                      alerts: [
                        {
                          bgColor: 'alert-green',
                          borderColor: 'alert-green',
                          icon: '👍',
                          text: "Advantages: Maximum isolation, adapter flexibility, perfect testability"
                        },
                      ],
                      arrays: [
                        {
                          headCol: ["Criteria", "Layered", "Clean", "Hexagonal"],
                          rows: [
                            {
                              col1: [
                                {
                                  text: "Complexity",
                                  label: false,
                                }
                              ],
                              col2: [
                                {
                                  text: "⭐⭐",
                                  label: false,
                                }
                              ],
                              col3: [
                                {
                                  text: "⭐⭐⭐⭐",
                                  label: false,
                                }
                              ],
                              col4: [
                                {
                                  text: "⭐⭐⭐⭐⭐",
                                  label: false,
                                }
                              ]
                            },
                            {
                              col1: [
                                {
                                  text: "Testability",
                                  label: false,
                                }
                              ],
                              col2: [
                                {
                                  text: "⭐⭐⭐",
                                  label: false,
                                }
                              ],
                              col3: [
                                {
                                  text: "⭐⭐⭐⭐⭐",
                                  label: false,
                                }
                              ],
                              col4: [
                                {
                                  text: "⭐⭐⭐⭐⭐",
                                  label: false,
                                }
                              ]
                            },
                            {
                              col1: [
                                {
                                  text: "Scalability",
                                  label: false,
                                }
                              ],
                              col2: [
                                {
                                  text: "⭐⭐",
                                  label: false,
                                }
                              ],
                              col3: [
                                {
                                  text: "⭐⭐⭐⭐",
                                  label: false,
                                }
                              ],
                              col4: [
                                {
                                  text: "⭐⭐⭐⭐⭐",
                                  label: false,
                                }
                              ]
                            },
                            {
                              col1: [
                                {
                                  text: "Learning Curve",
                                  label: false,
                                }
                              ],
                              col2: [
                                {
                                  text: "Gentle",
                                  label: false,
                                }
                              ],
                              col3: [
                                {
                                  text: "Moderate",
                                  label: false,
                                }
                              ],
                              col4: [
                                {
                                  text: "Steep",
                                  label: false,
                                }
                              ]
                            },
                            {
                              col1: [
                                {
                                  text: "Ideal for",
                                  label: false,
                                }
                              ],
                              col2: [
                                {
                                  text: "CRUD, Simple APIs",
                                  label: false,
                                }
                              ],
                              col3: [
                                {
                                  text: "Complex Domain",
                                  label: false,
                                }
                              ],
                              col4: [
                                {
                                  text: "Microservices",
                                  label: false,
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    },
                  ],
                },
              ]
            },
            {
              id: 'section6',
              h2Title: "Configuration",
              subBlocs: [
                {
                  id: 'sub-1',
                  subchildBlocs: [
                    {
                      h4Title: 'TypeScript vs JavaScript',
                      text: "ArchiTS fully supports TypeScript and JavaScript with optimized configurations for each language.",
                      h5Title: "TypeScript (Highly recommended)",
                      alerts: [
                        {
                          bgColor: 'alert-green',
                          borderColor: 'alert-green',
                          icon: '👍',
                          text: "TypeScript advantages: Static typing, enhanced IntelliSense, compile-time error detection, better code documentation"
                        },
                      ],
                    },
                    {
                      h5Title: "Generated files:",
                      labels: [
                        {
                          label: "tsconfig.json",
                          text: "Optimized TypeScript configuration",
                        },
                        {
                          label: "src/index.ts",
                          text: "TypeScript entry point",
                        },
                        {
                          label: "jest.config.ts",
                          text: "Jest configuration for TypeScript",
                        },
                      ],
                    },
                    {
                      h5Title: "TypeScript: Generated npm scripts:",
                      terminal: [
                        {
                          borderColor: "terminal-black",
                          bgColor: "terminal-black", 
                          type: "JSON",
                          code: `{ "scripts": 
    { "start": "node dist/src/index.js",
      "dev": "nodemon src/index.ts",
      "build": "tsc",
      "watch": "tsc --watch",
      "lint": "eslint src/**/*.ts",
      "lint:fix": "eslint src/**/*.ts --fix"
    }
  }`
                        },
                      ],
                    },
                    {
                      h5Title: "JavaScript: Generated npm scripts:",
                      terminal: [
                        {
                          borderColor: "terminal-black",
                          bgColor: "terminal-black", 
                          type: "JSON",
                          code: `{ "scripts": 
     { "start": "node src/index.js",
       "dev": "nodemon src/index.js",
       "lint": "eslint src/**/*.js",
       "lint:fix": "eslint src/**/*.js --fix" 
     } 
  }`
                        },
                      ],
                    },
                    {
                      h4Title: "ExpressJS Configuration",
                      text: "You can choose to use ExpressJS or native Node.js when creating the project.",
                      terminal: [
                        {
                          borderColor: "terminal-black",
                          bgColor: "terminal-black", 
                          type: "TYPESCRIPT",
                          code: `import express, { Express, Request, Response } from 'express';
  const server = express();
  const PORT = 3000; // Routes 
  
  server.get('/', (req: Request, res: Response) => { 
      res.json({ 
           message: 'Welcome to Archi API',
           version: '1.0.0', 
           status: 'running', 
           stack: 'NodeJS, Typescript',
           library: 'ExpressJS' 
      });
  }); 
  
  // Start server 
  server.listen(PORT, () => { 
      console.log('Server running on http://localhost:' + PORT); 
  });
  `
                        },
                      ],
                    },
                    {
                      h4Title: "Environment Variables",
                      text: "ArchiTS automatically generates an .env file with all essential variables:",
                      terminal: [
                        {
                          borderColor: "terminal-black",
                          bgColor: "terminal-black", 
                          type: "BASH",
                          code: `# Environment 
  NODE_ENV=development 
  
  # Server 
  LISTEN_PORT="3000" 
  SERVER_NAME="ArchiTS API" 
  VERSION="1.0.0" 
  
  # Database 
  DB_HOST="localhost" 
  DB_PORT="3306" 
  DB_NAME="archi_db" 
  DB_USER="root" 
  DB_PASSWORD="my-super-password" 
  DB_CONNEXION_LIMIT="100" 
  
  # Redis 
  REDIS_PORT="6379" 
  REDIS_HOST="localhost" 
  REDIS_PASSWORD="my-super-password" 
  REDIS_EXPIRES_IN="3600" 
  
  # JWT 
  JWT_SECRET_KEY="your-secret-key" 
  JWT_REFRESH_SECRET_KEY="your-refresh-secret-key" 
  JWT_DURATION="2h" 
  JWT_REFRESH_TOKEN_TIME="20h" 
  
  # CORS 
  CORS_ALLOWED_ORIGINS="http://localhost:3000" 
  CORS_CREDENTIALS="true" 
  
  # SMTP 
  MAIL_HOST="mail.domain.com" 
  MAIL_PORT="465" 
  MAIL_SECURE="true" 
  MAIL_AUTH_USER="example@domain.com" 
  MAIL_AUTH_PASSWORD="my-super-password"`
                        },
                      ],
                      alerts: [
                        {
                          bgColor: 'alert-red',
                          borderColor: 'alert-red',
                          icon: '🔒',
                          text: "Security: Don't forget to change the default values, especially passwords and secret keys before going to production!"
                        },
                      ],
                    },
                  ],
                },
              ]
            },
            {
              id: 'section7',
              h2Title: "CLI Reference",
              subBlocs: [
                {
                  id: 'sub-1',
                  subchildBlocs: [
                    {
                      h4Title: 'archi create',
                      text: "Main command to create a new project with ArchiTS.",
                      terminal: [
                        {
                          borderColor: "terminal-black",
                          bgColor: "terminal-black", 
                          type: "BASH",
                          code: `archi create`
                        },
                      ],
                    },
                    {
                      h5Title: "Interactive process:",
                      list: [
                        "Project name: Defines the folder and package name",
                        "Architecture: Choose between Layered, Clean or Hexagonal",
                        "Language: TypeScript or JavaScript",
                        "ExpressJS: Include or not the Express framework"
                      ]
                    },
                    {
                      h5Title: "Automatic actions:",
                      list: [
                        "Creation of folder structure",
                        "Generation of configuration files",
                        "Installation of npm dependencies",
                        "Installation of pnpm",
                        "Git initialization (if applicable)"
                      ]
                    },
                    {
                      h4Title: 'archi version',
                      text: "Displays detailed information about version and environment.",
                      terminal: [
                        {
                          borderColor: "terminal-black",
                          bgColor: "terminal-black", 
                          type: "BASH",
                          code: `# Short version
  archi -v 
  
  # or 
  archi --version 
  
  # Detailed information
  archi version`
                        },
                      ],
                    },
                    {
                      h4Title: 'Troubleshooting',
                      h5Title: 'Common Issues',
                      text: "Here are solutions to common problems:",
                      terminal: [
                        {
                          borderColor: "terminal-black",
                          bgColor: "terminal-black", 
                          message: "❌ Error: archi: command not found",
                          text: "Solutions:",
                          type: "BASH",
                          code: `# Reload the shell
  source ~/.bashrc 
  
  # Or check installation 
  cd archi-ts-cli 
  make install`
                        },
                        {
                          message: "❌ Error: Permission denied",
                          text: "Solutions:",
                          type: "BASH",
                          bgColor: 'red',
                          borderColor: 'red',
                          code: `# Give execution permissions
  chmod +x archi 
  
  # Or reinstall 
  make clean 
  make install`
                        },
                        {
                          message: "❌ Error: Dependencies not installed",
                          text: "Solutions:",
                          type: "BASH",
                          bgColor: 'red',
                          borderColor: 'red',
                          code: `# Manual installation
  cd your-project
  npm install
  
  # Or use pnpm
  pnpm install`
                        },
                      ],
                    },
                    {
                      h5Title: "Logs and diagnostics",
                      text: "To diagnose problems, you can:",
                      terminal: [
                        {
                          borderColor: "terminal-black",
                          bgColor: "terminal-black", 
                          type: "BASH",
                          code: `# Check installation 
  which archi 
  
  # Test compilation 
  make build 
  
  # Clean and reinstall 
  make clean 
  make install`
                        },
                      ],
                    },
                    {
                      h5Title: "Support",
                      text: "If you encounter problems not covered here:",
                      list: [
                        "Check the GitHub Issues: https://github.com/thomas-bressel/archi-ts-cli/issues",
                        "Join discussions: https://github.com/thomas-bressel/archi-ts-cli/discussions",
                        "Read the complete documentation",
                        "Contact the maintainer: thomas.bressel@example.com"
                      ]
                    },
                  ],
                },
              ]
            },
          ],
        },
      ],
      footer: [
        {
          line1: '©2025 ArchiTS CLI – Developed by Thomas Bressel',
          line2: 'Published under MIT license.',
        }
      ],
    },
    // RUSSE
    {
      version: "1.7.0",
      language: "русский",
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
          text: 'Поддержать',
          textColor: 'white',
          bgColor: 'linear-red',
          link: 'https://github.com/sponsors/thomas-bressel',
          anchor: ''
        },
        {
          icon: 'arrow-start.svg',
          iconColor: 'white',
          text: 'Начать',
          textColor: 'white',
          bgColor: 'linear-blue',
          link: '',
          anchor: 'start'
        }
      ],
      pages: [
        {
          id: 'home',
          pageTitle: 'главная',
          h1Title: 'ArchiTS CLI',
          subtitle: "Генератор Backend-архитектур",
          hook: "Создавайте надежные backend-структуры с TypeScript или JavaScript. Три проверенных архитектуры, автоматическая настройка, готово за 30 секунд.",
          blocsContent: [
            {
              id: 'bloc1',
              h2Title: 'Почему выбрать ArchiTS?',
              hook: 'Современный CLI для профессиональных backend-архитектур',
              cards: [
                {
                  id: 'card1',
                  icon: 'layer.svg',
                  h3Title: 'Профессиональные архитектуры',
                  hook: 'Выберите из 3 проверенных архитектурных паттернов для оптимальной структуры вашего backend.',
                  checklists: [
                    {
                      id: 'check1',
                      text: 'Layered Architecture - Классическая слоистая структура'
                    },
                    {
                      id: 'check2',
                      text: 'Clean Architecture - Разделение domain/infrastructure'
                    },
                    {
                      id: 'check3',
                      text: 'Hexagonal Architecture - Паттерн Ports & Adapters'
                    },
                  ]
                },
                {
                  id: 'card2',
                  icon: 'setting.svg',
                  h3Title: 'Автоматическая конфигурация',
                  hook: 'Все современные инструменты настроены автоматически для немедленной продуктивной разработки.',
                  checklists: [
                    {
                      id: 'check4',
                      text: 'TypeScript/JavaScript - Полная поддержка'
                    },
                    {
                      id: 'check5',
                      text: 'ExpressJS - Дополнительный интегрированный фреймворк'
                    },
                    {
                      id: 'check6',
                      text: 'ESLint, Jest, Nodemon - Включенные инструменты'
                    },
                  ]
                },
                {
                  id: 'card3',
                  icon: 'flash.svg',
                  h3Title: 'Максимальная продуктивность',
                  hook: 'Интуитивный CLI-интерфейс и автоматическая генерация для запуска проектов за секунды.',
                  checklists: [
                    {
                      id: 'check7',
                      text: 'Интуитивный CLI - Простой интерфейс командной строки'
                    },
                    {
                      id: 'check8',
                      text: 'Готовые шаблоны - Сгенерированные базовые файлы'
                    },
                    {
                      id: 'check9',
                      text: 'Управление зависимостями - Автоматическая установка'
                    },
                  ]
                }
              ],
              terminal: []
            },
            {
              id: 'bloc2',
              h2Title: 'Быстрая установка',
              hook: 'Начните использовать ArchiTS за несколько команд',
              cards: [],
              terminal: [
                {
                  type: 'bash',
                  content: `# Клонирование репозитория
git clone https://github.com/thomas-bressel/archi-ts-cli.git
cd archi-ts-cli

# Установка
make install
source ~/.bashrc

# Создание первого проекта
archi create`
                }
              ],
            }
          ],
        },
        {
          id: 'documentation',
          pageTitle: 'документация',
          overlay: [
            {
              h5Title: 'Введение',
              h5Icon: '',
              h5Anchor: 'introduction',
              items: [
                {
                  id: 'item1',
                  name: 'Что такое ArchiTS?',
                  anchor: 'section1'
                },
                {
                  id: 'item2',
                  name: 'Зачем ArchiTS?',
                  anchor: 'section2'
                },
                {
                  id: 'item3',
                  name: 'Возможности',
                  anchor: 'section3'
                },
              ]
            },
            {
              h5Title: 'Установка',
              h5Icon: '🚀',
              h5Anchor: 'install',
              items: [
                {
                  id: 'item4',
                  name: 'Требования',
                  anchor: 'section4'
                },
                {
                  id: 'item5',
                  name: 'Установка Linux',
                  anchor: 'section5'
                },
                {
                  id: 'item6',
                  name: 'Проверка',
                  anchor: 'section6'
                },
              ]
            },
            {
              h5Title: 'Быстрый старт',
              h5Icon: '⚡',
              h5Anchor: 'starting',
              items: [
                {
                  id: 'item7',
                  name: 'Требования',
                  anchor: 'section7'
                },
                {
                  id: 'item8',
                  name: 'Установка Linux',
                  anchor: 'section8'
                },
                {
                  id: 'item9',
                  name: 'Проверка',
                  anchor: 'section9'
                }
              ]
            },
            {
              h5Title: 'Архитектуры',
              h5Icon: '🏗️',
              h5Anchor: 'archi',
              items: [
                {
                  id: 'item10',
                  name: 'Layered Architecture',
                  anchor: 'section10'
                },
                {
                  id: 'item11',
                  name: 'Clean Architecture',
                  anchor: 'section11'
                },
                {
                  id: 'item12',
                  name: 'Hexagonal Architecture',
                  anchor: 'section12'
                }
              ]
            },
            {
              h5Title: 'Конфигурация',
              h5Icon: '⚙️',
              h5Anchor: 'config',
              items: [
                {
                  id: 'item13',
                  name: 'Typescript / Javascript',
                  anchor: 'section13'
                },
                {
                  id: 'item14',
                  name: 'Express JS',
                  anchor: 'section14'
                },
                {
                  id: 'item15',
                  name: 'Переменные окружения',
                  anchor: 'section15'
                }
              ]
            },
            {
              h5Title: 'Справочник CLI',
              h5Icon: '🔧',
              h5Anchor: 'cli',
              items: [
                {
                  id: 'item16',
                  name: 'archi create',
                  anchor: 'section16'
                },
                {
                  id: 'item17',
                  name: 'archi version',
                  anchor: 'section17'
                },
                {
                  id: 'item18',
                  name: 'Устранение неполадок',
                  anchor: 'section18'
                }
              ]
            },
          ],
          blocs: [
            {
              id: 'section1',
              h2Title: 'Документация ArchiTS CLI',
              text: "Добро пожаловать в полную документацию ArchiTS CLI, вашего современного генератора backend-архитектур для TypeScript и JavaScript.",
              cards: [
                {
                  title: 'Быстрая установка',
                  icon: '🚀',
                  text: "Установите ArchiTS за несколько минут и создайте свой первый проект"
                },
                {
                  title: 'Быстрый старт',
                  icon: '⚡',
                  text: "Пошаговое руководство по созданию вашей первой backend-архитектуры"
                },
                {
                  title: 'Архитектуры',
                  icon: '🏗️',
                  text: "Изучите три поддерживаемых архитектурных паттерна"
                }
              ],
            },
            {
              id: 'section2',
              h2Title: "Что такое ArchiTS?",
              text: "ArchiTS CLI - это инструмент командной строки, разработанный на Go, который позволяет автоматически генерировать надежные и хорошо организованные структуры backend-проектов. Он поддерживает три проверенных архитектурных паттерна и может генерировать современный код TypeScript или JavaScript.",
              alerts: [
                {
                  bgColor: 'alert-blue',
                  borderColor: 'alert-blue',
                  icon: '💡',
                  text: "Философия: ArchiTS помогает вам запускать backend-проекты с надежной архитектурой, лучшими практиками и автоматической конфигурацией, позволяя сосредоточиться на бизнес-логике."
                },
              ],
              subBlocs: [
                {
                  id: 'sub-1',
                  h3Title: 'Почему использовать ArchiTS?',
                  subchildBlocs: [
                    {
                      h4Title: 'Преимущества',
                      list: [
                        "Экономия времени: Создание проекта за 30 секунд",
                        "Лучшие практики: Проверенные архитектуры и рекомендуемые паттерны",
                        "Автоматическая конфигурация: ESLint, Jest, TypeScript предварительно настроены",
                        "Гибкость: Поддержка TypeScript/JavaScript и дополнительный ExpressJS",
                        "Сопровождаемость: Четкая структура и разделение ответственности",
                      ]
                    },
                    {
                      h4Title: "Случаи использования",
                      list: [
                        "Быстрый запуск REST API",
                        "Backend-проекты со сложными архитектурами",
                        "Хорошо структурированные микросервисы",
                        "Приложения, следующие принципам SOLID",
                        "Проекты, требующие высокой тестируемости",
                      ]
                    },
                  ],
                },
                {
                  id: 'sub-2',
                  h3Title: 'Основные возможности',
                  arrays: [
                    {
                      headCol: ["Возможность", "Описание", "Поддержка"],
                      rows: [
                        {
                          col1: [
                            {
                              text: "Архитектуры",
                              label: false,
                            }
                          ],
                          col2: [
                            {
                              text: "3 профессиональных архитектурных паттерна",
                              label: false,
                            }
                          ],
                          col3: [
                            {
                              text: "✅ Layered, Clean, Hexagonal",
                              label: false,
                            }
                          ]
                        },
                        {
                          col1: [
                            {
                              text: "Языки",
                              label: false,
                            }
                          ],
                          col2: [
                            {
                              text: "Полная поддержка TypeScript и JavaScript",
                              label: false,
                            }
                          ],
                          col3: [
                            {
                              text: "✅ TS/JS с оптимизированной конфигурацией",
                              label: false,
                            }
                          ]
                        },
                        {
                          col1: [
                            {
                              text: "Фреймворк",
                              label: false,
                            }
                          ],
                          col2: [
                            {
                              text: "Дополнительный ExpressJS или нативный Node.js",
                              label: false,
                            }
                          ],
                          col3: [
                            {
                              text: "✅ Выбор при создании",
                              label: false,
                            }
                          ]
                        },
                        {
                          col1: [
                            {
                              text: "Инструменты",
                              label: false,
                            }
                          ],
                          col2: [
                            {
                              text: "ESLint, Jest, Nodemon предварительно настроены",
                              label: false,
                            }
                          ],
                          col3: [
                            {
                              text: "✅ Автоматическая конфигурация",
                              label: false,
                            }
                          ]
                        },
                        {
                          col1: [
                            {
                              text: "Зависимости",
                              label: false,
                            }
                          ],
                          col2: [
                            {
                              text: "Автоматическая установка пакетов",
                              label: false,
                            }
                          ],
                          col3: [
                            {
                              text: "✅ npm + pnpm",
                              label: false,
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
              ]
            },
            {
              id: 'section3',
              h2Title: "Быстрая установка",
              subBlocs: [
                {
                  id: 'sub-1',
                  subchildBlocs: [
                    {
                      h4Title: 'Требования',
                      text: "Перед установкой ArchiTS убедитесь, что у вас установлены следующие инструменты:",
                      arrays: [
                        {
                          headCol: ["Инструмент", "Минимальная версия", "Проверка"],
                          rows: [
                            {
                              col1: [
                                {
                                  text: "Go",
                                  label: false,
                                }
                              ],
                              col2: [
                                {
                                  text: "1.18+",
                                  label: false,
                                }
                              ],
                              col3: [
                                {
                                  text: "go version",
                                  label: true,
                                }
                              ]
                            },
                            {
                              col1: [
                                {
                                  text: "NodeJS",
                                  label: false,
                                }
                              ],
                              col2: [
                                {
                                  text: "16+ (рекомендуется LTS)",
                                  label: false,
                                }
                              ],
                              col3: [
                                {
                                  text: "node --version",
                                  label: true,
                                }
                              ]
                            },
                            {
                              col1: [
                                {
                                  text: "npm",
                                  label: false,
                                }
                              ],
                              col2: [
                                {
                                  text: "8+",
                                  label: false,
                                }
                              ],
                              col3: [
                                {
                                  text: "npm --version",
                                  label: true,
                                }
                              ]
                            },
                            {
                              col1: [
                                {
                                  text: "Git",
                                  label: false,
                                }
                              ],
                              col2: [
                                {
                                  text: "2.0+",
                                  label: false,
                                }
                              ],
                              col3: [
                                {
                                  text: "git --version",
                                  label: true,
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    },
                    {
                      h4Title: "Установка в Linux/WSL",
                      text: "Следуйте этим шагам для установки ArchiTS в вашей системе:",
                      terminal: [
                        {
                          borderColor: "terminal-black",
                          bgColor: "terminal-black", 
                          type: "BASH",
                          code: `# 1. Клонирование репозитория
git clone https://github.com/thomas-bressel/archi-ts-cli.git
cd archi-ts-cli 

# 2. Автоматическая установка 
make install 

# 3. Перезагрузка shell 
# Или перезапуск терминала
source ~/.bashrc`
                        },
                      ],
                      alerts: [
                        {
                          bgColor: 'alert-yellow',
                          borderColor: 'alert-yellow',
                          icon: '⚠️',
                          text: "Важное примечание: ArchiTS в настоящее время оптимизирован для Linux и WSL. Использование в нативной Windows требует WSL (Windows Subsystem for Linux)."
                        },
                      ],
                    },
                    {
                      h4Title: "Проверка установки",
                      text: "После завершения установки проверьте, что все работает правильно:",
                      terminal: [
                        {
                          borderColor: "terminal-black",
                          bgColor: "terminal-black", 
                          type: "BASH",
                          code: `# Проверка версии ArchiTS
archi --version

# Ожидаемый вывод: 
archi version 1.7.0

# Показать справку 
archi --help 

# Тест создания проекта 
archi create`
                        },
                      ],
                      alerts: [
                        {
                          bgColor: 'alert-green',
                          borderColor: 'alert-green',
                          icon: '✅',
                          text: "Установка успешна! Если все команды работают, ArchiTS готов к использованию."
                        },
                      ],
                    },
                  ],
                },
              ]
            },
            {
              id: 'section4',
              h2Title: "Быстрый старт",
              subBlocs: [
                {
                  id: 'sub-1',
                  subchildBlocs: [
                    {
                      h4Title: 'Создание первого проекта',
                      text: "Давайте создадим ваш первый backend-проект с ArchiTS:",
                      terminal: [
                        {
                          borderColor: "terminal-black",
                          bgColor: "terminal-black", 
                          type: "BASH",
                          code: `# Запуск интерактивного создания
archi create`
                        },
                      ],
                    },
                    {
                      text: "ArchiTS проведет вас через серию вопросов:",
                      terminal: [
                        {
                          borderColor: "terminal-black",
                          bgColor: "terminal-black", 
                          type: "BASH",
                          code: `# Интерактивные вопросы при создании проекта
? Введите имя проекта: mon-api-backend
? Выберите архитектуру: Clean Architecture
? Выберите язык: TypeScript  
? Использовать ExpressJS: Да

✅ Проект создан успешно!
📁 Структура папок сгенерирована
🔧 Конфигурации настроены
📦 Зависимости установлены
🎉 Готово к разработке!`
                        },
                      ],
                    },
                    {
                      h4Title: "Основные команды",
                      text: "После создания проекта, вот основные команды:",
                      terminal: [
                        {
                          borderColor: "terminal-black",
                          bgColor: "terminal-black", 
                          type: "BASH",
                          code: `# Переход в проект
cd mon-api-backend 

# Установка зависимостей (уже выполнена автоматически)
npm install 

# Разработка с автоматической перезагрузкой 
npm run dev 

# Сборка проекта (только TypeScript) 
npm run build 

# Запуск в продакшене 
npm start 

# Выполнение тестов 
npm test 

# Линтинг кода 
npm run lint`
                        },
                      ],
                    },
                    {
                      h4Title: "Полный пример",
                      text: "Вот полный пример создания и запуска проекта:",
                      terminal: [
                        {
                          borderColor: "terminal-black",
                          bgColor: "terminal-black", 
                          type: "BASH",
                          code: `# 1. Создание проекта
archi create

# → Выбор: Clean Architecture, TypeScript, ExpressJS 

# 2. Переход в проект
cd mon-api-backend 

# 3. Запуск сервера разработки 
npm run dev 

# 4. Тестирование API
curl http://localhost:3000 

# JSON-ответ с информацией о проекте`
                        },
                      ],
                      alerts: [
                        {
                          bgColor: 'alert-blue',
                          borderColor: 'alert-blue',
                          icon: '🎯',
                          text: "Результат: Теперь у вас есть функциональный API с Clean Architecture, TypeScript и ExpressJS, готовый к добавлению вашей бизнес-логики!"
                        },
                      ],
                    },
                  ],
                },
              ]
            },
            {
              id: 'section5',
              h2Title: "Поддерживаемые архитектуры",
              text: "ArchiTS предлагает три проверенных архитектурных паттерна, каждый из которых подходит для разных типов проектов и уровней сложности.",
              subBlocs: [
                {
                  id: 'sub-1',
                  subchildBlocs: [
                    {
                      h4Title: '1. Layered Architecture (Слоистая архитектура)',
                      text: "Описание: Традиционная архитектура, организованная в горизонтальные слои с четким разделением ответственности.",
                      h5Title: "Генерируемая структура:",
                      terminal: [
                        {
                          borderColor: "terminal-black",
                          bgColor: "terminal-black", 
                          type: "TEXT",
                          code: `src/
├── controllers/     # Обработка HTTP-запросов
│   └── base/
├── services/        # Бизнес-логика 
│   └── base/
├── repositories/    # Доступ к данным 
│   └── base/
├── models/          # Сущности и DTO    
│   ├── entities/
│   ├── dtos/
│   ├── requests/
│   ├── responses/
│   └── database/
├── middleware/      # Middleware Express 
│   ├── auth/
│   ├── validation/
│   └── security/
├── routes/          # Определение маршрутов 
│   ├── api/
│   └── web/
└── utils/           # Утилиты`
                        },
                      ],
                    },
                    {
                      h4Title: "Рекомендуемые случаи использования:",
                      list: [
                        "Простые и средние CRUD-приложения",
                        "Традиционные REST API",
                        "Проекты с младшими командами",
                        "Быстрое прототипирование",
                      ],
                      alerts: [
                        {
                          bgColor: 'alert-green',
                          borderColor: 'alert-green',
                          icon: '👍',
                          text: "Преимущества: Легко понять, быстро разрабатывать, идеально для начинающих"
                        },
                      ],
                    },
                    {
                      h4Title: '2. Clean Architecture',
                      text: "Описание: Архитектура, которая разделяет приложение на концентрические слои с зависимостями, направленными внутрь к бизнес-логике.",
                      h5Title: "Генерируемая структура:",
                      terminal: [
                        {
                          borderColor: "terminal-black",
                          bgColor: "terminal-black", 
                          type: "TEXT",
                          code: `src/
├── domain/          # Чистая бизнес-логика
│   └── entities/
├── data/            # Слой данных 
│   ├── repositories/
│   ├── data-sources/
│   │   └── local/
│   ├── services/
│   ├── dtos/
│   ├── models/
│   └── mappers/
├── presentation/    # Пользовательский интерфейс 
│   ├── controllers/
│   ├── routes/
│   ├── middlewares/
│   └── models/
├── infrastructure/ # Внешние сервисы 
│   ├── database/
│   ├── cache/
│   ├── email/
│   └── server/
└── shared/          # Общий код 
├── utils/
└── constants/`
                        },
                      ],
                    },
                    {
                      h4Title: "Рекомендуемые случаи использования:",
                      list: [
                        "Приложения со сложным бизнес-доменом",
                        "Проекты, требующие высокой тестируемости",
                        "Опытные команды",
                        "Масштабируемые приложения",
                      ],
                      alerts: [
                        {
                          bgColor: 'alert-green',
                          borderColor: 'alert-green',
                          icon: '👍',
                          text: "Преимущества: Технологическая независимость, максимальная тестируемость, масштабируемость"
                        },
                      ],
                    },
                    {
                      h4Title: '3. Hexagonal Architecture (Ports & Adapters)',
                      text: "Описание: Архитектура, которая полностью изолирует бизнес-логику от технических деталей через порты и адаптеры.",
                      h5Title: "Генерируемая структура:",
                      terminal: [
                        {
                          borderColor: "terminal-black",
                          bgColor: "terminal-black", 
                          type: "TEXT",
                          code: `src/
├── core/            # Центральный гексагон
│   ├── domain/
│   │   ├── entities/
│   │   ├── value-objects/
│   │   ├── services/
│   │   └── exceptions/
│   └── application/
│       ├── use-cases/
│       ├── commands/
│       ├── queries/
│       ├── handlers/
│       └── dtos/
├── ports/           # Интерфейсы 
│   ├── inbound/
│   │   ├── http/
│   │   └── cli/
│   └── outbound/
│       ├── repositories/
│       ├── external-services/
│       └── infrastructure/
├── adapters/        # Реализации 
│   ├── inbound/
│   │   └── http/
│   │       ├── controllers/
│   │       ├── middleware/
│   │       └── routes/
│   └── outbound/
│       ├── repositories/
│       │   ├── mysql/
│       │   ├── redis/
│       │   └── mappers/
│       └── external-services/
├── config/          # Конфигурация и DI 
│   ├── dependencies/
│   ├── database/
│   └── environment/
└── main/            # Точка входа`
                        },
                      ],
                    },
                    {
                      h4Title: "Рекомендуемые случаи использования:",
                      list: [
                        "Сложные микросервисы",
                        "Приложения с множественными интерфейсами",
                        "Проекты с частыми изменениями инфраструктуры",
                        "Продвинутая модульная архитектура",
                      ],
                      alerts: [
                        {
                          bgColor: 'alert-green',
                          borderColor: 'alert-green',
                          icon: '👍',
                          text: "Преимущества: Максимальная изоляция, гибкость адаптеров, идеальная тестируемость"
                        },
                      ],
                      arrays: [
                        {
                          headCol: ["Критерий", "Layered", "Clean", "Hexagonal"],
                          rows: [
                            {
                              col1: [
                                {
                                  text: "Сложность",
                                  label: false,
                                }
                              ],
                              col2: [
                                {
                                  text: "⭐⭐",
                                  label: false,
                                }
                              ],
                              col3: [
                                {
                                  text: "⭐⭐⭐⭐",
                                  label: false,
                                }
                              ],
                              col4: [
                                {
                                  text: "⭐⭐⭐⭐⭐",
                                  label: false,
                                }
                              ]
                            },
                            {
                              col1: [
                                {
                                  text: "Тестируемость",
                                  label: false,
                                }
                              ],
                              col2: [
                                {
                                  text: "⭐⭐⭐",
                                  label: false,
                                }
                              ],
                              col3: [
                                {
                                  text: "⭐⭐⭐⭐⭐",
                                  label: false,
                                }
                              ],
                              col4: [
                                {
                                  text: "⭐⭐⭐⭐⭐",
                                  label: false,
                                }
                              ]
                            },
                            {
                              col1: [
                                {
                                  text: "Масштабируемость",
                                  label: false,
                                }
                              ],
                              col2: [
                                {
                                  text: "⭐⭐",
                                  label: false,
                                }
                              ],
                              col3: [
                                {
                                  text: "⭐⭐⭐⭐",
                                  label: false,
                                }
                              ],
                              col4: [
                                {
                                  text: "⭐⭐⭐⭐⭐",
                                  label: false,
                                }
                              ]
                            },
                            {
                              col1: [
                                {
                                  text: "Кривая обучения",
                                  label: false,
                                }
                              ],
                              col2: [
                                {
                                  text: "Пологая",
                                  label: false,
                                }
                              ],
                              col3: [
                                {
                                  text: "Умеренная",
                                  label: false,
                                }
                              ],
                              col4: [
                                {
                                  text: "Крутая",
                                  label: false,
                                }
                              ]
                            },
                            {
                              col1: [
                                {
                                  text: "Идеально для",
                                  label: false,
                                }
                              ],
                              col2: [
                                {
                                  text: "CRUD, простые API",
                                  label: false,
                                }
                              ],
                              col3: [
                                {
                                  text: "Сложный домен",
                                  label: false,
                                }
                              ],
                              col4: [
                                {
                                  text: "Микросервисы",
                                  label: false,
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    },
                  ],
                },
              ]
            },
            {
              id: 'section6',
              h2Title: "Конфигурация",
              subBlocs: [
                {
                  id: 'sub-1',
                  subchildBlocs: [
                    {
                      h4Title: 'TypeScript vs JavaScript',
                      text: "ArchiTS полностью поддерживает TypeScript и JavaScript с оптимизированными конфигурациями для каждого языка.",
                      h5Title: "TypeScript (настоятельно рекомендуется)",
                      alerts: [
                        {
                          bgColor: 'alert-green',
                          borderColor: 'alert-green',
                          icon: '👍',
                          text: "Преимущества TypeScript: Статическая типизация, улучшенный IntelliSense, обнаружение ошибок на этапе компиляции, лучшая документация кода"
                        },
                      ],
                    },
                    {
                      h5Title: "Генерируемые файлы:",
                      labels: [
                        {
                          label: "tsconfig.json",
                          text: "Оптимизированная конфигурация TypeScript",
                        },
                        {
                          label: "src/index.ts",
                          text: "Точка входа TypeScript",
                        },
                        {
                          label: "jest.config.ts",
                          text: "Конфигурация Jest для TypeScript",
                        },
                      ],
                    },
                    {
                      h5Title: "TypeScript: Генерируемые npm-скрипты:",
                      terminal: [
                        {
                          borderColor: "terminal-black",
                          bgColor: "terminal-black", 
                          type: "JSON",
                          code: `{ 
"scripts": {
"start": "node dist/src/index.js",
"dev": "nodemon src/index.ts",
"build": "tsc",
"watch": "tsc --watch",
"lint": "eslint src/**/*.ts",
"lint:fix": "eslint src/**/*.ts --fix"
}
}`
                        },
                      ],
                    },
                    {
                      h5Title: "JavaScript: Генерируемые npm-скрипты:",
                      terminal: [
                        {
                          borderColor: "terminal-black",
                          bgColor: "terminal-black", 
                          type: "JSON",
                          code: `{ 
"scripts": {
"start": "node src/index.js",
"dev": "nodemon src/index.js",
"lint": "eslint src/**/*.js",
"lint:fix": "eslint src/**/*.js --fix" 
} 
}`
                        },
                      ],
                    },
                    {
                      h4Title: "Конфигурация ExpressJS",
                      text: "Вы можете выбрать использование ExpressJS или нативного Node.js при создании проекта.",
                      terminal: [
                        {
                          borderColor: "terminal-black",
                          bgColor: "terminal-black", 
                          type: "TYPESCRIPT",
                          code: `import express, { Express, Request, Response } from 'express';

const server = express();
const PORT = 3000;

// Маршруты 
server.get('/', (req: Request, res: Response) => { 
res.json({ 
    message: 'Welcome to Archi API',
    version: '1.0.0', 
    status: 'running', 
    stack: 'NodeJS, Typescript',
    library: 'ExpressJS' 
});
}); 

// Запуск сервера 
server.listen(PORT, () => { 
console.log('Server running on http://localhost:' + PORT); 
});`
                        },
                      ],
                    },
                    {
                      h4Title: "Переменные окружения",
                      text: "ArchiTS автоматически генерирует файл .env со всеми важными переменными:",
                      terminal: [
                        {
                          borderColor: "terminal-black",
                          bgColor: "terminal-black", 
                          type: "BASH",
                          code: `# Окружение 
NODE_ENV=development 

# Сервер 
LISTEN_PORT="3000" 
SERVER_NAME="ArchiTS API" 
VERSION="1.0.0" 

# База данных 
DB_HOST="localhost" 
DB_PORT="3306" 
DB_NAME="archi_db" 
DB_USER="root" 
DB_PASSWORD="my-super-password" 
DB_CONNEXION_LIMIT="100" 

# Redis 
REDIS_PORT="6379" 
REDIS_HOST="localhost" 
REDIS_PASSWORD="my-super-password" 
REDIS_EXPIRES_IN="3600" 

# JWT 
JWT_SECRET_KEY="your-secret-key" 
JWT_REFRESH_SECRET_KEY="your-refresh-secret-key" 
JWT_DURATION="2h" 
JWT_REFRESH_TOKEN_TIME="20h" 

# CORS 
CORS_ALLOWED_ORIGINS="http://localhost:3000" 
CORS_CREDENTIALS="true" 

# SMTP 
MAIL_HOST="mail.domain.fr" 
MAIL_PORT="465" 
MAIL_SECURE="true" 
MAIL_AUTH_USER="exemple@domain.fr" 
MAIL_AUTH_PASSWORD="my-super-password"`
                        },
                      ],
                      alerts: [
                        {
                          bgColor: 'alert-red',
                          borderColor: 'alert-red',
                          icon: '🔒',
                          text: "Безопасность: Не забудьте изменить значения по умолчанию, особенно пароли и секретные ключи перед переходом в продакшн!"
                        },
                      ],
                    },
                  ],
                },
              ]
            },
            {
              id: 'section7',
              h2Title: "Справочник CLI",
              subBlocs: [
                {
                  id: 'sub-1',
                  subchildBlocs: [
                    {
                      h4Title: 'archi create',
                      text: "Основная команда для создания нового проекта с ArchiTS.",
                      terminal: [
                        {
                          borderColor: "terminal-black",
                          bgColor: "terminal-black", 
                          type: "BASH",
                          code: `archi create`
                        },
                      ],
                    },
                    {
                      h5Title: "Интерактивный процесс:",
                      list: [
                        "Имя проекта: Определяет имя папки и пакета",
                        "Архитектура: Выбор между Layered, Clean или Hexagonal",
                        "Язык: TypeScript или JavaScript",
                        "ExpressJS: Включать или нет фреймворк Express"
                      ]
                    },
                    {
                      h5Title: "Автоматические действия:",
                      list: [
                        "Создание структуры папок",
                        "Генерация конфигурационных файлов",
                        "Установка npm зависимостей",
                        "Установка pnpm",
                        "Инициализация Git (если применимо)"
                      ]
                    },
                    {
                      h4Title: 'archi version',
                      text: "Показывает подробную информацию о версии и окружении.",
                      terminal: [
                        {
                          borderColor: "terminal-black",
                          bgColor: "terminal-black", 
                          type: "BASH",
                          code: `# Короткая версия
archi -v 

# или 
archi --version 

# Подробная информация
archi version`
                        },
                      ],
                    },
                    {
                      h4Title: 'Устранение неполадок',
                      h5Title: 'Типичные проблемы',
                      text: "Решения для наиболее распространенных проблем:",
                      terminal: [
                        {
                          borderColor: "terminal-black",
                          bgColor: "terminal-black", 
                          message: "❌ Ошибка: archi: command not found",
                          text: "Решения:",
                          type: "BASH",
                          code: `# Перезагрузка shell
source ~/.bashrc 

# Или проверка установки 
cd archi-ts-cli 
make install`
                        },
                        {
                          message: "❌ Ошибка: Permission denied",
                          text: "Решения:",
                          type: "BASH",
                          bgColor: 'red',
                          borderColor: 'red',
                          code: `# Предоставление прав выполнения
chmod +x archi 

# Или переустановка 
make clean 
make install`
                        },
                        {
                          message: "❌ Ошибка: npm install failed",
                          text: "Решения:",
                          type: "BASH",
                          bgColor: 'red',
                          borderColor: 'red',
                          code: `# Очистка кеша npm
npm cache clean --force

# Удаление node_modules и повторная установка
rm -rf node_modules package-lock.json
npm install`
                        },
                        {
                          message: "❌ Ошибка: Go not found",
                          text: "Решения:",
                          type: "BASH",
                          bgColor: 'red',
                          borderColor: 'red',
                          code: `# Установка Go (Ubuntu/Debian)
sudo apt update
sudo apt install golang-go

# Проверка установки
go version`
                        },
                      ],
                    },
                    {
                      h5Title: "Логи и диагностика",
                      text: "Для диагностики проблем вы можете:",
                      terminal: [
                        {
                          borderColor: "terminal-black",
                          bgColor: "terminal-black", 
                          type: "BASH",
                          code: `# Проверка установки 
which archi 

# Тест компиляции 
make build 

# Очистка и переустановка 
make clean 
make install`
                        },
                      ],
                    },
                    {
                      h5Title: "Поддержка",
                      text: "Если вы столкнулись с проблемами, не описанными здесь:",
                      list: [
                        "Проверьте GitHub Issues: https://github.com/thomas-bressel/archi-ts-cli/issues",
                        "Участвуйте в обсуждениях: https://github.com/thomas-bressel/archi-ts-cli/discussions",
                        "Обновите ArchiTS до последней версии",
                        "Проверьте совместимость с вашей системой"
                      ]
                    },
                  ],
                },
              ]
            },
          ],
        },
      ],
      footer: [
        {
          line1: '©2025 ArchiTS CLI – Разработано Thomas Bressel',
          line2: 'Опубликовано под лицензией MIT.',
        }
      ],
    },
    // JAP
    {
      version: "1.7.0",
      language: "日本語",
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
          text: 'ディスカッション',
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
          name: 'ホーム',
          router: '/home'
        },
        {
          name: 'ドキュメント',
          router: '/documentation'
        }
      ],
      cta: [
        {
          icon: 'heart.svg',
          iconColor: 'white',
          text: 'スポンサー',
          textColor: 'white',
          bgColor: 'linear-red',
          link: 'https://github.com/sponsors/thomas-bressel',
          anchor: ''
        },
        {
          icon: 'arrow-start.svg',
          iconColor: 'white',
          text: '始める',
          textColor: 'white',
          bgColor: 'linear-blue',
          link: '',
          anchor: 'start'
        }
      ],
      pages: [
        {
          id: 'home',
          pageTitle: 'ホーム',
          h1Title: 'ArchiTS CLI',
          subtitle: "バックエンドアーキテクチャジェネレーター",
          hook: "TypeScriptまたはJavaScriptで堅牢なバックエンド構造を作成します。3つの実証済みアーキテクチャ、自動設定、30秒で準備完了。",
          blocsContent: [
            {
              id: 'bloc1',
              h2Title: 'なぜArchiTSを選ぶのか？',
              hook: 'プロフェッショナルなバックエンドアーキテクチャのためのモダンCLI',
              cards: [
                {
                  id: 'card1',
                  icon: 'layer.svg',
                  h3Title: 'プロフェッショナルなアーキテクチャ',
                  hook: 'バックエンドを最適に構造化するための3つの実証済みアーキテクチャパターンから選択できます。',
                  checklists: [
                    {
                      id: 'check1',
                      text: 'Layered Architecture - 従来のレイヤード構造'
                    },
                    {
                      id: 'check2',
                      text: 'Clean Architecture - ドメイン/インフラ分離'
                    },
                    {
                      id: 'check3',
                      text: 'Hexagonal Architecture - Ports & Adaptersパターン'
                    },
                  ]
                },
                {
                  id: 'card2',
                  icon: 'setting.svg',
                  h3Title: '自動設定',
                  hook: '即座に生産的な開発のため、すべての最新ツールが自動的に設定されます。',
                  checklists: [
                    {
                      id: 'check4',
                      text: 'TypeScript/JavaScript - 完全サポート'
                    },
                    {
                      id: 'check5',
                      text: 'ExpressJS - 統合オプションフレームワーク'
                    },
                    {
                      id: 'check6',
                      text: 'ESLint, Jest, Nodemon - ツール含む'
                    },
                  ]
                },
                {
                  id: 'card3',
                  icon: 'flash.svg',
                  h3Title: '最大限の生産性',
                  hook: '直感的なCLIインターフェースと自動生成で、数秒でプロジェクトを開始できます。',
                  checklists: [
                    {
                      id: 'check7',
                      text: '直感的CLI - シンプルなコマンドライン'
                    },
                    {
                      id: 'check8',
                      text: '既製テンプレート - 基本ファイル生成'
                    },
                    {
                      id: 'check9',
                      text: '依存関係管理 - 自動インストール'
                    },
                  ]
                }
              ],
              terminal: []
            },
            {
              id: 'bloc2',
              h2Title: '迅速なインストール',
              hook: 'いくつかのコマンドでArchiTSの使用を開始',
              cards: [],
              terminal: [
                {
                  type: 'bash',
                  content: `# リポジトリのクローン
git clone https://github.com/thomas-bressel/archi-ts-cli.git
cd archi-ts-cli

# インストール
make install
source ~/.bashrc

# 最初のプロジェクト作成
archi create`
                }
              ],
            }
          ],
        },
        {
          id: 'documentation',
          pageTitle: 'ドキュメント',
          overlay: [
            {
              h5Title: 'はじめに',
              h5Icon: '',
              h5Anchor: 'introduction',
              items: [
                {
                  id: 'item1',
                  name: 'ArchiTSとは？',
                  anchor: 'section1'
                },
                {
                  id: 'item2',
                  name: 'なぜArchiTS？',
                  anchor: 'section2'
                },
                {
                  id: 'item3',
                  name: '機能',
                  anchor: 'section3'
                },
              ]
            },
            {
              h5Title: 'インストール',
              h5Icon: '🚀',
              h5Anchor: 'install',
              items: [
                {
                  id: 'item4',
                  name: '要件',
                  anchor: 'section4'
                },
                {
                  id: 'item5',
                  name: 'Linuxインストール',
                  anchor: 'section5'
                },
                {
                  id: 'item6',
                  name: '検証',
                  anchor: 'section6'
                },
              ]
            },
            {
              h5Title: 'クイックスタート',
              h5Icon: '⚡',
              h5Anchor: 'starting',
              items: [
                {
                  id: 'item7',
                  name: '要件',
                  anchor: 'section7'
                },
                {
                  id: 'item8',
                  name: 'Linuxインストール',
                  anchor: 'section8'
                },
                {
                  id: 'item9',
                  name: '検証',
                  anchor: 'section9'
                }
              ]
            },
            {
              h5Title: 'アーキテクチャ',
              h5Icon: '🏗️',
              h5Anchor: 'archi',
              items: [
                {
                  id: 'item10',
                  name: 'Layered Architecture',
                  anchor: 'section10'
                },
                {
                  id: 'item11',
                  name: 'Clean Architecture',
                  anchor: 'section11'
                },
                {
                  id: 'item12',
                  name: 'Hexagonal Architecture',
                  anchor: 'section12'
                }
              ]
            },
            {
              h5Title: '設定',
              h5Icon: '⚙️',
              h5Anchor: 'config',
              items: [
                {
                  id: 'item13',
                  name: 'Typescript / Javascript',
                  anchor: 'section13'
                },
                {
                  id: 'item14',
                  name: 'Express JS',
                  anchor: 'section14'
                },
                {
                  id: 'item15',
                  name: '環境変数',
                  anchor: 'section15'
                }
              ]
            },
            {
              h5Title: 'CLIリファレンス',
              h5Icon: '🔧',
              h5Anchor: 'cli',
              items: [
                {
                  id: 'item16',
                  name: 'archi create',
                  anchor: 'section16'
                },
                {
                  id: 'item17',
                  name: 'archi version',
                  anchor: 'section17'
                },
                {
                  id: 'item18',
                  name: 'トラブルシューティング',
                  anchor: 'section18'
                }
              ]
            },
          ],
          blocs: [
            {
              id: 'section1',
              h2Title: 'ArchiTS CLI ドキュメント',
              text: "TypeScriptとJavaScriptのためのモダンなバックエンドアーキテクチャジェネレーター、ArchiTS CLIの完全ドキュメントへようこそ。",
              cards: [
                {
                  title: '迅速なインストール',
                  icon: '🚀',
                  text: "数分でArchiTSをインストールし、最初のプロジェクトを作成"
                },
                {
                  title: 'クイックスタート',
                  icon: '⚡',
                  text: "最初のバックエンドアーキテクチャを作成するためのステップバイステップガイド"
                },
                {
                  title: 'アーキテクチャ',
                  icon: '🏗️',
                  text: "サポートされている3つのアーキテクチャパターンを探索"
                }
              ],
            },
            {
              id: 'section2',
              h2Title: "ArchiTSとは？",
              text: "ArchiTS CLIは、Goで開発されたコマンドラインツールで、堅牢で適切に整理されたバックエンドプロジェクト構造を自動生成できます。3つの実証済みアーキテクチャパターンをサポートし、モダンなTypeScriptまたはJavaScriptコードを生成できます。",
              alerts: [
                {
                  bgColor: 'alert-blue',
                  borderColor: 'alert-blue',
                  icon: '💡',
                  text: "哲学：ArchiTSは堅牢なアーキテクチャ、ベストプラクティス、自動設定でバックエンドプロジェクトを開始し、ビジネスロジックに集中できるようにします。"
                },
              ],
              subBlocs: [
                {
                  id: 'sub-1',
                  h3Title: 'なぜArchiTSを使うのか？',
                  subchildBlocs: [
                    {
                      h4Title: 'メリット',
                      list: [
                        "時間節約：30秒でプロジェクト作成",
                        "ベストプラクティス：実証済みアーキテクチャと推奨パターン",
                        "自動設定：ESLint、Jest、TypeScript事前設定",
                        "柔軟性：TypeScript/JavaScriptサポートとオプションExpressJS",
                        "保守性：明確な構造と責任分離",
                      ]
                    },
                    {
                      h4Title: "使用例",
                      list: [
                        "REST APIの迅速な開始",
                        "複雑なアーキテクチャのバックエンドプロジェクト",
                        "適切に構造化されたマイクロサービス",
                        "SOLIDの原則に従うアプリケーション",
                        "高いテスト可能性を要求するプロジェクト",
                      ]
                    },
                  ],
                },
                {
                  id: 'sub-2',
                  h3Title: '主な機能',
                  arrays: [
                    {
                      headCol: ["機能", "説明", "サポート"],
                      rows: [
                        {
                          col1: [
                            {
                              text: "アーキテクチャ",
                              label: false,
                            }
                          ],
                          col2: [
                            {
                              text: "3つのプロフェッショナルなアーキテクチャパターン",
                              label: false,
                            }
                          ],
                          col3: [
                            {
                              text: "✅ Layered, Clean, Hexagonal",
                              label: false,
                            }
                          ]
                        },
                        {
                          col1: [
                            {
                              text: "言語",
                              label: false,
                            }
                          ],
                          col2: [
                            {
                              text: "TypeScriptとJavaScriptの完全サポート",
                              label: false,
                            }
                          ],
                          col3: [
                            {
                              text: "✅ 最適化された設定のTS/JS",
                              label: false,
                            }
                          ]
                        },
                        {
                          col1: [
                            {
                              text: "フレームワーク",
                              label: false,
                            }
                          ],
                          col2: [
                            {
                              text: "オプションExpressJSまたはネイティブNode.js",
                              label: false,
                            }
                          ],
                          col3: [
                            {
                              text: "✅ 作成時に選択",
                              label: false,
                            }
                          ]
                        },
                        {
                          col1: [
                            {
                              text: "ツール",
                              label: false,
                            }
                          ],
                          col2: [
                            {
                              text: "ESLint、Jest、Nodemon事前設定",
                              label: false,
                            }
                          ],
                          col3: [
                            {
                              text: "✅ 自動設定",
                              label: false,
                            }
                          ]
                        },
                        {
                          col1: [
                            {
                              text: "依存関係",
                              label: false,
                            }
                          ],
                          col2: [
                            {
                              text: "パッケージの自動インストール",
                              label: false,
                            }
                          ],
                          col3: [
                            {
                              text: "✅ npm + pnpm",
                              label: false,
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
              ]
            },
            {
              id: 'section3',
              h2Title: "迅速なインストール",
              subBlocs: [
                {
                  id: 'sub-1',
                  subchildBlocs: [
                    {
                      h4Title: '要件',
                      text: "ArchiTSをインストールする前に、システムに以下のツールがインストールされていることを確認してください：",
                      arrays: [
                        {
                          headCol: ["ツール", "最小バージョン", "確認"],
                          rows: [
                            {
                              col1: [
                                {
                                  text: "Go",
                                  label: false,
                                }
                              ],
                              col2: [
                                {
                                  text: "1.18+",
                                  label: false,
                                }
                              ],
                              col3: [
                                {
                                  text: "go version",
                                  label: true,
                                }
                              ]
                            },
                            {
                              col1: [
                                {
                                  text: "NodeJS",
                                  label: false,
                                }
                              ],
                              col2: [
                                {
                                  text: "16+ (LTS推奨)",
                                  label: false,
                                }
                              ],
                              col3: [
                                {
                                  text: "node --version",
                                  label: true,
                                }
                              ]
                            },
                            {
                              col1: [
                                {
                                  text: "npm",
                                  label: false,
                                }
                              ],
                              col2: [
                                {
                                  text: "8+",
                                  label: false,
                                }
                              ],
                              col3: [
                                {
                                  text: "npm --version",
                                  label: true,
                                }
                              ]
                            },
                            {
                              col1: [
                                {
                                  text: "Git",
                                  label: false,
                                }
                              ],
                              col2: [
                                {
                                  text: "2.0+",
                                  label: false,
                                }
                              ],
                              col3: [
                                {
                                  text: "git --version",
                                  label: true,
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    },
                    {
                      h4Title: "Linux/WSLでのインストール",
                      text: "システムにArchiTSをインストールするには、以下の手順に従ってください：",
                      terminal: [
                        {
                          borderColor: "terminal-black",
                          bgColor: "terminal-black", 
                          type: "BASH",
                          code: `# 1. リポジトリのクローン
git clone https://github.com/thomas-bressel/archi-ts-cli.git
cd archi-ts-cli 

# 2. 自動インストール 
make install 

# 3. シェルの再読み込み 
# またはターミナルを再起動
source ~/.bashrc`
                        },
                      ],
                      alerts: [
                        {
                          bgColor: 'alert-yellow',
                          borderColor: 'alert-yellow',
                          icon: '⚠️',
                          text: "重要な注意：ArchiTSは現在LinuxとWSLで最適化されています。ネイティブWindowsでの使用にはWSL（Windows Subsystem for Linux）が必要です。"
                        },
                      ],
                    },
                    {
                      h4Title: "インストールの確認",
                      text: "インストールが完了したら、すべてが正常に動作することを確認してください：",
                      terminal: [
                        {
                          borderColor: "terminal-black",
                          bgColor: "terminal-black", 
                          type: "BASH",
                          code: `# ArchiTSバージョンの確認
archi --version

# 期待される出力: 
archi version 1.7.0

# ヘルプの表示 
archi --help 

# プロジェクト作成のテスト 
archi create`
                        },
                      ],
                      alerts: [
                        {
                          bgColor: 'alert-green',
                          borderColor: 'alert-green',
                          icon: '✅',
                          text: "インストール成功！すべてのコマンドが動作すれば、ArchiTSは使用準備完了です。"
                        },
                      ],
                    },
                  ],
                },
              ]
            },
            {
              id: 'section4',
              h2Title: "クイックスタート",
              subBlocs: [
                {
                  id: 'sub-1',
                  subchildBlocs: [
                    {
                      h4Title: '最初のプロジェクト作成',
                      text: "ArchiTSで最初のバックエンドプロジェクトを作成しましょう：",
                      terminal: [
                        {
                          borderColor: "terminal-black",
                          bgColor: "terminal-black", 
                          type: "BASH",
                          code: `# インタラクティブ作成の開始
archi create`
                        },
                      ],
                    },
                    {
                      text: "ArchiTSが一連の質問を案内します：",
                      terminal: [
                        {
                          borderColor: "terminal-black",
                          bgColor: "terminal-black", 
                          type: "BASH",
                          code: `# プロジェクト作成時のインタラクティブな質問
? プロジェクト名を入力: mon-api-backend
? アーキテクチャを選択: Clean Architecture
? 言語を選択: TypeScript  
? ExpressJSを使用: はい

✅ プロジェクトが正常に作成されました！
📁 フォルダ構造が生成されました
🔧 設定が構成されました
📦 依存関係がインストールされました
🎉 開発準備完了！`
                        },
                      ],
                    },
                    {
                      h4Title: "基本コマンド",
                      text: "プロジェクトが作成されたら、以下が基本的なコマンドです：",
                      terminal: [
                        {
                          borderColor: "terminal-black",
                          bgColor: "terminal-black", 
                          type: "BASH",
                          code: `# プロジェクトに移動
cd mon-api-backend 

# 依存関係のインストール（すでに自動的に実行済み）
npm install 

# 自動リロードでの開発 
npm run dev 

# プロジェクトビルド（TypeScriptのみ） 
npm run build 

# プロダクションで開始 
npm start 

# テストの実行 
npm test 

# コードのリント 
npm run lint`
                        },
                      ],
                    },
                    {
                      h4Title: "完全な例",
                      text: "プロジェクトの作成と開始の完全な例：",
                      terminal: [
                        {
                          borderColor: "terminal-black",
                          bgColor: "terminal-black", 
                          type: "BASH",
                          code: `# 1. プロジェクトの作成
archi create

# → 選択: Clean Architecture, TypeScript, ExpressJS 

# 2. プロジェクトに移動
cd mon-api-backend 

# 3. 開発サーバーの開始 
npm run dev 

# 4. APIのテスト
curl http://localhost:3000 

# プロジェクト情報を含むJSONレスポンス`
                        },
                      ],
                      alerts: [
                        {
                          bgColor: 'alert-blue',
                          borderColor: 'alert-blue',
                          icon: '🎯',
                          text: "結果：Clean Architecture、TypeScript、ExpressJSを使用した機能的なAPIができ、ビジネスロジックを追加する準備が整いました！"
                        },
                      ],
                    },
                  ],
                },
              ]
            },
            {
              id: 'section5',
              h2Title: "サポートされているアーキテクチャ",
              text: "ArchiTSは3つの実証済みアーキテクチャパターンを提供し、それぞれが異なるプロジェクトタイプと複雑さのレベルに適しています。",
              subBlocs: [
                {
                  id: 'sub-1',
                  subchildBlocs: [
                    {
                      h4Title: '1. Layered Architecture（レイヤードアーキテクチャ）',
                      text: "説明：責任の明確な分離を持つ水平レイヤーに整理された従来のアーキテクチャ。",
                      h5Title: "生成される構造：",
                      terminal: [
                        {
                          borderColor: "terminal-black",
                          bgColor: "terminal-black", 
                          type: "TEXT",
                          code: `src/
├── controllers/     # HTTPリクエストの処理
│   └── base/
├── services/        # ビジネスロジック 
│   └── base/
├── repositories/    # データアクセス 
│   └── base/
├── models/          # エンティティとDTO    
│   ├── entities/
│   ├── dtos/
│   ├── requests/
│   ├── responses/
│   └── database/
├── middleware/      # Expressミドルウェア 
│   ├── auth/
│   ├── validation/
│   └── security/
├── routes/          # ルート定義 
│   ├── api/
│   └── web/
└── utils/           # ユーティリティ`
                        },
                      ],
                    },
                    {
                      h4Title: "推奨される使用例：",
                      list: [
                        "シンプルから中規模のCRUDアプリケーション",
                        "従来のREST API",
                        "ジュニアチームのプロジェクト",
                        "迅速なプロトタイピング",
                      ],
                      alerts: [
                        {
                          bgColor: 'alert-green',
                          borderColor: 'alert-green',
                          icon: '👍',
                          text: "メリット：理解しやすい、迅速な開発、初心者に最適"
                        },
                      ],
                    },
                    {
                      h4Title: '2. Clean Architecture',
                      text: "説明：ビジネスロジックに向かって内向きの依存関係を持つ同心円状のレイヤーにアプリケーションを分離するアーキテクチャ。",
                      h5Title: "生成される構造：",
                      terminal: [
                        {
                          borderColor: "terminal-black",
                          bgColor: "terminal-black", 
                          type: "TEXT",
                          code: `src/
├── domain/          # 純粋なビジネスロジック
│   └── entities/
├── data/            # データレイヤー 
│   ├── repositories/
│   ├── data-sources/
│   │   └── local/
│   ├── services/
│   ├── dtos/
│   ├── models/
│   └── mappers/
├── presentation/    # ユーザーインターフェース 
│   ├── controllers/
│   ├── routes/
│   ├── middlewares/
│   └── models/
├── infrastructure/ # 外部サービス 
│   ├── database/
│   ├── cache/
│   ├── email/
│   └── server/
└── shared/          # 共有コード 
    ├── utils/
    └── constants/`
                        },
                      ],
                    },
                    {
                      h4Title: "推奨される使用例：",
                      list: [
                        "複雑なビジネスドメインを持つアプリケーション",
                        "高いテスト可能性を要求するプロジェクト",
                        "経験豊富なチーム",
                        "スケーラブルなアプリケーション",
                      ],
                      alerts: [
                        {
                          bgColor: 'alert-green',
                          borderColor: 'alert-green',
                          icon: '👍',
                          text: "メリット：技術的独立性、最大限のテスト可能性、スケーラビリティ"
                        },
                      ],
                    },
                    {
                      h4Title: '3. Hexagonal Architecture (Ports & Adapters)',
                      text: "説明：ポートとアダプターを通じて技術的詳細からビジネスロジックを完全に分離するアーキテクチャ。",
                      h5Title: "生成される構造：",
                      terminal: [
                        {
                          borderColor: "terminal-black",
                          bgColor: "terminal-black", 
                          type: "TEXT",
                          code: `src/
├── core/            # 中央ヘキサゴン
│   ├── domain/
│   │   ├── entities/
│   │   ├── value-objects/
│   │   ├── services/
│   │   └── exceptions/
│   └── application/
│       ├── use-cases/
│       ├── commands/
│       ├── queries/
│       ├── handlers/
│       └── dtos/
├── ports/           # インターフェース 
│   ├── inbound/
│   │   ├── http/
│   │   └── cli/
│   └── outbound/
│       ├── repositories/
│       ├── external-services/
│       └── infrastructure/
├── adapters/        # 実装 
│   ├── inbound/
│   │   └── http/
│   │       ├── controllers/
│   │       ├── middleware/
│   │       └── routes/
│   └── outbound/
│       ├── repositories/
│       │   ├── mysql/
│       │   ├── redis/
│       │   └── mappers/
│       └── external-services/
├── config/          # 設定とDI 
│   ├── dependencies/
│   ├── database/
│   └── environment/
└── main/            # エントリーポイント`
                        },
                      ],
                    },
                    {
                      h4Title: "推奨される使用例：",
                      list: [
                        "複雑なマイクロサービス",
                        "複数のインターフェースを持つアプリケーション",
                        "インフラの頻繁な変更があるプロジェクト",
                        "高度なモジュラーアーキテクチャ",
                      ],
                      alerts: [
                        {
                          bgColor: 'alert-green',
                          borderColor: 'alert-green',
                          icon: '👍',
                          text: "メリット：最大限の分離、アダプターの柔軟性、完璧なテスト可能性"
                        },
                      ],
                      arrays: [
                        {
                          headCol: ["基準", "Layered", "Clean", "Hexagonal"],
                          rows: [
                            {
                              col1: [
                                {
                                  text: "複雑さ",
                                  label: false,
                                }
                              ],
                              col2: [
                                {
                                  text: "⭐⭐",
                                  label: false,
                                }
                              ],
                              col3: [
                                {
                                  text: "⭐⭐⭐⭐",
                                  label: false,
                                }
                              ],
                              col4: [
                                {
                                  text: "⭐⭐⭐⭐⭐",
                                  label: false,
                                }
                              ]
                            },
                            {
                              col1: [
                                {
                                  text: "テスト可能性",
                                  label: false,
                                }
                              ],
                              col2: [
                                {
                                  text: "⭐⭐⭐",
                                  label: false,
                                }
                              ],
                              col3: [
                                {
                                  text: "⭐⭐⭐⭐⭐",
                                  label: false,
                                }
                              ],
                              col4: [
                                {
                                  text: "⭐⭐⭐⭐⭐",
                                  label: false,
                                }
                              ]
                            },
                            {
                              col1: [
                                {
                                  text: "スケーラビリティ",
                                  label: false,
                                }
                              ],
                              col2: [
                                {
                                  text: "⭐⭐",
                                  label: false,
                                }
                              ],
                              col3: [
                                {
                                  text: "⭐⭐⭐⭐",
                                  label: false,
                                }
                              ],
                              col4: [
                                {
                                  text: "⭐⭐⭐⭐⭐",
                                  label: false,
                                }
                              ]
                            },
                            {
                              col1: [
                                {
                                  text: "学習曲線",
                                  label: false,
                                }
                              ],
                              col2: [
                                {
                                  text: "緩やか",
                                  label: false,
                                }
                              ],
                              col3: [
                                {
                                  text: "中程度",
                                  label: false,
                                }
                              ],
                              col4: [
                                {
                                  text: "急勾配",
                                  label: false,
                                }
                              ]
                            },
                            {
                              col1: [
                                {
                                  text: "最適な用途",
                                  label: false,
                                }
                              ],
                              col2: [
                                {
                                  text: "CRUD、シンプルAPI",
                                  label: false,
                                }
                              ],
                              col3: [
                                {
                                  text: "複雑なドメイン",
                                  label: false,
                                }
                              ],
                              col4: [
                                {
                                  text: "マイクロサービス",
                                  label: false,
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    },
                  ],
                },
              ]
            },
            {
              id: 'section6',
              h2Title: "設定",
              subBlocs: [
                {
                  id: 'sub-1',
                  subchildBlocs: [
                    {
                      h4Title: 'TypeScript vs JavaScript',
                      text: "ArchiTSは各言語に最適化された設定でTypeScriptとJavaScriptを完全にサポートします。",
                      h5Title: "TypeScript（強く推奨）",
                      alerts: [
                        {
                          bgColor: 'alert-green',
                          borderColor: 'alert-green',
                          icon: '👍',
                          text: "TypeScriptのメリット：静的型付け、改善されたIntelliSense、コンパイル時のエラー検出、より良いコード文書化"
                        },
                      ],
                    },
                    {
                      h5Title: "生成されるファイル：",
                      labels: [
                        {
                          label: "tsconfig.json",
                          text: "最適化されたTypeScript設定",
                        },
                        {
                          label: "src/index.ts",
                          text: "TypeScriptエントリーポイント",
                        },
                        {
                          label: "jest.config.ts",
                          text: "TypeScript用Jest設定",
                        },
                      ],
                    },
                    {
                      h5Title: "TypeScript：生成されるnpmスクリプト：",
                      terminal: [
                        {
                          borderColor: "terminal-black",
                          bgColor: "terminal-black", 
                          type: "JSON",
                          code: `{ 
  "scripts": {
    "start": "node dist/src/index.js",
    "dev": "nodemon src/index.ts",
    "build": "tsc",
    "watch": "tsc --watch",
    "lint": "eslint src/**/*.ts",
    "lint:fix": "eslint src/**/*.ts --fix"
  }
}`
                        },
                      ],
                    },
                    {
                      h5Title: "JavaScript：生成されるnpmスクリプト：",
                      terminal: [
                        {
                          borderColor: "terminal-black",
                          bgColor: "terminal-black", 
                          type: "JSON",
                          code: `{ 
  "scripts": {
    "start": "node src/index.js",
    "dev": "nodemon src/index.js",
    "lint": "eslint src/**/*.js",
    "lint:fix": "eslint src/**/*.js --fix" 
  } 
}`
                        },
                      ],
                    },
                    {
                      h4Title: "ExpressJS設定",
                      text: "プロジェクト作成時にExpressJSまたはネイティブNode.jsの使用を選択できます。",
                      terminal: [
                        {
                          borderColor: "terminal-black",
                          bgColor: "terminal-black", 
                          type: "TYPESCRIPT",
                          code: `import express, { Express, Request, Response } from 'express';

const server = express();
const PORT = 3000;

// ルート 
server.get('/', (req: Request, res: Response) => { 
    res.json({ 
        message: 'Welcome to Archi API',
        version: '1.0.0', 
        status: 'running', 
        stack: 'NodeJS, Typescript',
        library: 'ExpressJS' 
    });
}); 

// サーバー開始 
server.listen(PORT, () => { 
    console.log('Server running on http://localhost:' + PORT); 
});`
                        },
                      ],
                    },
                    {
                      h4Title: "環境変数",
                      text: "ArchiTSは重要な変数をすべて含む.envファイルを自動生成します：",
                      terminal: [
                        {
                          borderColor: "terminal-black",
                          bgColor: "terminal-black", 
                          type: "BASH",
                          code: `# 環境 
NODE_ENV=development 

# サーバー 
LISTEN_PORT="3000" 
SERVER_NAME="ArchiTS API" 
VERSION="1.0.0" 

# データベース 
DB_HOST="localhost" 
DB_PORT="3306" 
DB_NAME="archi_db" 
DB_USER="root" 
DB_PASSWORD="my-super-password" 
DB_CONNEXION_LIMIT="100" 

# Redis 
REDIS_PORT="6379" 
REDIS_HOST="localhost" 
REDIS_PASSWORD="my-super-password" 
REDIS_EXPIRES_IN="3600" 

# JWT 
JWT_SECRET_KEY="your-secret-key" 
JWT_REFRESH_SECRET_KEY="your-refresh-secret-key" 
JWT_DURATION="2h" 
JWT_REFRESH_TOKEN_TIME="20h" 

# CORS 
CORS_ALLOWED_ORIGINS="http://localhost:3000" 
CORS_CREDENTIALS="true" 

# SMTP 
MAIL_HOST="mail.domain.fr" 
MAIL_PORT="465" 
MAIL_SECURE="true" 
MAIL_AUTH_USER="exemple@domain.fr" 
MAIL_AUTH_PASSWORD="my-super-password"`
                        },
                      ],
                      alerts: [
                        {
                          bgColor: 'alert-red',
                          borderColor: 'alert-red',
                          icon: '🔒',
                          text: "セキュリティ：プロダクション環境に移行する前に、特にパスワードと秘密鍵のデフォルト値を変更することを忘れないでください！"
                        },
                      ],
                    },
                  ],
                },
              ]
            },
            {
              id: 'section7',
              h2Title: "CLIリファレンス",
              subBlocs: [
                {
                  id: 'sub-1',
                  subchildBlocs: [
                    {
                      h4Title: 'archi create',
                      text: "ArchiTSで新しいプロジェクトを作成するためのメインコマンド。",
                      terminal: [
                        {
                          borderColor: "terminal-black",
                          bgColor: "terminal-black", 
                          type: "BASH",
                          code: `archi create`
                        },
                      ],
                    },
                    {
                      h5Title: "インタラクティブプロセス：",
                      list: [
                        "プロジェクト名：フォルダとパッケージの名前を定義",
                        "アーキテクチャ：Layered、Clean、Hexagonalから選択",
                        "言語：TypeScriptまたはJavaScript",
                        "ExpressJS：Expressフレームワークを含めるかどうか"
                      ]
                    },
                    {
                      h5Title: "自動アクション：",
                      list: [
                        "フォルダ構造の作成",
                        "設定ファイルの生成",
                        "npm依存関係のインストール",
                        "pnpmのインストール",
                        "Gitの初期化（該当する場合）"
                      ]
                    },
                    {
                      h4Title: 'archi version',
                      text: "バージョンと環境に関する詳細情報を表示します。",
                      terminal: [
                        {
                          borderColor: "terminal-black",
                          bgColor: "terminal-black", 
                          type: "BASH",
                          code: `# 短縮版
archi -v 

# または 
archi --version 

# 詳細情報
archi version`
                        },
                      ],
                    },
                    {
                      h4Title: 'トラブルシューティング',
                      h5Title: '一般的な問題',
                      text: "最も一般的な問題の解決策：",
                      terminal: [
                        {
                          borderColor: "terminal-black",
                          bgColor: "terminal-black", 
                          message: "❌ エラー: archi: command not found",
                          text: "解決策:",
                          type: "BASH",
                          code: `# シェルの再読み込み
source ~/.bashrc 

# またはインストールの確認 
cd archi-ts-cli 
make install`
                        },
                        {
                          message: "❌ エラー: Permission denied",
                          text: "解決策:",
                          type: "BASH",
                          bgColor: 'red',
                          borderColor: 'red',
                          code: `# 実行権限の付与
chmod +x archi 

# または再インストール 
make clean 
make install`
                        },
                        {
                          message: "❌ エラー: npm install failed",
                          text: "解決策:",
                          type: "BASH",
                          bgColor: 'red',
                          borderColor: 'red',
                          code: `# npmキャッシュのクリア
npm cache clean --force

# node_modulesの削除と再インストール
rm -rf node_modules package-lock.json
npm install`
                        },
                        {
                          message: "❌ エラー: Go not found",
                          text: "解決策:",
                          type: "BASH",
                          bgColor: 'red',
                          borderColor: 'red',
                          code: `# Goのインストール（Ubuntu/Debian）
sudo apt update
sudo apt install golang-go

# インストールの確認
go version`
                        },
                      ],
                    },
                    {
                      h5Title: "ログと診断",
                      text: "問題を診断するには：",
                      terminal: [
                        {
                          borderColor: "terminal-black",
                          bgColor: "terminal-black", 
                          type: "BASH",
                          code: `# インストールの確認 
which archi 

# コンパイルのテスト 
make build 

# クリーンアップと再インストール 
make clean 
make install`
                        },
                      ],
                    },
                    {
                      h5Title: "サポート",
                      text: "ここに記載されていない問題に遭遇した場合：",
                      list: [
                        "GitHub Issues を確認: https://github.com/thomas-bressel/archi-ts-cli/issues",
                        "ディスカッションに参加: https://github.com/thomas-bressel/archi-ts-cli/discussions",
                        "ArchiTSを最新バージョンに更新",
                        "システムとの互換性を確認"
                      ]
                    },
                  ],
                },
              ]
            },
          ],
        },
      ],
      footer: [
        {
          line1: '©2025 ArchiTS CLI – Thomas Bresselによる開発',
          line2: 'MITライセンスの下で公開。',
        }
      ],
    },




    {
      version: "1.7.0",
      language: "español",
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
          link: 'https://github.com/sponsors/thomas-bressel',
          anchor: ''
        },
        {
          icon: 'arrow-start.svg',
          iconColor: 'white',
          text: 'Comenzar',
          textColor: 'white',
          bgColor: 'linear-blue',
          link: '',
          anchor: 'start'
        }
      ],
      pages: [
        {
          id: 'home',
          pageTitle: 'inicio',
          h1Title: 'ArchiTS CLI',
          subtitle: "Generador de Arquitectura Backend",
          hook: "Crea estructuras backend robustas con TypeScript o JavaScript. Tres arquitecturas probadas, configuración automatizada, listo en 30 segundos.",
          blocsContent: [
            {
              id: 'bloc1',
              h2Title: '¿Por qué elegir ArchiTS?',
              hook: 'Un CLI moderno para arquitecturas backend profesionales',
              cards: [
                {
                  id: 'card1',
                  icon: 'layer.svg',
                  h3Title: 'Arquitecturas Profesionales',
                  hook: 'Elige entre 3 patrones arquitectónicos probados para estructurar tu backend de manera óptima.',
                  checklists: [
                    {
                      id: 'check1',
                      text: 'Layered Architecture - Estructura clásica por capas'
                    },
                    {
                      id: 'check2',
                      text: 'Clean Architecture - Separación dominio/infraestructura'
                    },
                    {
                      id: 'check3',
                      text: 'Hexagonal Architecture - Patrón Ports & Adapters'
                    },
                  ]
                },
                {
                  id: 'card2',
                  icon: 'setting.svg',
                  h3Title: 'Configuración Automatizada',
                  hook: 'Todas las herramientas modernas configuradas automáticamente para un desarrollo productivo inmediato.',
                  checklists: [
                    {
                      id: 'check4',
                      text: 'TypeScript/JavaScript - Soporte completo'
                    },
                    {
                      id: 'check5',
                      text: 'ExpressJS - Framework opcional integrado'
                    },
                    {
                      id: 'check6',
                      text: 'ESLint, Jest, Nodemon - Herramientas incluidas'
                    },
                  ]
                },
                {
                  id: 'card3',
                  icon: 'flash.svg',
                  h3Title: 'Máxima Productividad',
                  hook: 'Interfaz CLI intuitiva y generación automática para iniciar tus proyectos en segundos.',
                  checklists: [
                    {
                      id: 'check7',
                      text: 'CLI intuitivo - Interfaz de línea de comandos simple'
                    },
                    {
                      id: 'check8',
                      text: 'Plantillas listas - Archivos base generados'
                    },
                    {
                      id: 'check9',
                      text: 'Dependencias gestionadas - Instalación automática'
                    },
                  ]
                }
              ],
              terminal: []
            },
            {
              id: 'bloc2',
              h2Title: 'Instalación Rápida',
              hook: 'Comienza a usar ArchiTS en pocos comandos',
              cards: [],
              terminal: [
                {
                  type: 'bash',
                  content: `# Clonar el repositorio
    git clone https://github.com/thomas-bressel/archi-ts-cli.git
    cd archi-ts-cli
    
    # Instalación
    make install
    source ~/.bashrc
    
    # Crear tu primer proyecto
    archi create`
                }
              ],
            }
          ],
        },
        {
          id: 'documentation',
          pageTitle: 'documentación',
          overlay: [
            {
              h5Title: 'Introducción',
              h5Icon: '',
              h5Anchor: 'introduccion',
              items: [
                {
                  id: 'item1',
                  name: '¿Qué es ArchiTS?',
                  anchor: 'section1'
                },
                {
                  id: 'item2',
                  name: '¿Por qué ArchiTS?',
                  anchor: 'section2'
                },
                {
                  id: 'item3',
                  name: 'Funcionalidades',
                  anchor: 'section3'
                },
              ]
            },
            {
              h5Title: 'Instalación',
              h5Icon: '🚀',
              h5Anchor: 'instalacion',
              items: [
                {
                  id: 'item4',
                  name: 'Requisitos previos',
                  anchor: 'section4'
                },
                {
                  id: 'item5',
                  name: 'Instalación Linux',
                  anchor: 'section5'
                },
                {
                  id: 'item6',
                  name: 'Verificación',
                  anchor: 'section6'
                },
              ]
            },
            {
              h5Title: 'Inicio rápido',
              h5Icon: '⚡',
              h5Anchor: 'inicio',
              items: [
                {
                  id: 'item7',
                  name: 'Requisitos previos',
                  anchor: 'section7'
                },
                {
                  id: 'item8',
                  name: 'Instalación Linux',
                  anchor: 'section8'
                },
                {
                  id: 'item9',
                  name: 'Verificación',
                  anchor: 'section9'
                }
              ]
            },
            {
              h5Title: 'Arquitecturas',
              h5Icon: '🏗️',
              h5Anchor: 'arquitecturas',
              items: [
                {
                  id: 'item10',
                  name: 'Layered Architecture',
                  anchor: 'section10'
                },
                {
                  id: 'item11',
                  name: 'Clean Architecture',
                  anchor: 'section11'
                },
                {
                  id: 'item12',
                  name: 'Hexagonal Architecture',
                  anchor: 'section12'
                }
              ]
            },
            {
              h5Title: 'Configuración',
              h5Icon: '⚙️',
              h5Anchor: 'configuracion',
              items: [
                {
                  id: 'item13',
                  name: 'TypeScript / JavaScript',
                  anchor: 'section13'
                },
                {
                  id: 'item14',
                  name: 'Express JS',
                  anchor: 'section14'
                },
                {
                  id: 'item15',
                  name: 'Variables de entorno',
                  anchor: 'section15'
                }
              ]
            },
            {
              h5Title: 'Referencia CLI',
              h5Icon: '🔧',
              h5Anchor: 'referencia',
              items: [
                {
                  id: 'item16',
                  name: 'archi create',
                  anchor: 'section16'
                },
                {
                  id: 'item17',
                  name: 'archi version',
                  anchor: 'section17'
                },
                {
                  id: 'item18',
                  name: 'Solución de problemas',
                  anchor: 'section18'
                }
              ]
            },
          ],
          blocs: [
            {
              id: 'section1',
              h2Title: 'Documentación ArchiTS CLI',
              text: "Bienvenido a la documentación completa de ArchiTS CLI, tu generador de arquitectura backend moderno para TypeScript y JavaScript.",
              cards: [
                {
                  title: 'Instalación Rápida',
                  icon: '🚀',
                  text: "Instala ArchiTS en minutos y crea tu primer proyecto"
                },
                {
                  title: 'Inicio Rápido',
                  icon: '⚡',
                  text: "Guía paso a paso para crear tu primera arquitectura backend"
                },
                {
                  title: 'Arquitecturas',
                  icon: '🏗️',
                  text: "Descubre los tres patrones arquitectónicos soportados"
                }
              ],
            },
            {
              id: 'section2',
              h2Title: "¿Qué es ArchiTS?",
              text: "ArchiTS CLI es una herramienta de línea de comandos desarrollada en Go que permite generar automáticamente estructuras de proyectos backend robustas y bien organizadas. Soporta tres patrones arquitectónicos probados y puede generar código TypeScript o JavaScript moderno.",
              alerts: [
                {
                  bgColor: 'alert-blue',
                  borderColor: 'alert-blue',
                  icon: '💡',
                  text: "Filosofía: ArchiTS te ayuda a iniciar tus proyectos backend con una arquitectura sólida, buenas prácticas y configuración automatizada, permitiéndote enfocarte en tu lógica de negocio."
                },
              ],
              subBlocs: [
                {
                  id: 'sub-1',
                  h3Title: '¿Por qué usar ArchiTS?',
                  subchildBlocs: [
                    {
                      h4Title: 'Ventajas',
                      list: [
                        "Ahorro de tiempo: Creación de proyecto en 30 segundos",
                        "Buenas prácticas: Arquitecturas probadas y patrones recomendados",
                        "Configuración automática: ESLint, Jest, TypeScript preconfigurados",
                        "Flexibilidad: Soporte TypeScript/JavaScript y ExpressJS opcional",
                        "Mantenibilidad: Estructura clara y separación de responsabilidades",
                      ]
                    },
                    {
                      h4Title: "Casos de uso",
                      list: [
                        "Inicio rápido de APIs REST",
                        "Proyectos backend con arquitecturas complejas",
                        "Microservicios bien estructurados",
                        "Aplicaciones siguiendo principios SOLID",
                        "Proyectos que requieren alta testeabilidad",
                      ]
                    },
                  ],
                },
                {
                  id: 'sub-2',
                  h3Title: 'Funcionalidades principales',
                  arrays: [
                    {
                      headCol: ["Funcionalidad", "Descripción", "Soporte"],
                      rows: [
                        {
                          col1: [
                            {
                              text: "Arquitecturas",
                              label: false,
                            }
                          ],
                          col2: [
                            {
                              text: "3 patrones arquitectónicos profesionales",
                              label: false,
                            }
                          ],
                          col3: [
                            {
                              text: "✅ Layered, Clean, Hexagonal",
                              label: false,
                            }
                          ]
                        },
                        {
                          col1: [
                            {
                              text: "Lenguajes",
                              label: false,
                            }
                          ],
                          col2: [
                            {
                              text: "Soporte completo TypeScript y JavaScript",
                              label: false,
                            }
                          ],
                          col3: [
                            {
                              text: "✅ TS/JS con configuración optimizada",
                              label: false,
                            }
                          ]
                        },
                        {
                          col1: [
                            {
                              text: "Framework",
                              label: false,
                            }
                          ],
                          col2: [
                            {
                              text: "ExpressJS opcional o Node.js nativo",
                              label: false,
                            }
                          ],
                          col3: [
                            {
                              text: "✅ Elección durante la creación",
                              label: false,
                            }
                          ]
                        },
                        {
                          col1: [
                            {
                              text: "Herramientas",
                              label: false,
                            }
                          ],
                          col2: [
                            {
                              text: "ESLint, Jest, Nodemon preconfigurados",
                              label: false,
                            }
                          ],
                          col3: [
                            {
                              text: "✅ Configuración automática",
                              label: false,
                            }
                          ]
                        },
                        {
                          col1: [
                            {
                              text: "Dependencias",
                              label: false,
                            }
                          ],
                          col2: [
                            {
                              text: "Instalación automática de paquetes",
                              label: false,
                            }
                          ],
                          col3: [
                            {
                              text: "✅ npm + pnpm",
                              label: false,
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
              ]
            },
            {
              id: 'section3',
              h2Title: "Instalación rápida",
              subBlocs: [
                {
                  id: 'sub-1',
                  subchildBlocs: [
                    {
                      h4Title: 'Requisitos previos',
                      text: "Antes de instalar ArchiTS, asegúrate de tener las siguientes herramientas instaladas en tu sistema:",
                      arrays: [
                        {
                          headCol: ["Herramienta", "Versión mínima", "Verificación"],
                          rows: [
                            {
                              col1: [
                                {
                                  text: "Go",
                                  label: false,
                                }
                              ],
                              col2: [
                                {
                                  text: "1.18+",
                                  label: false,
                                }
                              ],
                              col3: [
                                {
                                  text: "go version",
                                  label: true,
                                }
                              ]
                            },
                            {
                              col1: [
                                {
                                  text: "NodeJS",
                                  label: false,
                                }
                              ],
                              col2: [
                                {
                                  text: "16+ (LTS recomendado)",
                                  label: false,
                                }
                              ],
                              col3: [
                                {
                                  text: "node --version",
                                  label: true,
                                }
                              ]
                            },
                            {
                              col1: [
                                {
                                  text: "npm",
                                  label: false,
                                }
                              ],
                              col2: [
                                {
                                  text: "8+",
                                  label: false,
                                }
                              ],
                              col3: [
                                {
                                  text: "npm --version",
                                  label: true,
                                }
                              ]
                            },
                            {
                              col1: [
                                {
                                  text: "Git",
                                  label: false,
                                }
                              ],
                              col2: [
                                {
                                  text: "2.0+",
                                  label: false,
                                }
                              ],
                              col3: [
                                {
                                  text: "git --version",
                                  label: true,
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    },
                    {
                      h4Title: "Instalación en Linux/WSL",
                      text: "Sigue estos pasos para instalar ArchiTS en tu sistema:",
                      terminal: [
                        {
                          borderColor: "terminal-black",
                          bgColor: "terminal-black", 
                          type: "BASH",
                          code: `# 1. Clonar el repositorio
    git clone https://github.com/thomas-bressel/archi-ts-cli.git
    cd archi-ts-cli 
    
    # 2. Instalación automática 
    make install 
    
    # 3. Recargar tu shell 
    # O reiniciar tu terminal
    source ~/.bashrc`
                        },
                      ],
                      alerts: [
                        {
                          bgColor: 'alert-yellow',
                          borderColor: 'alert-yellow',
                          icon: '⚠️',
                          text: "Nota importante: ArchiTS está actualmente optimizado para Linux y WSL. El uso en Windows nativo requiere WSL (Windows Subsystem for Linux)."
                        },
                      ],
                    },
                    {
                      h4Title: "Verificación de la instalación",
                      text: "Una vez completada la instalación, verifica que todo funcione correctamente:",
                      terminal: [
                        {
                          borderColor: "terminal-black",
                          bgColor: "terminal-black", 
                          type: "BASH",
                          code: `# Verificar la versión de ArchiTS
    archi --version
    
    # Salida esperada: 
    archi version 1.7.0
    
    # Mostrar ayuda 
    archi --help 
    
    # Probar la creación de un proyecto 
    archi create`
                        },
                      ],
                      alerts: [
                        {
                          bgColor: 'alert-green',
                          borderColor: 'alert-green',
                          icon: '✅',
                          text: "¡Instalación exitosa! Si todos los comandos funcionan, ArchiTS está listo para usar."
                        },
                      ],
                    },
                  ],
                },
              ]
            },
            {
              id: 'section4',
              h2Title: "Inicio Rápido",
              subBlocs: [
                {
                  id: 'sub-1',
                  subchildBlocs: [
                    {
                      h4Title: 'Crear tu primer proyecto',
                      text: "Creemos juntos tu primer proyecto backend con ArchiTS:",
                      terminal: [
                        {
                          borderColor: "terminal-black",
                          bgColor: "terminal-black", 
                          type: "BASH",
                          code: `# Lanzar la creación interactiva
    archi create`
                        },
                      ],
                    },
                    {
                      text: "ArchiTS te guiará a través de una serie de preguntas:",
                      terminal: [
                        {
                          borderColor: "terminal-black",
                          bgColor: "terminal-black", 
                          type: "BASH",
                          code: `# Verificar la versión de ArchiTS
    archi --version
    
    # Salida esperada: 
    archi version 1.7.0
    
    # Mostrar ayuda 
    archi --help 
    
    # Probar la creación de un proyecto 
    archi create`
                        },
                      ],
                    },
                    {
                      h4Title: "Comandos básicos",
                      text: "Una vez creado tu proyecto, aquí están los comandos esenciales:",
                      terminal: [
                        {
                          borderColor: "terminal-black",
                          bgColor: "terminal-black", 
                          type: "BASH",
                          code: `# Navegar al proyecto
    cd mi-api-backend 
    
    # Instalación de dependencias (ya hecho automáticamente)
    npm install 
    
    # Desarrollo con recarga automática 
    npm run dev 
    
    # Construir el proyecto (solo TypeScript) 
    npm run build 
    
    # Iniciar en producción 
    npm start 
    
    # Ejecutar tests 
    npm test 
    
    # Linter el código 
    npm run lint`
                        },
                      ],
                    },
                    {
                      h4Title: "Ejemplo completo",
                      text: "Aquí tienes un ejemplo completo de creación e inicio de un proyecto:",
                      terminal: [
                        {
                          borderColor: "terminal-black",
                          bgColor: "terminal-black", 
                          type: "BASH",
                          code: `# 1. Crear el proyecto
    archi create
    
    # → Elegir: Clean Architecture, TypeScript, ExpressJS 
    
    # 2. Navegar al proyecto
    cd mi-api-backend 
    
    # 3. Iniciar el servidor de desarrollo 
    npm run dev 
    
    # 4. Probar la API
    curl http://localhost:3000 
    
    # Respuesta JSON con información del proyecto
    `
                        },
                      ],
                      alerts: [
                        {
                          bgColor: 'alert-blue',
                          borderColor: 'alert-blue',
                          icon: '🎯',
                          text: "¡Resultado: Ahora tienes una API funcional con arquitectura Clean, TypeScript y ExpressJS, lista para recibir tu lógica de negocio!"
                        },
                      ],
                    },
                  ],
                },
              ]
            },
            {
              id: 'section5',
              h2Title: "Arquitecturas soportadas",
              text: "ArchiTS propone tres patrones arquitectónicos probados, cada uno adaptado a diferentes tipos de proyectos y niveles de complejidad.",
              subBlocs: [
                {
                  id: 'sub-1',
                  subchildBlocs: [
                    {
                      h4Title: '1. Layered Architecture (Arquitectura por capas)',
                      text: "Descripción: Arquitectura tradicional organizada en capas horizontales con separación clara de responsabilidades.",
                      h5Title: "Estructura generada:",
                      terminal: [
                        {
                          borderColor: "terminal-black",
                          bgColor: "terminal-black", 
                          type: "TEXT",
                          code: `src/ ├── controllers/ # Gestión de peticiones HTTP
         │ └── base/ ├── services/ # Lógica de negocio 
         │ └── base/ ├── repositories/ # Acceso a datos 
         │ └── base/ ├── models/ # Entidades y DTOs    
         │ ├── entities/ 
         │ ├── dtos/ 
         │ ├── requests/ 
         │ ├── responses/ 
         │ └── database/ 
         ├── middleware/ # Middlewares Express 
         │ ├── auth/ 
         │ ├── validation/ 
         │ └── security/ 
         ├── routes/ # Definición de rutas 
         │ ├── api/ 
         │ └── web/ └── utils/ # Utilidades
    `
                        },
                      ],
                    },
                    {
                      h4Title: "Casos de uso recomendados:",
                      list: [
                        "Aplicaciones CRUD simples a medianas",
                        "APIs REST tradicionales",
                        "Proyectos con equipo junior",
                        "Prototipado rápido",
                      ],
                      alerts: [
                        {
                          bgColor: 'alert-green',
                          borderColor: 'alert-green',
                          icon: '👍',
                          text: "Ventajas: Fácil de entender, rápido de desarrollar, ideal para comenzar"
                        },
                      ],
                    },
                    {
                      h4Title: '2. Clean Architecture',
                      text: "Descripción: Arquitectura que separa el dominio de negocio de los detalles técnicos con clara inversión de dependencias.",
                      h5Title: "Estructura generada:",
                      terminal: [
                        {
                          borderColor: "terminal-black",
                          bgColor: "terminal-black", 
                          type: "TEXT",
                          code: `src/ ├── domain/ # Núcleo de negocio puro
         │ └── entities/ 
         ├── data/ # Capa de datos 
         │ ├── repositories/ 
         │ ├── data-sources/ 
         │ │ └── local/ 
         │ ├── services/ 
         │ ├── dtos/ 
         │ ├── models/ 
         │ └── mappers/ 
         ├── presentation/ # Interfaz de usuario 
         │ ├── controllers/ 
         │ ├── routes/ 
         │ ├── middlewares/ 
         │ └── models/ 
         ├── infrastructure/ # Servicios externos 
         │ ├── database/ 
         │ ├── cache/ 
         │ ├── email/ 
         │ └── server/ 
         └── shared/ # Código compartido 
         ├── utils/ 
         └── constants/
    `
                        },
                      ],
                    },
                    {
                      h4Title: "Casos de uso recomendados:",
                      list: [
                        "Aplicaciones con dominio de negocio complejo",
                        "Proyectos que requieren alta testeabilidad",
                        "Equipos experimentados",
                        "Aplicaciones escalables",
                      ],
                      alerts: [
                        {
                          bgColor: 'alert-green',
                          borderColor: 'alert-green',
                          icon: '👍',
                          text: "Ventajas: Independencia tecnológica, testeabilidad máxima, escalabilidad"
                        },
                      ],
                    },
                    {
                      h4Title: '3. Hexagonal Architecture (Ports & Adapters)',
                      text: "Descripción: Arquitectura que aísla completamente el núcleo de negocio de los detalles técnicos mediante ports y adapters.",
                      h5Title: "Estructura generada:",
                      terminal: [
                        {
                          borderColor: "terminal-black",
                          bgColor: "terminal-black", 
                          type: "TEXT",
                          code: `src/ ├── core/ # Hexágono central
         │ ├── domain/ 
         │ │ ├── entities/ 
         │ │ ├── value-objects/ 
         │ │ ├── services/ 
         │ │ └── exceptions/ 
         │ └── application/ 
         │ ├── use-cases/
         │ ├── commands/ 
         │ ├── queries/ 
         │ ├── handlers/ 
         │ └── dtos/ 
         ├── ports/ # Interfaces 
         │ ├── inbound/ 
         │ │ ├── http/ 
         │ │ └── cli/ 
         │ └── outbound/ 
         │ ├── repositories/ 
         │ ├── external-services/ 
         │ └── infrastructure/ 
         ├── adapters/ # Implementaciones 
         │ ├── inbound/ 
         │ │ └── http/ 
         │ │ ├── controllers/ 
         │ │ ├── middleware/ 
         │ │ └── routes/ 
         │ └── outbound/ 
         │ ├── repositories/ 
         │ │ ├── mysql/ 
         │ │ ├── redis/ 
         │ │ └── mappers/ 
         │ └── external-services/ 
         ├── config/ # Configuración e DI 
         │ ├── dependencies/ 
         │ ├── database/ 
         │ └── environment/ 
         └── main/ # Punto de entrada
    `
                        },
                      ],
                    },
                    {
                      h4Title: "Casos de uso recomendados:",
                      list: [
                        "Microservicios complejos",
                        "Aplicaciones que requieren múltiples interfaces",
                        "Proyectos con cambios frecuentes de infraestructura",
                        "Arquitectura modular avanzada",
                      ],
                      alerts: [
                        {
                          bgColor: 'alert-green',
                          borderColor: 'alert-green',
                          icon: '👍',
                          text: "Ventajas: Aislamiento máximo, flexibilidad de adaptadores, testeabilidad perfecta"
                        },
                      ],
                      arrays: [
                        {
                          headCol: ["Criterio", "Layered", "Clean", "Hexagonal"],
                          rows: [
                            {
                              col1: [
                                {
                                  text: "Complejidad",
                                  label: false,
                                }
                              ],
                              col2: [
                                {
                                  text: "⭐⭐",
                                  label: false,
                                }
                              ],
                              col3: [
                                {
                                  text: "⭐⭐⭐⭐",
                                  label: false,
                                }
                              ],
                              col4: [
                                {
                                  text: "Pronunciada",
                                  label: false,
                                }
                              ]
                            },
                            {
                              col1: [
                                {
                                  text: "Ideal para",
                                  label: false,
                                }
                              ],
                              col2: [
                                {
                                  text: "CRUD, APIs simples",
                                  label: false,
                                }
                              ],
                              col3: [
                                {
                                  text: "Dominio complejo",
                                  label: false,
                                }
                              ],
                              col4: [
                                {
                                  text: "Microservicios",
                                  label: false,
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    },
                  ],
                },
              ]
            },
            {
              id: 'section6',
              h2Title: "Configuración",
              subBlocs: [
                {
                  id: 'sub-1',
                  subchildBlocs: [
                    {
                      h4Title: 'TypeScript vs JavaScript',
                      text: "ArchiTS soporta completamente TypeScript y JavaScript con configuraciones optimizadas para cada lenguaje.",
                      h5Title: "TypeScript (Altamente recomendado)",
                      alerts: [
                        {
                          bgColor: 'alert-green',
                          borderColor: 'alert-green',
                          icon: '👍',
                          text: "Ventajas de TypeScript: Tipado estático, IntelliSense mejorado, detección de errores en tiempo de compilación, mejor documentación del código"
                        },
                      ],
                    },
                    {
                      h5Title: "Archivos generados:",
                      labels: [
                        {
                          label: "tsconfig.json",
                          text: "Configuración TypeScript optimizada",
                        },
                        {
                          label: "src/index.ts",
                          text: "Punto de entrada TypeScript",
                        },
                        {
                          label: "jest.config.ts",
                          text: "Configuración Jest para TypeScript",
                        },
                      ],
                    },
                    {
                      h5Title: "TypeScript: Scripts npm generados:",
                      terminal: [
                        {
                          borderColor: "terminal-black",
                          bgColor: "terminal-black", 
                          type: "JSON",
                          code: `{ "scripts": 
      { "start": "node dist/src/index.js",
        "dev": "nodemon src/index.ts",
        "build": "tsc",
        "watch": "tsc --watch",
        "lint": "eslint src/**/*.ts",
        "lint:fix": "eslint src/**/*.ts --fix"
      }
    }`
                        },
                      ],
                    },
                    {
                      h5Title: "JavaScript: Scripts npm generados:",
                      terminal: [
                        {
                          borderColor: "terminal-black",
                          bgColor: "terminal-black", 
                          type: "JSON",
                          code: `{ "scripts": 
       { "start": "node src/index.js",
         "dev": "nodemon src/index.js",
         "lint": "eslint src/**/*.js",
         "lint:fix": "eslint src/**/*.js --fix" 
       } 
    }`
                        },
                      ],
                    },
                    {
                      h4Title: "Configuración ExpressJS",
                      text: "Puedes elegir usar ExpressJS o Node.js nativo durante la creación del proyecto.",
                      terminal: [
                        {
                          borderColor: "terminal-black",
                          bgColor: "terminal-black", 
                          type: "TYPESCRIPT",
                          code: `import express, { Express, Request, Response } from 'express';
    const server = express();
    const PORT = 3000; // Rutas 
    
    server.get('/', (req: Request, res: Response) => { 
        res.json({ 
             message: 'Bienvenido a Archi API',
             version: '1.0.0', 
             status: 'running', 
             stack: 'NodeJS, Typescript',
             library: 'ExpressJS' 
        });
    }); 
    
    // Iniciar servidor 
    server.listen(PORT, () => { 
        console.log('Servidor ejecutándose en http://localhost:' + PORT); 
    });
    `
                        },
                      ],
                    },
                    {
                      h4Title: "Variables de entorno",
                      text: "ArchiTS genera automáticamente un archivo .env con todas las variables esenciales:",
                      terminal: [
                        {
                          borderColor: "terminal-black",
                          bgColor: "terminal-black", 
                          type: "BASH",
                          code: `# Entorno 
    NODE_ENV=development 
    
    # Servidor 
    LISTEN_PORT="3000" 
    SERVER_NAME="ArchiTS API" 
    VERSION="1.0.0" 
    
    # Base de datos 
    DB_HOST="localhost" 
    DB_PORT="3306" 
    DB_NAME="archi_db" 
    DB_USER="root" 
    DB_PASSWORD="mi-super-password" 
    DB_CONNEXION_LIMIT="100" 
    
    # Redis 
    REDIS_PORT="6379" 
    REDIS_HOST="localhost" 
    REDIS_PASSWORD="mi-super-password" 
    REDIS_EXPIRES_IN="3600" 
    
    # JWT 
    JWT_SECRET_KEY="tu-clave-secreta" 
    JWT_REFRESH_SECRET_KEY="tu-clave-secreta-refresh" 
    JWT_DURATION="2h" 
    JWT_REFRESH_TOKEN_TIME="20h" 
    
    # CORS 
    CORS_ALLOWED_ORIGINS="http://localhost:3000" 
    CORS_CREDENTIALS="true" 
    
    # SMTP 
    MAIL_HOST="mail.dominio.com" 
    MAIL_PORT="465" 
    MAIL_SECURE="true" 
    MAIL_AUTH_USER="ejemplo@dominio.com" 
    MAIL_AUTH_PASSWORD="mi-super-password"`
                        },
                      ],
                      alerts: [
                        {
                          bgColor: 'alert-red',
                          borderColor: 'alert-red',
                          icon: '🔒',
                          text: "Seguridad: ¡No olvides modificar los valores por defecto, especialmente las contraseñas y claves secretas antes de pasar a producción!"
                        },
                      ],
                    },
                  ],
                },
              ]
            },
            {
              id: 'section7',
              h2Title: "Referencia CLI",
              subBlocs: [
                {
                  id: 'sub-1',
                  subchildBlocs: [
                    {
                      h4Title: 'archi create',
                      text: "Comando principal para crear un nuevo proyecto con ArchiTS.",
                      terminal: [
                        {
                          borderColor: "terminal-black",
                          bgColor: "terminal-black", 
                          type: "BASH",
                          code: `archi create`
                        },
                      ],
                    },
                    {
                      h5Title: "Proceso interactivo:",
                      list: [
                        "Nombre del proyecto: Define el nombre de la carpeta y del paquete",
                        "Arquitectura: Elección entre Layered, Clean o Hexagonal",
                        "Lenguaje: TypeScript o JavaScript",
                        "ExpressJS: Incluir o no el framework Express"
                      ]
                    },
                    {
                      h5Title: "Acciones automáticas:",
                      list: [
                        "Creación de la estructura de carpetas",
                        "Generación de archivos de configuración",
                        "Instalación de dependencias npm",
                        "Instalación de pnpm",
                        "Inicialización Git (si aplica)"
                      ]
                    },
                    {
                      h4Title: 'archi version',
                      text: "Muestra información detallada sobre la versión y el entorno.",
                      terminal: [
                        {
                          borderColor: "terminal-black",
                          bgColor: "terminal-black", 
                          type: "BASH",
                          code: `# Versión corta
    archi -v 
    
    # o 
    archi --version 
    
    # Información detallada
    archi version`
                        },
                      ],
                    },
                    {
                      h4Title: 'Solución de problemas',
                      h5Title: 'Problemas comunes',
                      text: "Aquí están las soluciones a problemas comunes:",
                      terminal: [
                        {
                          borderColor: "terminal-black",
                          bgColor: "terminal-black", 
                          message: "❌ Error: archi: command not found",
                          text: "Soluciones:",
                          type: "BASH",
                          code: `# Recargar el shell
    source ~/.bashrc 
    
    # O verificar la instalación 
    cd archi-ts-cli 
    make install`
                        },
                        {
                          message: "❌ Error: Permission denied",
                          text: "Soluciones:",
                          type: "BASH",
                          bgColor: 'red',
                          borderColor: 'red',
                          code: `# Dar permisos de ejecución
    chmod +x archi 
    
    # O reinstalar 
    make clean 
    make install`
                        },
                        {
                          message: "❌ Error: Dependencies not installed",
                          text: "Soluciones:",
                          type: "BASH",
                          bgColor: 'red',
                          borderColor: 'red',
                          code: `# Instalación manual
    cd tu-proyecto
    npm install
    
    # O usar pnpm
    pnpm install`
                        },
                      ],
                    },
                    {
                      h5Title: "Logs y diagnóstico",
                      text: "Para diagnosticar problemas, puedes:",
                      terminal: [
                        {
                          borderColor: "terminal-black",
                          bgColor: "terminal-black", 
                          type: "BASH",
                          code: `# Verificar la instalación 
    which archi 
    
    # Probar la compilación 
    make build 
    
    # Limpiar y reinstalar 
    make clean 
    make install`
                        },
                      ],
                    },
                    {
                      h5Title: "Soporte",
                      text: "Si encuentras problemas no cubiertos aquí:",
                      list: [
                        "Revisa los GitHub Issues: https://github.com/thomas-bressel/archi-ts-cli/issues",
                        "Únete a las discusiones: https://github.com/thomas-bressel/archi-ts-cli/discussions",
                        "Lee la documentación completa",
                        "Contacta al mantenedor: thomas.bressel@ejemplo.com"
                      ]
                    },
                  ],
                },
              ]
            },
          ],
        },
      ],
      footer: [
        {
          line1: '©2025 ArchiTS CLI – Desarrollado por Thomas Bressel',
          line2: 'Publicado bajo licencia MIT.',
        }
      ],
    },
       
  ]);
}
