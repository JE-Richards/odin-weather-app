# Weather Forecast App - An Intermediate JavaScript Project

# Table of Contents

1. [About](#about)
2. [Built With](#built-with)
3. [Getting Started](#getting-started)
4. [Acknowledgements](#acknowledgements)

# About

This JavaScript project forms part of [The Odin Project JavaScript Course](https://www.theodinproject.com/lessons/node-path-javascript-weather-app).

This project provides an opportunity to gain hands on experience implementing asynchronous techniques in addition to API interactions. It uses the [Visual Crossing](https://www.visualcrossing.com/) API to query and retrieve weather forecast data for a user specified location. This request is handled asynchronously then, once the data is returned, standard DOM manipulation techniques are used to display the relevant data within the UI.

# Built With

- HTML
- CSS
- JavaScript

All additional packages used for the project can be found in [package.json](/package.json).

# Getting Started

## Prerequisites

To use this project:

1. For this repo
2. Clone the fork to your local storage
3. Open the project.
4. Execute `npm install` to install all the project dependencies based on `package.json`

## Using the project

To use the project, you will need a valid Visual Crossing API Key.

1. To get a free API key, start by making an [account](https://www.visualcrossing.com/sign-up).
2. Your API key can be found in your account details - https://www.visualcrossing.com/account
3. Enter your API key inside `api-config.js`
   - `const apiKey = 'Your API Key here';`

# Acknowledgements

All additional resources used throughout the project can be found below:

- Visually-hidden CSS element: https://benmyers.dev/blog/native-visually-hidden/#:~:text=Conventional%20ways%20to%20hide%20elements,that%20content%20to%20assistive%20technologies.

  - As location is the only form input required for this app, the decision was made to hide the input label to produce a cleaner design. However, for the benefit of users who utilise a screen reader, the label still needed to be present within the DOM. To allow the label to be hidden whilst still present for the screen reader, it's useful to use some variation of `visually-hidden`.

- Toggle Switches: https://www.w3schools.com/howto/howto_css_switch.asp

- SVG Icons:
  - Snow: https://pictogrammers.com/library/mdi/icon/weather-snowy/
  - Rain: https://pictogrammers.com/library/mdi/icon/weather-pouring/
  - Fog: https://pictogrammers.com/library/mdi/icon/weather-fog/
  - Wind: https://pictogrammers.com/library/mdi/icon/weather-windy-variant/
  - Cloudy: https://pictogrammers.com/library/mdi/icon/weather-cloudy/
  - Partly Cloudy (Day): https://pictogrammers.com/library/mdi/icon/weather-partly-cloudy/
  - Partly Cloudy (Night): https://pictogrammers.com/library/mdi/icon/weather-night-partly-cloudy/
  - Clear (Day): https://pictogrammers.com/library/mdi/icon/weather-sunny/
  - Clear (Night): https://pictogrammers.com/library/mdi/icon/weather-night/
  - Thermometer: https://pictogrammers.com/library/mdi/icon/thermometer/
  - Water Percent: https://pictogrammers.com/library/mdi/icon/water-percent/
  - Alternate Wind: https://pictogrammers.com/library/mdi/icon/weather-windy/
  - UV: https://pictogrammers.com/library/mdi/icon/alert-octagram/
  - Alert symbol: https://pictogrammers.com/library/mdi/icon/alert-box/
