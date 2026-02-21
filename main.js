const generateBtn = document.getElementById('generate-btn');
const numbersContainer = document.getElementById('numbers');
const historyList = document.getElementById('history-list');

const generateNumbers = () => {
    const numbers = new Set();
    while (numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }
    return Array.from(numbers).sort((a, b) => a - b);
};

const getNumberColor = (number) => {
    if (number <= 10) return '#fbc400'; // Yellow
    if (number <= 20) return '#69c8f2'; // Blue
    if (number <= 30) return '#ff7272'; // Red
    if (number <= 40) return '#aaa'; // Gray
    return '#b0d840'; // Green
};

const displayNumbers = (numbers) => {
    numbersContainer.innerHTML = '';
    numbers.forEach(number => {
        const numberEl = document.createElement('div');
        numberEl.classList.add('number');
        numberEl.textContent = number;
        numberEl.style.backgroundColor = getNumberColor(number);
        numbersContainer.appendChild(numberEl);
    });
};

const addToHistory = (numbers) => {
    const listItem = document.createElement('li');
    listItem.textContent = numbers.join(', ');
    historyList.prepend(listItem);
};

generateBtn.addEventListener('click', () => {
    const newNumbers = generateNumbers();
    displayNumbers(newNumbers);
    addToHistory(newNumbers);
});

// Initial generation
generateBtn.click();
