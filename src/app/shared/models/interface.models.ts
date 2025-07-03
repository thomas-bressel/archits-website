export interface ButtonsList {
  icon: string;
  img?: string;
  bgColor?: string;
  borderColor?: string;
  text: string;
  textColor: string; 
  iconColor: string;
  shadowColor?: string;
  type?: string;
  link?: string;
  anchor?: string;
}

export interface CardContent {
  id: string;
  icon: string;
  h3Title: string;
  hook: string;
  checklists?: Array<{
    id: string;
    text: string;
  }>;
}

export interface TerminalContent {
  type: string;
  content: string;
}

export interface BlocContent {
  id: string;
  h2Title: string;
  hook: string;
  cards?: CardContent[];
  terminal?: TerminalContent[];
}

export interface PageContent {
  id: string;
  pageTitle: string;
  h1Title?: string;
  subtitle?: string;
  hook?: string;
  blocs?: BlocContent[];
}

export interface LanguageConfig {
  version: string;
  language: string;
  headerTop: ButtonsList[];
  headerBot: Array<{
    logo: boolean;
    navigation: boolean;
    buttons: boolean;
  }>;
  navigation: Array<{
    name: string;
    router: string;
  }>;
  cta: ButtonsList[];
  pages: PageContent[];
  footer: Array<{
    line1: string;
    line2: string;
  }>;
}

export interface ConsoleStep {
  id: number;
  type: 'banner' | 'info' | 'prompt' | 'command' | 'response' | 'question' | 'menu';
  text?: string;
  delay: number;
  className?: string;
  menuOptions?: { text: string; selected: boolean }[];
  typingSpeed?: number;
  staticText?: string; 
  typedText?: string;  
  menuAnimation?: {
    duration: number;
    sequence: boolean[][];
    stepDuration: number;
  };
}