let ticketDatabase = {
  "ABC123": { revoked: false },
  "XYZ789": { revoked: false },
  "DEF456": { revoked: false }
};

// Login logic
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
      updateStatus(`Code ${code} has been revoked.`, "error");
      flashScreen('red');
      showIcon('exclamation');
    } else {
      ticketDatabase[code].revoked = true;
      updateStatus(`Code ${code} is valid. Access granted!`, "success");
      flashScreen('green');
      showIcon('tick');
    }
  } else {
    updateStatus(`Code ${code} is not recognized.`, "error");
    flashScreen('red');
    showIcon('exclamation');
  }

  document.getElementById('codeInput').value = "";
});

// Status updates
function updateStatus(message, type) {
  const statusEl = document.getElementById('status');
  statusEl.textContent = message;
  statusEl.style.color = type === "success" ? "green" : "red";
}

// Flash screen based on status
function flashScreen(color) {
  const body = document.body;
  const animation = color === 'green' ? 'flash-green' : 'flash-red';
  body.style.animation = `${animation} 1s linear infinite`;

  // Stop flashing after 3 seconds
  setTimeout(() => {
    body.style.animation = 'none';
  }, 3000);
}

// Show icons (exclamation for revoked, tick for success)
function showIcon(type) {
  const iconContainer = document.getElementById('icon-container');
  iconContainer.innerHTML = '';  // Clear the previous icon
  const icon = document.createElement('img');
  
  // Set image paths based on type
  if (type === 'exclamation') {
    icon.src = 'images/A_black_exclamation_mark_inside_a_red_triangle_wit.png'; // Path to exclamation image
  } else if (type === 'tick') {
    icon.src = 'images/A_white_checkmark_inside_a_green_circle_with_a_cle.png'; // Path to tick image
  }
  
  iconContainer.appendChild(icon);  // Add the icon to the container
}

// Hamburger menu functionality
document.getElementById('hamburgerBtn').addEventListener('click', () => {
  const menu = document.getElementById('menu');
  menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
});

// Exit button functionality
document.getElementById('exit').addEventListener('click', () => {
  window.close();
});
////////////////////////////////////////////////////////////////////////////API SECTION///////////////////////////////////////////////////////////
// Google Sheets API URL
const sheetID = 'https://docs.google.com/spreadsheets/d/1OIpBFnzNEHm-Kg_TItI-7soFsMh34L6vLnAV36UxiBU/edit?usp=sharing';  // Replace with your sheet ID
const apiKey = 'AIzaSyCUrKfPeEBoEXoDN3wA0SYLmyFKy8SHEdI';    // Replace with your Google Sheets API Key
const sheetName = 'AccessCodes';  // The name of the sheet tab

const sheetURL = `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/${sheetName}?key=${apiKey}`;

let ticketDatabase = {};

// Fetch data from Google Sheets
function fetchAccessCodes() {
  axios.get(sheetURL)
    .then(response => {
      const rows = response.data.values;
      rows.forEach(row => {
        const code = row[0];  // Assuming Code is in the first column
        const revoked = row[1] === 'true';  // Assuming Revoked is in the second column
        ticketDatabase[code] = { revoked };
      });
    })
    .catch(error => console.error('Error fetching access codes:', error));
}

// Call the fetch function to load codes from the spreadsheet
fetchAccessCodes();

// Submit ticket code logic
document.getElementById('submitBtn').addEventListener('click', () => {
  let code = document.getElementById('codeInput').value.trim().toUpperCase();

  if (!code) {
    updateStatus("Please enter a code.", "error");
    return;
  }

  if (ticketDatabase[code]) {
    if (ticketDatabase[code].revoked) {
      updateStatus(`Code ${code} has been revoked.`, "error");
      flashScreen('red');
      showIcon('exclamation');
    } else {
      ticketDatabase[code].revoked = true; // Locally revoke it for this session
      updateStatus(`Code ${code} is valid. Access granted!`, "success");
      flashScreen('green');
      showIcon('tick');
    }
  } else {
    updateStatus(`Code ${code} is not recognized.`, "error");
    flashScreen('red');
    showIcon('exclamation');
  }

  document.getElementById('codeInput').value = "";
});
