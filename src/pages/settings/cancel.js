/* global fetch:false */
/* global Headers:false */

// TODO test
export default () => {
    fetch('/stripe/cancel', {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        credentials: 'same-origin'
    }).then(response => {
        response.json().then(data => {
        console.log(data)
        })
    })
}
  