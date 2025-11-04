import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const API_KEY = import.meta.env.VITE_APP_API_KEY

function CoinDetail() {
  const { symbol } = useParams()
  const [fullDetails, setFullDetails] = useState(null)

  useEffect(() => {
    const getCoinDetail = async () => {
      try {
        const details = await fetch(
          `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${symbol}&tsyms=USD&api_key=${API_KEY}`
        )
        const description = await fetch(
          `https://min-api.cryptocompare.com/data/all/coinlist?fsym=${symbol}&api_key=${API_KEY}`
        )

        const detailsJson = await details.json()
        const descripJson = await description.json()

        setFullDetails({
          numbers: detailsJson.DISPLAY,
          textData: descripJson.Data,
        })
      } catch (error) {
        console.error("Failed to fetch coin detail", error)
      }
    }

    getCoinDetail()
  }, [symbol])

  if (!fullDetails) return <p style={{ color: "white" }}>Loading...</p>

  const coinText = fullDetails.textData[symbol]
  const coinNumbers = fullDetails.numbers[symbol].USD

  return (
    <div style={{ color: "white", padding: "1rem" }}>
      <h1>{coinText.FullName}</h1>
      <img
        className="images"
        src={`https://www.cryptocompare.com${coinNumbers.IMAGEURL}`}
        alt={`Icon for ${symbol}`}
        style={{ width: "50px", height: "50px" }}
      />
      <div>{coinText.Description}</div>
      <br />
      <div>
        This coin uses the <strong>{coinText.Algorithm}</strong> algorithm.
      </div>

      <table style={{ marginTop: "1rem", border: "1px solid white" }}>
        <tbody>
          <tr>
            <td>Launch Date</td>
            <td>{coinText.AssetLaunchDate || "N/A"}</td>
          </tr>
          <tr>
            <td>Website</td>
            <td>
             {coinText.Url && coinText.Url !== "" ? (
            <a href={coinText.Url} target="_blank" rel="noreferrer">
            
            </a>
                ) : (
                ""
            )}
            </td>
          </tr>
          <tr>
            <td>Market Cap</td>
            <td>{coinNumbers.MKTCAP}</td>
          </tr>
          <tr>
            <td>Volume (24h)</td>
            <td>{coinNumbers.VOLUME24HOURTO}</td>
          </tr>
          <tr>
            <td>Open (24h)</td>
            <td>{coinNumbers.OPENDAY}</td>
          </tr>
          <tr>
            <td>High (24h)</td>
            <td>{coinNumbers.HIGHDAY}</td>
          </tr>
          <tr>
            <td>Low (24h)</td>
            <td>{coinNumbers.LOWDAY}</td>
          </tr>
          <tr>
            <td>Change (24h)</td>
            <td>{coinNumbers.CHANGE24HOUR}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default CoinDetail
