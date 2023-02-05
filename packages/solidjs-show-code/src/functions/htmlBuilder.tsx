import { JSX, JSXElement } from "solid-js";
import { CodeStyleSheet } from "../types/codeStyleSheet";
import { Token } from "../types/token";

export const buildHtmlTree = (tokens: Token[], styleSheet: CodeStyleSheet): JSX.Element => {
  return <pre>
    {
      tokens.map( token => {
        //check tokens first then types
        const colour = styleSheet.colorKeyWordMap.find( colorMap => colorMap.tokens?.includes(token.text)) ?? styleSheet.colorKeyWordMap.find( colorMap => colorMap.types?.includes(token.type));
        console.log(`c:${colour ?? ''}, t:${token.type} to:${token.text}`)
        return colour ? <span style={{color: colour.color}}>{token.text}</span> : token.text;
      })
    }
  </pre>
}