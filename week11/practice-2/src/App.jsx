import React from 'react';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
//wrapping application with RecoilRoot
function App() {
  return (
    <RecoilRoot>
      <CharacterCounter />
    </RecoilRoot>
  );
}
//defining an atom 
const textState = atom({
  key: 'textState', //unique ID wrt to atom/selector
  default: '' // default value
})
function CharacterCounter() {
  return (
    <div>
      <TextInput />
      <CharacterCount />
    </div>
  );
}
//useRecoilState() to read from and write to an atom 
function TextInput() {
  const [text, setText] = useRecoilState(textState);

  const onChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div>
      <label htmlFor="textInput">Enter Text:</label> {/* Added label for accessibility */}
      <input id="textInput" type="text" value={text} onChange={onChange} />
      <br />
      Echo: {text}
    </div>
  );
}
const charCountState = selector({
  key: 'charCountState', // unique ID (with respect to other atoms/selectors)
  get: ({get}) => {
    const text = get(textState);

    return text.length;
  },
});
function CharacterCount() {
  const count = useRecoilValue(charCountState);

  return <>Character Count: {count}</>;
}

export default App
