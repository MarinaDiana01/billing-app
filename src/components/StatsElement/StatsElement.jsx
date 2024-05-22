import './StatsElement.css';

const StatsElement = props => {
  return (
    <div className="billing-stats-element">
      <h3>
        {props.name}
        <span className="billing-stats-element-value">
          {props.averageAndTotalAmount}
        </span>
      </h3>
    </div>
  );
};

export default StatsElement;
