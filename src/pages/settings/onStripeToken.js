/* global fetch:false */
/* global Headers:false */
export default token => {
  fetch('/stripe/earlyAdopterUpgrade', {
    method: 'POST',
    body: JSON.stringify(token),
    headers: new Headers({ 'Content-Type': 'application/json' }),
    credentials: 'same-origin'
  }).then(response => {
    response.json().then(data => {
      console.log(data)
    })
  })
}
