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


let counterClick = 0;
let numberOfRound = 25;
imageView.all = [];
let leftRandom = 0
let middleRandom = 0
let rightRandom = 0
let prevArr=[];

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



for (let i = 0; i < imgArray.length; i++) {
  new imageView(imgArray[i].split('.')[0], imgArray[i]);
}

console.log('data', imageView.all);


function render() {

  do {
    leftRandom = getRandomNumber(0, imgArray.length - 1);
    middleRandom = getRandomNumber(0, imgArray.length - 1);
    rightRandom = getRandomNumber(0, imgArray.length - 1);
  } while (leftRandom === middleRandom ||
     middleRandom === rightRandom ||
      rightRandom === leftRandom
      // prevArr.includes(leftRandom) ||
      )

      prevArr = [rightRandom,leftRandom,middleRandom];


  leftImage.src = './img/' + imageView.all[leftRandom].image;
  middleImage.src = './img/' + imageView.all[middleRandom].image;
  rightImage.src = './img/' + imageView.all[rightRandom].image;

  imageView.all[leftRandom].shown++;
  imageView.all[middleRandom].shown++;
  imageView.all[rightRandom].shown++;

}
render();






imageSection.addEventListener('click', clickHandler);



function clickHandler(e) {
 
  if ((e.target.id === 'leftImage' || e.target.id === 'rightImage' || e.target.id === 'middleImage') && counterClick < numberOfRound) 
  { counterClick++; 
    console.log(counterClick);
    if (e.target.id === 'leftImage') {
      imageView.all[leftRandom].counter++; render();
    }

    if (e.target.id === 'rightImage') {
      imageView.all[rightRandom].counter++; render();
    }

    if (e.target.id === 'middleImage') {
      imageView.all[middleRandom].counter++; render();
    }
    imageView.all.shown++;
  }


  else if (counterClick >= numberOfRound) {
    for (let i = 0; i < imgArray.length; i++) {
      let resultLi = document.createElement('li');
      results.appendChild(resultLi);
      resultLi.textContent = `${imageView.all[i].Name} had ${imageView.all[i].counter} votes , and was seen ${imageView.all[i].shown} times`;


    }
    imageSection.removeEventListener('click', clickHandler);
  }
  if (counterClick >= numberOfRound) {
    createChart();

  }
}


function getRandomNumber(min, max) {
  let random;
  let allowed;
  do{
    random= Math.floor(Math.random() * (max - min + 1) + min);
    allowed = true;
    for (let i=0; i<prevArr.length; i++){
      if (random=== prevArr[i]){
        allowed= false;
      }
    }
  } while(!allowed)
  return random;
}



console.log(button);
button.addEventListener('click', submitButton)

function submitButton() {



  for (let i = 0; i < imgArray.length; i++) {

    let li = document.createElement('li');
    results.appendChild(li);
    li.textContent = `${imageView.all[i].Name} had ${imageView.all[i].counter} votes , and was seen ${imageView.all[i].shown} times`;
    console.log(li);
  }
  button.removeEventListener('click', submitButton)

}
// chart:

function createChart() {

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