import { CodeStyleSheet } from "./codeStyleSheet";

export const javaScriptDefault: CodeStyleSheet = {
  colorKeyWordMap: [
    {
      color: 'blue',
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
      color: 'aquamarine',
      tokens: ['string', 'number', 'bigint', 'boolean', 'undefined', 'null', 'object']
    }
  ]
};