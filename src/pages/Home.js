import React, { useState, useEffect } from "react";
import UserCard from "../components/UserCard";
import apiClient from "../http-common";

const Home = () => {
  const [getResult, setGetResult] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getAllData();
  }, []);

  const fortmatResponse = (res) => {
    return JSON.parse(JSON.stringify(res));
  };

  async function getAllData() {
    try {
      setLoading(true);
      const res = await apiClient.get("/");
      const { results } = res.data;
      let userData = fortmatResponse(results);
      setGetResult(userData);
      setLoading(false);
      localStorage.setItem("userData", userData);
    } catch (err) {
      setGetResult(fortmatResponse(err.response?.data || err));
    }
  }

  const sendDataToParent = (index) => {
    if (index) {
      setRefresh(index);
      getAllData();
    }
    setRefresh(false);
  };

  return (
    <div className="container-fluid">
      <div className="col-md-12 d-flex justify-content-center w-100">
        {getResult &&
          getResult.map((value, i) => {
            return (
              <div className="col-md-6 my-5" key={i}>
                <UserCard
                  email={value.email}
                  name={value.name}
                  sendDataToParent={sendDataToParent}
                  loader={loading}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Home;
