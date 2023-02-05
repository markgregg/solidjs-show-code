import { TokenType } from "./token";

export interface KeyWordsForColor {
  color: string;
  types?: TokenType[];
  tokens?: string[];
}
export interface CodeStyleSheet {
  colorKeyWordMap: KeyWordsForColor[];
}