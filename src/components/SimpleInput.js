import { useRef, useState } from "react";

const SimpleInput = (props) => {
  // method one - using state
  const [enteredName, setEnteredName] = useState("");
  const [enteredNameIsValid,setEnteredNameIsValid] = useState(true);

  // method two - using refs
  const nameInputRef = useRef();

  const nameInputChangeHandler = (e) => {
    setEnteredName(e.target.value);
  };

  const formSubmitionHandler = (e) => {
    e.preventDefault();

    if (enteredName.trim() == ''){
      setEnteredNameIsValid(false);
      return;
    }

    setEnteredNameIsValid(true);

    console.log(enteredName);

    // method two - using ref
    const enteredValue = nameInputRef.current.value;
    console.log(enteredValue);

    // nameInputRef.current.value = ''; ==> NOT IDEAL, DON'T MANIPULATE THE DOM
    setEnteredName(' '); // ==> PREFERED METHOD FOR RESETING THE ENTERED VALUE
  };

  const nameInputClasses = enteredNameIsValid 
  ? 'form-control' 
  : 'form-control invalid';

  return (
    <form onSubmit={formSubmitionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          ref={nameInputRef}
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
          value={enteredName} 
        />
        {!enteredNameIsValid && <p className="error-text">Name must not be empty</p>}
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
