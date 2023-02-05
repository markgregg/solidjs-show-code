import { Token } from "../types/token";

export const tokenise = (text: string): Token[] => {
  const tokens: Token[] = [];
  readTokens(text, 0, tokens);
  return tokens;
}

const readTokens = (text: string, cnt: number, tokens: Token[], endAt?: number): number => {
  while( cnt < text.length ) {
    const code = text.charCodeAt(cnt);
    console.log(`cnt:${cnt}, code:${code}`)
    if( code === endAt) {
      console.log(`found ${endAt}`);
      return cnt;
    }
    if( code == 32 ) {
      cnt = readSpaces(text, cnt, tokens);
    } else if( code === 10 ) {
      tokens.push({
        text: '\n',
        type: 'NewLine'
      });
      cnt++;
    } else if( code === 9 ) {
      tokens.push({
        text: '\t',
        type: 'Tab'
      });
      cnt++;
    } else if( code === 34 || code === 39 || code === 96 ) {
      cnt = readString(text, cnt, code, tokens);
    } else if( code >= 48 && code <= 57 || code === 45 || code === 46 ) {
      cnt = readNumber(text, cnt, tokens);
    } else if( code >= 65 && code <= 90 || code >= 97 && code <= 122 || code === 95 ) {
      cnt = readKeyWord(text, cnt, tokens) + 1;
    } else if( code === 60) {
      cnt = readHtml(text, cnt+1, tokens);
    } else if( code === 123 ) {
      tokens.push({
        text: '{',
        type: 'Symbol'
      });
      cnt = readTokens(text, cnt+1, tokens, 125) + 1;
      tokens.push({
        text: '}',
        type: 'Symbol'
      });
    } else {
      tokens.push({
        text: text.charAt(cnt)  ?? '',
        type: 'Symbol'
      });
      cnt++;
    }
  }
  return cnt;
}

const readString = (text: string, cnt: number, code: number, tokens: Token[]): number => {
  const start = cnt;
  while( cnt < text.length ) {
    const newCode = text.charCodeAt(++cnt);
    if( newCode === code ) {
      break;
    }
    if( newCode === 36 && cnt < text.length && text.charCodeAt(cnt) === 123) {
      tokens.push({
        text: '${',
        type: 'Symbol'
      });
      cnt = readTokens(text, cnt+1, tokens, 125) + 1;
      tokens.push({
        text: '}',
        type: 'Symbol'
      });
      cnt++;
    }
  } 
  tokens.push( {
    text: text.slice(start, cnt === text.length ? cnt : cnt + 1),
    type: 'String'
  });
  return cnt+1;
}

const readNumber = (text: string, cnt: number, tokens: Token[]): number => {
  const start = cnt;
  while( cnt < text.length ) {
    const code = text.charCodeAt(cnt++);
    if( (code < 48 || code > 57) && code !== 45 && code !== 46 ) {
      break;
    }
  } 
  tokens.push( {
    text: text.slice(start, cnt-1),
    type: 'Number'
  });
  return cnt;
}

const readKeyWord = (text: string, cnt: number, tokens: Token[]): number => {
  const [newCnt, word] = readWord(text, cnt, tokens);
  tokens.push( {
    text: word,
    type: 'KeyWord'
  });
  return newCnt;
}

const readHtml = (text: string, cnt: number, tokens: Token[]): number => {
  tokens.push( {
    text: '<',
    type: 'Symbol'
  });
  
  if( text.charAt(cnt) === ' ' ) {
    cnt = readSpaces(text, cnt, tokens);
  }

  if( text.charAt(cnt) === '/' ) {
    tokens.push({
      text: '/',
      type: 'Symbol'
    });
    cnt++;    
  }
  const start = cnt;
  const [newCnt,word] = readWord(text, cnt, tokens); 
  cnt = newCnt +1;
  tokens.push( {
    text: word,
    type: 'HTML'
  });

  while( cnt < text.length && text.charCodeAt(cnt) !== 62) {
    const code = text.charCodeAt(cnt);
    if( code == 32 ) {
      cnt = readSpaces(text, cnt, tokens);
    } else if( code === 10 ) {
      tokens.push({
        text: '\n',
        type: 'NewLine'
      });
      cnt++;
    }  else if( code === 9 ) {
      tokens.push({
        text: '\t',
        type: 'Tab'
      });
      cnt++;
    } else if( (code >= 65 && code <= 90) || (code >= 97 && code <= 122) || code === 95 ) {
      const [newCnt,word] = readWord(text, cnt, tokens);
      cnt = newCnt +1;
      tokens.push({
        text: word,
        type: 'Property'
      });
    } else if( code === 61 ) {
      tokens.push({
        text: '=',
        type: 'Symbol'
      });
      cnt++;
    } else if( code === 34 || code === 39 || code === 96 ) {
      cnt = readString(text, cnt, code, tokens);
    } else if( code === 123 ) {
      tokens.push({
        text: '{',
        type: 'Symbol'
      });
      cnt = readTokens(text, cnt+1, tokens, 125) + 1;
      tokens.push({
        text: '}',
        type: 'Symbol'
      });
    } else {
      tokens.push({
        text: text.charAt(cnt)  ?? '',
        type: 'Symbol'
      });
      cnt++;
    }
  }
  if( text.charAt(cnt) === '>' ) {
    tokens.push({
      text: '>',
      type: 'Symbol'
    });
    cnt++;
  }
  return cnt;
}

const readWord = (text: string, cnt: number, tokens: Token[]): [number, string] => {
  const start = cnt;
  while( cnt < text.length ) {
    const code = text.charCodeAt(cnt+1);
    if( (code < 65 || code > 90 ) &&  (code < 97 || code > 122 ) && code !== 95 && code !== 45 ) {
      break;
    }
    cnt++;
  } 
  return [cnt, text.slice(start, cnt+1)];
}

const readSpaces = (text: string, cnt: number, tokens: Token[]): number => {
  const start = cnt;  
  while( cnt < text.length && text.charCodeAt(cnt+1) == 32) { 
    cnt++;    
  }
  tokens.push({
    text: text.slice(start, cnt+1),
    type: 'Space'
  });
  return cnt+1;
}