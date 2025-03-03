---
sidebar_position: 1
---

# Documentation


## Project setup guide

To run the project, first clone a copy of the project from the github repo:
```bash
git clone https://github.com/seeus00/BlockhouseWorkTrial
```
If you want to start the NextJS server:
```bash
cd web-app
npm run dev
```

If you want to start the Docusaurus server:
```bash
cd docs
npm start
```

Running the website will host the pages on localhost and the ip of the running device. 
>Both servers will run on port **3000**, but Docusaurus will switch to another port in the CLI prompt)

If you want to access the site on a separate device such as a phone, you have to use the ip of the device that the server is running on.

## API Integration
The site uses the [CoinGecko](https://www.coingecko.com/) API to retrieve information about the specified crypto currencies. The site uses a seperate function that will fetch the JSON data from the API endpoint. 

```typescript
const jsonData = await fetch(`https://api.coingecko.com/api/v3/coins/markets?${params}`, { mode: 'cors' });
```

The ```params``` object is a dictionary of query parameters that allow you to retrieve specific information about the coins. The JSON response includes: 
- The current price of the coins
- The current market cap
- The low and high prices of the coin in the last 24 hrs
- etc

The data updates when the user presses the refresh button. Additionally, there is a ```setInterval``` timer that goes off every 20 seconds to refresh and update the data.

## State Management

The sites uses the [Zustand](https://github.com/pmndrs/zustand) state mangement library to save the information about the coins in a store. It stores the given JSON information in an array that includes an update function to set new data when it comes in. 
```typescript
// State types
interface States {
  coinsData: any
}

// Action types
interface Actions {
  setCoinsData: (newCoinsData: any) => void;
}
```
I decided to use Zustand as it was easy to setup and simple to work with. 


## Challenges and Solutions
Some challenges I faced while creating this project was styling the page to look nice and feel responsive. Sometimes, resizing the page would break the table that shows the information about the coins, making it look squished and unreadable. As a result, I added **overflow** classes to handle changes to the size of the table. Additionally, styling the elements to look smooth took adjusting and tweaking.

Another issue I faced was getting blocked by the API due to rate limiting. To bypass this, I used the ```setTimeout``` function to wait some time before making another request. This helps reduce the number of consecutive calls made to the server.