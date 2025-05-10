const map = L.map('map').setView([51.505, -0.09], 13);  // Set map view (change coordinates as needed)

// Add OpenStreetMap tiles to the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);
