export async function login(email :string, password : string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok || response.status === 401) {
      throw new Error('Invalid credentials');
    }

    const responseBody = await response.json();
    return responseBody.body.token;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
}

export async function register(username : string, email : string, password : string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName: username,
        email,
        password,
      }),
    });

    if (response.status === 409) {
      throw new Error('Email already in use');
    } else if (response.ok && response.status === 201) {
      const responseBody = await response.json();
      return responseBody.body.token;
    } else {
      throw new Error('Registration failed');
    }
  } catch (error) {
    console.error('Error registering:', error);
    throw error;
  }
}