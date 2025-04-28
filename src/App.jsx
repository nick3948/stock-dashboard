import './App.css'
import StockTable from './components/StockTable';

function App() {
  return (
    <div className="min-h-screen w-full">
      <div className="w-full max-w-6xl mx-auto p-8">
        <h1 className="text-5xl font-bold text-center mb-8 text-white underline">
          Stock Price Dashboard
        </h1>
        <StockTable />
      </div>
    </div>
  );
}

export default App;