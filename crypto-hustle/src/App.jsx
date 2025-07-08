import { useState, useEffect } from 'react'
import './App.css'
import CoinInfo from "./Components/CoinInfo"

const API_KEY = import.meta.env.VITE_APP_API_KEY

function App() {
  const [list, setList] = useState(null)
  const [filteredResults, setFilteredResults] = useState([])
  const [searchInput, setSearchInput] = useState("")

  useEffect(() => {
    const fetchAllCoinData = async () => {
      try {
        const res = await fetch(`https://min-api.cryptocompare.com/data/all/coinlist?api_key=${API_KEY}`)
        const json = await res.json()
        console.log("Fetched data:", json)
        setList(json)
        setFilteredResults(Object.keys(json.Data)) 
      } catch (error) {
        console.error("Fetch error:", error)
      }
    }

    fetchAllCoinData()
  }, [])

  const searchItems = (searchValue) => {
    setSearchInput(searchValue)

    if (searchValue !== "" && list) {
      const filteredData = Object.entries(list.Data)
        .filter(([symbol, coinData]) => {
          const matchesSearch =
            coinData.FullName.toLowerCase().includes(searchValue.toLowerCase()) ||
            symbol.toLowerCase().includes(searchValue.toLowerCase())
          const isValid =
            coinData.IsTrading &&
            coinData.Algorithm !== "N/A" &&
            coinData.ProofType !== "N/A"
          return matchesSearch && isValid
        })
        .map(([symbol]) => symbol)

      setFilteredResults(filteredData)
    } else if (list) {
      
      const allValid = Object.entries(list.Data)
        .filter(([, coinData]) =>
          coinData.IsTrading &&
          coinData.Algorithm !== "N/A" &&
          coinData.ProofType !== "N/A"
        )
        .map(([symbol]) => symbol)
      setFilteredResults(allValid)
    }
  }

  return (
    <div className="whole-page">
      <h1>My Crypto List</h1>
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => searchItems(e.target.value)}
        value={searchInput}
      />

      <ul>
        {list &&
          (searchInput.length > 0 ? filteredResults : Object.keys(list.Data))
            .map((coin) => {
              const coinData = list.Data[coin]
              if (
                coinData.IsTrading &&
                coinData.Algorithm !== "N/A" &&
                coinData.ProofType !== "N/A"
              ) {
                return (
                  <CoinInfo
                    key={coin}
                    image={coinData.ImageUrl}
                    name={coinData.FullName}
                    symbol={coinData.Symbol}
                  />
                )
              }
              return null
            })
            .slice(0, 20)}
      </ul>
    </div>
  )
}

export default App
