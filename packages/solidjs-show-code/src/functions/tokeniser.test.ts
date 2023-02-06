import { render, fireEvent } from 'solid-testing-library';
import { tokenise } from '../../src/functions/tokeniser';

describe('Tokeniser', () => {
  test('html and property', () => {
    const tokens = tokenise(`<div class='class'/>`);
    console.log(tokens);
  });

  test('html and property2', () => {
    const tokens = tokenise(`<div style={{ color: 'red'}}/>`);
    console.log(tokens);
  });

  test('numbers', () => {
    const tokens = tokenise(`const objects = [{name:"test", value: 12},{name:"test", value: 45}]`);
    console.log(tokens);
  });


  test('tokenise code', () => {
    const tokens = tokenise(`import { Component, createSignal, JSX } from 'solid-js';

    const CodeView = () => {
      return (
        <pre>
        </pre>
      );
    };
    
    export default CodeView;`);
    console.log(tokens);
  });

});
