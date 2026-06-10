// Open-Meteo API integrations for Skyline Weather

const WMO_CODE_MAP = {
    0: { desc: "Clear Sky", icon: `<circle cx="32" cy="32" r="14" fill="#FFB703" />` },
    1: { desc: "Mainly Clear", icon: `<circle cx="38" cy="22" r="10" fill="#FFB703" /><path d="M46 38c0 5.5-4.5 10-10 10H22c-6.6 0-12-5.4-12-12 0-5.9 4.3-10.8 10-11.8 1.1-5.7 6.1-10.2 12.2-10.2 6.5 0 11.8 5 12.7 11.4C44 26 46 29 46 32z" fill="#E2E8F0" />` },
    2: { desc: "Partly Cloudy", icon: `<circle cx="38" cy="22" r="10" fill="#FFB703" /><path d="M46 38c0 5.5-4.5 10-10 10H22c-6.6 0-12-5.4-12-12 0-5.9 4.3-10.8 10-11.8 1.1-5.7 6.1-10.2 12.2-10.2 6.5 0 11.8 5 12.7 11.4C44 26 46 29 46 32z" fill="#E2E8F0" />` },
    3: { desc: "Overcast", icon: `<path d="M46 38c0 5.5-4.5 10-10 10H22c-6.6 0-12-5.4-12-12 0-5.9 4.3-10.8 10-11.8 1.1-5.7 6.1-10.2 12.2-10.2 6.5 0 11.8 5 12.7 11.4C44 26 46 29 46 32z" fill="#94A3B8" />` },
    45: { desc: "Foggy", icon: `<path d="M14 26h36M10 34h44M18 42h28" stroke="#E2E8F0" stroke-width="4" stroke-linecap="round" />` },
    48: { desc: "Depositing Rime Fog", icon: `<path d="M14 26h36M10 34h44M18 42h28" stroke="#E2E8F0" stroke-width="4" stroke-linecap="round" />` },
    51: { desc: "Light Drizzle", icon: `<path d="M46 38c0 5.5-4.5 10-10 10H22c-6.6 0-12-5.4-12-12" fill="none" stroke="#E2E8F0" stroke-width="2" /><line x1="24" y1="44" x2="22" y2="50" stroke="#38BDF8" stroke-width="2" />` },
    53: { desc: "Moderate Drizzle", icon: `<path d="M46 38c0 5.5-4.5 10-10 10H22c-6.6 0-12-5.4-12-12" fill="none" stroke="#E2E8F0" stroke-width="2" /><line x1="24" y1="44" x2="22" y2="50" stroke="#38BDF8" stroke-width="2" />` },
    55: { desc: "Dense Drizzle", icon: `<path d="M46 38c0 5.5-4.5 10-10 10H22c-6.6 0-12-5.4-12-12" fill="none" stroke="#94A3B8" stroke-width="2" /><line x1="24" y1="44" x2="22" y2="50" stroke="#38BDF8" stroke-width="2" />` },
    61: { desc: "Slight Rain", icon: `<path d="M46 38c0 5.5-4.5 10-10 10H22c-6.6 0-12-5.4-12-12" fill="none" stroke="#94A3B8" stroke-width="2" /><line x1="24" y1="44" x2="22" y2="50" stroke="#38BDF8" stroke-width="2.5" />` },
    63: { desc: "Moderate Rain", icon: `<path d="M46 38c0 5.5-4.5 10-10 10H22c-6.6 0-12-5.4-12-12" fill="none" stroke="#94A3B8" stroke-width="2" /><line x1="24" y1="44" x2="22" y2="50" stroke="#38BDF8" stroke-width="2.5" /><line x1="32" y1="44" x2="30" y2="50" stroke="#38BDF8" stroke-width="2.5" />` },
    65: { desc: "Heavy Rain", icon: `<path d="M46 38c0 5.5-4.5 10-10 10H22c-6.6 0-12-5.4-12-12" fill="none" stroke="#64748B" stroke-width="2" /><line x1="20" y1="44" x2="18" y2="52" stroke="#0284C7" stroke-width="3" /><line x1="28" y1="44" x2="26" y2="52" stroke="#0284C7" stroke-width="3" /><line x1="36" y1="44" x2="34" y2="52" stroke="#0284C7" stroke-width="3" />` },
    71: { desc: "Slight Snow", icon: `<path d="M46 38c0 5.5-4.5 10-10 10H22c-6.6 0-12-5.4-12-12" fill="none" stroke="#E2E8F0" stroke-width="2" /><circle cx="24" cy="48" r="1.5" fill="#FFF" /><circle cx="32" cy="48" r="1.5" fill="#FFF" />` },
    73: { desc: "Moderate Snow", icon: `<path d="M46 38c0 5.5-4.5 10-10 10H22c-6.6 0-12-5.4-12-12" fill="none" stroke="#E2E8F0" stroke-width="2" /><circle cx="22" cy="48" r="2" fill="#FFF" /><circle cx="30" cy="48" r="2" fill="#FFF" /><circle cx="38" cy="48" r="2" fill="#FFF" />` },
    75: { desc: "Heavy Snow", icon: `<path d="M46 38c0 5.5-4.5 10-10 10H22c-6.6 0-12-5.4-12-12" fill="none" stroke="#FFF" stroke-width="2" /><circle cx="20" cy="48" r="2.5" fill="#FFF" /><circle cx="28" cy="48" r="2.5" fill="#FFF" /><circle cx="36" cy="48" r="2.5" fill="#FFF" />` },
    80: { desc: "Slight Rain Showers", icon: `<path d="M46 38c0 5.5-4.5 10-10 10H22c-6.6 0-12-5.4-12-12" fill="none" stroke="#94A3B8" stroke-width="2" /><line x1="24" y1="44" x2="22" y2="50" stroke="#38BDF8" stroke-width="2" />` },
    81: { desc: "Moderate Rain Showers", icon: `<path d="M46 38c0 5.5-4.5 10-10 10H22c-6.6 0-12-5.4-12-12" fill="none" stroke="#94A3B8" stroke-width="2" /><line x1="24" y1="44" x2="22" y2="50" stroke="#38BDF8" stroke-width="2" /><line x1="32" y1="44" x2="30" y2="50" stroke="#38BDF8" stroke-width="2" />` },
    82: { desc: "Violent Rain Showers", icon: `<path d="M46 38c0 5.5-4.5 10-10 10H22c-6.6 0-12-5.4-12-12" fill="none" stroke="#64748B" stroke-width="2" /><line x1="20" y1="44" x2="18" y2="52" stroke="#0284C7" stroke-width="3" /><line x1="28" y1="44" x2="26" y2="52" stroke="#0284C7" stroke-width="3" />` },
    95: { desc: "Thunderstorm", icon: `<path d="M46 38c0 5.5-4.5 10-10 10H22c-6.6 0-12-5.4-12-12" fill="none" stroke="#64748B" stroke-width="2" /><polygon points="28 42 20 50 25 50 21 58 31 48 26 48" fill="#FACC15" />` },
    96: { desc: "Thunderstorm with Hail", icon: `<path d="M46 38c0 5.5-4.5 10-10 10H22c-6.6 0-12-5.4-12-12" fill="none" stroke="#64748B" stroke-width="2" /><polygon points="28 42 20 50 25 50 21 58 31 48 26 48" fill="#FACC15" />` },
    99: { desc: "Thunderstorm with Heavy Hail", icon: `<path d="M46 38c0 5.5-4.5 10-10 10H22c-6.6 0-12-5.4-12-12" fill="none" stroke="#475569" stroke-width="2" /><polygon points="28 42 20 50 25 50 21 58 31 48 26 48" fill="#FACC15" />` },
};

// Helper to get weather condition description and icon, adapting for day/night
function getWeatherCondition(code, isDay = 1) {
    const base = WMO_CODE_MAP[code] || { desc: "Clear Sky", icon: `<circle cx="32" cy="32" r="14" fill="#FFB703" />` };
    
    // If it's night (isDay === 0), map sunny/clear icons to moon variants
    if (isDay === 0) {
        if (code === 0) {
            return {
                desc: "Clear Night",
                icon: `<path class="weather-moon" d="M35.2 16a16 16 0 1 0 16 16 9.6 9.6 0 1 1-16-16z" fill="#F1F5F9" />`
            };
        } else if (code === 1) {
            return {
                desc: "Mainly Clear",
                icon: `<path class="weather-moon-behind-cloud" d="M38 12a10 10 0 1 0 10 10 6 6 0 1 1-10-10z" fill="#F1F5F9" /><path d="M46 38c0 5.5-4.5 10-10 10H22c-6.6 0-12-5.4-12-12 0-5.9 4.3-10.8 10-11.8 1.1-5.7 6.1-10.2 12.2-10.2 6.5 0 11.8 5 12.7 11.4C44 26 46 29 46 32z" fill="#E2E8F0" opacity="0.95" />`
            };
        } else if (code === 2) {
            return {
                desc: "Partly Cloudy",
                icon: `<path class="weather-moon-behind-cloud" d="M38 12a10 10 0 1 0 10 10 6 6 0 1 1-10-10z" fill="#F1F5F9" /><path d="M46 38c0 5.5-4.5 10-10 10H22c-6.6 0-12-5.4-12-12 0-5.9 4.3-10.8 10-11.8 1.1-5.7 6.1-10.2 12.2-10.2 6.5 0 11.8 5 12.7 11.4C44 26 46 29 46 32z" fill="#E2E8F0" opacity="0.95" />`
            };
        }
    }
    
    return base;
}

// Global App State
let currentUnit = 'C'; // 'C' or 'F'
let currentWeatherData = null;
let currentAQIData = null;
let currentCityName = "San Francisco";
let severeWarningsEnabled = localStorage.getItem('skyline-severe-warnings') !== 'false'; // defaults to true
let dailySummaryEnabled = localStorage.getItem('skyline-daily-summary') === 'true'; // defaults to false
let lastNotifiedCity = "";
let lastNotifiedTemp = null;
let lightningInterval = null;

// Local Storage Theme Initialization
let selectedTheme = localStorage.getItem('skyline-theme') || 'default';
if (selectedTheme !== 'default') {
    document.body.className = '';
    document.body.classList.add(`theme-${selectedTheme}`);
}

// DOM Element Targets
const searchInput = document.getElementById('search-input');
const cityNameEl = document.getElementById('city-name');
const currentDateEl = document.getElementById('current-date');
const currentTempEl = document.getElementById('current-temp');
const currentDescEl = document.getElementById('current-desc');
const feelsLikeEl = document.getElementById('detail-feels-like');
const windEl = document.getElementById('detail-wind');
const humidityEl = document.getElementById('detail-humidity');
const uvEl = document.getElementById('detail-uv');
const weatherSvgEl = document.querySelector('.current-weather-svg');
const hourlyContainer = document.querySelector('.hourly-list');
const weeklyContainer = document.querySelector('.weekly-list');

const unitCBtn = document.getElementById('unit-c');
const unitFBtn = document.getElementById('unit-f');

// Helper to convert Celsius to Fahrenheit
const toFahrenheit = (celsius) => Math.round((celsius * 9) / 5 + 32);

// Premium Toast Notification System
function showToast(title, message, type = 'summary') {
    // Check if container exists, otherwise create it
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    const iconSvg = type === 'severe' 
        ? `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>`
        : `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`;
        
    toast.innerHTML = `
        ${iconSvg}
        <div class="toast-body">
            <span class="toast-title">${title}</span>
            <span class="toast-message">${message}</span>
        </div>
        <button class="toast-close">&times;</button>
    `;
    
    // Setup close button handler
    toast.querySelector('.toast-close').addEventListener('click', () => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(-10px)';
        setTimeout(() => toast.remove(), 300);
    });
    
    // Auto remove from DOM after animation completes (8s total)
    setTimeout(() => {
        if (toast.parentNode) {
            toast.remove();
        }
    }, 8000);
    
    container.appendChild(toast);
    
    // Also trigger HTML5 Browser Notification if permitted
    triggerBrowserNotification(title, message);
}

// Request notification permission on settings check or startup
function requestNotificationPermission() {
    if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
    }
}

// Trigger HTML5 System Notification
function triggerBrowserNotification(title, message) {
    if ('Notification' in window && Notification.permission === 'granted') {
        try {
            new Notification(title, {
                body: message,
                icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='8' fill='%230a0d1a'/><circle cx='21' cy='11' r='5' fill='%23FFB703'/></svg>"
            });
        } catch (e) {
            console.error("Failed to trigger system notification:", e);
        }
    }
}

// Format Dates
function formatLongDate(dateStr) {
    const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
    return new Date(dateStr).toLocaleDateString('en-US', options);
}

function formatDayName(dateStr) {
    const date = new Date(dateStr);
    const today = new Date();
    if (date.toDateString() === today.toDateString()) return "Today";
    
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[date.getDay()];
}

// Fetch coordinates for a city
async function getCoordinates(city) {
    try {
        const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`);
        const data = await response.json();
        if (data.results && data.results.length > 0) {
            return data.results[0];
        }
        throw new Error("City not found");
    } catch (error) {
        console.error(error);
        return null; // Quietly return null to prevent blocking the UI thread in loops
    }
}

// Fetch weather details
async function fetchWeatherData(lat, lon) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m&hourly=temperature_2m,weather_code,is_day&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error("Error fetching weather:", error);
        return null;
    }
}

// Fetch air quality details (AQI)
async function fetchAQIData(lat, lon) {
    const url = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=us_aqi`;
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error("Error fetching AQI:", error);
        return null;
    }
}

// Map US AQI value to label and color representation
function getAQIStatus(aqiValue) {
    if (aqiValue <= 50) return { label: "Good", color: "#10b981" };
    if (aqiValue <= 100) return { label: "Moderate", color: "#eab308" };
    if (aqiValue <= 150) return { label: "Unhealthy for Sensitive Groups", color: "#f97316" };
    if (aqiValue <= 200) return { label: "Unhealthy", color: "#ef4444" };
    if (aqiValue <= 300) return { label: "Very Unhealthy", color: "#a855f7" };
    return { label: "Hazardous", color: "#7f1d1d" };
}

// Start or stop background rain effect depending on weather conditions
function startRainEffect() {
    let rainOverlay = document.getElementById('rain-overlay');
    if (!rainOverlay) {
        rainOverlay = document.createElement('div');
        rainOverlay.id = 'rain-overlay';
        rainOverlay.className = 'rain-overlay';
        const container = document.querySelector('.main-content');
        if (container) {
            container.style.position = 'relative';
            container.appendChild(rainOverlay);
        }
    }
    
    // Clear any existing drops
    rainOverlay.innerHTML = '';
    
    const rainCodes = [51, 53, 55, 61, 63, 65, 80, 81, 82, 95, 96, 99];
    if (currentWeatherData && currentWeatherData.current && rainCodes.includes(currentWeatherData.current.weather_code)) {
        rainOverlay.classList.add('active');
        
        // Populate raindrops
        const dropCount = 85;
        for (let i = 0; i < dropCount; i++) {
            const drop = document.createElement('div');
            drop.className = 'raindrop';
            
            const left = Math.random() * 100;
            const duration = 0.5 + Math.random() * 0.8;
            const delay = Math.random() * -2;
            const opacity = 0.2 + Math.random() * 0.45;
            const height = 40 + Math.random() * 45;
            const width = 1 + Math.random() * 0.8;
            
            drop.style.left = `${left}%`;
            drop.style.animationDuration = `${duration}s`;
            drop.style.animationDelay = `${delay}s`;
            drop.style.opacity = opacity;
            drop.style.height = `${height}px`;
            drop.style.width = `${width}px`;
            
            rainOverlay.appendChild(drop);
        }
    } else {
        rainOverlay.classList.remove('active');
    }
}

// Start or stop background ice ball / snow effect depending on conditions
function startIceEffect() {
    let iceOverlay = document.getElementById('ice-overlay');
    if (!iceOverlay) {
        iceOverlay = document.createElement('div');
        iceOverlay.id = 'ice-overlay';
        iceOverlay.className = 'ice-overlay';
        const container = document.querySelector('.main-content');
        if (container) {
            container.style.position = 'relative';
            container.appendChild(iceOverlay);
        }
    }
    
    // Clear existing iceballs
    iceOverlay.innerHTML = '';
    
    const iceCodes = [71, 73, 75, 96, 99];
    const isTempBelowOne = currentWeatherData && currentWeatherData.current && currentWeatherData.current.temperature_2m < 1;
    const isIceActive = currentWeatherData && currentWeatherData.current && (iceCodes.includes(currentWeatherData.current.weather_code) || isTempBelowOne);
    
    if (isIceActive) {
        iceOverlay.classList.add('active');
        
        // Create 60 falling iceballs/snowflakes
        const ballCount = 60;
        for (let i = 0; i < ballCount; i++) {
            const ball = document.createElement('div');
            ball.className = 'iceball';
            
            const left = Math.random() * 100;
            const duration = 4 + Math.random() * 6; // slow falling speed (4s to 10s)
            const delay = Math.random() * -10; // start immediately in negative range
            const size = 3 + Math.random() * 8; // px size
            const opacity = 0.4 + Math.random() * 0.55;
            
            ball.style.left = `${left}%`;
            ball.style.width = `${size}px`;
            ball.style.height = `${size}px`;
            ball.style.animationDuration = `${duration}s`;
            ball.style.animationDelay = `${delay}s`;
            ball.style.opacity = opacity;
            
            iceOverlay.appendChild(ball);
        }
    } else {
        iceOverlay.classList.remove('active');
    }
}

// Start or stop background lightning flash thunderstorm effect
function startLightningEffect() {
    let lightningOverlay = document.getElementById('lightning-flash');
    if (!lightningOverlay) {
        lightningOverlay = document.createElement('div');
        lightningOverlay.id = 'lightning-flash';
        lightningOverlay.className = 'lightning-flash';
        const container = document.querySelector('.main-content');
        if (container) {
            container.appendChild(lightningOverlay);
        }
    }
    
    // Clear any previous loop
    if (lightningInterval) {
        clearTimeout(lightningInterval);
        lightningInterval = null;
    }
    
    const stormCodes = [95, 96, 99];
    if (currentWeatherData && currentWeatherData.current && stormCodes.includes(currentWeatherData.current.weather_code)) {
        const triggerFlash = () => {
            lightningOverlay.style.animation = 'none';
            lightningOverlay.offsetHeight; // trigger reflow
            lightningOverlay.style.animation = 'flash 1.2s ease-out';
            
            // Queue next flash
            const nextDelay = 4000 + Math.random() * 6000;
            lightningInterval = setTimeout(triggerFlash, nextDelay);
        };
        
        // Initial delay
        lightningInterval = setTimeout(triggerFlash, 2500);
    } else {
        lightningOverlay.style.animation = 'none';
    }
}

// Update the dynamic sky animated avatar based on weather code and day/night state
function updateSkyAvatar(weatherCode, isDay) {
    const avatar = document.getElementById('profile-sky-avatar');
    if (!avatar) return;
    
    // Reset background theme class
    avatar.className = "profile-badge"; 
    
    let svgContent = "";
    
    if (isDay === 0) {
        // Night Theme
        avatar.classList.add('sky-night');
        svgContent = `
            <svg class="avatar-sky-svg" viewBox="0 0 40 40">
                <path class="avatar-moon" d="M22 10a10 10 0 1 0 10 10 6 6 0 1 1-10-10z" fill="#F1F5F9" />
                <circle cx="10" cy="14" r="0.6" fill="#FFF" opacity="0.8" />
                <circle cx="28" cy="13" r="0.6" fill="#FFF" opacity="0.9" />
                <circle cx="14" cy="27" r="0.6" fill="#FFF" opacity="0.7" />
            </svg>
        `;
    } else {
        // Day Theme
        if (weatherCode === 0) {
            // Sunny
            avatar.classList.add('sky-sunny');
            svgContent = `
                <svg class="avatar-sky-svg" viewBox="0 0 40 40">
                    <circle class="avatar-sun" cx="20" cy="20" r="7" fill="#FDB813" />
                </svg>
            `;
        } else if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(weatherCode)) {
            // Rain
            avatar.classList.add('sky-rain');
            svgContent = `
                <svg class="avatar-sky-svg" viewBox="0 0 40 40">
                    <path d="M26 22a4 4 0 0 0-3.2-3.8 5 5 0 0 0-9-1.8A3 3 0 0 0 11 22z" fill="#CBD5E1" />
                    <line class="avatar-drop" x1="14" y1="25" x2="13" y2="30" stroke="#38BDF8" stroke-width="1.5" stroke-linecap="round" />
                    <line class="avatar-drop delay-1" x1="19" y1="25" x2="18" y2="30" stroke="#38BDF8" stroke-width="1.5" stroke-linecap="round" />
                    <line class="avatar-drop delay-2" x1="24" y1="25" x2="23" y2="30" stroke="#38BDF8" stroke-width="1.5" stroke-linecap="round" />
                </svg>
            `;
        } else if ([95, 96, 99].includes(weatherCode)) {
            // Thunderstorm
            avatar.classList.add('sky-storm');
            svgContent = `
                <svg class="avatar-sky-svg" viewBox="0 0 40 40">
                    <path d="M26 20a4 4 0 0 0-3.2-3.8 5 5 0 0 0-9-1.8A3 3 0 0 0 11 20z" fill="#64748B" />
                    <polygon class="avatar-lightning" points="20 18 16 25 19 25 17 31 23 23 20 23" fill="#FACC15" />
                </svg>
            `;
        } else {
            // Cloudy / Default
            avatar.classList.add('sky-cloudy');
            svgContent = `
                <svg class="avatar-sky-svg" viewBox="0 0 40 40">
                    <path class="avatar-cloud-drift" d="M26 22a4 4 0 0 0-3.2-3.8 5 5 0 0 0-9-1.8A3 3 0 0 0 11 22z" fill="#E2E8F0" />
                </svg>
            `;
        }
    }
    
    avatar.innerHTML = svgContent;
}

// Update the UI elements
function updateUI() {
    if (!currentWeatherData) return;
    
    const current = currentWeatherData.current;
    const daily = currentWeatherData.daily;
    const hourly = currentWeatherData.hourly;
    
    // Update dynamic sky avatar state
    updateSkyAvatar(current.weather_code, current.is_day);
    
    // 1. Current City & Date
    cityNameEl.textContent = currentCityName;
    currentDateEl.textContent = formatLongDate(new Date());
    
    // 2. Temperatures
    const tempC = Math.round(current.temperature_2m);
    currentTempEl.textContent = currentUnit === 'C' ? tempC : toFahrenheit(tempC);
    
    const maxTempTodayC = Math.round(daily.temperature_2m_max[0]);
    const minTempTodayC = Math.round(daily.temperature_2m_min[0]);
    const highLowContainer = document.querySelector('.high-low-container');
    highLowContainer.innerHTML = `
        <span>H: ${currentUnit === 'C' ? maxTempTodayC : toFahrenheit(maxTempTodayC)}°</span>
        <span class="divider">|</span>
        <span>L: ${currentUnit === 'C' ? minTempTodayC : toFahrenheit(minTempTodayC)}°</span>
        <span class="divider">|</span>
        <span class="aqi-indicator">
            <span class="aqi-dot" id="aqi-dot"></span>
            <span id="current-aqi">AQI: --</span>
        </span>
    `;

    // Update AQI Indicator if data exists
    const aqiEl = document.getElementById('current-aqi');
    const aqiDot = document.getElementById('aqi-dot');
    if (aqiEl && aqiDot && currentAQIData && currentAQIData.current) {
        const aqiValue = currentAQIData.current.us_aqi;
        const status = getAQIStatus(aqiValue);
        aqiEl.textContent = `AQI: ${aqiValue} (${status.label})`;
        aqiDot.style.backgroundColor = status.color;
        aqiDot.style.color = status.color; // for currentColor box-shadow
    } else if (aqiEl && aqiDot) {
        aqiEl.textContent = `AQI: --`;
        aqiDot.style.backgroundColor = '#64748b';
        aqiDot.style.color = '#64748b';
    }

    // 3. Condition Description & Large SVG
    const condition = getWeatherCondition(current.weather_code, current.is_day);
    currentDescEl.textContent = condition.desc;
    weatherSvgEl.innerHTML = condition.icon;
    
    // Add animations to newly inserted SVG tags
    const circles = weatherSvgEl.querySelectorAll('circle');
    const paths = weatherSvgEl.querySelectorAll('path');
    circles.forEach(c => {
        c.style.animation = 'spin-slow 20s linear infinite';
        c.style.transformOrigin = '38px 22px';
    });
    paths.forEach(p => {
        p.style.animation = 'float 6s ease-in-out infinite';
    });

    // 4. Details Metrics
    const feelsC = Math.round(current.apparent_temperature);
    feelsLikeEl.textContent = `${currentUnit === 'C' ? feelsC : toFahrenheit(feelsC)}°`;
    windEl.textContent = `${Math.round(current.wind_speed_10m)} km/h`;
    humidityEl.textContent = `${current.relative_humidity_2m}%`;
    uvEl.textContent = current.precipitation > 0 ? "Rainy" : "0 (Low)";

    // 5. Hourly Forecast (next 6 hours)
    hourlyContainer.innerHTML = '';
    const currentHour = new Date().getHours();
    for (let i = 0; i < 6; i++) {
        const idx = currentHour + i;
        const tempHourC = Math.round(hourly.temperature_2m[idx]);
        const tempDisp = currentUnit === 'C' ? tempHourC : toFahrenheit(tempHourC);
        const code = hourly.weather_code[idx];
        const hourIsDay = hourly.is_day ? hourly.is_day[idx] : 1;
        const hourCond = getWeatherCondition(code, hourIsDay);
        const timeLabel = i === 0 ? "Now" : `${(idx % 24).toString().padStart(2, '0')}:00`;
        
        const hourDiv = document.createElement('div');
        hourDiv.className = `hourly-item ${i === 0 ? 'active' : ''}`;
        hourDiv.innerHTML = `
            <span class="hour-time">${timeLabel}</span>
            <svg class="hourly-icon" viewBox="0 0 64 64">${hourCond.icon}</svg>
            <span class="hour-temp">${tempDisp}°</span>
        `;
        hourlyContainer.appendChild(hourDiv);
    }

    // 6. 7-Day Forecast
    weeklyContainer.innerHTML = '';
    const globalMin = Math.min(...daily.temperature_2m_min);
    const globalMax = Math.max(...daily.temperature_2m_max);
    const globalRange = globalMax - globalMin;

    for (let i = 0; i < 7; i++) {
        const dayName = formatDayName(daily.time[i]);
        const minC = Math.round(daily.temperature_2m_min[i]);
        const maxC = Math.round(daily.temperature_2m_max[i]);
        
        const minDisp = currentUnit === 'C' ? minC : toFahrenheit(minC);
        const maxDisp = currentUnit === 'C' ? maxC : toFahrenheit(maxC);
        
        const code = daily.weather_code[i];
        const dayCond = getWeatherCondition(code, 1); // Weekly forecast shows day conditions
        
        // Calculate relative position parameters for the temperature bar slider
        const leftPercent = ((minC - globalMin) / globalRange) * 100;
        const rightPercent = 100 - (((maxC - globalMin) / globalRange) * 100);

        const rowDiv = document.createElement('div');
        rowDiv.className = 'weekly-row';
        rowDiv.innerHTML = `
            <span class="day-name">${dayName}</span>
            <div class="weekly-condition-icon">
                <svg class="weekly-icon" viewBox="0 0 64 64">${dayCond.icon}</svg>
            </div>
            <div class="temp-slider-container">
                <span class="min-temp">${minDisp}°</span>
                <div class="temp-bar">
                    <div class="temp-bar-active" style="left: ${leftPercent}%; right: ${rightPercent}%;"></div>
                </div>
                <span class="max-temp">${maxDisp}°</span>
            </div>
        `;
        weeklyContainer.appendChild(rowDiv);
    }

    // 7. Handle Severe Weather and Daily Summary Notifications
    if (currentCityName !== lastNotifiedCity || tempC !== lastNotifiedTemp) {
        lastNotifiedCity = currentCityName;
        lastNotifiedTemp = tempC;
        
        // Trigger Severe Warnings if applicable
        const severeCodes = [65, 75, 82, 95, 96, 99];
        if (severeWarningsEnabled && severeCodes.includes(current.weather_code)) {
            const warningMessage = `Severe weather advisory in ${currentCityName}: ${condition.desc} with temperatures around ${currentUnit === 'C' ? tempC : toFahrenheit(tempC)}°${currentUnit}. Please exercise caution!`;
            setTimeout(() => {
                showToast("Severe Weather Alert!", warningMessage, "severe");
            }, 1000);
        }
        
        // Trigger Daily Summary if enabled
        if (dailySummaryEnabled) {
            const summaryMessage = `Today in ${currentCityName}, expect a high of ${currentUnit === 'C' ? maxTempTodayC : toFahrenheit(maxTempTodayC)}°${currentUnit} and low of ${currentUnit === 'C' ? minTempTodayC : toFahrenheit(minTempTodayC)}°${currentUnit}. Overall condition: ${condition.desc}.`;
            setTimeout(() => {
                showToast("Daily Weather Summary", summaryMessage, "summary");
            }, 2000);
        }
    }
    
    // Trigger background animations
    startRainEffect();
    startIceEffect();
    startLightningEffect();
}

// Perform primary weather lookup
async function performWeatherLookup(city) {
    const loc = await getCoordinates(city);
    if (loc) {
        currentCityName = `${loc.name}, ${loc.country || loc.admin1}`;
        const [weather, aqi] = await Promise.all([
            fetchWeatherData(loc.latitude, loc.longitude),
            fetchAQIData(loc.latitude, loc.longitude)
        ]);
        if (weather) {
            currentWeatherData = weather;
            currentAQIData = aqi;
            updateUI();
        } else {
            alert(`Error fetching weather data for: "${loc.name}".`);
        }
    } else {
        alert(`Could not find city: "${city}". Please check spelling.`);
    }
}

// Initialize listeners
searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && searchInput.value.trim() !== '') {
        performWeatherLookup(searchInput.value.trim());
        searchInput.value = '';
    }
});

// Unit Switchers
unitCBtn.addEventListener('click', () => {
    if (currentUnit !== 'C') {
        currentUnit = 'C';
        unitCBtn.classList.add('active');
        unitFBtn.classList.remove('active');
        updateUI();
    }
});

unitFBtn.addEventListener('click', () => {
    if (currentUnit !== 'F') {
        currentUnit = 'F';
        unitFBtn.classList.add('active');
        unitCBtn.classList.remove('active');
        updateUI();
    }
});

// Run default city on load
performWeatherLookup(currentCityName);

// ==========================================================================
// SPA View Controller
// ==========================================================================
const navDashboard = document.getElementById('nav-dashboard');
const navMap = document.getElementById('nav-map');
const navCities = document.getElementById('nav-cities');
const navSettings = document.getElementById('nav-settings');

const dashboardView = document.getElementById('dashboard-view');
const mapView = document.getElementById('map-view');
const citiesView = document.getElementById('cities-view');
const settingsView = document.getElementById('settings-view');

const navItems = [navDashboard, navMap, navCities, navSettings];
const views = [dashboardView, mapView, citiesView, settingsView];

function switchView(targetViewId, activeNavBtn) {
    views.forEach(v => {
        if (v.id === targetViewId) {
            v.classList.add('active-view');
        } else {
            v.classList.remove('active-view');
        }
    });

    navItems.forEach(item => {
        if (item === activeNavBtn) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    // Initialize and refresh Leaflet Map on open
    if (targetViewId === 'map-view') {
        initLeafletMap();
        setTimeout(() => {
            if (map) map.invalidateSize();
        }, 100);
    }

    // Sync settings controls to match current state when opening settings page
    if (targetViewId === 'settings-view') {
        initSettingsView();
    }

    // Render Saved Cities dynamically on open
    if (targetViewId === 'cities-view') {
        renderSavedCities();
    }
}

navDashboard.addEventListener('click', (e) => {
    e.preventDefault();
    switchView('dashboard-view', navDashboard);
});

navMap.addEventListener('click', (e) => {
    e.preventDefault();
    switchView('map-view', navMap);
});

navCities.addEventListener('click', (e) => {
    e.preventDefault();
    switchView('cities-view', navCities);
});

navSettings.addEventListener('click', (e) => {
    e.preventDefault();
    switchView('settings-view', navSettings);
});

// Map layer switching
const mapLayerBtns = document.querySelectorAll('.map-layer-btn');
mapLayerBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        mapLayerBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Mock a radar sweep scan restart
        const scan = document.querySelector('.radar-scan');
        if (scan) {
            scan.style.animation = 'none';
            scan.offsetHeight; // force reflow
            scan.style.animation = 'radar-sweep 8s linear infinite';
        }
    });
});

// Settings page interaction
const saveSettingsBtn = document.getElementById('save-settings');
const settingTempUnit = document.getElementById('setting-temp-unit');
const themeBtns = document.querySelectorAll('.theme-opt-btn');
const settingSevereWarnings = document.getElementById('setting-severe-warnings');
const settingDailySummary = document.getElementById('setting-daily-summary');

// Sync settings interface selectors
function initSettingsView() {
    settingTempUnit.value = currentUnit;
    themeBtns.forEach(btn => {
        if (btn.dataset.theme === selectedTheme) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    // Sync checkboxes
    if (settingSevereWarnings) settingSevereWarnings.checked = severeWarningsEnabled;
    if (settingDailySummary) settingDailySummary.checked = dailySummaryEnabled;
}

// Live interactive theme preview handlers
themeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        themeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        selectedTheme = btn.dataset.theme;
        
        // Apply immediately for visual review
        document.body.className = '';
        if (selectedTheme !== 'default') {
            document.body.classList.add(`theme-${selectedTheme}`);
        }
    });
});

saveSettingsBtn.addEventListener('click', () => {
    // 1. Save Temperature Unit
    const newTempUnit = settingTempUnit.value;
    if (newTempUnit !== currentUnit) {
        currentUnit = newTempUnit;
        if (currentUnit === 'C') {
            unitCBtn.classList.add('active');
            unitFBtn.classList.remove('active');
        } else {
            unitFBtn.classList.add('active');
            unitCBtn.classList.remove('active');
        }
        updateUI();
    }

    // 2. Persist Selected Theme in Local Storage
    localStorage.setItem('skyline-theme', selectedTheme);
    
    // 3. Save Notification Preferences
    if (settingSevereWarnings) severeWarningsEnabled = settingSevereWarnings.checked;
    if (settingDailySummary) dailySummaryEnabled = settingDailySummary.checked;
    localStorage.setItem('skyline-severe-warnings', severeWarningsEnabled);
    localStorage.setItem('skyline-daily-summary', dailySummaryEnabled);
    
    // Request permission if enabled
    if (severeWarningsEnabled || dailySummaryEnabled) {
        requestNotificationPermission();
    }
    
    alert("Settings saved successfully!");
    switchView('dashboard-view', navDashboard);
});

// ==========================================================================
// Leaflet World Map Logic
// ==========================================================================
let map = null;
let mapMarker = null;

function initLeafletMap() {
    if (map) return; // already initialized
    
    // Define Base Map Layers
    const darkMatter = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
    });
    
    const satellite = L.layerGroup([
        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
        }),
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; CARTO',
            subdomains: 'abcd'
        })
    ]);
    
    const streetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    
    // Initialize Leaflet Map centered globally at zoom level 2 with Satellite Hybrid base
    map = L.map('leaflet-map', {
        center: [20, 0],
        zoom: 2,
        layers: [satellite]
    });
    
    // Create Layer Controls
    const baseMaps = {
        "Satellite Hybrid": satellite,
        "Sleek Dark Matter": darkMatter,
        "Standard Street Map": streetMap
    };
    L.control.layers(baseMaps, null, { collapsed: false }).addTo(map);
    
    // Add click handler on map
    map.on('click', async function(e) {
        const { lat, lng } = e.latlng;
        
        // Place or move marker
        if (mapMarker) {
            mapMarker.setLatLng(e.latlng);
        } else {
            mapMarker = L.marker(e.latlng).addTo(map);
        }
        
        // Open temporary popup with loader
        mapMarker.bindPopup('<div class="map-popup-container"><span class="map-popup-title">Loading weather...</span></div>').openPopup();
        
        try {
            // Fetch name and weather simultaneously
            const namePromise = reverseGeocode(lat, lng);
            const weatherPromise = fetchWeatherData(lat, lng);
            
            const [locationName, weatherData] = await Promise.all([namePromise, weatherPromise]);
            
            if (weatherData) {
                const tempC = Math.round(weatherData.current.temperature_2m);
                const tempDisp = currentUnit === 'C' ? `${tempC}°C` : `${toFahrenheit(tempC)}°F`;
                const code = weatherData.current.weather_code;
                const cond = getWeatherCondition(code, weatherData.current.is_day);
                const desc = cond.desc;
                
                const popupContent = `
                    <div class="map-popup-container">
                        <span class="map-popup-title">${locationName}</span>
                        <span class="map-popup-temp">${tempDisp}</span>
                        <span class="map-popup-desc">${desc}</span>
                        <button class="map-popup-btn" onclick="selectMapLocation('${locationName.replace(/'/g, "\\'")}', ${lat}, ${lng})">Select Location</button>
                    </div>
                `;
                mapMarker.setPopupContent(popupContent);
            } else {
                mapMarker.setPopupContent("Failed to load weather.");
            }
        } catch (err) {
            console.error(err);
            mapMarker.setPopupContent("Error loading data.");
        }
    });
}

// Reverse Geocoding helper using free Nominatim API
async function reverseGeocode(lat, lng) {
    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&zoom=10`);
        const data = await response.json();
        if (data && data.address) {
            const city = data.address.city || data.address.town || data.address.village || data.address.county || data.address.state || "Selected Area";
            const country = data.address.country || "";
            return country ? `${city}, ${country}` : city;
        }
        return `Location (${lat.toFixed(2)}, ${lng.toFixed(2)})`;
    } catch (e) {
        return `Location (${lat.toFixed(2)}, ${lng.toFixed(2)})`;
    }
}

// Global action handler for map selection button
window.selectMapLocation = async function(name, lat, lng) {
    currentCityName = name;
    const [weather, aqi] = await Promise.all([
        fetchWeatherData(lat, lng),
        fetchAQIData(lat, lng)
    ]);
    if (weather) {
        currentWeatherData = weather;
        currentAQIData = aqi;
        updateUI();
        switchView('dashboard-view', navDashboard);
    }
};

// ==========================================================================
// Saved Cities Management Logic
// ==========================================================================
let savedCities = JSON.parse(localStorage.getItem('skyline-saved-cities')) || ["New York", "London", "Tokyo"];

async function renderSavedCities() {
    const grid = document.querySelector('.cities-grid');
    if (!grid) return;
    
    // Clear and draw the initial grid structure with the Add City card
    grid.innerHTML = `
        <div class="card add-city-card" id="btn-add-city">
            <div class="add-city-content">
                <svg class="add-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                <h3>Add New City</h3>
                <p>Pin a location for quick access</p>
            </div>
        </div>
    `;
    
    // Add prompt click handler to the button
    document.getElementById('btn-add-city').addEventListener('click', addNewCityPrompt);
    
    // Fetch and dynamically draw pinned location cards
    for (const city of savedCities) {
        const loc = await getCoordinates(city);
        if (loc) {
            const weather = await fetchWeatherData(loc.latitude, loc.longitude);
            if (weather) {
                const tempC = Math.round(weather.current.temperature_2m);
                const tempDisp = currentUnit === 'C' ? `${tempC}°C` : `${toFahrenheit(tempC)}°F`;
                const code = weather.current.weather_code;
                const cond = getWeatherCondition(code, weather.current.is_day);
                
                const maxTempC = Math.round(weather.daily.temperature_2m_max[0]);
                const minTempC = Math.round(weather.daily.temperature_2m_min[0]);
                const maxDisp = currentUnit === 'C' ? `${maxTempC}°` : `${toFahrenheit(maxTempC)}°`;
                const minDisp = currentUnit === 'C' ? `${minTempC}°` : `${toFahrenheit(minTempC)}°`;
                
                const localTimeStr = new Date().toLocaleTimeString('en-US', {
                    timeZone: weather.timezone,
                    hour: 'numeric',
                    minute: '2-digit'
                });

                const card = document.createElement('div');
                card.className = 'card city-weather-card';
                card.innerHTML = `
                    <div class="city-card-header" onclick="selectSavedCity('${city.replace(/'/g, "\\'")}', ${loc.latitude}, ${loc.longitude})">
                        <div>
                            <h3>${loc.name}</h3>
                            <p>${loc.country || ""}</p>
                        </div>
                        <span class="local-time">${localTimeStr}</span>
                    </div>
                    <div class="city-card-body" onclick="selectSavedCity('${city.replace(/'/g, "\\'")}', ${loc.latitude}, ${loc.longitude})">
                        <span class="city-temp">${tempDisp}</span>
                        <svg class="city-weather-icon" viewBox="0 0 64 64">${cond.icon}</svg>
                    </div>
                    <div class="city-card-footer" onclick="selectSavedCity('${city.replace(/'/g, "\\'")}', ${loc.latitude}, ${loc.longitude})">
                        <span>${cond.desc}</span>
                        <span>H: ${maxDisp} L: ${minDisp}</span>
                    </div>
                    <button class="remove-city-btn" onclick="removeSavedCity(event, '${city.replace(/'/g, "\\'")}')">&times;</button>
                `;
                grid.appendChild(card);
            }
        }
    }
}

// Trigger add city query input prompt
async function addNewCityPrompt() {
    const cityInput = prompt("Enter the name of the city you want to pin:");
    if (!cityInput || cityInput.trim() === '') return;
    const formatted = cityInput.trim();
    
    if (savedCities.some(c => c.toLowerCase() === formatted.toLowerCase())) {
        alert("This city is already pinned!");
        return;
    }
    
    // Verify city existence using coordinates lookup
    const loc = await getCoordinates(formatted);
    if (loc) {
        savedCities.push(loc.name);
        localStorage.setItem('skyline-saved-cities', JSON.stringify(savedCities));
        renderSavedCities();
    }
}

// Delete pinned city card logic
window.removeSavedCity = function(event, cityName) {
    event.stopPropagation(); // stop click event from selecting the card
    savedCities = savedCities.filter(c => c.toLowerCase() !== cityName.toLowerCase());
    localStorage.setItem('skyline-saved-cities', JSON.stringify(savedCities));
    renderSavedCities();
};

// Selection handler to load weather details
window.selectSavedCity = async function(cityName, lat, lng) {
    currentCityName = cityName;
    const [weather, aqi] = await Promise.all([
        fetchWeatherData(lat, lng),
        fetchAQIData(lat, lng)
    ]);
    if (weather) {
        currentWeatherData = weather;
        currentAQIData = aqi;
        updateUI();
        switchView('dashboard-view', navDashboard);
    }
};

