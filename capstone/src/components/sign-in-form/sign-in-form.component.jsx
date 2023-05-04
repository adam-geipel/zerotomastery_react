import { useState, useContext } from "react";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";

import Button from "../../components/button/button.component";
import FormInput from "../../components/form-input/form-input.component";

import { UserContext } from "../user.context";

import "./sign-in-form.styles.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [errorMessage, setErrorMessage] = useState("");
  const { email, password } = formFields;

  const { setCurrentUser } = useContext(UserContext);

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    setCurrentUser(user);
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    console.log(`email:${email}, password:${password}`);
    try {
      const { auth } = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      setCurrentUser(auth);
    } catch (error) {
      console.log(JSON.stringify(error));
      switch (error.code) {
        case "auth/wrong-password":
        case "auth/user-not-found":
          setErrorMessage("Email or password incorrect.");
          break;
        case "auth/invalid-email":
          setErrorMessage("Invalid Email address.");
          break;
        default:
          console.log(error);
      }
    } finally {
      resetFormFields();
    }
  };

  return (
    <div className="sign-in-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <p className="error">{errorMessage}</p>
      <form onSubmit={handleSubmit}>
        <FormInput
          type="text"
          name="email"
          label="Email"
          required
          value={email}
          onChange={handleChange}
        />
        <FormInput
          type="password"
          name="password"
          label="Password"
          required
          value={password}
          onChange={handleChange}
        />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" onClick={signInWithGoogle} buttonType="google">
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
