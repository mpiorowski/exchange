import {Form, Modal, Select} from 'antd';
import React, {useState} from "react";

const {Option} = Select;

export const ExchangeModal = ({visible, onSubmit, onCancel, exchangeCodes, currencies}) => {
  const [form] = Form.useForm();

  console.log(exchangeCodes);
  console.log(currencies);

  React.useEffect(() => {
    form.setFieldsValue({
      code: exchangeCodes,
    });
  }, []);

  const children = [
    currencies.map((currency => {
      return <Option key={currency.code}>{currency.name}</Option>
    }))
  ];

  return (
    <Modal
      visible={visible}
      title="Choose currencies from the list below"
      okText="Confirm"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            // form.resetFields();
            onSubmit(values);
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
      >
        <Form.Item
          name="code"
          rules={[
            {
              required: true,
              message: 'Wybierz walutę do dodania',
            },
          ]}
        >
          <Select
            mode="multiple"
            style={{width: '100%'}}
            placeholder="Lista walut"
            // onChange={handleChange}
          >
            {children}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};
