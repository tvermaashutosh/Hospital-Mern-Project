import { useState, useRef } from 'react';

function Tmp2() {
  const [values, setValues] = useState({
    name: { text: '', selectionStart: 0 },
    email: { text: '', selectionStart: 0 },
    phone: { text: '', selectionStart: 0 },
  });

  const inputRefs = {
    name: useRef(null),
    email: useRef(null),
    phone: useRef(null),
  };

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((prevState) => ({
      ...prevState, [name]: { text: value, selectionStart: inputRefs[name].current.selectionStart },
    }));
  }

  function handleBlur(event) {
    const { name } = event.target;
    const selectionStart = values[name].selectionStart;
    const selectionEnd = inputRefs[name].current.selectionEnd;
    const newText = values[name].text.substring(0, selectionStart) + values[name].text.substring(selectionEnd);
    setValues((prevState) => ({
      ...prevState,
      [name]: { text: newText, selectionStart },
    }));
    inputRefs[name].current.setSelectionRange(selectionStart, selectionStart);
  }

  return (
    <div>
      <input type="text" name="name" value={values.name.text} onChange={handleChange} onBlur={handleBlur} ref={inputRefs.name} />
      <input type="email" name="email" value={values.email.text} onChange={handleChange} onBlur={handleBlur} ref={inputRefs.email} />
      <input type="tel" name="phone" value={values.phone.text} onChange={handleChange} onBlur={handleBlur} ref={inputRefs.phone} />
    </div>
  );
}

export default Tmp2
