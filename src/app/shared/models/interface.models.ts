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
  bgColor?: string;
  borderColor?:string;
  type: string;
  content: string;
}

export interface BlocContent {
  id: string;
  h2Title: string;
  h2Anchor: string;
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
  blocsContent?: BlocContent[] | "";
  blocs?: Blocs[] ;
  overlay?: Overlay[] | undefined;
}

export interface Overlay {
    h5Title?: string;
    h5Icon?: string;
    h5Anchor?: string;
    items: Array<{
      id: string;
      name: string;
      anchor: string;
    }>
}

export interface Blocs {
  id: string;
  h2Title: string;
  h2Anchor: string;
  text?: string | undefined;
  cards?: Card[] | undefined;
  alerts?: Alert[] | undefined;
  subBlocs?: SubBlocs[] | undefined;
}


export interface Card {
  title: string;
  icon: string;
  text: string;
}


export interface SubBlocs {
  id: string;
  h3Title?: string;
  h3Anchor?: string;
  subchildBlocs?: SubChildBloc[]| undefined;
  arrays?: Arrays[] | undefined;
}

export interface Label {
  label: string;
  text?: string;
}

export interface linksList {
  icon?: string;
  textLink: string;
  urlLink?: string;
  description: string
}



export interface SubChildBloc {
  h4Title?: string;
  h4Anchor?: string;
  text?: string;
  h5Title?: string;
  list?: string[];
  arrays?: Arrays[] | undefined;
  terminal?: TerminalError[] | undefined;
  alerts?: Alert[] | undefined;
  labels?: Label[] | undefined;
  linksList?: linksList[] | undefined;
}

export interface Alert {
  bgColor: string;
  borderColor: string;
  icon: string;
  text: string;
}

export interface TerminalError {
  message?: string;
  text?: string;
  type: string;
  bgColor?: string;
  borderColor?: string;
  code: string;
}

export interface Arrays {
  headCol: string[];
  rows: Row[]; 
}

export interface Row {
  [key: string]: Array<{
    text: string;
    label: boolean;
  }>
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