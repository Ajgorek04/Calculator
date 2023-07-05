const outputElement = document.querySelector('#output');
const topOutputElement = document.querySelector('#topoutput');
const btns = document.querySelectorAll('.btn');
const btns_znak = document.querySelectorAll('.btn-znak');
const historyElement = document.querySelector('#lista');
const clearHistory = document.querySelector('#clear');

let currentValue = 0;
let previousValue = '';
let currentOperator = null;
let currentNumbers = 0;
let history = [];
outputElement.textContent = 0;

// Wypisywanie liczb na ekranie

btns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    currentNumbers += e.target.dataset.value;
    outputElement.textContent = parseFloat(currentNumbers);
  });
});

// Przenoszenie liczb i znaku na gore
let znak;

btns_znak.forEach(button => {
  button.addEventListener('click', (e) => {
    znak = e.target.dataset.value;

    if (znak === 'CE') {
      currentNumbers = 0;
      outputElement.textContent = 0;
    } else if (znak === 'C') {
      currentNumbers = 0;
      previousValue = '';
      wynik = '';
      topOutputElement.textContent = ''
      outputElement.textContent = 0;
    } else if (znak === '⇦') {
      if (parseFloat(currentNumbers) !== 0 && currentNumbers.length > 1) {
        currentNumbers = parseFloat(currentNumbers).toString().slice(0, -1);
        outputElement.textContent = parseFloat(currentNumbers);
      } else {
        currentNumbers = 0;
      }
      outputElement.textContent = currentNumbers;
    }

    switch (znak) {
      case '+':
      case '%':
      case 'x2':
      case '/':
      case 'X':
      case '-':
        topOutputElement.textContent = parseFloat(currentNumbers);
        currentOperator = e.target.dataset.value;
        previousValue = parseFloat(currentNumbers);
        outputElement.textContent = 0;
        currentNumbers = 0;
        break;
      case '=':
        let wynik;

        if (previousValue != '') {

          switch (currentOperator) {
            case '+':
              wynik = previousValue + parseFloat(currentNumbers);
              break;

            case '%':
              wynik = previousValue % parseFloat(currentNumbers);
              break;

            case '-':
              wynik = previousValue - parseFloat(currentNumbers);
              break;

            case '/':
              wynik = previousValue / parseFloat(currentNumbers);
              break;

            case 'X':
              wynik = previousValue * parseFloat(currentNumbers);
              break;

            case 'x2':
              wynik = previousValue ** parseFloat(currentNumbers);
              break;
          }
        } else {
          return;
        }


        topOutputElement.textContent += ` ${currentOperator} ${parseFloat(currentNumbers)} =`;
        outputElement.textContent = wynik;
        currentNumbers = wynik;

        history.push(`${topOutputElement.textContent} ${wynik}`);
        updateHistory();

        break;
      case '+/-':
        if (currentNumbers !== 0) {
          currentNumbers = parseFloat(currentNumbers) * -1;
          outputElement.textContent = currentNumbers;
        }
        break;

      case '1/x':
        if (currentNumbers !== 0) {
          previousValue = parseFloat(currentNumbers);
          currentNumbers = 1 / parseFloat(currentNumbers);
          outputElement.textContent = currentNumbers;

          history.push(`1/x ${previousValue} = ${currentNumbers}`);
          updateHistory();
        }
        break;

      case '√':
        if (currentNumbers !== 0) {
          previousValue = parseFloat(currentNumbers);
          currentNumbers = Math.sqrt(parseFloat(currentNumbers));
          outputElement.textContent = currentNumbers;


          history.push(`√${previousValue} = ${currentNumbers}`);
          updateHistory();
        }
        break;
      case '.':
        if (!currentNumbers.includes('.')) {
          currentNumbers += '.';
          outputElement.textContent = parseFloat(currentNumbers);
        }
        break;
    }
  });
});

function updateHistory() {
  historyElement.innerHTML = history.map(item => `<li> ${item} </li>`).join('');
}

function deleteHistory(){
  history = [];
  updateHistory();
}

clearHistory.addEventListener('click', deleteHistory)