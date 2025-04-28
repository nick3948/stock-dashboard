import { useEffect, useState } from 'react';
import Error from './Error';

const API_KEY = 'd07ba61r01qrslhna3jgd07ba61r01qrslhna3k0';
const symbols = ['AAPL', 'GOOGL', 'AMZN', 'MSFT', 'TSLA', 'EXCOF', 'PLTR'];

function StockTable() {
  const [stocks, setStocks] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchStocks() {
      try {
        const results = await Promise.all(
          symbols.map(async (symbol) => {
            const res = await fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`);
            const data = await res.json();
            return {
              symbol,
              price: data.c,
              change: ((data.c - data.pc) / data.pc) * 100,
            };
          })
        );
        setStocks(results);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchStocks();
  }, []);

  if (error) return <Error />;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Live Stock Prices</h2>
      <div className="overflow-x-auto">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="text-xs text-gray-600 uppercase bg-gray-100">
              <tr>
                <th className="px-6 py-4">Symbol</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Change</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map((stock) => (
                <tr
                  key={stock.symbol}
                  className="bg-white border-b hover:bg-gray-20 dark:hover:bg-gray-200 transition-all"
                >
                  <td className="px-6 py-4 font-semibold">{stock.symbol}</td>
                  <td className="px-6 py-4">${stock.price.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ...">
                      <span>{stock.change >= 0 ? '🔺' : '🔻'}</span>
                      <span>{stock.change.toFixed(2)}%</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default StockTable;