import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { addStats } from "../actions";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "../styles/AppDetails.css";
import { getStats } from "../services";

const AppDetails = () => {
  const [gridApi, setGridApi] = useState(null);
  let { id } = useParams();
  let location = useLocation();
  let history = useHistory();
  const { company, publisher } = location.state;
  let data = useSelector((state) => state.stats);
  const dispatch = useDispatch();

  const onGridReady = (params) => {
    setGridApi(params.api);
    const cachedHits = JSON.parse(sessionStorage.getItem(`stat${id}`));
    if (cachedHits) {
      dispatch(addStats(cachedHits));
    } else {
      getStats(id)
        .then(function (response) {
          let dataList = response.data;

          dataList.forEach((data) => {
            let RR = (data["impressions"] / data["adResponse"]) * 100;
            RR = parseFloat(RR).toFixed(2);
            RR = parseFloat(RR);
            RR = RR + "%";
            data["Render Rate"] = RR;
          });

          sessionStorage.setItem(`stat${id}`, JSON.stringify(dataList));

          dispatch(addStats(dataList));
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    if (gridApi) {
      if (window.innerWidth > 1000) {
        gridApi.sizeColumnsToFit();
      }
      gridApi.setDomLayout("autoHeight");
    }
  }, [data]);

  function handleClick() {
    history.push("/");
  }

  return (
    <div style={{ height: "100vh" }}>
      <div className="heading-div-2">ADSOUL</div>
      <div
        className="ag-theme-alpine"
        style={{ paddingLeft: 20, paddingRight: 20 }}
      >
        <div className="title-div-2">
          <div onClick={handleClick}>
            <img
              src="https://img.icons8.com/ios-filled/50/000000/long-arrow-left.png"
              alt=""
            />
          </div>
          <div className="square-div">
            <div className="square"></div>
            <div className="heading-flex">
              <span style={{ fontSize: 24 }}>{company}</span>
              {publisher}
            </div>
          </div>
        </div>

        <div style={{ width: "100%" }}>
          <AgGridReact rowData={data} onGridReady={onGridReady}>
            <AgGridColumn field="adRequest" />
            <AgGridColumn field="adResponse" />
            <AgGridColumn field="clicks" />
            <AgGridColumn field="date" />
            <AgGridColumn field="impressions" />
            <AgGridColumn field="revenue" />
            <AgGridColumn field="Render Rate" />
          </AgGridReact>
        </div>
      </div>
    </div>
  );
};

export default AppDetails;
