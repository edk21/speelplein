import React, { useEffect, useState } from "react";
import InfoBox from "./InfoBox";
import { BsFillPersonFill } from "react-icons/bs";
import axios from "axios";
import Chart from "./Chart";

const NumberIcon = <BsFillPersonFill size={40} color="#fff" />;

const Dashboard = () => {
  const [childs, setChild] = useState([]);
  const [daily, setDaily] = useState([]);
  const today = new Date().toLocaleDateString();
  let dailyChildren = 0;

  let date = new Date().toJSON().slice(0, 10);

  const getAllRecords = async () => {
    await axios
      .get("https://speelplenapi.onrender.com/record/")
      .then((response) => {
        setChild(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getAllStats = async () => {
    await axios
      .get("https://speelplenapi.onrender.com/record/stats/")
      .then((response) => {
        setDaily(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllRecords();
    getAllStats();
  }, []);

  daily.reduce((matchingElement, element) => {
    if (element.date === today) {
      //return element;
      dailyChildren += 1;
    }
    return matchingElement;
  }, null);

  let totalAmount = childs.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.balance;
  }, 0);

  let dailyAmount = daily.reduce(
    (accumulator, currentValue) =>
      currentValue.date === today
        ? accumulator + currentValue.balance
        : accumulator,
    0
  );

  // Key to extract
  const desiredKey = "city";

  // Array to store extracted values
  const labels = [];

  // Loop through each object in the original array
  childs.forEach((obj) => {
    if (obj.hasOwnProperty(desiredKey)) {
      labels.push(obj[desiredKey]);
    }
  });

  const counts = {};

  // Count occurrences of each item in the array
  labels.forEach((item) => {
    if (item.trim() !== "") {
      counts[item] = (counts[item] || 0) + 1;
    }
  });

  const resultArray = Object.keys(counts).map((item) => {
    return { item, count: counts[item] };
  });

  const data = {
    labels: resultArray.map((item) => item.item),
    datasets: [
      {
        label: "Cities",
        data: resultArray.map((item) => item.count),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <>
      <div className="dashboadContainer">
        <h3>Général Stats</h3>
        <div className="dashboadWrapper">
          <InfoBox
            icon={NumberIcon}
            bgColor={"purple"}
            count={childs.length}
            title={"Number of children"}
          />
          <InfoBox
            icon={NumberIcon}
            bgColor={"green"}
            count={`${totalAmount} $`}
            title={"Total amount"}
          />
        </div>
      </div>
      <div className="dashboadContainer">
        <h3>Daily Stats: <span className="fs-5 fw-light">{date}</span></h3>
        <div className="dashboadWrapper">
          <InfoBox
            icon={NumberIcon}
            bgColor={"purple"}
            count={dailyChildren}
            title={"Daily children"}
          />
          <InfoBox
            icon={NumberIcon}
            bgColor={"green"}
            count={`${dailyAmount} $`}
            title={"Total amount"}
          />
        </div>
      </div>
      <div className="dashboadContainer">
        <h3>Charts</h3>
        <Chart data={data} />
      </div>
    </>
  );
};

export default Dashboard;
