import './HistoryElement.css';

const HistoryElement = props => {
  return (
    <li>
      <span className="billing-history-element">Order {props.index + 1}:</span>
      {props.dateFormatted} - bill: ${props.bill} - tip: {`${props.tip}%`} -
      Number of people: {props.numberOfPeople}
    </li>
  );
};

export default HistoryElement;
