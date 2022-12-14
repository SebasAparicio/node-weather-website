const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault()
    const location = searchElement.value
    fetch('/weather?address='+location).then((response) =>{
    response.json().then((data) =>{
        if (data.error){
            messageOne.innerHTML = data.error
        }else{
            messageOne.innerHTML = data.location
            messageTwo.innerHTML = data.forecast
        }
    })
})

    
})

