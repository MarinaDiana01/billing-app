import { useState } from "react";
import './BillingSection.css';
import userIcon from '../../assets/icons/user.svg';

const tipOptions = [5, 10, 15, 25, 50];

const BillingSection = () => {
  const [selectedOption, setSelectedOption] = useState(-1);
  const [tipAmount, setTipAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [history, sethistory] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault(); 

    const data = new FormData(e.target);
    const bill = parseInt(data.get('bill-input')); 
    const numberOfPeople = parseInt(data.get('number-of-people')); 

    const tipTotal = bill * (tipOptions[selectedOption] / 100);
    const tipTotalPerPerson = tipTotal / numberOfPeople;

    const orderTotal = bill + tipTotal; 
    const orderTotalPerPerson = orderTotal / numberOfPeople;

    setTipAmount(tipTotalPerPerson);
    setTotalAmount(orderTotalPerPerson);

    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const dateFormatted = `${day}/${month + 1}/${year} ${hours}:${minutes}`;

    sethistory(h => [...h, {dateFormatted, bill, tip: selectedOption !== -1 ? tipOptions[selectedOption] : 0, numberOfPeople}]);

    e.target.reset();
    setSelectedOption(-1);
  };

  const handleClick = (optionIndex) => {
    setSelectedOption(optionIndex);
  };

  const getAverageBillAmount = () => {
    let average = 0;

    if (history.length === 0 || history.bill === 0) {
      const value = 0;
      return value.toFixed(2);
    }

    for(let i = 0; i < history.length; i++) {
      average += history[i].bill;
    }
    return (average / history.length).toFixed(2);
  };

  const getAverageTipAmount = () => {
    let average = 0;

    if (history.length === 0 || history.tip === 0) {
      const value = 0;
      return value.toFixed(2);
    }

    for(let i = 0; i < history.length; i++) {
      average += history[i].tip;
    }
    return (average / history.length).toFixed(2);
  };

  const getAverageNrOfPeople = () => {
    let average = 0;

    if (history.length === 0 || history.numberOfPeople === 0) {
      const value = 0;
      return value.toFixed(2);
    }

    for (let i = 0; i < history.length; i++) {
      average += history[i].numberOfPeople;
    }
    return (average / history.length).toFixed(2);
  };

  const getTotalBillAmount = () => {
    let total = 0;

    for(let i = 0 ; i < history.length; i++) {
      total += history[i].bill;
    }
    return total;
  };

  const getTotalNumberOfPeople = () => {
    let total = 0;

    for (let i = 0; i < history.length; i++) {
      total += history[i].numberOfPeople;
    }
    return total;
  };

  return (
    <section>
      <h1 className="billing-section-title"> SPLI TTER </h1>
      <div className="billing-container">
        <form onSubmit={handleSubmit} className="billing-form">
          <div className="input-container">
            <label className="standard-label" htmlFor="bill-input"> Bill </label>
            <input className="standard-input" id="bill-input" name="bill-input" type="number" defaultValue={0} />
            <p className="standard-input-indicator"> $ </p>
          </div>
          <div className="tip-options-container">
            <p className="standard-label"> Select tip % </p>
            <div className="tip-options">
              {tipOptions.map((option, index) => (
                <button type="button" className={index === selectedOption ? 'selected' : ''} onClick={() => handleClick(index)} key={option}> {option}% </button>
              ))}
            </div>
          </div>
          <div className="input-container">
            <label className="standard-label" htmlFor="number-of-people"> Number of people </label>
            <input className="standard-input" id="number-of-people" name="number-of-people" type="number" defaultValue={0} />
            <img className="standard-input-indicator" src={userIcon} />
          </div>
          <button type="submit" className="calculate-billing"> Calculate </button>
        </form>
        <div className="billing-result-container">
          <div className="billing-result">
            <div>
              <p className="billing-result-heading"> Tip amount </p>
              <p className="billing-result-sub-heading"> /person </p>
            </div>
            <p className="billing-result-number"> ${tipAmount.toFixed(2)} </p>
          </div>

          <div className="billing-result">
            <div>
              <p className="billing-result-heading"> Tip amount </p>
              <p className="billing-result-sub-heading"> /person </p>
            </div>
            <p className="billing-result-number"> ${totalAmount.toFixed(2)} </p>
          </div>
        </div>
      </div>

      <ul className="billing-history-container">
        <h2>History</h2>
        {history.map((order, index) => (
          <li key={index}> <span className="billing-history-element">Order {index + 1}:</span> {order.dateFormatted} - bill: {order.bill} - tip: {`${order.tip}%`} - Number of people: {order.numberOfPeople} </li> 
        ))}
      </ul>

      <div className="billing-stats-container">
        <h2 className="billing-stats-title">Stats:</h2>
        <h3>Average bill: <span className="billing-stats-element-value">{getAverageBillAmount()}</span></h3>
        <h3>Average tip: <span className="billing-stats-element-value">{getAverageTipAmount()}</span></h3>
        <h3>Average number-of-people: <span className="billing-stats-element-value">{getAverageNrOfPeople()}</span></h3>
        <h3>Total bill: <span className="billing-stats-element-value">{getTotalBillAmount()}</span></h3>
        <h3>Total number-of-people: <span className="billing-stats-element-value">{getTotalNumberOfPeople()}</span></h3>
      </div>
    </section>
  )
};

export default BillingSection;