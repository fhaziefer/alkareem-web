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
  const authenticateUser = async () => {
    const apiUrl = process.env.REACT_APP_BASE_URL;
    const data = {
      username: loginState.username.toLowerCase(),
      password: loginState.password,
    };

    try {
      const response = await axios.post(`${apiUrl}/login`, data);
      const userData = response.data.data;
      if (response.status === 200) {
        window.localStorage.setItem("LOGIN_DATA", JSON.stringify(userData));
      }
    } catch (error) {
      const errorMessage = error.response.data.errors;
      console.log(errorMessage);
    }

    try {
      const userData = JSON.parse(window.localStorage.getItem('LOGIN_DATA'))
      const response = await axios.get(`${apiUrl}/user/${userData.id}`, {
        headers: {
          Authorization: userData.token
        }
      })
      if (response.status === 200) {
        window.localStorage.setItem("USER_DATA", JSON.stringify(response.data.data));
        navigate("/");
      }
    } catch (error) {
      const errorMessage = error.response.data.errors;
      console.log(errorMessage);
    }

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
