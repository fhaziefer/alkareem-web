import { useState } from 'react';
import { signupFields } from "../constants/FormFields"
import FormAction from "./FormAction";
import Input from "./Input";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const fields=signupFields;

let fieldsState={};

fields.forEach(field => fieldsState[field.id]='');

export default function Signup(){
  const navigate = useNavigate();
  const [signupState,setSignupState]=useState(fieldsState);

  const handleChange=(e)=>setSignupState({...signupState,[e.target.id]:e.target.value});

  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(signupState)
    createAccount()
  }

  //handle Signup API Integration here
  const createAccount= async () => { 
    const apiUrl = process.env.REACT_APP_BASE_URL;
    const data = {
      username: signupState.username.toLowerCase(),
      password: signupState.password
    }

    try {
      const response = await axios.post(`${apiUrl}/register`, data);
      if (response.status === 200) {
        navigate("/login");
      }
    } catch (error) {
      const errorMessage = error.response.data.errors;
      console.log(errorMessage);
    }

  }

    return(
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="">
        {
                fields.map(field=>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={signupState[field.id]}
                            labelText={field.labelText}
                            labelFor={field.labelFor}
                            id={field.id}
                            name={field.name}
                            type={field.type}
                            isRequired={field.isRequired}
                            placeholder={field.placeholder}
                    />
                
                )
            }
          <FormAction handleSubmit={handleSubmit} text="Daftar" />
        </div>

         

      </form>
    )
}