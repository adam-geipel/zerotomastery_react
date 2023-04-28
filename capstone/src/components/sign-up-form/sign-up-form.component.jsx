import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import "./sign-up-form.styles.scss";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const [registerError, setRegisterError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setRegisterError("");
    setSubmitting(true);

    if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setRegisterError("You have entered an invalid email address");
      setSubmitting(false);
      return;
    }
    if (password !== confirmPassword) {
      setRegisterError("Passwords do not match");
      setSubmitting(false);
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      await createUserDocumentFromAuth(user, {
        displayName,
      });
    } catch (error) {
      console.log("Unable to register new user", error.message);
      if (error.code === "auth/email-already-in-use") {
        setRegisterError("Unable to create user. User already exists.");
      }
      setSubmitting(false);
      resetFormFields();
    }
  };

  return (
    <div className="sign-up-form-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email address and password</span>
      <p className="error">{registerError}</p>
      <form>
        <FormInput
          label="Display Name"
          name="displayName"
          type="text"
          required
          value={displayName}
          onChange={handleChange}
        />
        <FormInput
          label="Email"
          name="email"
          type="text"
          required
          value={email}
          onChange={handleChange}
        />
        <FormInput
          label="Password"
          name="password"
          type="password"
          required
          value={password}
          onChange={handleChange}
        />
        <FormInput
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          required
          value={confirmPassword}
          onChange={handleChange}
        />
        <Button type="submmit" onClick={handleSubmit} disabled={isSubmitting}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default SignUpForm;
