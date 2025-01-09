
const darkButton = document.getElementById('dark');
const lightButton = document.getElementById('light');


const setColorMode = () => {
  if ( localStorage.getItem('colorMode') == 'dark') {
    setDarkMode();
    darkButton.click();
    
  } 
  else if ( localStorage.getItem('colorMode') == 'light'){
    setLightMode();
    lightButton.click();
    
  }
  
}

const checkMode = () => {
  console.log(localStorage.getItem('colorMode'));
  if (localStorage.getItem('colorMode') == null) {
    if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      lightButton.click();
    }
    else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      darkButton.click();
    }
  }
}

const checkModeChange = () => {
  window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (event) => {
    checkMode();
  })
}

const setDarkMode = () => {
  (document.querySelector('body').classList = 'dark');
  localStorage.setItem('colorMode', 'dark');
  console.log(localStorage.getItem('colorMode'));
}

const setLightMode = () => {
  (document.querySelector('body').classList = 'light');
  localStorage.setItem('colorMode', 'light');
  console.log(localStorage.getItem('colorMode'));
}


setColorMode();
checkMode();
checkModeChange();


const radioButtons = document.querySelectorAll('.toggle__wrapper input');

radioButtons.forEach((radioButton) => {
  radioButton.addEventListener('click', (event) => {    
    
    if (darkButton.checked ) {
      setDarkMode();
      
    } 
    else {
      setLightMode();
      
    }
  });
});


