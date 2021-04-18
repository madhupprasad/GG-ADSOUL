import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

export const Card = ({ prop }) => {
  let stats = useSelector((state) => state.allStats[prop.id]);

  let history = useHistory();
  let TotalRevenue = 0;
  let TotaladResponse = 0;
  let TotaladRequest = 0;
  let TotalImpressions = 0;

  stats.forEach((data) => {
    TotalRevenue += data.revenue;
    TotalImpressions += data.impressions;
    TotaladRequest += data.adRequest;
    TotaladResponse += data.adResponse;
  });

  function util(num) {
    if (num > 1000000) {
      return parseFloat(num / 1000000).toFixed(1) + "M";
    }
    if (num > 1000) {
      return parseFloat(num / 1000).toFixed(1) + "K";
    }
    return num;
  }

  function handleClick(prop) {
    const path = `/appdetails/${prop.id}`;
    history.push({
      pathname: path,
      state: {
        company: prop.appName,
        publisher: prop.publisherName,
      },
    });
  }

  return (
    <div className="card">
      <div className="card-top">
        <div
          className="square"
          style={{
            backgroundColor:
              "#" + Math.floor(Math.random() * 16777215).toString(16),
          }}
        ></div>
        <div className="heading-flex">
          <span style={{ fontSize: 28 }}>{prop.appName}</span>
          <span>{prop.publisherName}</span>
        </div>
        <div className="arrow" onClick={() => handleClick(prop)}>
          <img
            src="https://img.icons8.com/ios/50/000000/long-arrow-right.png"
            alt=""
          />
        </div>
      </div>
      <div className="card-bot">
        <div style={{ marginRight: 35 }}>
          <div style={{ fontSize: 14 }}>Revenue</div>
          <div style={{ fontSize: 30 }}>{util(TotalRevenue)}$ </div>
        </div>
        <div style={{ marginRight: 35 }}>
          <div style={{ fontSize: 14 }}>adResponse</div>
          <div style={{ fontSize: 30 }}>{util(TotaladResponse)} </div>
        </div>
        <div style={{ marginRight: 35 }}>
          <div style={{ fontSize: 14 }}>adRequest</div>
          <div style={{ fontSize: 30 }}>{util(TotaladRequest)} </div>
        </div>
        <div style={{ marginRight: 35 }}>
          <div style={{ fontSize: 14 }}>Impressions</div>
          <div style={{ fontSize: 30 }}>{util(TotalImpressions)} </div>
        </div>
      </div>
    </div>
  );
};
