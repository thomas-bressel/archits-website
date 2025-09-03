import { computed, Injectable, signal } from '@angular/core';
import { ButtonsList, TerminalContent, BlocContent, LanguageConfig } from '../models/interface.models';

@Injectable({
  providedIn: 'root'
})
export class Interface {
  // Default language
  public readonly currentLanguage = signal('english');

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
   * Get the first terminal of a bloc with its ID
   * @param blocId 
   * @returns 
   */
  public getTerminalByBlocId(blocId: string): TerminalContent | undefined {
    const bloc = this.getBlocById(blocId);
    return bloc?.terminal?.[0] || undefined;
  }

  /**
   * Get all terminals of a bloc with its ID
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
      version: "1.9.0b",
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
          hook: "Créez des structures backend robustes avec TypeScript. Trois architectures éprouvées, configuration automatisée, prêt en 30 secondes.",
          blocsContent: [
            {
              id: 'bloc1',
              h2Anchor: 'introduction',
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
                      text: 'TypeScript - Support plus robuste'
                    },
                    {
                      id: 'check5',
                      text: 'ExpressJS - Framework optionnel intégré'
                    },
                    {
                      id: 'check6',
                      text: 'ESLint, Jest, Nodemon - Tooling inclus'
                    },
                    {
                      id: 'check10',
                      text: 'ORM préconfiguré prêt à l\'emplois avec SQlite'
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
                      text: 'Templates prêts - Fichiers de base et de test générés'
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
              h2Anchor: 'installation',
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
              items: [
                {
                  id: 'item1',
                  name: 'Qu’est-ce qu’ArchiTS ?',
                  anchor: 'section2-1'
                },
                {
                  id: 'item2',
                  name: 'Pourquoi ArchiTS ?',
                  anchor: 'section2-2'
                },
                {
                  id: 'item3',
                  name: 'Fonctionnalités',
                  anchor: 'section2-3'
                },
              ]
            },
            {
              h5Title: 'Installation',
              h5Icon: 'download.svg',
              h5Anchor: 'install',
              items: [
                {
                  id: 'item4',
                  name: 'Prérequis',
                  anchor: 'section3-1'
                },
                {
                  id: 'item5',
                  name: 'Installation Linux',
                  anchor: 'section3-2'
                },
                {
                  id: 'item6',
                  name: 'Vérification',
                  anchor: 'section3-3'
                },
              ]
            },
            {
              h5Title: 'Démarrage rapide',
              h5Icon: 'arrow-start.svg',
              h5Anchor: 'starting',
              items: [
                {
                  id: 'item7',
                  name: 'Créer votre premier projet',
                  anchor: 'section4-1'
                },
                {
                  id: 'item8',
                  name: 'Commandes de base',
                  anchor: 'section4-2'
                },
                {
                  id: 'item9',
                  name: 'Exemple complet',
                  anchor: 'section4-3'
                }
              ]
            },
            {
              h5Title: 'Architectures',
              h5Icon: 'layer.svg',
              h5Anchor: 'archi',
              items: [
                {
                  id: 'item10',
                  name: 'Layered Architecture',
                  anchor: 'section5-1'
                },
                {
                  id: 'item11',
                  name: 'Clean Architecture',
                  anchor: 'section5-2'
                },
                {
                  id: 'item12',
                  name: 'Hexagonal Architecture',
                  anchor: 'section5-3'
                }
              ]
            },
            {
              h5Title: 'Configuration',
              h5Icon: 'setting.svg',
              h5Anchor: 'configuration',
              items: [
                {
                  id: 'item13',
                  name: 'Typescript',
                  anchor: 'section6-1'
                },
                {
                  id: 'item14',
                  name: 'Express JS',
                  anchor: 'section6-2'
                },
                {
                  id: 'item15',
                  name: 'Variables d’environnements',
                  anchor: 'section6-3'
                }
              ]
            },
            {
              h5Title: 'Référence CLI',
              h5Icon: 'console.svg',
              h5Anchor: 'reference',
              items: [
                {
                  id: 'item16',
                  name: 'archi create',
                  anchor: 'section7-1'
                },
                {
                  id: 'item17',
                  name: 'archi generate entity',
                  anchor: 'section7-2'
                },
                {
                  id: 'item18',
                  name: 'archi version',
                  anchor: 'section7-3'
                },
                {
                  id: 'item19',
                  name: 'Dépannage',
                  anchor: 'section7-4'
                }
              ]
            },
          ],
          blocs: [
            {
              id: 'section1',
              h2Title: 'Documentation ArchiTS CLI',
              h2Anchor: 'introduction',
              text: "Bienvenue dans la documentation complète d'ArchiTS CLI, votre générateur d'architecture backend moderne pour TypeScript.",
              cards: [
                {
                  title: 'Installation Rapide',
                  icon: 'download.svg',
                  text: "Installez ArchiTS en quelques minutes et créez votre premier projet"
                },
                {
                  title: 'Démarrage Rapide',
                  icon: 'arrow-start.svg',
                  text: "Guide pas à pas pour créer votre première architecture backend"
                },
                {
                  title: 'Architectures',
                  icon: 'layer.svg',
                  text: "Découvrez les trois patterns architecturaux supportés"
                }
              ],
            },
            {
              id: 'section2',
              h2Title: "Qu'est-ce qu'ArchiTS ?",
              h2Anchor: 'section2-1',
              text: "ArchiTS CLI est un outil en ligne de commande développé en Go qui permet de générer automatiquement des structures de projets backend robustes et bien organisées. Il supporte trois patterns architecturaux éprouvés et peut générer du code TypeScript moderne.",
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
                  h3Anchor: 'section2-2',
                  subchildBlocs: [
                    {
                      h4Title: 'Avantages',
                      list: [
                        "Gain de temps: Création de projet en 30 secondes",
                        "Bonnes pratiques : Architectures éprouvées et patterns recommandés",
                        "Configuration automatique : ESLint, Jest, TypeScript pré-configurés",
                        "Flexibilité : Support TypeScript et ExpressJS optionnel",
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
                  h3Anchor: 'section2-3',
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
                              text: "Support complet TypeScript",
                              label: false,
                            }
                          ],
                          col3: [
                            {
                              text: "✅ TS avec configuration optimisée",
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
              h2Title: "Installation",
              h2Anchor: 'install',
              subBlocs: [
                {
                  id: 'sub-1',
                  subchildBlocs: [
                    {
                      h4Title: 'Prérequis',
                      h4Anchor: 'section3-1',
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
                      h4Anchor: 'section3-2',
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
                      h4Anchor: 'section3-3',
                      text: "Une fois l'installation terminée, vérifiez que tout fonctionne correctement :",
                      terminal: [
                        {
                          borderColor: "terminal-black",
                          bgColor: "terminal-black", 
                          type: "BASH",
                          code: `# Vérifier la version d'ArchiTS
  archi --version

# Sortie attendue: 
  archi version 1.9.0b

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
              h2Anchor: 'starting',
              subBlocs: [
                {
                  id: 'sub-1',
                  subchildBlocs: [
                    {
                      h4Title: 'Créer votre premier projet',
                      h4Anchor: 'section4-1',
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
                          code: `🚀 ArchiTS CLI - Project Scaffolding
Project Name: mon-api-backend
Use the arrow keys to navigate: ↓ ↑ → ← 
Select an architecture: 
Layered Architecture 
▸ Clean Architecture 
Hexagonal Architecture 


Do you want to use ExpressJS library? 
▸ Yes, install Express 
No, I don't need Express 

✅ Project structure created successfully!`
                        },
                      ],
                    },
                    {
                      h4Title: "Commandes de base",
                      h4Anchor: 'section4-2',
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
                      h4Anchor: 'section4-3',
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
              h2Anchor: 'archi',
              text: "ArchiTS propose trois patterns architecturaux éprouvés, chacun adapté à différents types de projets et niveaux de complexité.",
              subBlocs: [
                {
                  id: 'sub-1',
                  subchildBlocs: [
                    {
                      h4Title: '1. Layered Architecture (Architecture en couches)',
                      h4Anchor: 'section5-1',
                      text: "Description : Architecture traditionnelle organisée en couches horizontales avec séparation claire des responsabilités.",
                      h5Title: "Structure générée :",
                      terminal: [
                        {
                          borderColor: "terminal-black",
                          bgColor: "terminal-black", 
                          type: "TEXT",
                          code: `src/ ├── config/          # Configuration (DB, environnement, logger)
    ├── errors/          # Gestion des erreurs personnalisées
    ├── utils/           # Utilitaires & helpers
    ├── constants/       # Constantes globales
    ├── mappers/         # Mappers entité <-> DTO
    ├── database/        # Couche Base de données
    │   ├── connections/ # Connexions DB
    │   ├── migrations/  # Migrations DB
    │   ├── seeds/       # Données de test
    │   └── queries/     # Requêtes SQL spécifiques
    ├── entities/        # Entités du domaine
    ├── dtos/            # DTOs (Data Transfer Objects)
    │   ├── requests/    # Objets de requête
    │   └── responses/   # Objets de réponse
    ├── repositories/    # Couche Repositories
    │   └── base/        # Fonctions communes aux repositories
    ├── services/        # Couche Services
    │   └── base/        # Fonctions communes aux services
    ├── controllers/     # Couche Controllers
    │   └── base/        # Fonctions communes aux controllers
    ├── middleware/      # Couche Middleware
    │   ├── auth/        # Authentification
    │   ├── validation/  # Validation des données
    │   └── security/    # Sécurité et filtres
    ├── routes/          # Couche Routes
    │   ├── api/         # Routes API
    │   └── web/         # Routes web
    ├── infrastructure/  # Infrastructure / intégrations externes
    │   ├── cache/       # Cache (Redis, etc.)
    │   ├── email/       # Gestion emails
    │   └── modules/     # Modules externes ou services tiers
    ├── database/        # Répertoires externes
    │   ├── backups/     # Sauvegardes
    │   └── schema/      # Schéma DB
    ├── storage/
    │   ├── uploads/
    │   │   ├── avatars/
    │   │   └── documents/
    │   └── logs/
    ├── tests/
    │   ├── unit/
    │   ├── integration/
    │   ├── functional/
    │   └── e2e/
    └── .github/
        └── workflows/   # CI/CD
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
                      h4Anchor: 'section5-2',
                      text: "Description : Architecture modulaire organisée autour du domaine métier, avec une séparation stricte entre la logique métier et les détails techniques (bases de données, frameworks, interfaces). Chaque couche a un rôle précis et les dépendances sont unidirectionnelles, orientées vers le cœur du métier.",
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
                      h4Anchor: 'section5-3',
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
              h2Anchor: 'configuration',
              subBlocs: [
                {
                  id: 'sub-1',
                  subchildBlocs: [
                    {
                      h4Title: 'TypeScript vs JavaScript',
                      h4Anchor: 'section6-1',
                      text: "ArchiTS ne prend désormais plus en charge JavaScript (depuis la version 1.9.0b) et se concentre uniquement sur TypeScript, en raison des limitations de JavaScript concernant l’encapsulation des données dans une approche orientée objet.",
                      h5Title: "TypeScript (le meilleurs !)",
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
                      h4Title: "Configuration ExpressJS",
                      h4Anchor: 'section6-2',
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
                      h4Anchor: 'section6-3',
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
              h2Anchor: 'reference',
              subBlocs: [
                {
                  id: 'sub-1',
                  subchildBlocs: [
                    {
                      h4Title: 'archi create',
                      h4Anchor: 'section7-1',
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
                        "Langage : TypeScript",
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
                      h4Title: 'archi generate entity',
                      h4Anchor: 'section7-2',
                      text: "Commande permettant de générer automatiquement une entité et toutes ses couches associées (repository, service, controller, route), selon l’architecture choisie (Layered, Clean ou Hexagonal).",
                      terminal: [
                        {
                          borderColor: "terminal-black",
                          bgColor: "terminal-black", 
                          type: "BASH",
                          code: `# Génération complète
archi generate entity user  

# Alias court
archi g e user`
                        },
                      ],
                    },
                    {
                      h5Title: "Création automatiques des fichiers :",
                      list: [
                        "<nom>.routes.ts",
                        "<nom>.entity.ts",
                        "<nom>.controller.ts",
                        "<nom>.service.ts",
                        "<nom>.repository.ts",
                      ]

                    },
                    {
                      h5Title: "Génération des tests unitaires Jest :",
                      list: [
                        "tests/unit/repositories/<name>.repository.test.ts",
                        "tests/unit/services/<name>.service.test.ts",
                        "tests/unit/controllers/<name>.controller.test.ts",
                      ]

                    },
                    {
                      h4Title: 'archi version',
                      h4Anchor: 'section7-3',
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
                      h4Anchor: 'section7-4',
                      h5Title: 'Problèmes courants',
                      text: "Affiche les informations détaillées sur la version et l'environnement.",
                      terminal: [
                        {
                          message: "❌ Erreur : archi: command not found",
                          text: "Solutions:",
                          type: "BASH",
                          bgColor: 'alert-red',
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
                          bgColor: 'alert-red',
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
                          bgColor: 'alert-red',
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
                      linksList: [
                        {
                          icon: '💬',
                          textLink: 'Rejoindre la Discussion',
                          urlLink: 'https://github.com/thomas-bressel/archi-ts-cli/discussions',
                          description: "Parfait pour : Questions, astuces, partage de vos projets, ou simplement discuter d'ArchiTS",
                        },
                        {
                          icon: '🐛',
                          textLink: 'Signaler un Problème',
                          urlLink: 'https://github.com/thomas-bressel/archi-ts-cli/issues',
                          description: "Parfait pour : Bugs, problèmes d'installation, ou difficultés techniques",
                        },
                        {
                          icon: '☝️',
                          textLink: 'Demandes de Fonctionnalités',
                          urlLink: 'https://github.com/thomas-bressel/archi-ts-cli/discussions/categories/ideas',
                          description: "Parfait pour : Idées de nouvelles fonctionnalités ou améliorations",
                        },
                      ]
                    }
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



    {
      version: "1.9.0b",
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
          hook: "Create robust backend structures with TypeScript. Three proven architectures, automated configuration, ready in 30 seconds.",
          blocsContent: [
            {
              id: 'bloc1',
              h2Anchor: 'introduction',
              h2Title: 'Why choose ArchiTS?',
              hook: 'A modern CLI for professional backend architectures',
              cards: [
                {
                  id: 'card1',
                  icon: 'layer.svg',
                  h3Title: 'Professional Architectures',
                  hook: 'Choose from 3 proven architectural patterns to optimally structure your backend.',
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
                  hook: 'All modern tools automatically configured for immediate productive development.',
                  checklists: [
                    {
                      id: 'check4',
                      text: 'TypeScript - Strong support'
                    },
                    {
                      id: 'check5',
                      text: 'ExpressJS - Optional integrated framework'
                    },
                    {
                      id: 'check6',
                      text: 'ESLint, Jest, Nodemon - Included tooling'
                    },
                    {
                      id: 'check10',
                      text: 'Preconfigured ORM ready to use with SQLite'
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
                      text: 'Ready templates - Base and test files generated'
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
              h2Anchor: 'installation',
              h2Title: 'Quick Installation',
              hook: 'Get started with ArchiTS in a few commands',
              cards: [],
              terminal: [
                {
                  bgColor: "terminal-black",
                  borderColor: "terminal-black",
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
              items: [
                {
                  id: 'item1',
                  name: 'What is ArchiTS?',
                  anchor: 'section2-1'
                },
                {
                  id: 'item2',
                  name: 'Why ArchiTS?',
                  anchor: 'section2-2'
                },
                {
                  id: 'item3',
                  name: 'Features',
                  anchor: 'section2-3'
                },
              ]
            },
            {
              h5Title: 'Installation',
              h5Icon: 'download.svg',
              h5Anchor: 'install',
              items: [
                {
                  id: 'item4',
                  name: 'Prerequisites',
                  anchor: 'section3-1'
                },
                {
                  id: 'item5',
                  name: 'Linux Installation',
                  anchor: 'section3-2'
                },
                {
                  id: 'item6',
                  name: 'Verification',
                  anchor: 'section3-3'
                },
              ]
            },
            {
              h5Title: 'Quick Start',
              h5Icon: 'arrow-start.svg',
              h5Anchor: 'starting',
              items: [
                {
                  id: 'item7',
                  name: 'Create your first project',
                  anchor: 'section4-1'
                },
                {
                  id: 'item8',
                  name: 'Basic commands',
                  anchor: 'section4-2'
                },
                {
                  id: 'item9',
                  name: 'Complete example',
                  anchor: 'section4-3'
                }
              ]
            },
            {
              h5Title: 'Architectures',
              h5Icon: 'layer.svg',
              h5Anchor: 'archi',
              items: [
                {
                  id: 'item10',
                  name: 'Layered Architecture',
                  anchor: 'section5-1'
                },
                {
                  id: 'item11',
                  name: 'Clean Architecture',
                  anchor: 'section5-2'
                },
                {
                  id: 'item12',
                  name: 'Hexagonal Architecture',
                  anchor: 'section5-3'
                }
              ]
            },
            {
              h5Title: 'Configuration',
              h5Icon: 'setting.svg',
              h5Anchor: 'configuration',
              items: [
                {
                  id: 'item13',
                  name: 'Typescript',
                  anchor: 'section6-1'
                },
                {
                  id: 'item14',
                  name: 'Express JS',
                  anchor: 'section6-2'
                },
                {
                  id: 'item15',
                  name: 'Environment variables',
                  anchor: 'section6-3'
                }
              ]
            },
            {
              h5Title: 'CLI Reference',
              h5Icon: 'console.svg',
              h5Anchor: 'reference',
              items: [
                {
                  id: 'item16',
                  name: 'archi create',
                  anchor: 'section7-1'
                },
                {
                  id: 'item17',
                  name: 'archi generate entity',
                  anchor: 'section7-2'
                },
                {
                  id: 'item18',
                  name: 'archi version',
                  anchor: 'section7-3'
                },
                {
                  id: 'item19',
                  name: 'Troubleshooting',
                  anchor: 'section7-4'
                }
              ]
            },
          ],
          blocs: [
            {
              id: 'section1',
              h2Title: 'ArchiTS CLI Documentation',
              h2Anchor: 'introduction',
              text: "Welcome to the complete documentation of ArchiTS CLI, your modern backend architecture generator for TypeScript.",
              cards: [
                {
                  title: 'Quick Installation',
                  icon: 'download.svg',
                  text: "Install ArchiTS in a few minutes and create your first project"
                },
                {
                  title: 'Quick Start',
                  icon: 'arrow-start.svg',
                  text: "Step-by-step guide to create your first backend architecture"
                },
                {
                  title: 'Architectures',
                  icon: 'layer.svg',
                  text: "Discover the three supported architectural patterns"
                }
              ],
            },
            {
              id: 'section2',
              h2Title: "What is ArchiTS?",
              h2Anchor: 'section2-1',
              text: "ArchiTS CLI is a command-line tool developed in Go that automatically generates robust and well-organized backend project structures. It supports three proven architectural patterns and can generate modern TypeScript code.",
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
                  h3Anchor: 'section2-2',
                  subchildBlocs: [
                    {
                      h4Title: 'Advantages',
                      list: [
                        "Time-saving: Project creation in 30 seconds",
                        "Best practices: Proven architectures and recommended patterns",
                        "Automatic configuration: Pre-configured ESLint, Jest, TypeScript",
                        "Flexibility: TypeScript support and optional ExpressJS",
                        "Maintainability: Clear structure and separation of responsibilities",
                      ]
                    },
                    {
                      h4Title: "Use Cases",
                      list: [
                        "Quick start for REST APIs",
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
                  h3Anchor: 'section2-3',
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
                              text: "Full TypeScript support",
                              label: false,
                            }
                          ],
                          col3: [
                            {
                              text: "✅ TS with optimized configuration",
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
                              text: "Pre-configured ESLint, Jest, Nodemon",
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
              h2Title: "Installation",
              h2Anchor: 'install',
              subBlocs: [
                {
                  id: 'sub-1',
                  subchildBlocs: [
                    {
                      h4Title: 'Prerequisites',
                      h4Anchor: 'section3-1',
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
                      h4Anchor: 'section3-2',
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
                          text: "Important Note: ArchiTS is currently optimized for Linux and WSL. Using it on native Windows requires WSL (Windows Subsystem for Linux)."
                        },
                      ],
                    },
                    {
                      h4Title: "Verification of Installation",
                      h4Anchor: 'section3-3',
                      text: "Once the installation is complete, verify that everything is working correctly:",
                      terminal: [
                        {
                          borderColor: "terminal-black",
                          bgColor: "terminal-black",
                          type: "BASH",
                          code: `# Check ArchiTS version
  archi --version

# Expected output:
  archi version 1.9.0b

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
                          text: "Installation successful! If all commands work, ArchiTS is ready to be used."
                        },
                      ],
                    },
                  ],
                }
              ]
            },
            {
              id: 'section4',
              h2Title: "Quick Start",
              h2Anchor: 'starting',
              subBlocs: [
                {
                  id: 'sub-1',
                  subchildBlocs: [
                    {
                      h4Title: 'Create your first project',
                      h4Anchor: 'section4-1',
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
                          code: `🚀 ArchiTS CLI - Project Scaffolding
Project Name: mon-api-backend
Use the arrow keys to navigate: ↓ ↑ → ← 
Select an architecture: 
Layered Architecture 
▸ Clean Architecture 
Hexagonal Architecture 


Do you want to use ExpressJS library? 
▸ Yes, install Express 
No, I don't need Express 

✅ Project structure created successfully!`
                        },
                      ],
                    },
                    {
                      h4Title: "Basic Commands",
                      h4Anchor: 'section4-2',
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

# Development with automatic reloading
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
                      h4Title: "Complete Example",
                      h4Anchor: 'section4-3',
                      text: "Here is a complete example of creating and starting a project:",
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
                          text: "Result: You now have a functional API with a Clean architecture, TypeScript, and ExpressJS, ready to receive your business logic!"
                        },
                      ],
                    },
                  ],
                }
              ]
            },
            {
              id: 'section5',
              h2Title: "Supported Architectures",
              h2Anchor: 'archi',
              text: "ArchiTS offers three proven architectural patterns, each adapted to different types of projects and levels of complexity.",
              subBlocs: [
                {
                  id: 'sub-1',
                  subchildBlocs: [
                    {
                      h4Title: '1. Layered Architecture',
                      h4Anchor: 'section5-1',
                      text: "Description: Traditional architecture organized in horizontal layers with clear separation of responsibilities.",
                      h5Title: "Generated Structure:",
                      terminal: [
                        {
                          borderColor: "terminal-black",
                          bgColor: "terminal-black",
                          type: "TEXT",
                          code: `src/ ├── config/         # Configuration (DB, environment, logger)
     ├── errors/          # Custom errors & handlers
     ├── utils/           # Utilities & helpers
     ├── constants/       # Constants
     ├── mappers/         # Entity <-> DTO mappers
     ├── database/        # Database layer
     │ ├── connections/
     │ ├── migrations/
     │ ├── seeds/
     │ └── queries/
     ├── entities/        # Domain entities
     ├── dtos/            # Data Transfer Objects
     │ ├── requests/
     │ └── responses/
     ├── repositories/    # Repositories layer
     │ └── base/          # Base repository with shared methods
     ├── services/        # Services layer (business logic)
     │ └── base/          # Base service with shared methods
     ├── controllers/     # Controllers layer (HTTP request handling)
     │ └── base/          # Base controller with shared methods
     ├── middleware/      # Express middlewares
     │ ├── auth/
     │ ├── validation/
     │ └── security/
     ├── routes/          # Route definitions
     │ ├── api/
     │ └── web/
     ├── infrastructure/  # External integrations
     │ ├── cache/
     │ ├── email/
     │ └── modules/
     ├── database/        # External database directories
     │ ├── backups/
     │ └── schema/
     ├── storage/         # File storage
     │ ├── uploads/
     │ │ ├── avatars/
     │ │ └── documents/
     │ └── logs/
     ├── tests/           # Test directories
     │ ├── unit/
     │ ├── integration/
     │ ├── functional/
     │ └── e2e/
     ├── .github/         # CI/CD configuration
     │ └── workflows/
  `
                        },
                      ],
                    },
                    {
                      h4Title: "Recommended Use Cases:",
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
                          text: "Advantages: Simple to understand, quick to develop, ideal for beginners"
                        },
                      ],
                    },
                    {
                      h4Title: '2. Clean Architecture',
                      h4Anchor: 'section5-2',
                      text: "Description: Modular architecture organized around the business domain, featuring strict separation between business logic and technical details (databases, frameworks, interfaces). Each layer has a specific role with unidirectional dependencies pointing toward the business core.",
                      h5Title: "Generated Structure:",
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
                      h4Title: "Recommended Use Cases:",
                      list: [
                        "Applications with complex business domains",
                        "Projects requiring high testability",
                        "Experienced teams",
                        "Scalable applications",
                      ],
                      alerts: [
                        {
                          bgColor: 'alert-green',
                          borderColor: 'alert-green',
                          icon: '👍',
                          text: "Advantages: Technological independence, maximum testability, scalability"
                        },
                      ],
                    },
                    {
                      h4Title: '3. Hexagonal Architecture (Ports & Adapters)',
                      h4Anchor: 'section5-3',
                      text: "Description: Architecture that completely isolates the business core from technical details via ports and adapters.",
                      h5Title: "Generated Structure:",
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
     │ └── infrastructure/ *
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
                      h4Title: "Recommended Use Cases:",
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
                                  text: "Ideal For",
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
                }
              ]
            },
            {
              id: 'section6',
              h2Title: "Configuration",
              h2Anchor: 'configuration',
              subBlocs: [
                {
                  id: 'sub-1',
                  subchildBlocs: [
                    {
                      h4Title: 'TypeScript vs JavaScript',
                      h4Anchor: 'section6-1',
                      text: "ArchiTS no longer supports JavaScript (since version 1.9.0b) and now focuses exclusively on TypeScript, due to JavaScript’s limitations in handling data encapsulation within an object-oriented structure.",
                      h5Title: "TypeScript (the best !)",
                      alerts: [
                        {
                          bgColor: 'alert-green',
                          borderColor: 'alert-green',
                          icon: '👍',
                          text: "TypeScript Advantages: Static typing, Improved IntelliSense, Compile-time error detection, Better code documentation"
                        },
                      ],
                    },
                    {
                      h5Title: "Generated Files:",
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
                      h5Title: "TypeScript: Generated npm Scripts:",
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
                      h4Title: "ExpressJS Configuration",
                      h4Anchor: 'section6-2',
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
                      h4Anchor: 'section6-3',
                      text: "ArchiTS automatically generates a .env file with all essential variables:",
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
                          text: "Security: Don't forget to change the default values, especially passwords and secret keys before going to production!"
                        },
                      ],
                    },
                  ],
                }
              ]
            },
            {
              id: 'section7',
              h2Title: "CLI Reference",
              h2Anchor: 'reference',
              subBlocs: [
                {
                  id: 'sub-1',
                  subchildBlocs: [
                    {
                      h4Title: 'archi create',
                      h4Anchor: 'section7-1',
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
                      h5Title: "Interactive Process:",
                      list: ["Project Name: Defines the folder and package name",
                        "Architecture: Choice between Layered, Clean, or Hexagonal",
                        "Language: TypeScript",
                        "ExpressJS: Include or not the Express framework"]
                    },
                    {
                      h5Title: "Automatic Actions:",
                      list: ["Creation of folder structure",
                        "Generation of configuration files",
                        "Installation of npm dependencies",
                        "Installation of pnpm",
                        "Git initialization (if applicable)"]
                    },
                    {
                      h4Title: 'archi generate entity',
                      h4Anchor: 'section7-2',
                      text: "Command for automatically generating an entity and all its associated layers (repository, service, controller, route), according to the selected architecture (Layered, Clean, or Hexagonal).",
                      terminal: [
                        {
                          borderColor: "terminal-black",
                          bgColor: "terminal-black",
                          type: "BASH",
                          code: `# Full generation
archi generate entity user

# Short alias
archi g e user
`
                        },
                      ],
                    },
                    {
                      h5Title: "Automatic file cration :",
                      list: [
                        "<name>.routes.ts",
                        "<name>.entity.ts",
                        "<name>.controller.ts",
                        "<name>.service.ts",
                        "<name>.repository.ts",
                      ]
                    },
                    {
                      h5Title: "Jest unit test generation :",
                      list: [
                        "tests/unit/repositories/<name>.repository.test.ts",
                        "tests/unit/services/<name>.service.test.ts",
                        "tests/unit/controllers/<name>.controller.test.ts"
                      ]
                    },
                    {
                      h4Title: 'archi version',
                      h4Anchor: 'section7-3',
                      text: "Displays detailed information about the version and environment.",
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
                      h4Anchor: 'section7-4',
                      h5Title: 'Common Issues',
                      text: "Displays detailed information about the version and environment.",
                      terminal: [
                        {
                          message: "❌ Error: archi: command not found",
                          text: "Solutions:",
                          type: "BASH",
                          bgColor: 'alert-red',
                          borderColor: 'red',
                          code: `# Reload the shell
  source ~/.bashrc
  
# Or check the installation
  cd archi-ts-cli make install`
                        },
                        {
                          message: "❌ Error: archi: command not found",
                          text: "Solutions:",
                          type: "BASH",
                          bgColor: 'alert-red',
                          borderColor: 'red',
                          code: `# Reload the shell
  source ~/.bashrc
  
# Or check the installation
  cd archi-ts-cli make install`
                        },
                        {
                          message: "❌ Error: archi: command not found",
                          text: "Solutions:",
                          type: "BASH",
                          bgColor: 'alert-red',
                          borderColor: 'red',
                          code: `# Give execution permissions
  chmod +x archi
 
# Or reinstall
  make clean make install`
                        },
                      ],
                    },
                    {
                      h5Title: "Logs and Diagnostics",
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
                      linksList: [
                        {
                          icon: '💬',
                          textLink: 'Join the Discussion',
                          urlLink: 'https://github.com/thomas-bressel/archi-ts-cli/discussions',
                          description: "Perfect for: Questions, tips, sharing your projects, or just chatting about ArchiTS",
                        },
                        {
                          icon: '🐛',
                          textLink: 'Report Issues',
                          urlLink: 'https://github.com/thomas-bressel/archi-ts-cli/issues',
                          description: "Perfect for: Bugs, installation problems, or technical difficulties",
                        },
                        {
                          icon: '☝️',
                          textLink: 'Feature Requests',
                          urlLink: 'https://github.com/thomas-bressel/archi-ts-cli/discussions/categories/ideas',
                          description: "Perfect for: Ideas for new features or improvements",
                        },
                      ]
                      
                    },
                  ],
                }
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

    
    

  ]);
}
