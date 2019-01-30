export const fetchData = async (url) => {
  const response = await fetch(url);
  if(response.ok) {
    return response.json()
  } else {
    throw Error(`Error fetching, ${response.status}`)
  }
}

export const fetchUser = async (user) => {
  const url = 'http://localhost:3000/api/users';
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if(response.ok) {
    let data = response.json();
    return data
  } else {
    throw Error(`Error fetching, ${response.status}`)
  }
}