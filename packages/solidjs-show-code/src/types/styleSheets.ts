import { CodeStyleSheet } from "./codeStyleSheet";

export const javaScriptDefault: CodeStyleSheet = {
  colorKeyWordMap: [
    {
      color: '#26a2cb',
      types: ['KeyWord'],
      tokens: ['(', '}', '[', ']', '{', '}']
    },
    {
      color: 'brown',
      types: ['HTML']
    },
    {
      color: 'red',
      types: ['Property']
    },
    {
      color: 'magenta',
      types: ['Symbol'],
      tokens: ['import' , 'export']
    },
    {
      color: 'black',
      tokens: ['<', '/', '>']
    },
    {
      color: '#1ec51b',
      tokens: ['string', 'number', 'bigint', 'boolean', 'undefined', 'null', 'object']
    }
  ]
};