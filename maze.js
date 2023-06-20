// Disable scrolling
function disableScroll() {
  // Get the current scroll position
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

  // Save the current scroll position
  window.onscroll = function() {
    window.scrollTo(scrollLeft, scrollTop);
  };
}

// Enable scrolling
function enableScroll() {
  window.onscroll = null;
}

// Call disableScroll() to disable scrolling
disableScroll();

function showMessage(message, duration) {
  const messageElement = document.getElementById('message');
  messageElement.textContent = message;
  messageElement.classList.remove('hidden');
  messageElement.style.display = 'block';

  setTimeout(function() {
    messageElement.classList.add('hidden');
    messageElement.style.display = 'none';
  }, duration);
}

//above this i did not write cause i would have no idea how too

const monsters = [];
const foods = [];
const wins = [];

const maze = document.getElementById('maze');
const player = document.getElementById('player');
let playerX = 14; // moves the player's spawn area 14 to the right
let playerY = 6; // moves the player's spawn 6 down
var score = -16; // makes score = 0
const numberOfMonsters = 1; // Adjust the number of monsters as desired

let demonic = new Audio('demonic.mp3')
let monsterw = new Audio('monster.mp3')

map1();

// Generate the maze using a 2D array
function map1() {
  maze.innerHTML = '';
  playerX = 14;
  playerY = 6;
  let mazeArray = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // #FF0000
    [1, 0, 0, 2, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 4, 4, 4, 4, 4, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 4, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1],
    [1, 2, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 4, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 2, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 2, 0, 1, 4, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 2, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 2, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 1],
    [1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1],
    [1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 2, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1],
    [1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1],
    [1, 0, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 2, 1, 0, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 2, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 2, 1, 0, 1, 1, 1, 1, 1, 2, 1, 1, 0, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1],
    [1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1],
    [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1],
    [1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 2, 1, 0, 1, 0, 1, 1, 1, 1],
    [1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1],
    [1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1],
    [1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
    [1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1],
    [1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1],
    [1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 2, 1, 0, 1, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 2, 1],
    [1, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 5, 5, 5, 1],
    [1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 5, 5, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 5, 5, 5, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ];


  playerX = 14;
  playerY = 6;
  //finds a random pos
  function getRandomPosition() {
    let x, y;
    do {
      x = Math.floor(Math.random() * mazeArray[0].length); //makes sure it spawns within the 0's and not anything else like 1's or 2's
      y = Math.floor(Math.random() * mazeArray.length);
    } while (mazeArray[y][x] == 1 || mazeArray[y][x] == 4);
    
    return { x, y };
  }


  function updatePlayerPosition() {
    player.style.left = `${playerX * 40}px`;
    player.style.top = `${playerY * 40}px`;

    // this makes it so follows the player
    const container = document.getElementById('maze_container'); // gets the id from the html
    container.style.left = `${-(playerX * 40) + (container.offsetWidth / 2) - (player.offsetWidth / 2)}px`; //when the player moves the camera will follow it by adding and taking away the player pos (idk how to word it)
    container.style.top = `${-(playerY * 40) + (container.offsetHeight / 2) - (player.offsetHeight / 2)}px`;

    
    


    

    for (const monster of monsters) {
      const monsterX = parseInt(monster.style.left) / 40; //parseint converts a string into a int (very useful stuff)
      const monsterY = parseInt(monster.style.top) / 40;

      const diffX = playerX - monsterX; //what the X difference between the player and monster is 
      const diffY = playerY - monsterY; //what the Y difference between the player and monster is 

      const moveX = Math.sign(diffX);
      const moveY = Math.sign(diffY);

      const nextX = monsterX + moveX; //where the monster will move next in the X axis
      const nextY = monsterY + moveY; //where the monster will move next in the Y axis

      if (mazeArray[nextY][nextX] !== 1) {
        setTimeout(function() {
          monster.style.left = nextX * 40 + 'px'; //Moves the monster on the X axis
          monster.style.top = nextY * 40 + 'px'; //Moves the monster on the X axis
          monsterw.play()
          checkCollision();
        }, 500);
        
      }
      checkCollision();
    }
  }

  //sees if the monster has got you
  function checkCollision() {
    for (const monster of monsters) {
      const monsterX = parseInt(monster.style.left) / 40;
      const monsterY = parseInt(monster.style.top) / 40;

      if (playerX === monsterX && playerY === monsterY) {
        demonic.play()
        restart();
        return;
      }
    }

    for (let i = 0; i < foods.length; i++) {
      const food = foods[i];
      const foodX = parseInt(food.style.left) / 40;
      const foodY = parseInt(food.style.top) / 40;
      
      if (playerX === foodX && playerY === foodY) {
        score++;
        document.getElementById('score').innerHTML = "Score: " + score;
        food.remove();
        foods.splice(i, 1); // Remove the food item from the array
      }
    }
    

    for (const win of wins) {
      const winX = parseInt(win.style.left) / 40;
      const winY = parseInt(win.style.top) / 40;
      if (playerX === winX && playerY === winY) {
        document.getElementById('winner').innerHTML = "You Win! with the score of: " + score;
        console.log('you win')
      }
    }

    

  }

  function initializeMonsters() {
    for (let i = 0; i < numberOfMonsters; i++) {
      const position = getRandomPosition();
      const monster = document.createElement('div');
      monster.className = 'monster';
      monster.style.left = position.x * 40 + 'px';
      monster.style.top = position.y * 40 + 'px';
      maze.appendChild(monster);
      monsters.push(monster);
    }
  }

  //this makes it so when you restart you restart
  function restart() {
    playerX = 14;
    playerY = 6;
    score--;
    document.getElementById('score').innerHTML = "Score: " + score; 
    updatePlayerPosition();

    // Reset monster positions
    for (const monster of monsters) {
      const position = getRandomPosition(); 
      monster.style.left = position.x * 40 + 'px';
      monster.style.top = position.y * 40 + 'px';
    }
  }

  // Draw the maze on the screen
  for (let i = 0; i < mazeArray.length; i++) {
    for (let j = 0; j < mazeArray[i].length; j++) {
      if (mazeArray[i][j] === 1) { // this is from the array 1
        const wall = document.createElement('div');
        wall.style.width = '40px';
        wall.style.height = '40px';
        wall.style.backgroundColor = 'black';
        wall.style.position = 'absolute';
        wall.style.top = i * 40 + 'px';
        wall.style.left = j * 40 + 'px';
        maze.appendChild(wall);
      }
    }
  }


  for (let i = 0; i < mazeArray.length; i++) {
    for (let j = 0; j < mazeArray[i].length; j++) {
      if (mazeArray[i][j] === 5) { // this is from the array 1
        const win = document.createElement('div');
        win.style.width = '40px';
        win.style.height = '40px';
        win.style.backgroundColor = 'green';
        win.style.position = 'absolute';
        win.style.top = i * 40 + 'px';
        win.style.left = j * 40 + 'px';
        maze.appendChild(win);
        wins.push(win);
      }
    }
  }

  // This is the scoring part
  for (let i = 0; i < mazeArray.length; i++) {
    for (let j = 0; j < mazeArray[i].length; j++) {
      if (mazeArray[i][j] === 2) {
        score++;
        const position = getRandomPosition();
        const food = document.createElement('img');
        food.src = '/idk.png';
        food.style.width = '40px';
        food.style.height = '40px';
        food.style.position = 'absolute';
        food.style.top = position.y * 40 + 'px';
        food.style.left = position.x * 40 + 'px';
        maze.appendChild(food);
        foods.push(food);
      }
    }
  }




  initializeMonsters();





  // Move the player using keys that I chose
  document.addEventListener('keydown', (event) => {
    switch (event.key) {
      case 'w':
        if (mazeArray[playerY - 1][playerX] !== 1) {
          playerY--;
          updatePlayerPosition();
        }
        break;
      case 's':
        if (mazeArray[playerY + 1][playerX] !== 1) {
          playerY++;
          updatePlayerPosition();
        }
        break;
      case 'a':
        if (mazeArray[playerY][playerX - 1] !== 1) {
          playerX--;
          updatePlayerPosition();
        }
        break;
      case 'd':
        if (mazeArray[playerY][playerX + 1] !== 1) {
          playerX++;
          updatePlayerPosition();
        }
        
        break; 
    }
    


  });
}

function changeMap() {
  // Clear the current maze
  maze.innerHTML = '';
  playerX = 14;
  playerY = 6;
  // Update mazeArray with the new map data
  mazeArray = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // #FF0000
    [1, 0, 0, 2, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 4, 4, 4, 4, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 4, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1],
    [1, 2, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 4, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 2, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 2, 0, 1, 4, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 2, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 2, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 1],
    [1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 0, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1],
    [1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 2, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1],
    [1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1],
    [1, 0, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 2, 1, 0, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 2, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 2, 1, 0, 1, 1, 1, 1, 1, 2, 1, 1, 0, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1],
    [1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1],
    [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1],
    [1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 2, 1, 0, 1, 0, 1, 1, 1, 1],
    [1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1],
    [1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1],
    [1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
    [1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 1, 0, 1, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1],
    [1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1],
    [1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 2, 1, 0, 1, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 2, 1],
    [1, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 5, 5, 5, 1],
    [1, 0, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 5, 5, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 5, 5, 5, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ];

  playerX = 14;
  playerY = 6;

  
  function getRandomPosition() {
    let x, y;
    do {
      x = Math.floor(Math.random() * mazeArray[0].length); //makes sure it spawns within the 0's and not anything else like 1's or 2's
      y = Math.floor(Math.random() * mazeArray.length);
    } while (mazeArray[y][x] == 1 || mazeArray[y][x] == 4);
    
    return { x, y };
  }


  function updatePlayerPosition() {
    player.style.left = `${playerX * 40}px`;
    player.style.top = `${playerY * 40}px`;

    // this makes it so follows the player
    const container = document.getElementById('maze_container'); // gets the id from the html
    container.style.left = `${-(playerX * 40) + (container.offsetWidth / 2) - (player.offsetWidth / 2)}px`; //when the player moves the camera will follow it by adding and taking away the player pos (idk how to word it)
    container.style.top = `${-(playerY * 40) + (container.offsetHeight / 2) - (player.offsetHeight / 2)}px`;

    
    


    

    for (const monster of monsters) {
      const monsterX = parseInt(monster.style.left) / 40; //parseint converts a string into a int (very useful stuff)
      const monsterY = parseInt(monster.style.top) / 40;

      const diffX = playerX - monsterX; //what the X difference between the player and monster is 
      const diffY = playerY - monsterY; //what the Y difference between the player and monster is 

      const moveX = Math.sign(diffX);
      const moveY = Math.sign(diffY);

      const nextX = monsterX + moveX; //where the monster will move next in the X axis
      const nextY = monsterY + moveY; //where the monster will move next in the Y axis

      if (mazeArray[nextY][nextX] !== 1) {
        setTimeout(function() {
          monster.style.left = nextX * 40 + 'px'; //Moves the monster on the X axis
          monster.style.top = nextY * 40 + 'px'; //Moves the monster on the X axis
          monsterw.play()
          checkCollision();
        }, 500);
        
      }
      checkCollision();
    }
  }

  //sees if the monster has got you
  function checkCollision() {
    for (const monster of monsters) {
      const monsterX = parseInt(monster.style.left) / 40;
      const monsterY = parseInt(monster.style.top) / 40;

      if (playerX === monsterX && playerY === monsterY) {
        demonic.play()
        restart();
        return;
      }
    }

    for (let i = 0; i < foods.length; i++) {
      const food = foods[i];
      const foodX = parseInt(food.style.left) / 40;
      const foodY = parseInt(food.style.top) / 40;
      
      if (playerX === foodX && playerY === foodY) {
        score++;
        document.getElementById('score').innerHTML = "Score: " + score;
        food.remove();
        foods.splice(i, 1); // Remove the food item from the array
      }
    }
    

    for (const win of wins) {
      const winX = parseInt(win.style.left) / 40;
      const winY = parseInt(win.style.top) / 40;
      if (playerX === winX && playerY === winY) {
        document.getElementById('winner').innerHTML = "You Win! with the score of: " + score;
        console.log('you win')
      }
    }

    

  }

  function initializeMonsters() {
    for (let i = 0; i < numberOfMonsters; i++) {
      const position = getRandomPosition();
      const monster = document.createElement('div');
      monster.className = 'monster';
      monster.style.left = position.x * 40 + 'px';
      monster.style.top = position.y * 40 + 'px';
      maze.appendChild(monster);
      monsters.push(monster);
    }
  }

  //this makes it so when you restart you restart
  function restart() {
    playerX = 14;
    playerY = 6;
    score--;
    document.getElementById('score').innerHTML = "Score: " + score; 
    updatePlayerPosition();

    // Reset monster positions
    for (const monster of monsters) {
      const position = getRandomPosition(); 
      monster.style.left = position.x * 40 + 'px';
      monster.style.top = position.y * 40 + 'px';
    }
  }

  // Draw the maze on the screen
  for (let i = 0; i < mazeArray.length; i++) {
    for (let j = 0; j < mazeArray[i].length; j++) {
      if (mazeArray[i][j] === 1) { // this is from the array 1
        const wall = document.createElement('div');
        wall.style.width = '40px';
        wall.style.height = '40px';
        wall.style.backgroundColor = 'black';
        wall.style.position = 'absolute';
        wall.style.top = i * 40 + 'px';
        wall.style.left = j * 40 + 'px';
        maze.appendChild(wall);
      }
    }
  }


  for (let i = 0; i < mazeArray.length; i++) {
    for (let j = 0; j < mazeArray[i].length; j++) {
      if (mazeArray[i][j] === 5) { // this is from the array 1
        const win = document.createElement('div');
        win.style.width = '40px';
        win.style.height = '40px';
        win.style.backgroundColor = 'green';
        win.style.position = 'absolute';
        win.style.top = i * 40 + 'px';
        win.style.left = j * 40 + 'px';
        maze.appendChild(win);
        wins.push(win);
      }
    }
  }

  // This is the scoring part
  for (let i = 0; i < mazeArray.length; i++) {
    for (let j = 0; j < mazeArray[i].length; j++) {
      if (mazeArray[i][j] === 2) {
        score++;
        const position = getRandomPosition();
        const food = document.createElement('img');
        food.src = '/idk.png';
        food.style.width = '40px';
        food.style.height = '40px';
        food.style.position = 'absolute';
        food.style.top = position.y * 40 + 'px';
        food.style.left = position.x * 40 + 'px';
        maze.appendChild(food);
        foods.push(food);
      }
    }
  }




  initializeMonsters();





  // Move the player using keys that I chose
  document.addEventListener('keydown', (event) => {
    switch (event.key) {
      case 'w':
        if (mazeArray[playerY - 1][playerX] !== 1) {
          playerY--;
          updatePlayerPosition();
        }
        break;
      case 's':
        if (mazeArray[playerY + 1][playerX] !== 1) {
          playerY++;
          updatePlayerPosition();
        }
        break;
      case 'a':
        if (mazeArray[playerY][playerX - 1] !== 1) {
          playerX--;
          updatePlayerPosition();
        }
        break;
      case 'd':
        if (mazeArray[playerY][playerX + 1] !== 1) {
          playerX++;
          updatePlayerPosition();
        }
        
        break; 
    }
  });
}


document.getElementById('button2').addEventListener("click",changeMap);
document.getElementById('button').addEventListener("click",map1);



