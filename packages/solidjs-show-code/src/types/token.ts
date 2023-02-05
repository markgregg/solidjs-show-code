export type TokenType = 'String' | 'Number' | 'Symbol' | 'KeyWord' | 'NewLine' | 'Space' | 'Tab' | 'HTML' | 'Property';
export interface Token {
  text: string;
  type: TokenType;
}