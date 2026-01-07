(function () {
    var size = 4;
    var score = 0;
    var grid = [];
    var tiles = [];

    function init() {
        grid = [];
        tiles = [];
        score = 0;
        updateScore();

        for (var i = 0; i < size; i++) {
            grid[i] = [];
            for (var j = 0; j < size; j++) {
                grid[i][j] = null;
            }
        }

        addRandomTile();
        addRandomTile();
        renderTiles();
        setupInput();
        setupMobileControls(); // NEW: Set up button controls
    }

    function addRandomTile() {
        var emptyCells = [];
        for (var i = 0; i < size; i++) {
            for (var j = 0; j < size; j++) {
                if (!grid[i][j]) {
                    emptyCells.push({ x: i, y: j });
                }
            }
        }

        if (emptyCells.length > 0) {
            var randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            var value = Math.random() < 0.9 ? 2 : 4;
            var tile = { value: value, x: randomCell.x, y: randomCell.y };
            grid[randomCell.x][randomCell.y] = tile;
            tiles.push(tile);
        }
    }

    function renderTiles() {
        var container = document.querySelector('.tile-container');
        container.innerHTML = '';

        tiles.forEach(function (tile) {
            var tileElement = document.createElement('div');
            tileElement.className = 'tile tile-' + tile.value;
            tileElement.style.width = '106.25px';
            tileElement.style.height = '106.25px';
            tileElement.style.left = (tile.y * 121.25) + 'px';
            tileElement.style.top = (tile.x * 121.25) + 'px';

            var inner = document.createElement('div');
            inner.className = 'tile-inner';
            inner.textContent = tile.value;
            inner.style.width = '106.25px';
            inner.style.height = '106.25px';

            tileElement.appendChild(inner);
            container.appendChild(tileElement);
        });
    }

    function updateScore() {
        document.querySelector('.score-container').textContent = score;
    }

    function move(direction) {
        var moved = false;
        var dx = 0, dy = 0;

        if (direction === 'up') dx = -1;
        if (direction === 'down') dx = 1;
        if (direction === 'left') dy = -1;
        if (direction === 'right') dy = 1;

        var orderedTiles = tiles.slice().sort(function (a, b) {
            if (direction === 'up') return a.x - b.x;
            if (direction === 'down') return b.x - a.x;
            if (direction === 'left') return a.y - b.y;
            if (direction === 'right') return b.y - a.y;
        });

        var merged = [];

        orderedTiles.forEach(function (tile) {
            var newX = tile.x;
            var newY = tile.y;

            while (true) {
                var nextX = newX + dx;
                var nextY = newY + dy;

                if (nextX < 0 || nextX >= size || nextY < 0 || nextY >= size) break;

                var targetTile = grid[nextX][nextY];

                if (!targetTile) {
                    grid[newX][newY] = null;
                    newX = nextX;
                    newY = nextY;
                    grid[newX][newY] = tile;
                    moved = true;
                } else if (targetTile.value === tile.value && merged.indexOf(targetTile) === -1) {
                    grid[newX][newY] = null;
                    grid[nextX][nextY] = null;

                    targetTile.value *= 2;
                    score += targetTile.value;
                    merged.push(targetTile);

                    tiles = tiles.filter(function (t) { return t !== tile; });

                    newX = nextX;
                    newY = nextY;
                    grid[newX][newY] = targetTile;
                    targetTile.x = newX;
                    targetTile.y = newY;
                    moved = true;
                    break;
                } else {
                    break;
                }
            }

            tile.x = newX;
            tile.y = newY;
        });

        if (moved) {
            addRandomTile();
            renderTiles();
            updateScore();

            if (checkWin()) {
                showMessage('You win!', 'game-won');
            } else if (checkGameOver()) {
                showMessage('Game over!', 'game-over');
            }
        }
    }

    function checkWin() {
        return tiles.some(function (tile) {
            return tile.value === 2048;
        });
    }

    function checkGameOver() {
        for (var i = 0; i < size; i++) {
            for (var j = 0; j < size; j++) {
                if (!grid[i][j]) return false;

                if (i < size - 1 && grid[i][j].value === grid[i + 1][j].value) return false;
                if (j < size - 1 && grid[i][j].value === grid[i][j + 1].value) return false;
            }
        }
        return true;
    }

    function showMessage(text, className) {
        var messageElement = document.querySelector('.game-message');
        messageElement.querySelector('p').textContent = text;
        messageElement.className = 'game-message ' + className;
        messageElement.style.display = 'block';
    }

    function setupInput() {
        document.addEventListener('keydown', function (event) {
            if (event.keyCode === 38) { event.preventDefault(); move('up'); }
            if (event.keyCode === 40) { event.preventDefault(); move('down'); }
            if (event.keyCode === 37) { event.preventDefault(); move('left'); }
            if (event.keyCode === 39) { event.preventDefault(); move('right'); }
        });

        document.querySelector('.retry-button').addEventListener('click', function () {
            document.querySelector('.game-message').style.display = 'none';
            init();
        });
    }

    // NEW: Set up mobile control buttons
    function setupMobileControls() {
        var btnUp = document.getElementById('btn-up');
        var btnDown = document.getElementById('btn-down');
        var btnLeft = document.getElementById('btn-left');
        var btnRight = document.getElementById('btn-right');

        if (btnUp) {
            btnUp.addEventListener('click', function () {
                move('up');
            });
        }

        if (btnDown) {
            btnDown.addEventListener('click', function () {
                move('down');
            });
        }

        if (btnLeft) {
            btnLeft.addEventListener('click', function () {
                move('left');
            });
        }

        if (btnRight) {
            btnRight.addEventListener('click', function () {
                move('right');
            });
        }

        // Add touch support for better mobile experience
        [btnUp, btnDown, btnLeft, btnRight].forEach(function (btn) {
            if (btn) {
                // Prevent default touch behavior to avoid scrolling
                btn.addEventListener('touchstart', function (e) {
                    e.preventDefault();
                });

                // Handle touch events same as clicks
                btn.addEventListener('touchend', function (e) {
                    e.preventDefault();
                    btn.click();
                });
            }
        });
    }

    init();
})();