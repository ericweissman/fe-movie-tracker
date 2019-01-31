export const fetchData = async (url) => {
  const response = await fetch(url);
  if(response.ok) {
    return response.json()
  } else {
    throw Error(`Error fetching, ${response.status}`)
  }
}

export const postData = async (urlSuffix, data) => {
  const url = 'http://localhost:3000/api/users' + urlSuffix;
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
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