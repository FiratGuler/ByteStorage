import React, { useState, useEffect } from "react";
import axios from "axios";
import {Row, Col } from "react-bootstrap";
import { CurrencyEuro, CurrencyDollar, CurrencyPound } from "react-bootstrap-icons";

const App = () => {
  const [usdRate, setUsdRate] = useState(null);
  const [eurRate, setEurRate] = useState(null);
  const [gbpRate, setGbpRate] = useState(null);

  useEffect(() => {
    const api_key = "74db8f1edd814529a1e41a58279ecc17";
    const base_url = "https://openexchangerates.org/api/latest.json";

    const params = { app_id: api_key, symbols: "USD,EUR,GBP,TRY" };

    axios.get(base_url, { params }).then((response) => {
      if (response.status === 200) {
        const { rates } = response.data;
        setUsdRate(rates.TRY / rates.USD);
        setEurRate(rates.TRY / rates.EUR);
        setGbpRate(rates.TRY / rates.GBP);
      }
    });
  }, []);

  return (
    <Row>
      <Col lg={4} md={6}>
        {usdRate && (
          <p>
            <CurrencyDollar />: {usdRate.toFixed(2)} TL
          </p>
        )}
      </Col>
      <Col lg={4} md={6}>
        {eurRate && (
          <p>
            <CurrencyEuro />: {eurRate.toFixed(2)} TL
          </p>
        )}
      </Col>
      <Col lg={4} md={6}>
        {gbpRate && (
          <p>
            <CurrencyPound />: {gbpRate.toFixed(2)} TL
          </p>
        )}
      </Col>
    </Row>
  );
};

export default App;
