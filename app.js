
    // Simulating a simple database with valid ticket codes
let ticketDatabase = {
    "ABC123": { revoked: false },
    "XYZ789": { revoked: false },
    "DEF456": { revoked: false }
  };
  
  // Initial login logic
  document.getElementById('loginBtn').addEventListener('click', () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (username === 'Admin' && password === '123') {
      document.getElementById('login-screen').style.display = 'none';
      document.getElementById('main-screen').style.display = 'block';
    } else {
      document.getElementById('login-error').textContent = 'Invalid credentials.';
    }
  });
  
  // Submit ticket code logic
  document.getElementById('submitBtn').addEventListener('click', () => {
    let code = document.getElementById('codeInput').value.trim().toUpperCase();
  
    if (!code) {
      updateStatus("Please enter a code.", "error");
      return;
    }
  
    if (ticketDatabase[code]) {
      if (ticketDatabase[code].revoked) {
        updateStatus(`Code ${code} has already been used and revoked.`, "error");
        flashScreen('red');
        showIcon('exclamation');
      } else {
        ticketDatabase[code].revoked = true;
        updateStatus(`Code ${code} is valid. Access granted!`, "success");
        flashScreen('green');
        showIcon('tick');
        logScan(code);
      }
    } else {
      updateStatus(`Code ${code} is not recognized.`, "error");
      flashScreen('red');
      showIcon('exclamation');
    }
  
    document.getElementById('codeInput').value = ""; // Clear input field after submission
  });
  
  // Status updates
  function updateStatus(message, type) {
    const statusEl = document.getElementById('status');
    statusEl.textContent = message;
    statusEl.style.color = type === "success" ? "green" : "red";
  }
  
  // Flashing screen effect based on status
  function flashScreen(color) {
    const body = document.body;
    const animation = color === 'green' ? 'flash-green' : 'flash-red';
    body.style.animation = `${animation} 0.5s linear`;
  }
  
  function showIcon(type) {
    const iconContainer = document.getElementById('icon-container');
    iconContainer.innerHTML = '';  // Clear the previous icon
    const icon = document.createElement('img');
    
    // Set image paths based on type
    if (type === 'exclamation') {
      icon.src = 'images/cross.jpg'; // Path to exclamation image
    } else if (type === 'tick') {
      icon.src = 'images/tick.png'; // Path to tick image
    }
    
    iconContainer.appendChild(icon);  // Add the icon to the container
  }
  
  
  // Logging scan activity
  function logScan(code) {
    const log = document.getElementById('log');
    const logEntry = document.createElement('p');
    logEntry.textContent = `Code ${code} scanned at ${new Date().toLocaleTimeString()}`;
    log.appendChild(logEntry);
  }
  
  // Hamburger menu functionality
  document.getElementById('hamburgerBtn').addEventListener('click', () => {
    const menu = document.getElementById('menu');
    menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
  });
  
  // Handling menu actions
  document.getElementById('themes').addEventListener('click', () => {
    const newColor = prompt("Enter a primary color (e.g., #FF5733):");
    document.body.style.setProperty('--primary-color', newColor || '#f2f2f7');
  });
  
  document.getElementById('about').addEventListener('click', () => {
    alert("Ticket Redundancy App v1.0\nFor secure access control.");
  });
  
  document.getElementById('refresh').addEventListener('click', () => {
    location.reload();
  });
  
  document.getElementById('logout').addEventListener('click', () => {
    location.reload();
  });
  