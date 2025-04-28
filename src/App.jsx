import './App.css';
import StockTable from './components/StockTable';
import StockChart from './components/StockChart';
import Loader from './components/Loader'
import Navbar from './components/Navbar';
import { useEffect, useState } from 'react';

const API_KEY = 'd07ba61r01qrslhna3jgd07ba61r01qrslhna3k0';
const symbols = ['AAPL', 'GOOGL', 'AMZN', 'MSFT', 'TSLA', 'EXCOF', 'PLTR'];

function App() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

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
        console.error('Error fetching stocks:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchStocks();
  }, []);

  if (loading) return <Loader />;

  return (
    <><Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="min-h-screen w-full">
        <div className="w-full max-w-6xl mx-auto p-8">
          <h1 className="text-5xl text-center mb-8 text-white">
            Stock Price Dashboard
          </h1>
          <div className="flex flex-col md:flex-row justify-center items-start gap-8">
            <div className="flex-1">
              <StockTable stocks={stocks} searchQuery={searchQuery} />
            </div>
            <div className="flex-1">
              <StockChart stocks={stocks} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;