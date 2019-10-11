import React, { useRef, useState, useEffect } from "react";

//external libs
import {
  useSpring,
  animated,
  config,
  useTransition,
  useChain
} from "react-spring";
import { connect } from "react-redux";
import ResizeObserver from "resize-observer-polyfill"; //for measuring form height

//import resources
import rd_icon from "../res/img/rd.png";

//import scss
import "../scss/components/LoginCard.scss";

//import actions
import { fetchLogin } from "../redux/actions/login";

//import icons
import { MdVpnKey, MdPerson } from "react-icons/md";

//import components
import SpringSubmitButton from "./SpringSubmitButton";

const loginFieldsArray = [
  {
    placeholder: `username`,
    name: `username`,
    inputType: `text`,
    icon: MdPerson,
    autoFocus: true
  },
  {
    placeholder: `password`,
    name: `password`,
    inputType: `password`,
    icon: MdVpnKey
  },
  {
    submit: true
  }
];

function LoginCard(props) {
  const [loginFields, setLoginFields] = useState({});
  const [canFocus, setCanFocus] = useState(true); // don't allow focusing more than once
  const [needToFocus, setNeedToFocus] = useState(false); // check if focusing the autofocus ref is needed
  const [cardOpen, setCardOpen] = useState(true);
  const [sendLoginRequest, setSendLoginRequest] = useState(false);
  const [upperLeft, setUpperLeft] = useState(false);

  if(!upperLeft && !cardOpen && props.loggedIn){
    setUpperLeft(true)
    autoFocusRef.current.focus();
    setCanFocus(false);
  }

  const centered = { marginTop:`50vh`, marginLeft:`50vw`, transform:`translate(-50%, -50%)`, border: `10px`};
  const leftUp = { marginTop:`0%`, marginLeft:`0%`, transform:`translate(0%, 0%)`, border: `0px`}
  const {border: cardHeaderBorder, ...flyUpperRight } = useSpring({
    from: centered,
    to: upperLeft? leftUp : centered,
    delay:500,
    onRest:() => {
      if(props.onLoginComplete && !cardOpen && props.loggedIn){
        props.onLoginComplete();
      }
    }
  })

  // function to set field data
  const setField = (field, data) => {
    setLoginFields(Object.assign({}, loginFields, { [field]: data }));
  };

  const [bindMeasure, formBounds] = useMeasure();
  // spring to open body
  const openBodyRef = useRef();
  const a2 = { height: formBounds.height + "px", padding: `30px` };
  const a1 = { height: `0px`, padding: `0px` };
  const openBody = useSpring({
		ref: openBodyRef,
		from: a1,
    to: cardOpen ? a2 : a1,
    delay: 500,
    config: cardOpen ? config.wobbly : config.slow,
    onRest: () => {
      setNeedToFocus(true);
      if (sendLoginRequest) props.login(loginFields);
			setSendLoginRequest(false);
			setErrorDivCloseOverride(false);
    }
  });

  const displayFieldsRef = useRef();
  const displayFields = useTransition(
    cardOpen ? loginFieldsArray : [],
    item => item.name,
    {
      ref: displayFieldsRef,
      unique: true,
      trail: 400 / loginFieldsArray.length,
      from: { opacity: 0, transform: "scale(0)" },
      enter: { opacity: 1, transform: "scale(1)" },
      leave: { opacity: 0, transform: "scale(0)" }
    }
  );

  useChain(
    cardOpen
      ? [openBodyRef, displayFieldsRef]
      : [displayFieldsRef, openBodyRef],
    [0, cardOpen ? 1 : 0.1]
  );

	const [errorDivOpen, setErrorDivOpen] = useState(false);
	const [errorCanFocusSent, setErrorCanFocusSent] = useState(false); // if canFocus has already been sent
	const [errorDivCloseOverride, setErrorDivCloseOverride] = useState(false); // "manual" override, so errorDiv can't reopen
  const state1 = { height: `0px` };
  const state2 = { height: `100px` };
  const displayErrorDiv = useSpring({
    from: state1,
    to: errorDivOpen ? state2 : state1
  });

  if (!errorDivCloseOverride && !errorDivOpen && props.error) {
		setErrorDivOpen(true);
		setCardOpen(true);
		if(!errorCanFocusSent){
			setCanFocus(true);
			setErrorCanFocusSent(true);
  }
  }

  return (
    <animated.div className="loginCard" style={flyUpperRight}>
      <animated.div className="cardHeader" style={{
        borderTopLeftRadius:cardHeaderBorder,
        borderTopRightRadius:cardHeaderBorder,
      }}>
        <div className="cardTitle">
          <img
            src={rd_icon}
            alt="rd icon"
            className={props.isLoading ? "spin" : ""}
          />
          <h1>ITS</h1>
        </div>
      </animated.div>
      <animated.div className="cardBody" style={openBody}>
        <form
          {...bindMeasure} // set measurer, to measure this element
          onSubmit={e => {
            e.preventDefault();
            setCardOpen(false);
						setSendLoginRequest(true);
						setErrorDivCloseOverride(true);
						setErrorDivOpen(false);
          }}
        >
          {displayFields.map(({ item, key, props }) => {
            const field = item;
            if (field.submit) {
              return (
                <animated.div key={key} className="submitButton" style={props}>
                  <SpringSubmitButton>
                    <input type="submit" value="login" />
                  </SpringSubmitButton>
                  <SpringSubmitButton>
                    <button type="button">register</button>
                  </SpringSubmitButton>
                </animated.div>
              );
            } else
              return (
                <animated.div className="formField" key={key} style={props}>
                  <div className="fieldBody">
                    <div className="icon">
                      <field.icon />
                    </div>
                    <div className="inputField">
                      <input
                        {...(field.autoFocus
                          ? { ref: autoFocusRef, id: `testIF` }
                          : {})}
                        type={field.inputType || "text"}
                        placeholder={field.placeholder}
                        onChange={e => setField(field.name, e.target.value)}
                        name={field.name}
                      />
                    </div>
                  </div>
                  <div className="bottomBar">
                    <div></div>
                  </div>
                </animated.div>
              );
          })}
        </form>
      </animated.div>
      <animated.div className="cardFooter" style={{borderBottomLeftRadius:cardHeaderBorder}}></animated.div>
      <animated.div className="errorDivContainer" style={displayErrorDiv}>
        <div className="errorDiv">
          <div className="errorDivText">{props.error}</div>
        </div>
      </animated.div>
    </animated.div>
  );
}

export function LoginCardField({ icon, key, placeholder }) {
  const [data, setData] = useState(``);

  return (
    <div>
      <img src={icon} alt={`${placeholder}_icon`} />
      <input type="text" onChange={e => setData(e.target.value)} />
    </div>
  );
}

function useMeasure() {
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
}

const mapDispatchToProps = dispatch => {
  return {
    login: data => fetchLogin(dispatch, data)
  };
};

const mapStateToProps = state => {
  return state.login;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginCard);
