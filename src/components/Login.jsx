import { useState } from "react";
import { loginFields } from "../constants/FormFields";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const fields = loginFields;

let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

export default function Login() {
  const navigate = useNavigate();

  const [loginState, setLoginState] = useState(fieldsState);

  const handleChange = (e) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    authenticateUser();
  };

  //Handle Login API Integration here
  const authenticateUser = () => {
    const apiUrl = process.env.REACT_APP_BASE_URL;
    const data = {
      username: loginState.username.toLowerCase(),
      password: loginState.password,
    };

    axios
      .post(`${apiUrl}login`, data)
      .then((res) => {
        const response = res.data.data;
        window.localStorage.setItem('USER_ID', JSON.stringify(response.id))
        window.localStorage.setItem('USER_TOKEN', JSON.stringify(response.token))
        window.localStorage.setItem('LOGIN_STATUS', true)
        if (res.status === 200) {
          navigate("/");
        }
      })
      .catch((error) => {
        const errorMessage = error.response.data.errors;
        console.log(errorMessage);
      });
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="-space-y-px">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={loginState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
      </div>

      <FormExtra />
      <FormAction handleSubmit={handleSubmit} text="Masuk" />
    </form>
  );
}
