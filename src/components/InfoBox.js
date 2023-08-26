import React from "react";

const InfoBox = ({ bgColor, title, count, icon }) => {
  return (
    <div className="info-box" style={{backgroundColor: `${bgColor}`}}>
      <span className="span1">{icon}</span>
      <span className="span2">
        <p>{title}</p>
        <h4>{count}</h4>
      </span>
    </div>
  );
};

export default InfoBox;