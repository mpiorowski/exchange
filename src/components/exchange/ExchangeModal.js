import {Form, Modal, Select} from 'antd';
import React, {useState} from "react";

const {Option} = Select;

export const ExchangeModal = ({visible, onSubmit, onCancel, exchangeCodes}) => {
  const [form] = Form.useForm();

  console.log(exchangeCodes);

  React.useEffect(() => {
    console.log('tutaj', exchangeCodes);
    form.setFieldsValue({
      code: exchangeCodes,
    });
  }, [exchangeCodes]);

  const children = [
    <Option key="THB">bat (Tajlandia)</Option>,
    <Option key="USD">dolar amerykański</Option>,
    <Option key="AUD">dolar australijski</Option>,
  ];

  // function handleChange(value) {
  //   console.log(`selected ${value}`);
  //   form.setFieldsValue({
  //     code: value.codes,
  //   });
  // }

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
        // initialValues={{
        //   code: ss,
        // }}
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
            // value={exchangeCodes}
          >
            {children}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};
