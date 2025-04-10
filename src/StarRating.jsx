// This component is built for reuse - it is not depend on any other external style sheet. Styles are applied Inline:

import { useState } from "react";

const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

const starContainerStyle = {
  display: "flex",
};

const textStyle = {
  lineHeight: "1",
  margin: "0", 
};

export default function StarRating({ maxRating = 5 }) {
  const [rating, setRating] = useState(0);

  function handleClick(index) {
    setRating((rating) => {
      return index === rating ? 0 : index;
    });
  }

  return (
    <div style={containerStyle}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star key={i} onClick={() => handleClick(i + 1)} />
        ))}
      </div>
      <p>{rating || ""}</p>
    </div>
  );
}

const starStyle = {
  width: "30px",
  cursor: "pointer",
};

function Star({ onClick }) {
  return (
    <div style={starStyle} role="button" onClick={onClick}>
      <svg width={30} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#ffde06">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="{2}"
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
        />
      </svg>
    </div>
  );
}
