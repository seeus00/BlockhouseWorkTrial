'use client';

import { useCoinsDataStore } from "../coin/store";
import { getLatestCoinsData } from "../api/gecko/geckoapi";
import { useEffect, useState } from "react";

export default function Dashboard() {
	// Retrieve states and actions from store 
	const  { coinsData, setCoinsData } = useCoinsDataStore((state) => state);
	// Handle input changes for searching 
	const [query, setQuery] = useState("");

	// Store coins data in a separate array when searching and filtering to prevent needing the API to update.
	const [displayCoinsData, setDisplayCoinsData] = useState([]);

	// Stores times information for updating the data
	const [time, setTime] = useState(Date.now());

	// Format number to insert commas for money related columns 
	const formatMoney = (number: Number): String => number.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
	
	// For rate limiting
	const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

	// Filter data by name first, then check if the symbol contains search query
	const filterCoinsByQuery = (coins: any) => coins.filter((coinData: any) => coinData.name.toLowerCase().includes(query) 
																																				|| coinData.symbol.toLowerCase().includes(query));

	// Fetches the information from the coinGecko api
	const fetchData = async () => {
		try {
			// Wait some time before fetching data again to avoid spamming server
			await sleep(1000);

			const latestCoinsData = await getLatestCoinsData();
			if (latestCoinsData.error) {
				setCoinsData([]);
				setDisplayCoinsData([]);
				return;
			}
			setCoinsData(latestCoinsData);
			setDisplayCoinsData(filterCoinsByQuery(latestCoinsData));
		}catch (e) {
			alert("Error: failed to fetch data, trying again shortly...");
			setCoinsData([]);
			setDisplayCoinsData([]);
		}
	};

    useEffect(() => {
			// Refreshes data every 20 seconds
			fetchData();

			const interval = setInterval(() => setTime(Date.now()), 20000);
			return () => {
					clearInterval(interval);
			};
    }, [time]);

	// Dependency includes the search query because we want to refresh the data everytime the user searches for a specific coin
	useEffect(() => { 
		setDisplayCoinsData(filterCoinsByQuery(coinsData));
	}, [query]);

	// Refresh page when coins change
	useEffect(() => { }, [coinsData]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] sm:p-20 font-[family-name:var(--font-geist-sans)] bg-[#0a0a0a]">
			<main className="flex flex-col pt-8 gap-8 row-start-2 items-center sm:items-start overflow-auto rounded-lg shadow">
				<div className="relative flex flex-col w-full h-full text-gray-700 bg-[#0a0a0a] shadow-md rounded-xl bg-clip-border">
					<div className="flex w-full md:w-1/2 pl-1">
							<form className="flex items-center">
									<div className="relative w-full pr-1">
											<input value={query} onChange={e => setQuery(e.target.value)} type="text" id="simple-search" className="bg-black-50 border border-black-300 text-white-900 text-sm rounded-lg focus:ring-0  block w-full pl-10 p-2 dark:bg-gray-300 dark:border-gray-300 dark:placeholder-gray-600 dark:text-black dark:focus:ring-primary-200 dark:focus:border-primary-200" placeholder="Search for a coin"/>
									</div>
									<button onClick={fetchData} type="button" className="inline items-center text-white bg-green-700 hover:bg-green-800 focus:outline-none font-medium rounded-full text-sm px-3 py-2 text-center  dark:bg-green-600 dark:hover:bg-green-700">Refresh</button>
							</form>
					</div>


					{coinsData.length > 0 ? 
					<table className="w-full min-w-max bg-[#0a0a0a]">
						<thead>
							<tr>
								<th className="text-left p-4 border-b border-blue-gray-10">
									<p className="block font-sans text-sm antialiased font-normal leading-none text-white opacity-70">
										Name
									</p>
								</th>

								<th className="text-right p-4 border-b border-blue-gray-100">
									<p className="block font-sans text-sm antialiased font-normal leading-none text-white opacity-70">
										Price
									</p>
								</th>

								<th className="text-right p-4 border-b border-blue-gray-100">
									<p className="block font-sans text-sm antialiased font-normal leading-none text-white opacity-70">
										High 24h
									</p>
								</th>

								<th className="text-right p-4 border-b border-blue-gray-100">
									<p className="block font-sans text-sm antialiased font-normal leading-none text-white opacity-70">
										Low 24h
									</p>
								</th>

								<th className="text-right p-4 border-b border-blue-gray-100">
									<p className="block font-sans text-sm antialiased font-normal leading-none text-white opacity-70">
										Market Cap
									</p>
								</th>

							</tr>
						</thead>
					
						<tbody>
							{
								displayCoinsData.map((coinData: any) => {
									return <tr key={coinData.id}>
										<td className="p-4 border-b border-blue-gray-100">
											<div className="flex items-center">
												<img className="pr-2 inline w-7 h-5" src={coinData.image}/>

												<p className="pr-1 inline block font-sans text-sm antialiased font-normal leading-none text-white opacity-70">
													{coinData.name}
												</p>

												<p className="inline block font-sans text-sm antialiased font-normal leading-none text-white opacity-20">
													{coinData.symbol}
												</p>
											</div>
										</td>

										<td className="text-right p-4 border-b">
											<p className="block font-sans text-sm antialiased font-normal leading-none text-white opacity-70">
											{formatMoney(coinData.current_price)}
											</p>
										</td>

										<td className="text-right p-4 border-b border-blue-gray-100">
											<p className="block font-sans text-sm antialiased font-normal leading-none text-green-500 opacity-70">
												{formatMoney(coinData.high_24h)}
											</p>
										</td>

										<td className="text-right p-4 border-b border-blue-gray-100">
											<p className="block font-sans text-sm antialiased font-normal leading-none text-red-500 opacity-70">
												{formatMoney(coinData.low_24h)}
											</p>
										</td>

										<td className="text-right p-4 border-b border-blue-gray-100">
											<p className="block font-sans text-sm antialiased font-normal leading-none text-white opacity-70">
												{formatMoney(coinData.market_cap)}
											</p>
										</td>
									</tr>
								})
							}
						</tbody> 
					</table> : <img src="/loading.gif" className="w-40 h-40"/>}
				</div>
    	</main>
    </div>
  );
}
