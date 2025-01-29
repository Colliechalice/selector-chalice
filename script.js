// Initialize Stripe
const stripe = Stripe('your_publishable_key'); // Replace with your Stripe publishable key

// DOM Elements
const signInBtn = document.getElementById('signInBtn');
const signOutBtn = document.getElementById('signOutBtn');
const signInModal = document.getElementById('signInModal');
const closeModal = document.querySelector('.close');
const signInForm = document.getElementById('signInForm');
const bookingForm = document.getElementById('bookingForm');
const audioPlayer = document.getElementById('audioPlayer');
const subscribeForm = document.getElementById('subscribeForm');

// Sample Data
const sampleMixes = [
    { title: 'Summer Vibes Mix', url: 'path_to_audio_file_1.mp3' },
    { title: 'Deep House Sessions', url: 'path_to_audio_file_2.mp3' },
    { title: 'Hip Hop Classics', url: 'path_to_audio_file_3.mp3' }
];

const sampleProducts = [
    { id: 1, title: 'Summer Mixtape 2025', price: 9.99, image: 'path_to_image_1.jpg' },
    { id: 2, title: 'Club Hits Collection', price: 14.99, image: 'path_to_image_2.jpg' },
    { id: 3, title: 'Underground Beats Vol.1', price: 12.99, image: 'path_to_image_3.jpg' }
];

// Initialize Flatpickr for date inputs
flatpickr("#eventCalendar", {
    inline: true,
    mode: "range"
});

flatpickr("#eventDate", {
    minDate: "today"
});

// Authentication Functions
function toggleAuth(isSignedIn) {
    signInBtn.style.display = isSignedIn ? 'none' : 'block';
    signOutBtn.style.display = isSignedIn ? 'block' : 'none';
}

// Modal Functions
signInBtn.onclick = () => signInModal.style.display = "block";
closeModal.onclick = () => signInModal.style.display = "none";
window.onclick = (e) => {
    if (e.target == signInModal) signInModal.style.display = "none";
}

// Form Handlers
signInForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Add authentication logic here
    toggleAuth(true);
    signInModal.style.display = "none";
});

bookingForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    // Add booking logic here
    alert('Booking submitted successfully!');
});

subscribeForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('subscribeEmail').value;
    
    try {
        // Here you would typically make an API call to your server
        // For demo purposes, we'll just show a success message
        alert('Thank you for subscribing! You will receive our updates at: ' + email);
        subscribeForm.reset();
    } catch (error) {
        console.error('Subscription failed:', error);
        alert('Subscription failed. Please try again.');
    }
});

// Music Player Functions
function initializeMusicPlayer() {
    const playlist = document.querySelector('.playlist');
    sampleMixes.forEach(mix => {
        const item = document.createElement('div');
        item.className = 'playlist-item';
        item.innerHTML = `
            <span>${mix.title}</span>
            <button onclick="playMix('${mix.url}')">Play</button>
        `;
        playlist.appendChild(item);
    });
}

function playMix(url) {
    audioPlayer.src = url;
    audioPlayer.play();
}

// Store Functions
function initializeStore() {
    const productsGrid = document.querySelector('.products-grid');
    sampleProducts.forEach(product => {
        const productEl = document.createElement('div');
        productEl.className = 'product-card';
        productEl.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>$${product.price}</p>
            <button onclick="handlePurchase(${product.id})">Buy Now</button>
        `;
        productsGrid.appendChild(productEl);
    });
}

async function handlePurchase(productId) {
    try {
        // Here you would typically make an API call to your server to create a Stripe session
        // For demo purposes, we'll just show an alert
        alert('Purchase initiated! Stripe integration required for actual purchase.');
    } catch (error) {
        console.error('Purchase failed:', error);
        alert('Purchase failed. Please try again.');
    }
}

// Initialize components
document.addEventListener('DOMContentLoaded', () => {
    initializeMusicPlayer();
    initializeStore();
});

// Sign out handler
signOutBtn.addEventListener('click', () => {
    toggleAuth(false);
});
