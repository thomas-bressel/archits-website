export interface ButtonsList {
    icon: string;
    img?: string;
    bgColor?: string;
    borderColor?: string;
    text: string;
    txtColor?: string;
    iconColor: string;
    shadowColor?: string;
    type?: string;
    link?: string;
}


export interface LanguageConfig {
    version: string;
    language: string;
    pages: { pageTitle: string }[];
  }