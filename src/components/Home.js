import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addAllApps, addAllStats } from "../actions";
import { Col, Container, Image, Row } from "react-bootstrap";

import img1 from "../assets/asset1.svg";
import icon1 from "../assets/icon1.svg";
import icon2 from "../assets/icon2.svg";
import icon3 from "../assets/icon3.svg";
import icon4 from "../assets/icon4.svg";

import "../styles/Home.css";
import axios from "axios";
import { Card } from "./Card";

const Home = () => {
  let allApps = useSelector((state) => state.allApps);
  const dispatch = useDispatch();

  useEffect(() => {
    const cachedHits = JSON.parse(sessionStorage.getItem("applist"));
    if (cachedHits) {
      dispatch(addAllApps(cachedHits));
    } else {
      axios
        .get("https://api.npoint.io/4ca5aaf459a573940672")
        .then(function (response) {
          // handle success
          //   console.log(response);
          sessionStorage.setItem("applist", JSON.stringify(response.data));
          dispatch(addAllApps(response.data));
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    }
  }, []);

  useEffect(() => {
    const cachedHits = JSON.parse(sessionStorage.getItem("allstats"));
    if (cachedHits) {
      dispatch(addAllStats(cachedHits));
    } else {
      axios
        .get("https://api.npoint.io/d734975d2aee62d197ef")
        .then(function (response) {
          //   console.log(response);
          dispatch(addAllStats(response.data));
          sessionStorage.setItem("allstats", JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        })
        .then(function () {});
    }
  }, []);

  return (
    <Container fluid className="Container">
      <Row noGutters className="row">
        <Col xs={12} lg={6} className="col-1">
          <div className="left-top">
            <div className="title-div">adsoul</div>
            <div className="image-div">
              <Image src={img1} fluid />
            </div>
          </div>
          <div className="left-bot">
            <div className="heading-div">revenue optimization</div>
            <div className="image-div">
              <div className="box">
                <div>
                  <Image src={icon1} className="icon" fluid />
                </div>
                <div> Fill Rate </div>
              </div>
              <div className="box">
                <div>
                  <Image src={icon2} className="icon" fluid />
                </div>
                <div> Improve CTR </div>
              </div>
              <div className="box">
                <div>
                  <Image src={icon3} className="icon" fluid />
                </div>
                <div> Refresh Rate </div>
              </div>
              <div className="box">
                <div>
                  <Image src={icon4} className="icon" fluid />
                </div>
                <div> Quick Integration </div>
              </div>
            </div>
          </div>
        </Col>
        <Col xs={12} lg={6} className="col-2">
          <div className="right-top">
            <div className="heading-div">Apps</div>
            <img
              src="https://img.icons8.com/cotton/64/000000/settings--v1.png"
              alt=""
            />
          </div>
          <div className="right-bottom">
            {allApps.map((item) => (
              <Card prop={item} key={item.id}></Card>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
