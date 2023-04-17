import { useState } from "react"; // import the 'useState' hook from the React library
import axios from "axios"; // import the 'axios' library for making HTTP requests

const AuthPage = (props) => { // define the 'AuthPage' component that takes in 'props' as an argument
  const [username, setUsername] = useState(); // create state variables for 'username', 'secret', 'email', 'first_name', and 'last_name'
  const [secret, setSecret] = useState();
  const [email, setEmail] = useState();
  const [first_name, setFirstName] = useState();
  const [last_name, setLastName] = useState();

  const onLogin = (e) => { // define a function 'onLogin' that takes in an event 'e' as an argument
    e.preventDefault(); // prevent the default form submission behavior
    axios // make an HTTP POST request using 'axios'
      .post("http://127.0.0.1:8000/login", { username, secret }) // to the specified URL with the 'username' and 'secret' as the request payload
      .then((r) => props.onAuth({ ...r.data, secret })) // if the request is successful, call the 'onAuth' function passed in as a prop and pass in the response data and 'secret' as an object
      .catch((e) => console.log(JSON.stringify(e.response.data))); // if there's an error, log the error message to the console
  };

  const onSignup = (e) => { // define a function 'onSignup' that takes in an event 'e' as an argument
    e.preventDefault(); // prevent the default form submission behavior
    axios // make an HTTP POST request using 'axios'
      .post("http://127.0.0.1:8000/signup", { // to the specified URL with the 'username', 'secret', 'email', 'first_name', and 'last_name' as the request payload
        username,
        secret,
        email,
        first_name,
        last_name,
      })
      .then((r) => props.onAuth({ ...r.data, secret })) // if the request is successful, call the 'onAuth' function passed in as a prop and pass in the response data and 'secret' as an object
      .catch((e) => console.log(JSON.stringify(e.response.data))); // if there's an error, log the error message to the console
  };

  return ( // return the JSX markup for the login and sign up forms
    <div className="login-page">
      <div className="card">
        {/* Login Form */}
        <form onSubmit={onLogin}> // define the login form and attach the 'onLogin' function to the form's 'onSubmit' event
          <div className="title">Login</div>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)} // set the 'username' state variable to the value of the input field whenever it changes
          />
          <input
            type="password"
            name="secret"
            placeholder="Password"
            onChange={(e) => setSecret(e.target.value)} // set the 'secret' state variable to the value of the input field whenever it changes
          />
          <button type="submit">LOG IN</button>
        </form>

        {/* Sign Up Form */}
        <form onSubmit={onSignup}>`
          <div className="title">or Sign Up</div>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            name="secret"
            placeholder="Password"
            onChange={(e) => setSecret(e.target.value)}
          />
          <input
            type="text"
            name="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            name="first_name"
            placeholder="First name"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            name="last_name"
            placeholder="Last name"
            onChange={(e) => setLastName(e.target.value)}
          />
          <button type="submit">SIGN UP</button>
        </form>
      </div>

      <style>{`
      .login-page { width: 100vw; height: 100vh; padding-top: 6vw; background: linear-gradient(180deg, rgba(117,84,160,1) 7%, rgba(117,84,160,1) 17%, rgba(106,95,168,1) 29%, rgba(99,103,174,1) 44%, rgba(87,116,184,1) 66%, rgba(70,135,198,1) 83%, rgba(44,163,219,1) 96%, rgba(22,188,237,1) 100%, rgba(0,212,255,1) 100%); }
      .card { width: 200px; position: relative; left: calc(50vw - 100px); text-align: center; }
      .title { padding-top: 32px; font-size: 22px; color: white; font-weight: 700; }
      input { width: calc(100% - 16px); margin-top: 12px; padding: 8px; background-color: #e6f7ff; outline: none; border: 1px solid #e6f7ff; }
      button { margin-top: 12px; width: 100%; padding: 8px; }
      `}</style>
    </div>
  );
};

export default AuthPage;