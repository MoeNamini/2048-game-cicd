(function() {
  'use strict';
  
  // Configuration
  var API_ENDPOINT = 'https://kx8iwsp5a6.execute-api.eu-central-1.amazonaws.com/prod';
  
  // Game state
  var size = 4;
  var grid = [];
  var tiles = [];
  var score = 0;
  var bestScore = 0;
  var username = null;
  var currentTheme = 'classic';
  
  // Swipe detection
  var touchStartX = 0;
  var touchStartY = 0;
  var minSwipeDistance = 30;
  
  // Grid dimensions
  var cellSize = 106.25;
  var cellGap = 15;
  
  // Initialize game
  function init() {
    loadUserPreferences();
    loadBestScore();
    checkUsername();
    grid = createEmptyGrid();
    tiles = [];
    score = 0;
    updateScore();
    
    addRandomTile();
    addRandomTile();
    
    render();
    setupEventListeners();
    loadLeaderboard();
  }
  
  // Load user preferences (theme)
  function loadUserPreferences() {
    try {
      var savedTheme = localStorage.getItem('2048-theme');
      if (savedTheme) {
        currentTheme = savedTheme;
        applyTheme(currentTheme);
        
        // Update active theme button
        document.querySelectorAll('.theme-btn').forEach(function(btn) {
          btn.classList.remove('active');
          if (btn.getAttribute('data-theme') === currentTheme) {
            btn.classList.add('active');
          }
        });
      }
    } catch (e) {
      currentTheme = 'classic';
    }
  }
  
  // Apply theme
  function applyTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('2048-theme', theme);
    } catch (e) {}
  }
  
  // Check username
  function checkUsername() {
    try {
      var savedUsername = localStorage.getItem('2048-username');
      if (savedUsername) {
        username = savedUsername;
        showUsernameDisplay();
      } else {
        showUsernameInput();
      }
    } catch (e) {
      showUsernameInput();
    }
  }
  
  // Show username input
  function showUsernameInput() {
    document.getElementById('username-section').style.display = 'flex';
    document.getElementById('username-display').style.display = 'none';
  }
  
  // Show username display
  function showUsernameDisplay() {
    document.getElementById('username-section').style.display = 'none';
    document.getElementById('username-display').style.display = 'flex';
    document.getElementById('current-username').textContent = username;
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
    } catch (e) {}
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
      setTimeout(function() {
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
      var cellSizeVw = 21;
      var cellGapVw = 3;
      return {
        left: (col * (cellSizeVw + cellGapVw)) + 'vw',
        top: (row * (cellSizeVw + cellGapVw)) + 'vw'
      };
    } else {
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
    
    tiles.forEach(function(tile) {
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
  
  // Move tiles - FIXED VERSION
  function move(direction) {
    var moved = false;
    var vector = getVector(direction);
    var traversals = buildTraversals(vector);
    var merged = [];
    
    // Clear old positions and prepare new grid
    var movedTiles = [];
    
    traversals.row.forEach(function(row) {
      traversals.col.forEach(function(col) {
        var tile = grid[row][col];
        
        if (tile) {
          var positions = findFarthestPosition(tile, vector);
          var next = positions.next.row >= 0 && positions.next.row < size && 
                     positions.next.col >= 0 && positions.next.col < size ? 
                     grid[positions.next.row][positions.next.col] : null;
          
          // Check if can merge
          if (next && next.value === tile.value && merged.indexOf(next) === -1) {
            // Merge tiles
            var mergedValue = tile.value * 2;
            
            // Remove current tile from grid
            grid[tile.row][tile.col] = null;
            
            // Update the next tile with merged value
            next.value = mergedValue;
            merged.push(next);
            
            // Remove old tile from tiles array
            tiles = tiles.filter(function(t) { return t !== tile; });
            
            score += mergedValue;
            moved = true;
          } else {
            // Just move the tile
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
        submitScore();
      } else if (isGameOver()) {
        showGameMessage('Game Over!', 'game-over');
        submitScore();
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
  
  // Build traversal order - FIXED VERSION
  function buildTraversals(vector) {
    var traversals = { row: [], col: [] };
    
    for (var pos = 0; pos < size; pos++) {
      traversals.row.push(pos);
      traversals.col.push(pos);
    }
    
    // Traverse from the farthest cell in the chosen direction
    if (vector.row === -1) {
      // Moving up - start from top
      // Already in correct order [0, 1, 2, 3]
    }
    if (vector.row === 1) {
      // Moving down - start from bottom
      traversals.row = traversals.row.reverse();
    }
    if (vector.col === -1) {
      // Moving left - start from left
      // Already in correct order [0, 1, 2, 3]
    }
    if (vector.col === 1) {
      // Moving right - start from right
      traversals.col = traversals.col.reverse();
    }
    
    return traversals;
  }
  
  // Find farthest position
  function findFarthestPosition(tile, vector) {
    var previous;
    var cell = { row: tile.row, col: tile.col };
    
    do {
      previous = cell;
      cell = { row: previous.row + vector.row, col: previous.col + vector.col };
    } while (withinBounds(cell) && !grid[cell.row][cell.col]);
    
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
    for (var i = 0; i < size; i++) {
      for (var j = 0; j < size; j++) {
        if (!grid[i][j]) return false;
      }
    }
    
    for (var i = 0; i < size; i++) {
      for (var j = 0; j < size; j++) {
        var tile = grid[i][j];
        if (tile) {
          if (j < size - 1 && grid[i][j + 1] && grid[i][j + 1].value === tile.value) {
            return false;
          }
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
  
  // Submit score to backend
  function submitScore() {
    if (!username || score === 0) return;
    
    // Replace with actual API endpoint after Phase 3
    if (API_ENDPOINT === 'YOUR_API_GATEWAY_URL') {
      console.log('API not configured yet. Score:', score);
      return;
    }
    
    var data = {
      username: username,
      score: score,
      timestamp: new Date().toISOString()
    };
    
    fetch(API_ENDPOINT + '/scores', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(function(response) {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Failed to submit score');
    })
    .then(function(result) {
      console.log('Score submitted successfully');
      loadLeaderboard();
    })
    .catch(function(error) {
      console.error('Error submitting score:', error);
    });
  }
  
  // Load leaderboard
  function loadLeaderboard() {
    var leaderboardContent = document.getElementById('leaderboard-content');
    
    // If API not configured
    if (API_ENDPOINT === 'YOUR_API_GATEWAY_URL') {
      leaderboardContent.innerHTML = '<p class="loading">Leaderboard will be available after backend setup.</p>';
      return;
    }
    
    leaderboardContent.innerHTML = '<p class="loading">Loading...</p>';
    
    fetch(API_ENDPOINT + '/scores')
      .then(function(response) {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Failed to load leaderboard');
      })
      .then(function(data) {
        displayLeaderboard(data.scores || []);
      })
      .catch(function(error) {
        console.error('Error loading leaderboard:', error);
        leaderboardContent.innerHTML = '<p class="error">Failed to load leaderboard</p>';
      });
  }
  
  // Display leaderboard
  function displayLeaderboard(scores) {
    var leaderboardContent = document.getElementById('leaderboard-content');
    
    if (scores.length === 0) {
      leaderboardContent.innerHTML = '<p class="loading">No scores yet. Be the first!</p>';
      return;
    }
    
    var html = '';
    scores.slice(0, 10).forEach(function(entry, index) {
      html += '<div class="leaderboard-item">';
      html += '<span class="leaderboard-rank">' + (index + 1) + '.</span>';
      html += '<span class="leaderboard-username">' + escapeHtml(entry.username) + '</span>';
      html += '<span class="leaderboard-score">' + entry.score + '</span>';
      html += '</div>';
    });
    
    leaderboardContent.innerHTML = html;
  }
  
  // Escape HTML to prevent XSS
  function escapeHtml(text) {
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
  
  // Share score
  function shareScore() {
    var text = 'I scored ' + score + ' points in 2048! Can you beat my score?';
    var url = window.location.href;
    
    // Try native Web Share API first (mobile)
    if (navigator.share) {
      navigator.share({
        title: '2048 Game Score',
        text: text,
        url: url
      })
      .then(function() {
        console.log('Shared successfully');
      })
      .catch(function(error) {
        console.log('Share cancelled or failed');
      });
    } else {
      // Fallback to Twitter share
      var twitterUrl = 'https://twitter.com/intent/tweet?text=' + 
        encodeURIComponent(text) + '&url=' + encodeURIComponent(url);
      window.open(twitterUrl, '_blank', 'width=550,height=420');
    }
  }
  
  // Setup event listeners
  function setupEventListeners() {
    // Theme selector
    document.querySelectorAll('.theme-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var theme = this.getAttribute('data-theme');
        currentTheme = theme;
        applyTheme(theme);
        
        document.querySelectorAll('.theme-btn').forEach(function(b) {
          b.classList.remove('active');
        });
        this.classList.add('active');
      });
    });
    
    // Username save
    document.getElementById('save-username').addEventListener('click', function() {
      var input = document.getElementById('username-input');
      var value = input.value.trim();
      
      if (value.length >= 3 && value.length <= 20) {
        username = value;
        try {
          localStorage.setItem('2048-username', username);
        } catch (e) {}
        showUsernameDisplay();
      } else {
        alert('Username must be between 3 and 20 characters');
      }
    });
    
    // Username change
    document.getElementById('change-username').addEventListener('click', function() {
      showUsernameInput();
    });
    
    // Keyboard
    document.addEventListener('keydown', function(e) {
      var keyMap = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
      };
      
      if (keyMap[e.keyCode]) {
        e.preventDefault();
        move(keyMap[e.keyCode]);
      }
    });
    
    // Buttons
    document.getElementById('btn-up').addEventListener('click', function() { move('up'); });
    document.getElementById('btn-down').addEventListener('click', function() { move('down'); });
    document.getElementById('btn-left').addEventListener('click', function() { move('left'); });
    document.getElementById('btn-right').addEventListener('click', function() { move('right'); });
    
    // Prevent touch scroll on buttons
    var buttons = document.querySelectorAll('.game-button');
    buttons.forEach(function(btn) {
      btn.addEventListener('touchstart', function(e) {
        e.preventDefault();
      });
      btn.addEventListener('touchend', function(e) {
        e.preventDefault();
        btn.click();
      });
    });
    
    // Restart buttons
    document.getElementById('restart-btn').addEventListener('click', restart);
    document.querySelector('.retry-button').addEventListener('click', restart);
    
    // Share button
    document.getElementById('share-score').addEventListener('click', shareScore);
    
    // Refresh leaderboard
    document.getElementById('refresh-leaderboard').addEventListener('click', loadLeaderboard);
    
    // Swipe gestures
    var gameBoard = document.getElementById('game-board');
    
    gameBoard.addEventListener('touchstart', function(e) {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }, { passive: true });
    
    gameBoard.addEventListener('touchend', function(e) {
      var touchEndX = e.changedTouches[0].clientX;
      var touchEndY = e.changedTouches[0].clientY;
      handleSwipe(touchStartX, touchStartY, touchEndX, touchEndY);
    }, { passive: true });
    
    // Mouse swipe
    var mouseDown = false;
    var mouseStartX = 0;
    var mouseStartY = 0;
    
    gameBoard.addEventListener('mousedown', function(e) {
      mouseDown = true;
      mouseStartX = e.clientX;
      mouseStartY = e.clientY;
    });
    
    gameBoard.addEventListener('mouseup', function(e) {
      if (mouseDown) {
        handleSwipe(mouseStartX, mouseStartY, e.clientX, e.clientY);
        mouseDown = false;
      }
    });
    
    gameBoard.addEventListener('mouseleave', function() {
      mouseDown = false;
    });
  }
  
  // Handle swipe gesture
  function handleSwipe(startX, startY, endX, endY) {
    var deltaX = endX - startX;
    var deltaY = endY - startY;
    
    if (Math.abs(deltaX) < minSwipeDistance && Math.abs(deltaY) < minSwipeDistance) {
      return;
    }
    
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      move(deltaX > 0 ? 'right' : 'left');
    } else {
      move(deltaY > 0 ? 'down' : 'up');
    }
  }
  
  // Start game
  init();
})();