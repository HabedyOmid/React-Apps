import { useEffect, useState } from 'react';

export default function CurrencyConverter() {
  const [amount, setAmount] = useState('');
  const [to, setTo] = useState('USD');
  const [from, setFrom] = useState('EUR');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState('');
  const [error, setError] = useState('');

  useEffect(
    function () {
      const fetchRate = async () => {
        try {
          setIsLoading(true);

          const res = await fetch(
            `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`
          );

          const data = await res.json();
          setResult(data.rates[to]);
        } catch (error) {
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
      };

      if (amount !== 0 || from !== to) {
        fetchRate();
      }
    },
    [amount, from, to]
  );

  return (
    <div>
      {isLoading && !error && <p>Loading</p>}
      {error && <p>{error}</p>}
      {!isLoading && !error && (
        <>
          <p>
            {amount} {from} to {to} = <strong>{result.USD}</strong>
          </p>
          <p>
            {result} {to}
          </p>
        </>
      )}

      <input
        value={amount}
        min="1"
        type="number"
        disabled={isLoading}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <select
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={to}
        onChange={(e) => setTo(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
    </div>
  );
}
