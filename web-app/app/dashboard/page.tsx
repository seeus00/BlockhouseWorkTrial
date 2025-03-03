import Image from "next/image";
import { getLatestCoinsData } from "../api/gecko/geckoapi";

export default async function Home() {
	const formatMoney = (number: Number): String => number.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

	const latestCoinsData = await getLatestCoinsData();
  return (
    <div className="grid grid-rows-[20px_1fr_20px] sm:p-20 font-[family-name:var(--font-geist-sans)]">
    	<p>DASHBOARD PAGE</p>
			<main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
				<div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
					<table className="w-full text-left table-auto min-w-max">
							<thead>
								<tr>
									<th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
										<p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
											Name
										</p>
									</th>

									<th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
										<p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
											Price
										</p>
									</th>

									<th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
										<p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
											High 24h
										</p>
									</th>

									<th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
										<p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
											Low 24h
										</p>
									</th>

									<th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
										<p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
											Market Cap
										</p>
									</th>

								</tr>
							</thead>

							<tbody>
								{latestCoinsData.map((coinData: any) => {
									return <tr key={coinData.id}>
										<td className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
											<div className="flex items-center">
												<img className="pr-2 inline w-7 h-7" src={coinData.image}/>
												<p className="inline block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
													{coinData.name}
												</p>
											</div>
										</td>

										<td className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
											<p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
											{formatMoney(coinData.current_price)}
											</p>
										</td>

										<td className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
											<p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
												{formatMoney(coinData.high_24h)}
											</p>
										</td>

										<td className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
											<p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
												{formatMoney(coinData.low_24h)}
											</p>
										</td>

										<td className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
											<p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
												{formatMoney(coinData.market_cap)}
											</p>
										</td>
									</tr>
								})}
							</tbody>
					</table>
				</div>
    	</main>
    </div>
  );
}
