"use client";
import { Form, Select, Row, Col } from "antd";
import { ProCard, PageContainer } from "@ant-design/pro-components";
import { setCookie, getCookie } from "cookies-next";
import { useEffect, useState } from "react";

/**
 * 个性化页面
 */
export default function Customize() {
  const [formRef] = Form.useForm();

  const handleChange = (value: string) => {
    setCookie("locale", value);
    window.location.reload();
  };

  useEffect(() => {
    let locale = getCookie("locale");
    if (locale === null) {
      locale = "zh";
    }

    formRef?.setFieldsValue({
      lang: locale,
    });
  }, []);

  return (
      <ProCard>
        <Form
          labelCol={{ span: 4 }}
          form={formRef}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          style={{ maxWidth: 600 }}
        >
          <Form.Item name="lang" label="语言">
            <Select
              options={[
                { value: "zh", label: "简体中文" },
                { value: "en", label: "English" },
              ]}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="时区">
            <Select>
              <Select.Option value="utc8">北京时间</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </ProCard>
  );
}
