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
  const storedExchangeCodes = JSON.parse(localStorage.getItem("exchangeRates"));

  useEffect(() => {
    let exchangeRatesArray = [];
    let promiseArray = [];
    storedExchangeCodes.forEach(exchangeCode => {
      promiseArray.push(serviceGetExchangeByCode(exchangeCode).then(response => {
        exchangeRatesArray.push({code: response.code, mid: response.rates[0].mid});
      }));
    });
    Promise.all(promiseArray).then(() => {
      setLoading(false);
      setExchangeRates([...exchangeRates, ...exchangeRatesArray]);
    });
  }, [])

  const openModal = () => {
    setModalVisible(true);
  }

  const onCreate = values => {
    console.log('Received values of form: ', values);
    setModalVisible(false);
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
        onCreate={onCreate}
        onCancel={() => {
          setModalVisible(false);
        }}
      />
    </div>
  )
}
