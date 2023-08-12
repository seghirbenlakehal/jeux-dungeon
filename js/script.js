const GRID_WIDTH = 25;
const GRID_HEIGHT = 15;
const EMPTY = 0;
const PLAYER = 1;
const MONSTER = 2;
const TREASURE = 3;
const WALL = 4;


let playerX = Math.floor(GRID_WIDTH / 2);
let playerY = Math.floor(GRID_HEIGHT / 2);

const monsters = [
    { x: 2, y: 3 },
    { x: 7, y: 5 },
    { x: 12, y: 8 }
];

const treasures = [
    { x: 4, y: 5 },
    { x: 16, y: 10 },
    { x: 8, y: 3 },  
    { x: 20, y: 6 }, 
     
];

const walls = [
    { x: 6, y: 1 }, { x: 7, y: 1 }, { x: 8, y: 1 },
    { x: 12, y: 1 }, { x: 13, y: 1 }, { x: 14, y: 1 },
    { x: 18, y: 1 }, { x: 19, y: 1 }, { x: 20, y: 1 },
    { x: 6, y: 10 }, { x: 7, y: 10 }, { x: 8, y: 10 },
    { x: 12, y: 10 }, { x: 13, y: 10 }, { x: 14, y: 10 },
    { x: 18, y: 10 }, { x: 19, y: 10 }, { x: 20, y: 10 },
    { x: 1, y: 4 }, { x: 1, y: 5 }, { x: 1, y: 6 }, { x: 1, y: 7 },
    { x: 1, y: 11 }, { x: 1, y: 12 }, { x: 1, y: 13 }, { x: 1, y: 14 },
    { x: 24, y: 4 }, { x: 24, y: 5 }, { x: 24, y: 6 }, { x: 24, y: 7 },
    { x: 24, y: 11 }, { x: 24, y: 12 }, { x: 24, y: 13 }, { x: 24, y: 14 },
    { x: 10, y: 2 }, { x: 15, y: 2 },
    { x: 10, y: 7 }, { x: 15, y: 7 },
    { x: 10, y: 12 }, { x: 15, y: 12 },
    
    { x: 3, y: 2 }, { x: 4, y: 2 }, { x: 5, y: 2 },
    { x: 19, y: 2 }, { x: 20, y: 2 }, { x: 21, y: 2 },
    { x: 3, y: 7 }, { x: 4, y: 7 }, { x: 5, y: 7 },
    { x: 19, y: 7 }, { x: 20, y: 7 }, { x: 21, y: 7 },
    { x: 3, y: 12 }, { x: 4, y: 12 }, { x: 5, y: 12 },
    { x: 19, y: 12 }, { x: 20, y: 12 }, { x: 21, y: 12 },

    { x: 8, y: 5 }, { x: 9, y: 5 }, { x: 10, y: 5 },
    { x: 14, y: 5 }, { x: 15, y: 5 }, { x: 16, y: 5 },
    { x: 8, y: 9 }, { x: 9, y: 9 }, { x: 10, y: 9 },
    { x: 14, y: 9 }, { x: 15, y: 9 }, { x: 16, y: 9 }
];

const grid = [];
for (let i = 0; i < GRID_HEIGHT; i++) {
    grid.push(Array(GRID_WIDTH).fill(EMPTY));
}

grid[playerY][playerX] = PLAYER;
monsters.forEach(monster => {
    grid[monster.y][monster.x] = MONSTER;
});
treasures.forEach(treasure => {
    grid[treasure.y][treasure.x] = TREASURE;
});
walls.forEach(wall => {
    grid[wall.y][wall.x] = WALL;
});

for (let i = 0; i < GRID_HEIGHT; i++) {
    const row = document.createElement("tr");
    for (let j = 0; j < GRID_WIDTH; j++) {
        const cell = document.createElement("td");
        cell.className = getCellClass(grid[i][j]);
        row.appendChild(cell);
    }
    document.querySelector("table").appendChild(row);
}

function getCellClass(cellValue) {
    switch (cellValue) {
        case EMPTY:
            return "empty";
        case PLAYER:
            return "player";
        case MONSTER:
            return "monster";
        case TREASURE:
            return "treasure";
        case WALL:
            return "wall";
        default:
            return "empty";
    }
}

function movePlayer(x, y) {
    if (grid[y][x] === EMPTY || grid[y][x] === TREASURE) {
        grid[playerY][playerX] = EMPTY;
        playerX = x;
        playerY = y;
        grid[playerY][playerX] = PLAYER;
        updateGridDisplay();
        checkMonsterCollision();
    }
}

function moveMonster(monster) {
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    const randomDirection = directions[Math.floor(Math.random() * directions.length)];
    const newX = monster.x + randomDirection[0];
    const newY = monster.y + randomDirection[1];

    if ((grid[newY][newX] === EMPTY || grid[newY][newX] === PLAYER) && grid[newY][newX] !== WALL) {
        grid[monster.y][monster.x] = EMPTY;
        monster.x = newX;
        monster.y = newY;
        grid[newY][newX] = MONSTER;
    }
}

function checkMonsterCollision() {
    monsters.forEach(monster => {
        if (playerX === monster.x && playerY === monster.y) {
            alert("You have been caught by a monster! You need to start over.");
            resetGame();
        }
    });

    const foundTreasures = treasures.every(treasure => grid[treasure.y][treasure.x] !== TREASURE);
    if (foundTreasures) {
        alert("Congratulations! You have collected all the treasures and won the game!");
        
    }
}

function resetGame() {
    playerX = Math.floor(GRID_WIDTH / 2);
    playerY = Math.floor(GRID_HEIGHT / 2);
    grid.forEach(row => row.fill(EMPTY));
    grid[playerY][playerX] = PLAYER;
    monsters.forEach(monster => {
        monster.x = Math.floor(Math.random() * GRID_WIDTH);
        monster.y = Math.floor(Math.random() * GRID_HEIGHT);
        grid[monster.y][monster.x] = MONSTER;
    });
    treasures.forEach(treasure => {
        grid[treasure.y][treasure.x] = TREASURE;
    });
    walls.forEach(wall => {
        grid[wall.y][wall.x] = WALL;
    });
    updateGridDisplay();
}

function updateGridDisplay() {
    const table = document.querySelector("table");
    for (let i = 0; i < GRID_HEIGHT; i++) {
        for (let j = 0; j < GRID_WIDTH; j++) {
            const cell = table.rows[i].cells[j];
            cell.className = getCellClass(grid[i][j]);
        }
    }
}

function handleKeyDown(event) {
    switch (event.key) {
        case "ArrowUp":
            movePlayer(playerX, playerY - 1);
            break;
        case "ArrowDown":
            movePlayer(playerX, playerY + 1);
            break;
        case "ArrowLeft":
            movePlayer(playerX - 1, playerY);
            break;
        case "ArrowRight":
            movePlayer(playerX + 1, playerY);
            break;
    }

    monsters.forEach(moveMonster);
    updateGridDisplay();
    checkMonsterCollision();
}

document.addEventListener("keydown", handleKeyDown);

