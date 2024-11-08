import { useEffect, useState, useRef } from "react";
import "./App.css";

function App() {
  const [amount, setAmount] = useState(0);
  const [fromCur, setFromCur] = useState("EUR");
  const [toCur, setToCur] = useState("USD");
  const [output, setOutput] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(isLoading);
  const inputRef = useRef(null);

  useEffect(
    function () {
      async function convertCurrency() {
        setIsLoading(true);
        setIsDisabled(true);
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCur}&to=${toCur}`
        );

        const data = await res.json();
        setOutput(data.rates[toCur]);
        setIsLoading(false);
        setIsDisabled(false);
      }

      if (fromCur === toCur) return setOutput(amount);

      convertCurrency();
    },
    [amount, fromCur, toCur]
  );

  useEffect(() => {
    if (!isDisabled) {
      inputRef.current.focus();
    }
  }, [isDisabled]);

  return (
    <div>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        disabled={isDisabled}
        ref={inputRef}
      />

      <select
        value={fromCur}
        onChange={(e) => setFromCur(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={toCur}
        onChange={(e) => setToCur(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p style={{ fontWeight: "bold" }}>{`${output} ${toCur}`}</p>
    </div>
  );
}

export default App;
