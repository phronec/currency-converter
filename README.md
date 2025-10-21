# Testing Currency Exchange app made for Momence interview

A React Native application that provides real-time currency conversion using live exchange rates from the Czech National Bank (CNB).

## Features

- **Live Exchange Rates**: Real-time data from Czech National Bank (CNB)

- **32 Supported Currencies**: Including major world currencies with flag

- **Bidirectional Conversion**: Convert from CZK to any currency or vice versa

- **Amount Swapping**: Easily swap input and output amounts

- **Intuitive UI**: Clean, modern interface with smooth interactions

- **Offline-Aware**: Graceful handling of network errors and loading states

## Key Components

- **CurrencySelector**: Handles currency dropdown with scroll functionality
- **SwapButton**: Provides amount swapping between input and output
- **ExchangeRateDisplay**: Shows current rates, loading states, and errors
- **useCnbRates**: Custom hook for fetching and caching CNB data

## Getting Started

1. **Install dependencies**

   npm install

2. **Start Metro bundler**

   npm start

3. **Run on iOS**

   npm run ios

4. **Run on Android**

   npm run android
