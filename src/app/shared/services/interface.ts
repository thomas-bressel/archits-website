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
                  icon: '🏗️',
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
                  icon: '⚡',
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
                  icon: '🚀',
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
        }
      ]
    },
    // ENGLISH
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
          id: 'home',
          pageTitle: 'home',
          h1Title: 'ArchiTS CLI',
          subtitle: "Backend Architecture Generator",
          hook: "Create robust backend structures with TypeScript or JavaScript. Three proven architectures, automated configuration, ready in 30 seconds.",
          blocs: [
            {
              id: 'bloc1',
              h2Title: 'Why Choose ArchiTS?',
              hook: 'A modern CLI for professional backend architectures',
              cards: [
                {
                  id: 'card1',
                  icon: '🏗️',
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
                  icon: '⚡',
                  h3Title: 'Automated Configuration',
                  hook: 'All modern tools automatically configured for immediate productive development.',
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
                  icon: '🚀',
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
              hook: 'Start using ArchiTS with just a few commands',
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
          pageTitle: 'documentation'
        }
      ]
    },
    // ESPAÑOL
    {
      version: "1.0.0",
      language: "español",
      headerTop: [
        { icon: 'github.svg', iconColor: 'grey', text: 'GitHub', textColor: 'white', link: 'https://github.com/thomas-bressel/archi-ts-cli' },
        { icon: 'forum.svg', iconColor: 'grey', text: 'Discusiones', textColor: 'white', link: 'https://github.com/thomas-bressel/archi-ts-cli/discussions' }
      ],
      headerBot: [{ logo: true, navigation: true, buttons: true }],
      navigation: [
        { name: 'Inicio', router: '/home' },
        { name: 'Documentación', router: '/documentation' }
      ],
      cta: [
        { icon: 'heart.svg', iconColor: 'white', text: 'Patrocinar', textColor: 'white', bgColor: 'linear-red', link: 'https://github.com/sponsors/thomas-bressel' },
        { icon: 'arrow-start.svg', iconColor: 'white', text: 'Comenzar', textColor: 'white', bgColor: 'linear-blue', link: '/documentation' }
      ],
      pages: [
        {
          id: 'home',
          pageTitle: 'inicio',
          h1Title: 'ArchiTS CLI',
          subtitle: "Generador de Arquitectura Backend",
          hook: "Crea estructuras backend robustas con TypeScript o JavaScript. Tres arquitecturas probadas, configuración automatizada, listo en 30 segundos.",
          blocs: [
            {
              id: 'bloc1',
              h2Title: '¿Por qué elegir ArchiTS?',
              hook: 'Un CLI moderno para arquitecturas backend profesionales',
              cards: [
                {
                  id: 'card1', icon: '🏗️', h3Title: 'Arquitecturas Profesionales',
                  hook: 'Elige entre 3 patrones arquitectónicos probados para estructurar tu backend de manera óptima.',
                  checklists: [
                    { id: 'check1', text: 'Layered Architecture - Estructura en capas clásica' },
                    { id: 'check2', text: 'Clean Architecture - Separación dominio/infraestructura' },
                    { id: 'check3', text: 'Hexagonal Architecture - Patrón Ports & Adapters' }
                  ]
                },
                {
                  id: 'card2', icon: '⚡', h3Title: 'Configuración Automatizada',
                  hook: 'Todas las herramientas modernas configuradas automáticamente para desarrollo productivo inmediato.',
                  checklists: [
                    { id: 'check4', text: 'TypeScript/JavaScript - Soporte completo' },
                    { id: 'check5', text: 'ExpressJS - Framework opcional integrado' },
                    { id: 'check6', text: 'ESLint, Jest, Nodemon - Herramientas incluidas' }
                  ]
                },
                {
                  id: 'card3', icon: '🚀', h3Title: 'Productividad Máxima',
                  hook: 'Interfaz CLI intuitiva y generación automática para iniciar tus proyectos en segundos.',
                  checklists: [
                    { id: 'check7', text: 'CLI intuitivo - Interfaz de línea de comandos simple' },
                    { id: 'check8', text: 'Plantillas listas - Archivos base generados' },
                    { id: 'check9', text: 'Dependencias gestionadas - Instalación automática' }
                  ]
                }
              ],
              terminal: []
            },
            {
              id: 'bloc2',
              h2Title: 'Instalación Rápida',
              hook: 'Comienza a usar ArchiTS con solo unos comandos',
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
              ]
            }
          ]
        },
        { id: 'documentation', pageTitle: 'documentación' }
      ]
    },
    // РУССКИЙ
    {
      version: "1.0.0",
      language: "русский",
      headerTop: [
        { icon: 'github.svg', iconColor: 'grey', text: 'GitHub', textColor: 'white', link: 'https://github.com/thomas-bressel/archi-ts-cli' },
        { icon: 'forum.svg', iconColor: 'grey', text: 'Обсуждения', textColor: 'white', link: 'https://github.com/thomas-bressel/archi-ts-cli/discussions' }
      ],
      headerBot: [{ logo: true, navigation: true, buttons: true }],
      navigation: [
        { name: 'Главная', router: '/home' },
        { name: 'Документация', router: '/documentation' }
      ],
      cta: [
        { icon: 'heart.svg', iconColor: 'white', text: 'Спонсор', textColor: 'white', bgColor: 'linear-red', link: 'https://github.com/sponsors/thomas-bressel' },
        { icon: 'arrow-start.svg', iconColor: 'white', text: 'Начать', textColor: 'white', bgColor: 'linear-blue', link: '/documentation' }
      ],
      pages: [
        {
          id: 'home',
          pageTitle: 'главная',
          h1Title: 'ArchiTS CLI',
          subtitle: "Генератор Backend Архитектуры",
          hook: "Создавайте надежные backend структуры с TypeScript или JavaScript. Три проверенные архитектуры, автоматическая настройка, готово за 30 секунд.",
          blocs: [
            {
              id: 'bloc1',
              h2Title: 'Почему выбрать ArchiTS?',
              hook: 'Современный CLI для профессиональных backend архитектур',
              cards: [
                {
                  id: 'card1', icon: '🏗️', h3Title: 'Профессиональные Архитектуры',
                  hook: 'Выберите из 3 проверенных архитектурных паттернов для оптимальной структуры вашего backend.',
                  checklists: [
                    { id: 'check1', text: 'Layered Architecture - Классическая слоистая структура' },
                    { id: 'check2', text: 'Clean Architecture - Разделение домен/инфраструктура' },
                    { id: 'check3', text: 'Hexagonal Architecture - Паттерн Ports & Adapters' }
                  ]
                },
                {
                  id: 'card2', icon: '⚡', h3Title: 'Автоматическая Настройка',
                  hook: 'Все современные инструменты настроены автоматически для немедленной продуктивной разработки.',
                  checklists: [
                    { id: 'check4', text: 'TypeScript/JavaScript - Полная поддержка' },
                    { id: 'check5', text: 'ExpressJS - Дополнительный интегрированный фреймворк' },
                    { id: 'check6', text: 'ESLint, Jest, Nodemon - Инструменты включены' }
                  ]
                },
                {
                  id: 'card3', icon: '🚀', h3Title: 'Максимальная Продуктивность',
                  hook: 'Интуитивный CLI интерфейс и автоматическая генерация для запуска проектов за секунды.',
                  checklists: [
                    { id: 'check7', text: 'Интуитивный CLI - Простой интерфейс командной строки' },
                    { id: 'check8', text: 'Готовые шаблоны - Базовые файлы созданы' },
                    { id: 'check9', text: 'Управляемые зависимости - Автоматическая установка' }
                  ]
                }
              ],
              terminal: []
            },
            {
              id: 'bloc2',
              h2Title: 'Быстрая Установка',
              hook: 'Начните использовать ArchiTS всего несколькими командами',
              cards: [],
              terminal: [
                {
                  type: 'bash',
                  content: `# Клонировать репозиторий
git clone https://github.com/thomas-bressel/archi-ts-cli.git
cd archi-ts-cli

# Установка
make install
source ~/.bashrc

# Создать ваш первый проект
archi create`
                }
              ]
            }
          ]
        },
        { id: 'documentation', pageTitle: 'документация' }
      ]
    },
    // 日本語
    {
      version: "1.0.0",
      language: "日本語",
      headerTop: [
        { icon: 'github.svg', iconColor: 'grey', text: 'GitHub', textColor: 'white', link: 'https://github.com/thomas-bressel/archi-ts-cli' },
        { icon: 'forum.svg', iconColor: 'grey', text: 'ディスカッション', textColor: 'white', link: 'https://github.com/thomas-bressel/archi-ts-cli/discussions' }
      ],
      headerBot: [{ logo: true, navigation: true, buttons: true }],
      navigation: [
        { name: 'ホーム', router: '/home' },
        { name: 'ドキュメント', router: '/documentation' }
      ],
      cta: [
        { icon: 'heart.svg', iconColor: 'white', text: 'スポンサー', textColor: 'white', bgColor: 'linear-red', link: 'https://github.com/sponsors/thomas-bressel' },
        { icon: 'arrow-start.svg', iconColor: 'white', text: '始める', textColor: 'white', bgColor: 'linear-blue', link: '/documentation' }
      ],
      pages: [
        {
          id: 'home',
          pageTitle: 'ホーム',
          h1Title: 'ArchiTS CLI',
          subtitle: "バックエンドアーキテクチャジェネレータ",
          hook: "TypeScriptまたはJavaScriptで堅牢なバックエンド構造を作成。3つの実績のあるアーキテクチャ、自動設定、30秒で準備完了。",
          blocs: [
            {
              id: 'bloc1',
              h2Title: 'なぜArchiTSを選ぶのか？',
              hook: 'プロフェッショナルなバックエンドアーキテクチャのためのモダンCLI',
              cards: [
                {
                  id: 'card1', icon: '🏗️', h3Title: 'プロフェッショナルアーキテクチャ',
                  hook: 'バックエンドを最適に構造化するための3つの実績あるアーキテクチャパターンから選択。',
                  checklists: [
                    { id: 'check1', text: 'レイヤードアーキテクチャ - クラシックなレイヤー構造' },
                    { id: 'check2', text: 'クリーンアーキテクチャ - ドメイン/インフラストラクチャ分離' },
                    { id: 'check3', text: 'ヘキサゴナルアーキテクチャ - Ports & Adaptersパターン' }
                  ]
                },
                {
                  id: 'card2', icon: '⚡', h3Title: '自動設定',
                  hook: 'すべてのモダンツールが自動的に設定され、即座に生産的な開発が可能。',
                  checklists: [
                    { id: 'check4', text: 'TypeScript/JavaScript - フルサポート' },
                    { id: 'check5', text: 'ExpressJS - オプションの統合フレームワーク' },
                    { id: 'check6', text: 'ESLint, Jest, Nodemon - ツールが含まれます' }
                  ]
                },
                {
                  id: 'card3', icon: '🚀', h3Title: '最大限の生産性',
                  hook: '直感的なCLIインターフェースと自動生成で、プロジェクトを数秒で開始。',
                  checklists: [
                    { id: 'check7', text: '直感的なCLI - シンプルなコマンドラインインターフェース' },
                    { id: 'check8', text: '準備済みテンプレート - ベースファイルが生成済み' },
                    { id: 'check9', text: '管理された依存関係 - 自動インストール' }
                  ]
                }
              ],
              terminal: []
            },
            {
              id: 'bloc2',
              h2Title: 'クイックインストール',
              hook: 'わずか数コマンドでArchiTSの使用を開始',
              cards: [],
              terminal: [
                {
                  type: 'bash',
                  content: `# リポジトリをクローン
git clone https://github.com/thomas-bressel/archi-ts-cli.git
cd archi-ts-cli

# インストール
make install
source ~/.bashrc

# 最初のプロジェクトを作成
archi create`
                }
              ]
            }
          ]
        },
        { id: 'documentation', pageTitle: 'ドキュメント' }
      ]
    },
    // ROMÂNĂ
    {
      version: "1.0.0",
      language: "română",
      headerTop: [
        { icon: 'github.svg', iconColor: 'grey', text: 'GitHub', textColor: 'white', link: 'https://github.com/thomas-bressel/archi-ts-cli' },
        { icon: 'forum.svg', iconColor: 'grey', text: 'Discuții', textColor: 'white', link: 'https://github.com/thomas-bressel/archi-ts-cli/discussions' }
      ],
      headerBot: [{ logo: true, navigation: true, buttons: true }],
      navigation: [
        { name: 'Acasă', router: '/home' },
        { name: 'Documentație', router: '/documentation' }
      ],
      cta: [
        { icon: 'heart.svg', iconColor: 'white', text: 'Sponsor', textColor: 'white', bgColor: 'linear-red', link: 'https://github.com/sponsors/thomas-bressel' },
        { icon: 'arrow-start.svg', iconColor: 'white', text: 'Începe', textColor: 'white', bgColor: 'linear-blue', link: '/documentation' }
      ],
      pages: [
        {
          id: 'home',
          pageTitle: 'acasă',
          h1Title: 'ArchiTS CLI',
          subtitle: "Generator de Arhitectură Backend",
          hook: "Creează structuri backend robuste cu TypeScript sau JavaScript. Trei arhitecturi dovedite, configurare automatizată, gata în 30 de secunde.",
          blocs: [
            {
              id: 'bloc1',
              h2Title: 'De ce să alegi ArchiTS?',
              hook: 'Un CLI modern pentru arhitecturi backend profesionale',
              cards: [
                {
                  id: 'card1', icon: '🏗️', h3Title: 'Arhitecturi Profesionale',
                  hook: 'Alege dintre 3 modele arhitecturale dovedite pentru a-ți structura backend-ul în mod optim.',
                  checklists: [
                    { id: 'check1', text: 'Layered Architecture - Structură în straturi clasică' },
                    { id: 'check2', text: 'Clean Architecture - Separarea domeniu/infrastructură' },
                    { id: 'check3', text: 'Hexagonal Architecture - Pattern Ports & Adapters' }
                  ]
                },
                {
                  id: 'card2', icon: '⚡', h3Title: 'Configurare Automatizată',
                  hook: 'Toate instrumentele moderne configurate automat pentru dezvoltare productivă imediată.',
                  checklists: [
                    { id: 'check4', text: 'TypeScript/JavaScript - Suport complet' },
                    { id: 'check5', text: 'ExpressJS - Framework opțional integrat' },
                    { id: 'check6', text: 'ESLint, Jest, Nodemon - Unelte incluse' }
                  ]
                },
                {
                  id: 'card3', icon: '🚀', h3Title: 'Productivitate Maximă',
                  hook: 'Interfață CLI intuitivă și generare automată pentru a-ți începe proiectele în câteva secunde.',
                  checklists: [
                    { id: 'check7', text: 'CLI intuitiv - Interfață linie de comandă simplă' },
                    { id: 'check8', text: 'Șabloane pregătite - Fișiere de bază generate' },
                    { id: 'check9', text: 'Dependințe gestionate - Instalare automată' }
                  ]
                }
              ],
              terminal: []
            },
            {
              id: 'bloc2',
              h2Title: 'Instalare Rapidă',
              hook: 'Începe să folosești ArchiTS cu doar câteva comenzi',
              cards: [],
              terminal: [
                {
                  type: 'bash',
                  content: `# Clonează repository-ul
git clone https://github.com/thomas-bressel/archi-ts-cli.git
cd archi-ts-cli

# Instalare
make install
source ~/.bashrc

# Creează primul tău proiect
archi create`
                }
              ]
            }
          ]
        },
        { id: 'documentation', pageTitle: 'documentație' }
      ]
    }
  ]);
}
