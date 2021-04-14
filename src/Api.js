export const authorize = (username, password) => {
  return fetch(`https://agile-garden-50413.herokuapp.com/api/token/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({username, password})
  })
  .then(res => res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`))
  .then(data => {
    if (data.auth_token) {
      localStorage.setItem('jwt', data.auth_token);
      return data;
    } else {
      return
    }
  })
  .catch(err => console.log(err));
}

// export const getContent = (jwt) => {
//   return fetch(`https://agile-garden-50413.herokuapp.com/api/token/login`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${jwt}`
//     },
//   })
//   .then(res => res.json())
//   .then(res => {
//     console.log(res)
//     return res;
//   })
//   .catch(err => console.log(err));
// }