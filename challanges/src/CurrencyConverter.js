import { useEffect, useState } from 'react';

export default function CurrencyConverter() {
  const [amount, setAmount] = useState('');
  const [to, setTo] = useState('USD');
  const [from, setFrom] = useState('EUR');
  const [result, setResult] = useState('');

  useEffect(
    function () {
      const fetchRate = async () => {
        if (amount <= 0) return;
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`
        );

        const data = await res.json();

        setResult(data.rates[to]);
      };

      fetchRate();
    },
    [amount, from, to]
  );

  return (
    <div>
      <p>
        {amount} {from} to {to} = <strong>{result.USD}</strong>
      </p>
      <input
        value={amount}
        min="1"
        type="number"
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <select value={from} onChange={(e) => setFrom(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select value={to} onChange={(e) => setTo(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>
        {result} {to}
      </p>
    </div>
  );
}
