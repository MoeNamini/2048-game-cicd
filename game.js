(function () {
    'use strict';

    // Game state
    var size = 4;
    var grid = [];
    var tiles = [];
    var score = 0;
    var bestScore = 0;

    // Swipe detection
    var touchStartX = 0;
    var touchStartY = 0;
    var minSwipeDistance = 30;

    // Grid dimensions
    var cellSize = 106.25;
    var cellGap = 15;
    var gridPadding = 15;

    // Initialize game
    function init() {
        loadBestScore();
        grid = createEmptyGrid();
        tiles = [];
        score = 0;
        updateScore();

        addRandomTile();
        addRandomTile();

        render();
        setupEventListeners();
    }

    // Create empty grid
    function createEmptyGrid() {
        var grid = [];
        for (var i = 0; i < size; i++) {
            grid[i] = [];
            for (var j = 0; j < size; j++) {
                grid[i][j] = null;
            }
        }
        return grid;
    }

    // Load best score from localStorage
    function loadBestScore() {
        try {
            var saved = localStorage.getItem('2048-best-score');
            bestScore = saved ? parseInt(saved, 10) : 0;
        } catch (e) {
            bestScore = 0;
        }
    }

    // Save best score to localStorage
    function saveBestScore() {
        try {
            localStorage.setItem('2048-best-score', bestScore.toString());
        } catch (e) {
            // localStorage not available
        }
    }

    // Update score display
    function updateScore() {
        document.getElementById('current-score').textContent = score;
        document.getElementById('best-score').textContent = bestScore;

        // Check if new best score
        if (score > bestScore) {
            bestScore = score;
            saveBestScore();

            // Add animation
            var bestBox = document.querySelector('.best-score');
            bestBox.classList.add('beat-record');
            setTimeout(function () {
                bestBox.classList.remove('beat-record');
            }, 600);
        }
    }

    // Add random tile
    function addRandomTile() {
        var emptyCells = [];

        for (var i = 0; i < size; i++) {
            for (var j = 0; j < size; j++) {
                if (grid[i][j] === null) {
                    emptyCells.push({ row: i, col: j });
                }
            }
        }

        if (emptyCells.length > 0) {
            var randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            var value = Math.random() < 0.9 ? 2 : 4;
            var tile = {
                row: randomCell.row,
                col: randomCell.col,
                value: value
            };
            grid[randomCell.row][randomCell.col] = tile;
            tiles.push(tile);
        }
    }

    // Calculate tile position
    function getTilePosition(row, col) {
        var isMobile = window.innerWidth <= 520;

        if (isMobile) {
            // Use vw units for mobile
            var cellSizeVw = 21; // vw
            var cellGapVw = 3; // vw
            return {
                left: (col * (cellSizeVw + cellGapVw)) + 'vw',
                top: (row * (cellSizeVw + cellGapVw)) + 'vw'
            };
        } else {
            // Use pixels for desktop
            return {
                left: (col * (cellSize + cellGap)) + 'px',
                top: (row * (cellSize + cellGap)) + 'px'
            };
        }
    }

    // Render all tiles
    function render() {
        var container = document.getElementById('tile-container');
        container.innerHTML = '';

        tiles.forEach(function (tile) {
            var tileElement = document.createElement('div');
            tileElement.className = 'tile tile-' + tile.value;

            var position = getTilePosition(tile.row, tile.col);
            tileElement.style.left = position.left;
            tileElement.style.top = position.top;

            var inner = document.createElement('div');
            inner.className = 'tile-inner';
            inner.textContent = tile.value;

            tileElement.appendChild(inner);
            container.appendChild(tileElement);
        });
    }

    // Move tiles
    function move(direction) {
        var moved = false;
        var vector = getVector(direction);
        var traversals = buildTraversals(vector);
        var merged = [];

        // Save current positions for comparison
        var previousPositions = tiles.map(function (tile) {
            return { row: tile.row, col: tile.col };
        });

        // Traverse grid in the right direction
        traversals.row.forEach(function (row) {
            traversals.col.forEach(function (col) {
                var tile = grid[row][col];

                if (tile) {
                    var positions = findFarthestPosition(tile, vector);
                    var next = null;

                    // Only check next position if it's within bounds
                    if (withinBounds(positions.next)) {
                        next = grid[positions.next.row][positions.next.col];
                    }

                    // Merge tiles
                    if (next && next.value === tile.value && merged.indexOf(next) === -1) {
                        var mergedTile = {
                            row: positions.next.row,
                            col: positions.next.col,
                            value: tile.value * 2
                        };

                        grid[tile.row][tile.col] = null;
                        grid[positions.next.row][positions.next.col] = mergedTile;

                        // Update tile
                        tile.row = positions.next.row;
                        tile.col = positions.next.col;
                        tile.value = mergedTile.value;

                        // Remove old tile from array
                        tiles = tiles.filter(function (t) { return t !== next; });

                        // Update merged tile in array
                        var tileIndex = tiles.indexOf(tile);
                        if (tileIndex !== -1) {
                            tiles[tileIndex] = mergedTile;
                        }

                        // Update grid
                        grid[positions.next.row][positions.next.col] = mergedTile;

                        merged.push(mergedTile);
                        score += mergedTile.value;
                        moved = true;
                    } else {
                        // Move tile to farthest position
                        if (tile.row !== positions.farthest.row || tile.col !== positions.farthest.col) {
                            grid[tile.row][tile.col] = null;
                            tile.row = positions.farthest.row;
                            tile.col = positions.farthest.col;
                            grid[tile.row][tile.col] = tile;
                            moved = true;
                        }
                    }
                }
            });
        });

        if (moved) {
            addRandomTile();
            updateScore();
            render();

            if (isGameWon()) {
                showGameMessage('You Win!', 'game-won');
            } else if (isGameOver()) {
                showGameMessage('Game Over!', 'game-over');
            }
        }
    }

    // Get movement vector
    function getVector(direction) {
        var map = {
            up: { row: -1, col: 0 },
            right: { row: 0, col: 1 },
            down: { row: 1, col: 0 },
            left: { row: 0, col: -1 }
        };
        return map[direction];
    }

    // Build traversal order
    function buildTraversals(vector) {
        var traversals = { row: [], col: [] };

        for (var pos = 0; pos < size; pos++) {
            traversals.row.push(pos);
            traversals.col.push(pos);
        }

        // Always traverse from farthest to closest
        if (vector.row === 1) traversals.row = traversals.row.reverse();
        if (vector.col === 1) traversals.col = traversals.col.reverse();

        return traversals;
    }

    // Find farthest position
    function findFarthestPosition(tile, vector) {
        var previous;
        var cell = { row: tile.row, col: tile.col };

        do {
            previous = cell;
            cell = { row: previous.row + vector.row, col: previous.col + vector.col };
        } while (withinBounds(cell) && grid[cell.row][cell.col] === null);

        return {
            farthest: previous,
            next: cell
        };
    }

    // Check if position is within bounds
    function withinBounds(position) {
        return position.row >= 0 && position.row < size &&
            position.col >= 0 && position.col < size;
    }

    // Check if game is won
    function isGameWon() {
        for (var i = 0; i < tiles.length; i++) {
            if (tiles[i].value === 2048) {
                return true;
            }
        }
        return false;
    }

    // Check if game is over
    function isGameOver() {
        // Check if any empty cells
        for (var i = 0; i < size; i++) {
            for (var j = 0; j < size; j++) {
                if (!grid[i][j]) return false;
            }
        }

        // Check if any possible merges
        for (var i = 0; i < size; i++) {
            for (var j = 0; j < size; j++) {
                var tile = grid[i][j];
                if (tile) {
                    // Check right
                    if (j < size - 1 && grid[i][j + 1] && grid[i][j + 1].value === tile.value) {
                        return false;
                    }
                    // Check down
                    if (i < size - 1 && grid[i + 1][j] && grid[i + 1][j].value === tile.value) {
                        return false;
                    }
                }
            }
        }

        return true;
    }

    // Show game message
    function showGameMessage(message, className) {
        var messageElement = document.querySelector('.game-message');
        messageElement.querySelector('p').textContent = message;
        messageElement.className = 'game-message ' + className;
        messageElement.style.display = 'block';
    }

    // Hide game message
    function hideGameMessage() {
        document.querySelector('.game-message').style.display = 'none';
    }

    // Restart game
    function restart() {
        hideGameMessage();
        init();
    }

    // Setup event listeners
    function setupEventListeners() {
        // Keyboard
        document.addEventListener('keydown', function (e) {
            var keyMap = {
                37: 'left',  // Left arrow
                38: 'up',    // Up arrow
                39: 'right', // Right arrow
                40: 'down'   // Down arrow
            };

            if (keyMap[e.keyCode]) {
                e.preventDefault();
                move(keyMap[e.keyCode]);
            }
        });

        // Buttons
        document.getElementById('btn-up').addEventListener('click', function () { move('up'); });
        document.getElementById('btn-down').addEventListener('click', function () { move('down'); });
        document.getElementById('btn-left').addEventListener('click', function () { move('left'); });
        document.getElementById('btn-right').addEventListener('click', function () { move('right'); });

        // Prevent touch scroll on buttons
        var buttons = document.querySelectorAll('.game-button');
        buttons.forEach(function (btn) {
            btn.addEventListener('touchstart', function (e) {
                e.preventDefault();
            });
            btn.addEventListener('touchend', function (e) {
                e.preventDefault();
                btn.click();
            });
        });

        // Restart buttons
        document.getElementById('restart-btn').addEventListener('click', restart);
        document.querySelector('.retry-button').addEventListener('click', restart);

        // Swipe gestures
        var gameBoard = document.getElementById('game-board');

        gameBoard.addEventListener('touchstart', function (e) {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        }, { passive: true });

        gameBoard.addEventListener('touchend', function (e) {
            var touchEndX = e.changedTouches[0].clientX;
            var touchEndY = e.changedTouches[0].clientY;
            handleSwipe(touchStartX, touchStartY, touchEndX, touchEndY);
        }, { passive: true });

        // Mouse swipe (for desktop testing)
        var mouseDown = false;
        var mouseStartX = 0;
        var mouseStartY = 0;

        gameBoard.addEventListener('mousedown', function (e) {
            mouseDown = true;
            mouseStartX = e.clientX;
            mouseStartY = e.clientY;
        });

        gameBoard.addEventListener('mouseup', function (e) {
            if (mouseDown) {
                handleSwipe(mouseStartX, mouseStartY, e.clientX, e.clientY);
                mouseDown = false;
            }
        });

        gameBoard.addEventListener('mouseleave', function () {
            mouseDown = false;
        });
    }

    // Handle swipe gesture
    function handleSwipe(startX, startY, endX, endY) {
        var deltaX = endX - startX;
        var deltaY = endY - startY;

        // Check if swipe is long enough
        if (Math.abs(deltaX) < minSwipeDistance && Math.abs(deltaY) < minSwipeDistance) {
            return;
        }

        // Determine direction
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            // Horizontal swipe
            move(deltaX > 0 ? 'right' : 'left');
        } else {
            // Vertical swipe
            move(deltaY > 0 ? 'down' : 'up');
        }
    }

    // Start game
    init();
})();