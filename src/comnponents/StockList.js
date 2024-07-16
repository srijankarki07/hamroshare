import { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./StockList.css";

const StockList = ({ stocks }) => {
  const [sortedStocks, setSortedStocks] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: "symbol",
    direction: "ascending",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    setTimeout(() => {
      const sortedData = [...stocks].sort((a, b) => {
        if (a.symbol < b.symbol) {
          return -1;
        }
        if (a.symbol > b.symbol) {
          return 1;
        }
        return 0;
      });
      setSortedStocks(sortedData);
      setIsLoading(false);
    }, 0); // Adjust this delay as needed
  }, [stocks]);

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }

    const sortedData = [...sortedStocks].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "ascending" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "ascending" ? 1 : -1;
      }
      return 0;
    });

    setSortedStocks(sortedData);
    setSortConfig({ key, direction });
  };

  return (
    <div className="stock-list">
      <table className="stock-table">
        <thead>
          <tr>
            <th>SN</th>
            <th onClick={() => handleSort("symbol")}>Symbol</th>
            <th onClick={() => handleSort("ltp")}>LTP</th>
            <th onClick={() => handleSort("pointChange")}>Point Change</th>
            <th onClick={() => handleSort("change")}>% Change</th>
            <th>Open</th>
            <th>High</th>
            <th>Low</th>
            <th>Volume</th>
            <th>Prev Close</th>
          </tr>
        </thead>
        <tbody>
          {isLoading
            ? Array.from({ length: 10 }).map((_, index) => (
                <tr key={index} className="stock-item">
                  <td>
                    <Skeleton />
                  </td>
                  <td>
                    <Skeleton />
                  </td>
                  <td>
                    <Skeleton />
                  </td>
                  <td>
                    <Skeleton />
                  </td>
                  <td>
                    <Skeleton />
                  </td>
                  <td>
                    <Skeleton />
                  </td>
                  <td>
                    <Skeleton />
                  </td>
                  <td>
                    <Skeleton />
                  </td>
                  <td>
                    <Skeleton />
                  </td>
                  <td>
                    <Skeleton />
                  </td>
                </tr>
              ))
            : sortedStocks.map((stock, index) => (
                <tr key={index} className="stock-item">
                  <td>{stock.sn}</td>
                  <td>{stock.symbol}</td>
                  <td
                    className={
                      parseFloat(stock.ltp) < 0 ? "negative" : "positive"
                    }
                  >
                    {stock.ltp}
                  </td>
                  <td>{stock.pointChange}</td>
                  <td
                    className={
                      parseFloat(stock.change) < 0 ? "negative" : "positive"
                    }
                  >
                    {stock.change}
                  </td>
                  <td>{stock.open}</td>
                  <td>{stock.high}</td>
                  <td>{stock.low}</td>
                  <td>{stock.volume}</td>
                  <td>{stock.prevClose}</td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockList;
