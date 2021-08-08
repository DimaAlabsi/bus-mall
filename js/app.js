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

let all = [];
let counter = 0;
let numberOfRound = 25;

const imageSection = document.getElementById('imageSection');
let leftImage = document.getElementById( 'leftImage' );
let middleImage = document.getElementById('middleImage' );
let rightImage = document.getElementById( 'rightImage' ); 

const buttonSection = document.getElementById('buttonSection');
let button = document.getElementById('viewResults');



function imageView ( name, imageSrc ) {
    this.name = name;
    this.image = imageSrc;
    this.shown = 0;
    imageView.all.push( this );
   
  }
  
  imageView.all = [];

  for( let i = 0; i < imgArray.length; i++ ) {
    new imageView( imgArray[i].split( '.' )[0], imgArray[i] );
  }
  
  console.log( imageView.all );

  function render() {
    let leftRandom = getRandomNumber( 0, imgArray.length - 1 );
    let middleRandom = getRandomNumber( 0, imgArray.length - 1 );
     let rightRandom = getRandomNumber( 0, imgArray.length - 1 );
  
    
    leftImage.src = './img/' + imageView.all[leftRandom].image;
   middleImage.src= './img/'+ imageView.all[middleRandom].image;
    rightImage.src = './img/' + imageView.all[rightRandom].image;
  
    imageView.all[leftRandom].shown++;
    imageView.all[middleRandom].shown++;
   imageView.all[rightRandom].shown++;
  
    
  }
   render();

   imageSection.addEventListener('click', clickHandler);
function clickHandler(e) {
  if((e.target.id === 'leftImage' || e.target.id === 'rightImage'  || e.target.id === 'middleImage') && counter < numberOfRound) {
    render();
    counter++;
  }
  
}

function getRandomNumber( min, max ) {
  return Math.floor( Math.random() * ( max - min + 1 ) + min );
}
  
buttonSection.addEventListener('submit' , submitButton)
function submitButton (b){

    let ul = document.createElement('ul');
    buttonSection.appendChild(ul);
   for (let i=0 ; i<= numberOfRound ; i++){

  let li = document.createElement('li');
    ul.appendChild(li); 
        li.textContent =   `${imgArray[i].split( '.' )[0]} had ${imageView.all[i].counter} votes , and was seen ${imageView.all[i].shown} times`;
   console.log(li);
   }
   
}

submitButton();
     