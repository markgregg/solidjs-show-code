import { Component, createSignal, JSX } from 'solid-js';
import { tokenise } from '../functions/tokeniser';
import { buildHtmlTree } from '../functions/htmlBuilder';
import { CodeStyleSheet } from '../types/codeStyleSheet';

export interface CodeViewProperties {
  code: string;
  styleSheet: CodeStyleSheet
}

const CodeView: Component<CodeViewProperties> = (props: CodeViewProperties) => {

  const tokens = tokenise(props.code);
  return (
    <div style={{padding: '10px'}}>
      {
        buildHtmlTree(tokens, props.styleSheet)
      }
    </div>
  );
};

export default CodeView;
