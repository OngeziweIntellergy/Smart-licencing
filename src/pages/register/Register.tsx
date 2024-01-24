import axios, { AxiosRequestConfig } from 'axios';
import React, { useState, ChangeEvent, FormEvent } from 'react';

interface Reason {
  Professional_Driving_Permit: boolean;
  Driver_Renewal_License: boolean;
  Motor_Vehicle_License: boolean;
  Operating_License: boolean;
  checkAll: boolean;
}

function Register() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [reason, setReason] = useState<Reason>({
    Professional_Driving_Permit: false,
    Driver_Renewal_License: false,
    Motor_Vehicle_License: false,
    Operating_License: false,
    checkAll: false,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    // If the changed checkbox is "Check All", update all options
    if (name === 'checkAll') {
      setReason({
        Professional_Driving_Permit: checked,
        Driver_Renewal_License: checked,
        Motor_Vehicle_License: checked,
        Operating_License: checked,
        checkAll: checked,
      });
    } else {
      // Update individual checkbox and "Check All" status
      const updatedCheckboxes = {
        ...reason,
        [name]: checked,
      };
      const allChecked = Object.values(updatedCheckboxes).slice(0, -1).every(Boolean);
      setReason({
        ...updatedCheckboxes,
        checkAll: allChecked,
      });
    }
  };

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    let registerUrl = "https://hps0z6b4xb.execute-api.us-east-1.amazonaws.com/prod/register";
    const requestConfig: AxiosRequestConfig = {
      headers: {
        'x-api-key': 'gNzOqOhI5771BmV6rw2962Usc4rpTtnPvxlWzVf4'
      }
    }
    const requestBody = {
      name: name,
      username: username,
      email: email,
      password: password,
      option: reason,
      station: selectedValue,
      userRole: "admin"
    }
    axios.post(registerUrl, requestBody, requestConfig).then(response => {
      console.log(response)
    }).catch(error => {
      console.log("hello")
      console.log(error)
      console.log(error.response.data.message)
    })
  }

  return (
    <div>
      <form onSubmit={submitHandler}>
        <h5>Register/Login</h5>
        Name & Surname : <input type="text" value={name} onChange={(event) => setName(event.target.value)} required />
        Username : <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} required />
        email : <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
        Password : <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
        <label>
          Choose an option:
          <select value={selectedValue} onChange={(event) => setSelectedValue(event.target.value)}>
            <option value="1"> 1</option>
            <option value="2"> 2</option>
            <option value="3"> 3</option>
          </select>
        </label>

        <label>
          Check All
          <input
            type="checkbox"
            name="checkAll"
            checked={reason.checkAll}
            onChange={handleChange}
          />
        </label>

        <label>
          Professional Driving Permit
          <input
            type="checkbox"
            name="Professional_Driving_Permit"
            checked={reason.Professional_Driving_Permit}
            onChange={handleChange}
          />
        </label>

        <label>
          Diver Renewal License
          <input
            type="checkbox"
            name="Driver_Renewal_License"
            checked={reason.Driver_Renewal_License}
            onChange={handleChange}
          />
        </label>

        <label>
          Motor Vehicle License
          <input
            type="checkbox"
            name="Motor_Vehicle_License"
            checked={reason.Motor_Vehicle_License}
            onChange={handleChange}
          />
        </label>

        <label>
          Operating License
          <input
            type="checkbox"
            name="Operating_License"
            checked={reason.Operating_License}
            onChange={handleChange}
          />
        </label>
        <input type="submit" value="submit" />
      </form>
    </div>
  )
}

export default Register