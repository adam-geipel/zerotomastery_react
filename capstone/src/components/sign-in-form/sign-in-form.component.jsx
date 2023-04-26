import { useState } from "react";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import Button from "../../components/button/button.component";
import FormInput from "../../components/form-input/form-input.component";

import "./sign-in-form.styles.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

const logGoogleUser = async () => {
  const { user } = await signInWithGooglePopup();
  const userDocRef = await createUserDocumentFromAuth(user);
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    alert("here!");
  };

  return (
    <div className="sign-in-form-container">
      <div>Sign in</div>
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form>
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
        <Button type="submit" onClick={handleSubmit}>
          Sign in with Email
        </Button>
        <Button onClick={logGoogleUser} buttonType="google">
          Sign in with Google
        </Button>
      </form>
    </div>
  );
};

export default SignInForm;
