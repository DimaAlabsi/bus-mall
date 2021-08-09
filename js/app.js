'use strict';


let imgArray = [
  'bag.jpg',
  'banana.jpg',
  'bathroom.jpg',
  'boots.jpg',
  'breakfast.jpg',
  'bubblegum.jpg',
  'chair.jpg',
  'cthulhu.jpg',
  'dog-duck.jpg',
  'dragon.jpg',
  'pen.jpg',
  'pet-sweep.jpg',
  'scissors.jpg',
  'shark.jpg',
  'sweep.png',
  'tauntaun.jpg',
  'unicorn.jpg',
  'water-can.jpg',
  'wine-glass.jpg',
];


let counter = 0;
let numberOfRound = 25;

const imageSection = document.getElementById('imageSection');
let leftImage = document.getElementById('leftImage');
let middleImage = document.getElementById('middleImage');
let rightImage = document.getElementById('rightImage');


let button = document.getElementById('viewResults');
let results = document.getElementById('result');


function imageView(name, imageSrc) {
  this.Name = name;
  this.image = imageSrc;
  this.shown = 0;
  this.counter = 0;
  imageView.all.push(this);

}

imageView.all = [];

for (let i = 0; i < imgArray.length; i++) {
  new imageView(imgArray[i].split('.')[0], imgArray[i]);
}

console.log('data', imageView.all);
let leftRandom = 0
let middleRandom = 0
let rightRandom = 0

function render() {

  do {
    leftRandom = getRandomNumber(0, imgArray.length - 1);
    middleRandom = getRandomNumber(0, imgArray.length - 1);
    rightRandom = getRandomNumber(0, imgArray.length - 1);
  } while (leftRandom === middleRandom || middleRandom === rightRandom || rightRandom === leftRandom);

  leftImage.src = './img/' + imageView.all[leftRandom].image;
  middleImage.src = './img/' + imageView.all[middleRandom].image;
  rightImage.src = './img/' + imageView.all[rightRandom].image;

  imageView.all[leftRandom].shown++;
  imageView.all[middleRandom].shown++;
  imageView.all[rightRandom].shown++;
  imageView.all[leftRandom].counter++
  imageView.all[rightRandom].counter++
  imageView.all[middleRandom].counter++
}
render();

imageSection.addEventListener('click', clickHandler);
function clickHandler(e) {
  if ((e.target.id === 'leftImage' || e.target.id === 'rightImage' || e.target.id === 'middleImage') && counter < numberOfRound) {
    render();
    counter++;
  }
  else {
    document.getElementById('imageSection').removeEventListener('click', clickHandler)
    createChat();
  }
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}



// topButton.addEventListener('click', stopAndShowResult);

// function stopAndShowResult() {
//     for (let i = 0; i < imgProductArray.length; i++) {
//         let resultUl = document.createElement('ul');
//         resultDiv.appendChild(resultUl);
//         let resultLi = document.createElement('li');
//         resultUl.appendChild(resultLi);
//         resultLi.textContent = `${Product.productObjects[i].productName} had ${Product.productObjects[i].timeClick} votes, and was seen ${Product.productObjects[i].timeShowImg} times.`;
//     }
// }

// function removeHandler() {
//     document.getElementById("imgProductSection").removeEventListener("click", changeImg);
// }
console.log(button);
button.addEventListener('click', submitButton)
function submitButton() {



  for (let i = 0; i < imgArray.length; i++) {
    console.log('di', imageView.all[0])
    let li = document.createElement('li');
    results.appendChild(li);
    li.textContent = `${imageView.all[i].Name} had ${imageView.all[i].counter} votes , and was seen ${imageView.all[i].shown} times`;
    console.log(li);
  }

}
// chart:

function createChat() {

  let nameArr = [];
  let votesArr = [];
  let shownArr = [];

  for (let i = 0; i < imageView.all.length; i++) {
    nameArr.push(imageView.all[i].Name);
    shownArr.push(imageView.all[i].shown);
    votesArr.push(imageView.all[i].counter);
  }



  let ctx = document.getElementById('myChart').getContext('2d');
  let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: nameArr,
      datasets: [{
        label: ' shown ',
        data: shownArr,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',],
              borderWidth: 1    
        },
      {

        labels: nameArr,

        label: '  votes ',
        data: votesArr,
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1
      }
    ]
  },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}