import {Button, Card, List} from 'antd';
import React, {useEffect, useState} from "react";
import {serviceGetAllCurrencies, serviceGetExchangeByCode} from "../../rest/ExchangeRequest";
import './ExchangeList.less';
import {PlusOutlined} from '@ant-design/icons';
import {ExchangeModal} from "./ExchangeModal";

export const ExchangeList = () => {

  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [exchangeRates, setExchangeRates] = useState([]);
  const [exchangeCodes, setExchangeCodes] = useState(JSON.parse(localStorage.getItem('exchangeRates')) || []);

  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    loadAllCodes();
    loadExchangeByCodes(exchangeCodes);
  }, [])

  const loadAllCodes = () => {
    serviceGetAllCurrencies().then(response => {
      let currenciesArray = [];
      response[0].rates.forEach((currency) => {
        currenciesArray.push({code: currency.code, name: currency.currency})
      })
      setCurrencies([...currenciesArray]);
    })
  }

  const loadExchangeByCodes = (codes) => {
    let exchangeRatesArray = [];
    let promiseArray = [];
    codes.forEach(exchangeCode => {
      promiseArray.push(serviceGetExchangeByCode(exchangeCode).then(response => {
        exchangeRatesArray.push({code: response.code, mid: response.rates[0].mid});
      }));
    });
    Promise.all(promiseArray).then(() => {
      setLoading(false);
      setModalVisible(false);
      setExchangeCodes([...codes]);
      exchangeRatesArray.sort(function (a,b) {
        if (a.code < b.code) {
          return -1;
        }
        if (a.code > b.code) {
          return 1;
        }
        return 0;
      });
      setExchangeRates([...exchangeRatesArray]);
    });
  }

  const openModal = () => {
    setModalVisible(true);
  }

  const onSubmit = values => {
    localStorage.setItem('exchangeRates', JSON.stringify(values.code));
    loadExchangeByCodes(values.code);
  };

  return (
    <div className={'exchange-div'}>
      <Button
        type="dashed"
        onClick={() => {
          openModal();
        }}
        style={{width: '60%'}}
      >
        <PlusOutlined/> Add/Delete currencies
      </Button>
      <List
        loading={loading}
        className={'exchange-list'}
        grid={{gutter: 16, column: 4}}
        dataSource={exchangeRates}
        renderItem={item => (
          <List.Item>
            <Card title={item.code}>{item.mid}</Card>
          </List.Item>
        )}
      />
      <ExchangeModal
        visible={modalVisible}
        onSubmit={onSubmit}
        onCancel={() => {
          setModalVisible(false);
        }}
        exchangeCodes={exchangeCodes}
        currencies={currencies}
      />
    </div>
  )
}
