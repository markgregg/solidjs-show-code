import { render, fireEvent } from 'solid-testing-library';
import { CodeStyleSheet } from '../types/codeStyleSheet';
import { Token } from '../types/token';
import { buildHtmlTree } from './htmlBuilder';

describe('htmlBuilder', () => {
  test('Build html', () => {
    const tokens: Token[] = [
      { text: 'import', type: 'KeyWord' },
      { text: '', type: 'Space' },
      { text: '{', type: 'Symbol' },
      { text: '', type: 'Space' },
      { text: 'Component', type: 'KeyWord' },
      { text: ',', type: 'Symbol' },
      { text: '', type: 'Space' },
      { text: 'createSignal', type: 'KeyWord' },
      { text: ',', type: 'Symbol' },
      { text: '', type: 'Space' },
      { text: 'JSX', type: 'KeyWord' },
      { text: '', type: 'Space' },
      { text: '}', type: 'Symbol' },
      { text: '', type: 'Space' },
      { text: 'from', type: 'KeyWord' },
      { text: '', type: 'Space' },
      { text: "solid-js'", type: 'String' },
      { text: '\n', type: 'NewLine' },
      { text: '\n', type: 'NewLine' },
      { text: '   ', type: 'Space' },
      { text: 'const', type: 'KeyWord' },
      { text: '', type: 'Space' },
      { text: 'CodeView', type: 'KeyWord' },
      { text: '', type: 'Space' },
      { text: '=', type: 'Symbol' },
      { text: '', type: 'Space' },
      { text: '(', type: 'Symbol' },
      { text: ')', type: 'Symbol' },
      { text: '', type: 'Space' },
      { text: '=', type: 'Symbol' },
      { text: '>', type: 'Symbol' },
      { text: '', type: 'Space' },
      { text: '{', type: 'Symbol' },
      { text: '\n', type: 'NewLine' },
      { text: '     ', type: 'Space' },
      { text: 'return', type: 'KeyWord' },
      { text: '', type: 'Space' },
      { text: '(', type: 'Symbol' },
      { text: '\n', type: 'NewLine' },
      { text: '       ', type: 'Space' },
      { text: '<', type: 'Symbol' },
      { text: 'pre', type: 'HTML' },
      { text: '>', type: 'Property' },
      { text: '>', type: 'Symbol' },
      { text: '\n', type: 'NewLine' },
      { text: '       ', type: 'Space' },
      { text: '<', type: 'Symbol' },
      { text: '/', type: 'Symbol' },
      { text: 'pre', type: 'HTML' },
      { text: '>', type: 'Property' },
      { text: '>', type: 'Symbol' },
      { text: '\n', type: 'NewLine' },
      { text: '     ', type: 'Space' },
      { text: ')', type: 'Symbol' },
      { text: ';', type: 'Symbol' },
      { text: '\n', type: 'NewLine' },
      { text: '   ', type: 'Space' },
      { text: '}', type: 'Symbol' },
      { text: ';', type: 'Symbol' },
      { text: '\n', type: 'NewLine' },
      { text: '   ', type: 'Space' },
      { text: '\n', type: 'NewLine' },
      { text: '   ', type: 'Space' },
      { text: 'export', type: 'KeyWord' },
      { text: '', type: 'Space' },
      { text: 'default', type: 'KeyWord' },
      { text: '', type: 'Space' },
      { text: 'CodeView', type: 'KeyWord' },
      { text: ';', type: 'Symbol' }
    ];

    const styleSheet: CodeStyleSheet = {
      colorKeyWordMap: [{
          color: 'red',
          types: ['Symbol']
        },
        {
          color: 'orange',
          types: ['KeyWord']
        },
        {
          color: 'purple',
          tokens: ['export', 'import']
        },
        {
          color: 'blue',
          tokens: ['export', 'import']
        }
      ]
    }

    const code = render(() => (
      buildHtmlTree(tokens, styleSheet)
    ));
    console.log(code.asFragment());
    code.unmount();
  });

});
