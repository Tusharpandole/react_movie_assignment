// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { handleSignup } from '../../services/authService';
// import './signup.css'; // Import CSS file for styling

// const Signup = () => {
//   const navigate = useNavigate();
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     handleSignup(name, email, password, navigate);
//   };

//   return (
//     <div className="signup-container">
//       <div className="top-bar">
//         <Link to="/">
//           <span className="back-arrow">{'<'}</span>
//           <span className="home-m">Home</span>
//         </Link>
//       </div>
//       <h2>Signup</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Username"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button type="submit">Signup</button>
//       </form>
//       <p className="login_user">Already have an account?<Link className="navigate_login" to="/">Login</Link></p>
//     </div>
//   );
// };

// export default Signup;

// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { handleSignup } from '../../services/authService';
// import './signup.css'; // Import CSS file for styling

// const Signup = () => {
//   const navigate = useNavigate();
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setError('');
//     handleSignup(name, email, password, navigate)
//       .catch((error) => {
//         setError('Signup failed. Please check your details and try again.');
//         console.error('Signup failed:', error);
//       });
//   };

//   return (
//     <div className="signup-container">
//       <div className="top-bar">
//         <Link to="/">
//           <span className="back-arrow">{'<'}</span>
//           <span className="home-m">Home</span>
//         </Link>
//       </div>
//       <h2>Signup</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Username"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button type="submit">Signup</button>
//       </form>
//       {error && <p className="error-message">{error}</p>}
//       <p className="login_user">
//         Already have an account? <Link className="navigate_login" to="/">Login</Link>
//       </p>
//     </div>
//   );
// };

// export default Signup;



import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { handleSignup } from '../../services/authService';
import './signup.css'; // Import CSS file for styling

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Call the handleSignup function to register the user
      await handleSignup(name, email, password);
      
      // Navigate to the home page after successful signup
      navigate('/home');
    } catch (error) {
      console.error('Signup failed:', error);
      // Handle any signup errors here
    }
  };

  return (
    <div className="signup-container">
      <div className="top-bar">
        <Link to="/">
          <span className="back-arrow">{'<'}</span>
          <span className="home-m">Home</span>
        </Link>
      </div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Signup</button>
      </form>
      <p className="login_user">Already have an account?<Link className="navigate_login" to="/">Login</Link></p>
    </div>
  );
};

export default Signup;
