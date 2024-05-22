import { useState } from 'react';
import './BillingSection.css';
import userIcon from '../../assets/icons/user.svg';
import BillingResult from '../BillingResult/BillingResult';
import HistoryElement from '../HistoryElement/HistoryElement';
import StatsElement from '../StatsElement/StatsElement';
import { getCurrentDateFormatted } from '../../utils/getCurrentDateFormatted';

const tipOptions = [5, 10, 15, 25, 50];

const BillingSection = () => {
  const [selectedOption, setSelectedOption] = useState(-1);
  const [tipAmount, setTipAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [history, sethistory] = useState([]);

  const handleSubmit = e => {
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

    sethistory(h => [
      ...h,
      {
        dateFormatted: getCurrentDateFormatted(),
        bill,
        tip: selectedOption !== -1 ? tipOptions[selectedOption] : 0,
        numberOfPeople,
      },
    ]);

    setTimeout(() => {
      setTipAmount(0);
      setTotalAmount(0);
    }, 1000);

    e.target.reset();
    setSelectedOption(-1);
  };

  const handleClick = optionIndex => {
    setSelectedOption(optionIndex);
  };

  const getAverageBillAmount = () => {
    let average = 0;

    if (history.length === 0 || history.bill === 0) {
      const value = 0;
      return value.toFixed(2);
    }

    for (let i = 0; i < history.length; i++) {
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

    for (let i = 0; i < history.length; i++) {
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

    for (let i = 0; i < history.length; i++) {
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
            <label className="standard-label" htmlFor="bill-input">
              Bill
            </label>
            <input
              className="standard-input"
              id="bill-input"
              name="bill-input"
              type="number"
              defaultValue={0}
            />
            <p className="standard-input-indicator"> $ </p>
          </div>
          <div className="tip-options-container">
            <p className="standard-label"> Select tip % </p>
            <div className="tip-options">
              {tipOptions.map((option, index) => (
                <button
                  type="button"
                  className={index === selectedOption ? 'selected' : ''}
                  onClick={() => handleClick(index)}
                  key={option}
                >
                  {option}%
                </button>
              ))}
            </div>
          </div>
          <div className="input-container">
            <label className="standard-label" htmlFor="number-of-people">
              Number of people
            </label>
            <input
              className="standard-input"
              id="number-of-people"
              name="number-of-people"
              type="number"
              defaultValue={0}
            />
            <img className="standard-input-indicator" src={userIcon} />
          </div>
          <button type="submit" className="calculate-billing">
            Calculate
          </button>
        </form>
        <div className="billing-result-container">
          <BillingResult name={'Tip'} amount={tipAmount.toFixed(2)} />
          <BillingResult name={'Total'} amount={totalAmount.toFixed(2)} />
        </div>
      </div>

      <h2 className="billing-subsection-title">Stats</h2>
      <div className="billing-stats-container">
        <StatsElement
          name={'Avg Bill'}
          averageAndTotalAmount={`$${getAverageBillAmount()}`}
        />

        <StatsElement
          name={'Avg Tip'}
          averageAndTotalAmount={`${getAverageTipAmount()}%`}
        />

        <StatsElement
          name={'Avg People'}
          averageAndTotalAmount={getAverageNrOfPeople()}
        />

        <StatsElement
          name={'Total Bill'}
          averageAndTotalAmount={`$${getTotalBillAmount()}`}
        />

        <StatsElement
          name={'Total People'}
          averageAndTotalAmount={getTotalNumberOfPeople()}
        />
      </div>

      <h2 className="billing-subsection-title">History</h2>
      <div className="billing-history-container">
        <ul>
          {history.map((order, index) => (
            <HistoryElement
              key={index}
              index={index}
              dateFormatted={order.dateFormatted}
              bill={order.bill}
              tip={order.tip}
              numberOfPeople={order.numberOfPeople}
            />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default BillingSection;
