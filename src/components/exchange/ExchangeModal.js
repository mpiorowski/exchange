import {Form, Modal, Select} from 'antd';
import React from "react";

const {Option} = Select;

export const ExchangeModal = ({visible, onCreate, onCancel}) => {
  const [form] = Form.useForm();

  const children = [
    <Option key="THB">bat (Tajlandia)</Option>,
    <Option key="USD">dolar amerykański</Option>,
    <Option key="AUD">dolar australijski</Option>,
  ];

  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  return (
    <Modal
      visible={visible}
      title="Wybierz waluty z listy poniżej"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            form.resetFields();
            onCreate(values);
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
        initialValues={{
          modifier: 'public',
        }}
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
            onChange={handleChange}
          >
            {children}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};
