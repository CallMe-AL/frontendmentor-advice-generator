const adviceId = document.querySelector('.advice-id');
const adviceText = document.querySelector('.advice-text-content');
const advicebtn = document.querySelector('.change-advice-btn');

let text = '';
let id = 0;

// load some advice on first visit
window.addEventListener('load', () => {
  getContent();
});

function getContent() {
  fetch('https://api.adviceslip.com/advice', {
    // random advice is cached by default, prevents potential caching issues
    cache: 'no-cache'
  })
    .then(response => {
      if (!response.ok) {
        text = response.status;
        id = 'Oh noes!';
        setContent(text, id);
        throw new Error('Uh oh! There was an error receiving your advice.');        
      } else {
        return response.json();
      }      
    })
    .then(data => {
      text = data.slip.advice;
      id = data.slip.id;
      setContent(text, id);
    })
    .catch(error => {
      console.log('There\'s been an issue receiving your advice: ', error);
    });
}

function setContent(string, integer) {
  adviceText.textContent = string;
  adviceId.textContent = integer;
}

advicebtn.addEventListener('click', () => {
  getContent();
});