import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { IoIosTrash } from "react-icons/io";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import Footer from "./Footer";
import Spinner from "./Spinner";

const Stats = () => {
  const [childs, setChild] = useState([]);
  const [filteredData, setFilteredData] = useState(childs);
  const getAllStats = async () => {
    await axios
      .get("https://speelplenapi.onrender.com/record/stats/")
      .then((response) => {
        setChild(response.data);
        setFilteredData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const deleteRecord = async (id) => {
    await axios.delete(
      `https://speelplenapi.onrender.com/record/deleteAStat/${id}`
    );
    getAllStats();
  };

  const deleteAllRecord = async () => {
    await axios.delete(
      "https://speelplenapi.onrender.com/record/deleteAllStats"
    );
    getAllStats();
  };

  useEffect(() => {
    getAllStats();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to DELETE?")) {
      deleteRecord(id);
    } else {
    }
    getAllStats();
  };
  const handleDeleteAll = () => {
    if (window.confirm("Are you sure you want to DELETE all the Stats?")) {
      deleteAllRecord();
    } else {
    }
    getAllStats();
  };

  const handleSearchName = (event) => {
    let value = event.target.value.toLowerCase();
    let result = [];
    console.log(value);
    result = childs.filter((data) => {
      return data.name?.toLowerCase().includes(value.toLowerCase());
    });
    //child.name?.toLowerCase().includes(query.toLowerCase())

    setFilteredData(result);
  };

  const handleSearchDate = (event) => {
    let value = event.target.value.toLowerCase();
    let result = [];
    console.log(value);
    result = childs.filter((data) => {
      return data.date.indexOf(value) !== -1;
    });

    setFilteredData(result);
  };

  if (childs.length === 0) {
    return <Spinner />;
  }
  return (
    <div>
      <div className="table__container">
        <h3 className="text-center py-3 table__text">
          Dagelijkse Registraties
        </h3>
        <div className="search-bar">
          <div className="search-bar1">
            <input
              className="form-control"
              placeholder="zoek op naam"
              type="text"
              onChange={(event) => handleSearchName(event)}
            />
            <input
              className="form-control"
              placeholder="zoeken op datum"
              type="text"
              onChange={(event) => handleSearchDate(event)}
            />
          </div>
          <ReactHTMLTableToExcel
            className="btn btn-primary "
            table="emp-table"
            filename="Emp Excel file"
            sheet="Sheet"
            buttonText="Exporteren naar Excel"
          />
        </div>

        <div className="table table-responsive table__wrapper1">
          <table
            className="table table-striped table-bordered table-hover mt-5 c"
            id="emp-table"
            style={{ marginTop: 20 }}
          >
            <thead className="table-dark">
              <tr>
                <th style={{ width: "5%" }}>#</th>
                <th style={{ width: "45%" }}>Achetenaam en Voornaam</th>
                <th style={{ width: "8%" }}>Saldo</th>
                <th style={{ width: "20%" }}>Sociaal</th>
                <th style={{ width: "15%" }}>Datum</th>
                <th style={{ width: "15%" }}>
                  <Link to="/dailyR">
                    <IoIosTrash
                      className="icon-two cursor-pointer"
                      onClick={() => handleDeleteAll()}
                    />
                  </Link>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((child, index) => {
                return (
                  <tr key={index}>
                    <td>{index}</td>
                    <td>{child.name}</td>
                    <td>{child.balance}€</td>
                    <td>{child.social}</td>
                    <td>{child.date}</td>

                    {/* <td>
                      <Link to={'/edit/' + child._id}>
                        {' '}
                        <IoIosCreate className='icon-one' />
                      </Link>
                    </td> */}
                    <td>
                      <Link
                        to={"/dailyR"}
                        onClick={() => handleDelete(child._id)}
                      >
                        <IoIosTrash className="icon-two" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Stats;
