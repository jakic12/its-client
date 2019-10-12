import React, { useRef, useState, useEffect } from "react";

// external libs
import {
  useSpring,
  animated,
  config,
  useTransition,
  useChain
} from "react-spring";
import { connect } from "react-redux";

// import scss
import "../scss/components/AnimatedForm.scss";

// import actions
import { fetchLogin } from "../redux/actions/login";

/**
 * A form with animated form fields
 * @param {boolean} display should the fields be displayed?
 * @param {Array} formFieldsArray the fields of the form (array of FormField or CustomFormField)
 * @param {Function} onSubmit function to be called when the form submits
 * @param {Object} customTransitionProps custom props to be passed to the transition
 */
const AnimatedForm = ({ display = true, formFieldsArray, onSubmit, customTransitionProps={} }) => {
  const [formFields, setFormFields] = useState({}); // hook to hold the input field data

  // Transition for the fields
  const displayFields = useTransition(
    display ? formFieldsArray : [],
    item => item.name,
    {
      ...customTransitionProps,
      unique: true,
      trail: 400 / formFieldsArray.length,
      from: { opacity: 0, transform: "scale(0)" },
      enter: { opacity: 1, transform: "scale(1)" },
      leave: { opacity: 0, transform: "scale(0)" }
    }
  );

  // function to set field data
  const setField = (field, data) => {
    setFormFields(Object.assign({}, formFields, { [field]: data }));
  };

  return (
    <form
      className="animatedForm"
      onSubmit={e => {
        e.preventDefault();
        if (onSubmit) onSubmit(formFields);
      }}
    >
      {displayFields.map(({ item, key, props }) => {
        const field = item;
        if (field.customField) {
          return (
            <animated.div key={key} /*className={field.wrapperClassName}*/ style={props}>
              {field.render()}
            </animated.div>
          );
        } else
          return (
            <animated.div className="formField" key={key} style={props}>
              <div className="fieldBody">
                <div className="icon">
                  {field.icon && <field.icon />}
                </div>
                <div className="inputField">
                  <input
                    {...(field.autoFocus ? { autoFocus: true } : {})}
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
  );
};

export function FormField(name, placeholder, inputType, icon, autoFocus) {
  return {
    name,
    placeholder,
    inputType,
    icon,
    autoFocus
  };
}

export function CustomFormField(name, render) {
  if(!typeof render === `function`)
    throw new Error(`render should be a function`)

  return {
    name,
    customField: true,
    render
  };
}
export default AnimatedForm;
