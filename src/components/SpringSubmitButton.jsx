import React from "react";

//external
import { Spring, animated, config } from "react-spring/renderprops";

export default function SpringSubmitButton({ children }) {
  const [pressed, setPressed] = React.useState(false);
  const [hover, setHover] = React.useState(false);

  const InputElement = children;

  return (
    <Spring
      native
      from={{ scale: 1 }}
      to={{ scale: pressed ? 0.8 : hover? 1.1 : 1 }}
      config={config.wobbly}
    >
      {({ scale }) => (
        <animated.div
          onMouseDown={() => setPressed(true)}
          onClick={() => setPressed(false)}
          onMouseLeave={() => {setPressed(false); setHover(false)}}
          onMouseEnter={() => setHover(true)}
          style={{
            transform: scale.interpolate(scale => `scale(${scale})`),
            display: `inline-block`
          }}
        >
          {InputElement}
        </animated.div>
      )}
    </Spring>
  );
}
