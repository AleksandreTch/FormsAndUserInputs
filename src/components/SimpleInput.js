import {useState } from "react";

import useInput from "../hooks/use-inputs";

const SimpleInput = (props) => {

  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput
  } = useInput( value => value.trim() !== '');

  // const [enteredName, setEnteredName] = useState("");

  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);

  const enteredEmailIsValid = enteredEmail.includes('@');
  const enteredEmailIsInvalid = !enteredEmailIsValid && enteredEmailTouched;

  let formIsValid = false;

    if(enteredNameIsValid && enteredEmailIsInvalid)
  formIsValid = true;


  const emailInputChangeHandler = (e) => {
    setEnteredEmail(e.target.value);
  } 

  const emailInputBlurHandler = (e) => {
    setEnteredEmailTouched(true);
  } 

  const formSubmitionHandler = (e) => {
    e.preventDefault();

    if (!enteredNameIsValid){
      return;
    }

    resetNameInput();

    setEnteredEmail('');
    setEnteredEmailTouched(false);
  };

  const nameInputClasses = nameInputHasError 
  ? 'form-control invalid' 
  : 'form-control';

  const emailInputClasses = enteredEmailIsInvalid 
  ? 'form-control invalid'
  : 'form-control';

  return (
    <form onSubmit={formSubmitionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          value={enteredName} 
        />
        {nameInputHasError && <p className="error-text">Name must not be empty</p>}
      </div>

      <div className={emailInputClasses}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          onChange={emailInputChangeHandler}
          onBlur={emailInputBlurHandler}
          value={enteredEmail} 
        />
        {enteredEmailIsInvalid && <p className="error-text">This email is invalid</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
