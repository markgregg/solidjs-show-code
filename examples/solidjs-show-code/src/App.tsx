import { Component, createSignal, JSX } from 'solid-js';
import CodeView, { javaScriptDefault } from "solidjs-show-code";

const App = () => {

  return (
    <div style={{"background-color": "black", color: "white"}}>
      <CodeView 
        code={`
        import { Component, createSignal } from 'solid-js';
        import './VerticalMenu.css';
        
        interface VerticalMenuProps {
          title: string;
          options: string[];
          onSelect: (option: string) => void;
        }
        
        const VerticalMenu: Component<VerticalMenuProps> = ({
          title,
          options,
          onSelect,
        }) => {
          const [active, setActive] = createSignal<string>(options[0]);
          const [highlight, setHighlight] = createSignal<string>();
        
          return (
            <div class="vmenu">
              <h3 class="vmenu-heading">{title}</h3>
              <ul class="vmenu-items">
                {options.map((option) => (
                  <li
                    class="option"
                    style={{
                      'background-color':
                        highlight() === option || option === active()
                          ? 'var(--pageColor3)'
                          : 'var(--pageColor1)',
                    }}
                    onMouseEnter={() => setHighlight(option)}
                    onMouseLeave={() => setHighlight(undefined)}
                    onClick={() => {
                      setActive(option);
                      onSelect(option);
                    }}
                  >
                    <p class='vmenu-text'>{option}</p>
                  </li>
                ))}
              </ul>
            </div>
          );
        };
        
        export default VerticalMenu;`}
        styleSheet={javaScriptDefault}
      />
    </div>
  );
};

export default App;
