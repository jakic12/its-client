export async function put(url = '', data = {}) {
  const response = await fetch(process.env.REACT_APP_API_HOST + url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  await validateErrors(response);
  return await response.json();
}

export async function post(url = '', data = {}) {
  const response = await fetch(process.env.REACT_APP_API_HOST + url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  await validateErrors(response);
  return await response.json();
}

export async function get(url) {
  console.log('process.env.REACT_APP_API_HOST ', process.env.REACT_APP_API_HOST)
  const response = await fetch(process.env.REACT_APP_API_HOST + url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  });
  await validateErrors(response);
  try {
    return await response.json();
  } catch (e) {
    console.error('error: ', e);
    throw new Error(`Unexpected error`);
  }
}

export async function remove(url) {
  const response = await fetch(process.env.REACT_APP_API_HOST + url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
  });
  await validateErrors(response);
  return await response.json();
}

async function validateErrors(response) {
  if (response.status >= 400) {
    let resError = await response.json();
    throw new Error(resError.message,);
  }
}