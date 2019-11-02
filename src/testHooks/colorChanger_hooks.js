import React, { useState, useEffect, Fragment } from "react";

const colors = {
  Sea: "#a2ccb6",
  Sand: "#fceeb5",
  Peach: "#ee786e"
};

/* const ColorChanger = () => {
  const [color, setColor] = useState(colors.Sea);
  return (
    <Fragment>
      <select value={color} onChange={e => setColor(e.target.value)}>
        {Object.entries(colors).map(c => (
          <option value={c[1]}>{c[0]}</option>
        ))}
      </select>
      <h2>{`Hex: ${color}`}</h2>
    </Fragment>
  );

  return;
}; */

const ColorChanger = () => {
  const [color, setColor] = useState(colors.Sea);
  useEffect(() => {
    document.body.style.background = color;
  }, [color]);
  return (
    <Fragment>
      <select value={color} onChange={e => setColor(e.target.value)}>
        {Object.entries(colors).map(c => (
          <option key={`color--${c[0]}`} value={c[1]}>
            {c[0]}
          </option>
        ))}
      </select>
      <h1>{color}</h1>
    </Fragment>
  );
};

export default ColorChanger;
