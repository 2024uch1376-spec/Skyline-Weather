# Skyline Weather: Real-Time Weather Forecast

    Skyline is a dynamic, responsive frontend application that delivers real-time weather forecasts for locations across the globe. Built with clean HTML, modern CSS, and vanilla JavaScript, it provides users with comprehensive weather data including current conditions, hourly forecasts, and daily predictions.

## Features

- **Real-Time Data**: Fetches current weather conditions from the [Open-Meteo API](https://open-meteo.com/).
- **Hourly Forecast**: Displays a detailed 48-hour hourly temperature and precipitation forecast.
- **Daily Forecast**: Shows a 7-day daily forecast with high/low temperatures and weather icons.
- **Interactive Map**: Utilizes [Leaflet.js](https://leafletjs.com/) for an interactive world map where users can click any location to view its weather.
- **Modern UI/UX**:
  - **Dark Mode**: Automatic or manual switching between light and dark themes.
  - **Animated Icons**: Custom SVG icons that animate based on weather conditions.
  - **Smooth Transitions**: Smooth background gradient shifts and UI state changes.
  - **Responsive Design**: Optimized for both desktop and mobile devices.

## Getting Started

### Prerequisites

Ensure you have a modern web browser that supports HTML5, CSS3, and JavaScript (ES6+).

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/2024uch1376-spec/Skyline-Weather.git
    cd Skyline-Weather
    ```

2.  **Run the Application**:
    You can open `index.html` directly in your web browser. Alternatively, for the best experience (avoiding potential local file system security restrictions in some browsers), serve it using a local server:
    * **Node.js**:
      ```bash
      npx http-server .
      ```
    * **Python**:
      ```bash
      python -m http.server
      ```
    Then open the local URL (typically `http://localhost:8080` or `http://localhost:8000`) in your browser.

## Usage

1.  **Search for a Location**:
    - Type a city name in the search bar at the top and press Enter.
    - The main display will update with its current weather, forecasts, and air quality index.

2.  **Explore the Map**:
    - Navigate to the **Weather Map** tab in the sidebar navigation.
    - Click anywhere on the interactive map to query the weather for that location, and click **Select Location** to load it onto the dashboard.

3.  **Saved Cities**:
    - Pin your favorite cities in the **Saved Cities** tab. You can add new cities and view their current weather cards at a glance.

4.  **Theme & Settings**:
    - Go to the **Settings** tab to switch between the Celsius and Fahrenheit temperature units, or choose an ambient background glow color scheme ("Default", "Sunset Glow", or "Aurora Borealis").

## Project Structure

```
Skyline-Weather/
├── index.html              # Main application entry point
├── style.css               # Global styles and theme definitions
└── app.js                  # Core logic, API integration, interactive Leaflet map, and UI controllers
```
Note: Weather condition icons are rendered dynamically as inline SVGs directly within the JavaScript application logic.

## Technologies Used

- **HTML5**: For the structure of the application.
- **CSS3**: For styling and animations.
- **JavaScript (Vanilla)**: For all client-side logic and API calls.
- **[Open-Meteo API](https://open-meteo.com/)**: For weather data.
- **[Leaflet.js](https://leafletjs.com/)**: For the interactive map.
- **[OpenStreetMap](https://www.openstreetmap.org/)**: Base layer for the map tiles.

## Development

### Adding New Features
- To modify the weather icons, edit the SVG files in the `icons/` directory.
- To change the API endpoints or parameters, edit `app.js`.
- To adjust the theme colors or responsive breakpoints, edit `style.css`.

## License

This project is licensed under the MIT License.
