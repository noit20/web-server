console.log('client side js file loaded');


const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    console.log('testing');
    const location = search.value;
    const url = '/weather?address='+location;
    fetch(url).then( (response)=>{
    console.log('here');
    response.json().then((data)=>{
        if(data.error)
        {
            console.log('error getting info');
            message1.textContent = '';
            message2.textContent = 'error getting info';
        }
        else{
            console.log(data);
            message2.textContent = '';
            message1.textContent =   data.data2;

        }
         
    }
    )
})

})

 
  