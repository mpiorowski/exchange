import {Button, Form, Modal, Select} from 'antd';
import React from "react";

const {Option} = Select;

export const ExchangeModal = ({visible, onSubmit, onCancel, exchangeCodes, currencies}) => {
  const [form] = Form.useForm();

  React.useEffect(() => {
    form.setFieldsValue({
      code: exchangeCodes,
    });
  }, []);

  const clearAll = () => {
    form.setFieldsValue({
      code: [],
    });
  }

  const children = [
    currencies.map((currency => {
      return <Option key={currency.code}>{currency.name}</Option>
    }))
  ];

  const handleCancel = () => {
    onCancel()
  }

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        // form.resetFields();
        onSubmit(values);
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  }

  return (
    <Modal
      visible={visible}
      title="Choose currencies from the list below"
      okText="Confirm"
      cancelText="Cancel"
      onCancel={handleCancel}
      onOk={handleOk}
      footer={[
        <Button key="clear" onClick={clearAll}>
          Clear
        </Button>,
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Submit
        </Button>,
      ]}
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
              message: 'Please choose a currency',
            },
          ]}
        >
          <Select
            mode="multiple"
            style={{width: '100%'}}
            placeholder="Currencies list"
            // onChange={handleChange}
          >
            {children}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};
