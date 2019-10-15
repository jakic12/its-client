import React, { useState, useRef } from "react";

// external libs
import { connect } from "react-redux";
import { useChain } from "react-spring";

//import actions
import { fetchLogin } from "../redux/actions/login";

// import components
import AnimatedBigHeaderCard, {
  AnimatedBigHeaderCardControls
} from "./AnimatedBigHeaderCard";
import AnimatedForm, { FormField, CustomFormField } from "./AnimatedForm";

// import components
import SpringSubmitButton from "./SpringSubmitButton";

// import scss
import "../scss/components/LoginRegisterForm.scss";

//import resources
import rd_icon from "../res/img/rd.png";
import { MdVpnKey, MdPerson } from "react-icons/md";

const LoginRegisterForm = ({
  login,
  isLoading,
  error,
  loggedIn,
  compactMode,
  width
}) => {
  const [firstTime, setFirstTime] = useState(true);
  const [formAnimationsFinished, setFormAnimationsFinished] = useState(false);
  const [bodyAnimationsFinished, setBodyAnimationsFinished] = useState(false);
  const [register, setRegister] = useState(false); // display register?
  const [transition, setTransition] = useState(false); // close the card when transitioning mid screens

  const [loginData, setLoginData] = useState();
  const [registerData, setRegisterData] = useState();

  if (
    (loginData || registerData) &&
    bodyAnimationsFinished &&
    formAnimationsFinished &&
    !isLoading &&
    !loggedIn
  ) {
    if (registerData) console.log(registerData);
    // TODO: create register action
    // register(registerData)
    else {
      login(loginData);
      setLoginData(null);
    }
  }

  const cardOpen = compactMode
    ? false
    : !loggedIn && !isLoading && !transition && !loginData && !registerData;
  const cardBodyAnimation = useRef();
  const formTransitionAnimation = useRef();

  if (!compactMode) {
    var loginFormFieldsArray = [
      FormField(`username`, `username`, `text`, MdPerson, true),
      FormField(`password`, `password`, `password`, MdVpnKey),
      CustomFormField(`loginRegisterButtons`, () => (
        <div className={"submitButton"}>
          <SpringSubmitButton>
            <input type="submit" value="login" />
          </SpringSubmitButton>
          <SpringSubmitButton>
            <button
              type="button"
              onClick={() => {
                setRegister(true);
                setTransition(true);
              }}>
              register
            </button>
          </SpringSubmitButton>
        </div>
      ))
    ];

    var registerFormFieldsArray = [
      FormField(`username`, `username`, `text`, MdPerson, true),
      FormField(`firstName`, `first name`, `text`, null, true),
      FormField(`lastName`, `last name`, `text`, null, true),
      CustomFormField(`spacer`, () => <div></div>),
      FormField(`password`, `password`, `password`, MdVpnKey),
      FormField(`cPassword`, `confirm password`, `password`, MdVpnKey),
      CustomFormField(`loginRegisterButtons`, () => (
        <div className={"submitButton"}>
          <SpringSubmitButton>
            <input type="submit" value="register" />
          </SpringSubmitButton>
          <SpringSubmitButton>
            <button
              type="button"
              onClick={() => {
                setRegister(false);
                setTransition(true);
              }}>
              login
            </button>
          </SpringSubmitButton>
        </div>
      ))
    ];
  }

  useChain(
    cardOpen
      ? [cardBodyAnimation, formTransitionAnimation]
      : [formTransitionAnimation, cardBodyAnimation],
    [0, cardOpen ? 1 : 0.1]
  );

  return (
    <div className="loginRegisterForm">
      <AnimatedBigHeaderCard
        compactMode={
          (loggedIn && formAnimationsFinished && bodyAnimationsFinished) ||
          compactMode
        }
        cardOpen={cardOpen}
        head={
          <div className="title">
            <img
              src={rd_icon}
              alt="rd icon"
              className={isLoading ? "spinner" : ""}
            />
            <h1>ITS</h1>
          </div>
        }
        width={width}
        body={
          <AnimatedBigHeaderCardControls.Consumer>
            {({ toggleCard }) => (
              <AnimatedForm
                customTransitionProps={{
                  ref: formTransitionAnimation,
                  onRest: () => setFormAnimationsFinished(true)
                }}
                display={cardOpen}
                formFieldsArray={
                  transition
                    ? []
                    : register
                    ? registerFormFieldsArray
                    : loginFormFieldsArray
                }
                onSubmit={data => {
                  setFormAnimationsFinished(false);
                  setBodyAnimationsFinished(false);
                  if (register) {
                    setRegisterData(data);
                  } else {
                    setLoginData(data);
                  }
                }}
              />
            )}
          </AnimatedBigHeaderCardControls.Consumer>
        }
        error={error}
        errorCloseOverride={!cardOpen}
        customOpenBodyAnimationProps={{
          ref: cardBodyAnimation,
          onRest: () => {
            setBodyAnimationsFinished(true);
            setTransition(false);
            setFirstTime(false);
          },
          ...(!firstTime && { delay: 100 })
        }}
      />
    </div>
  );
};

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
)(LoginRegisterForm);
