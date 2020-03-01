import {Button, Card, List} from 'antd';
import React, {useEffect, useState} from "react";
import {serviceGetExchangeByCode} from "../../rest/ExchangeRequest";
import './ExchangeList.less';
import {PlusOutlined} from '@ant-design/icons';
import {ExchangeModal} from "./ExchangeModal";

export const ExchangeList = () => {

  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [exchangeRates, setExchangeRates] = useState([]);
  const [exchangeCodes, setExchangeCodes] = useState(JSON.parse(localStorage.getItem('exchangeRates')) || []);

  useEffect(() => {
    loadExchangeByCodes(exchangeCodes);
  }, [])

  const openModal = () => {
    setModalVisible(true);
  }

  const onSubmit = values => {
    console.log(values);
    localStorage.setItem('exchangeRates', JSON.stringify(values.code));

    loadExchangeByCodes(values.code);
  };

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
      setExchangeRates([...exchangeRatesArray]);
    });
  }

  return (
    <div className={'exchange-div'}>
      <Button
        type="dashed"
        onClick={() => {
          openModal();
        }}
        style={{width: '60%'}}
      >
        <PlusOutlined/> Dodaj walutę
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
      />
    </div>
  )
}
