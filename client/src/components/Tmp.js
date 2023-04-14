import { useState, useRef } from 'react';

function Tmp() {
  const [value, setValue] = useState('');
  const inputRef = useRef(null);

  function handleChange(event) {
    setValue(event.target.value);
  } console.log(value)

  function handleBlur() {
    const selectionStart = inputRef.current.selectionStart;
    const selectionEnd = inputRef.current.selectionEnd;
    setValue(value.substring(0, selectionStart) + value.substring(selectionEnd));
    inputRef.current.setSelectionRange(selectionStart, selectionStart);
  }

  return (<input type="text" value={value} onChange={handleChange} onBlur={handleBlur} ref={inputRef} />);
}

export default Tmp
