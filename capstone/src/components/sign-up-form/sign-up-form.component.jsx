import React from "react";
import FormInput from "../form-input/form-input.component";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = React.useState({ defaultFormFields });
  const { displayName, email, password, confirmPassword } = formFields;
  const [registerError, setRegisterError] = React.useState("");
  const [isSubmitting, setSubmitting] = React.useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setRegisterError("");
    setSubmitting(true);

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
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
        alert("User already in use.");
      }
      setSubmitting(false);
      return;
    }
  };

  return (
    <div>
      <h1>Sign up with your email address and password</h1>
      <p>{registerError}</p>
      <form>
        <FormInput
          name="displayName"
          type="text"
          required
          onChange={handleChange}
        />
        <FormInput name="email" type="text" required onChange={handleChange} />
        <FormInput
          name="password"
          type="password"
          required
          onChange={handleChange}
        />
        <FormInput
          name="confirmPassword"
          type="password"
          required
          onChange={handleChange}
        />
        <button type="submmit" onClick={handleSubmit} disabled={isSubmitting}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
