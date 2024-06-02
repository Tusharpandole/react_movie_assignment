 export const handleLogin = (email, password) => {
    return new Promise((resolve, reject) => {
      fetch('https://drawingboard.onrender.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })
        .then((response) => {
          if (!response.ok) {
            if (response.status === 404) {
              throw new Error('User not found');
            } else if (response.status === 401) {
              throw new Error('Password incorrect');
            } else {
              throw new Error('Login failed');
            }
          }
          return response.json();
        })
        .then((data) => {
          resolve({ token: data.token });
        })
        .catch((error) => {
          console.error('Error:', error);
          reject(error);
        });
    });
  };
  
  // services/authService.js
export const handleSignup = (name,email, password) => {
    // your signup logic here, e.g., making an API call
     fetch('https://drawingboard.onrender.com/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name ,email, password }),
    }).then( response => {return response.json()});
  };
  

  