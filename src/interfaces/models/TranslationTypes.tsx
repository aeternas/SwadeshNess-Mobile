export interface TranslationRequest {
  groups: string[];
  word: string;
}

export interface TranslationResult {
  name: string;
  results: LanguageTranslationResult[];
}

export interface TotalResults {
  results: TranslationResult[];
}

export interface LanguageTranslationResult {
  name: string;
  translation: string;
}

export interface LanguageGroup {
  name: string;
  languages: string[];
}
