import React, { useRef, useState, useEffect, createContext } from "react";

//external libs
import {
  useSpring,
  animated,
  config,
  useTransition,
  useChain
} from "react-spring";

//import scss
import "../scss/components/AnimatedBigHeaderCard.scss";

/**
 * Context for controlling the card from the child components
 * @example
 * import AnimatedBigHeaderCard, { AnimatedBigHeaderCardControls } from "./components/AnimatedBigHeaderCard";
 * <AnimatedBigHeaderCard
 *   {...props}
 *   cardOpen={true}
 *   head={<h1>test</h1>}
 *   body={<AnimatedBigHeaderCardControls.Consumer>
 *       {({toggleError}) => <button onClick={() => toggleError()}>closeError</button>}
 *     </AnimatedBigHeaderCardControls.Consumer>
 *   }
 *   error={`weee`}
 * />
 */
export const AnimatedBigHeaderCardControls = createContext();
/**
 * Card
 * @param {boolean} cardOpen should the card be open?
 * @param {JSX} head the jsx that goes into the card head
 * @param {JSX} body the jsx that goes into the card body
 * @param {JSX} error the jsx that goes into the error div, if this is empty, the error div is hidden
 * @param {boolean} compactMode if this is true, the card will not render the body, error and will not apply springs
 * @param {boolean} errorCloseOverride close the error div, even if error isn't empty
 * @param {String} bodyPadding padding for the body of the card (useful for animating the padding when the card opens)
 */
const AnimatedBigHeaderCard = ({
  cardOpen,
  head,
  body,
  error,
  compactMode = false,
  errorCloseOverride = false,
  bodyPadding = `30px`
}) => {
  // To measure the height of the body when open
  const [bindMeasure, formBounds] = useMeasure();

  // Animation for opening the body
  //const openBodyRef = useRef();
  const [cardOpenOverride, setCardOpenOverride] = useState(false)
  const cardOpenStyle = {
    height: formBounds.height + "px",
    padding: bodyPadding
  };
  const cardClosedStyle = { height: `0px`, padding: `0px` };
  const openBody = useSpring({
    //ref: openBodyRef,
    from: cardClosedStyle,
    to: (cardOpen && !cardOpenOverride) ? cardOpenStyle : cardClosedStyle,
    delay: 500,
    config: (cardOpen && !cardOpenOverride) ? config.wobbly : config.slow
  });

  // Animation for showing the errorDiv
  const [errorDivCloseOverride, setErrorDivCloseOverride] = useState(errorCloseOverride); // override so errorDiv can't open
  const errorDivClosedStyle = { height: `0px` };
  const errorDivOpenStyle = { height: `100px` };
  const displayErrorDiv = useSpring({
    from: errorDivClosedStyle,
    to:
      error && !errorDivCloseOverride ? errorDivOpenStyle : errorDivClosedStyle
  });
  return (
    <AnimatedBigHeaderCardControls.Provider
      value={{
        closeCard:(v) => setCardOpenOverride(v),
        toggleCard:() => setCardOpenOverride(!cardOpenOverride),
        closeError:(v) => setErrorDivCloseOverride(v),
        toggleError:() => setErrorDivCloseOverride(!errorDivCloseOverride)
      }}
    >
      <animated.div className="loginCard">
        <animated.div className="cardHeader">
          <div className="cardTitle">{head}</div>
        </animated.div>
        <animated.div className="cardBody" style={(compactMode)? {} : openBody}>
          <div className="innerBodyElement" {...bindMeasure}>
            {!compactMode && body}
          </div>
        </animated.div>
        <animated.div className="cardFooter"></animated.div>
        <animated.div className="errorDivContainer" style={(compactMode)? {} : displayErrorDiv}>
          <div className="errorDiv">
            <div className="errorDivText">{!compactMode && error}</div>
          </div>
        </animated.div>
      </animated.div>
    </AnimatedBigHeaderCardControls.Provider>
  );
};

/**
 * Measures the bounding rect of an element<br>
 * @example
 * const [bindMeasure, formBounds] = useMeasure();
 * console.log(formBounds)
 * return <div {...bindMeasure}></div>
 */
const useMeasure = () => {
  const ref = useRef();
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0
  });
  const [ro] = useState(
    () => new ResizeObserver(([entry]) => setBounds(entry.contentRect))
  );
  useEffect(() => (ro.observe(ref.current), ro.disconnect), []);
  return [{ ref }, bounds];
};

export default AnimatedBigHeaderCard;
