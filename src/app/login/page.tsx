"use client";
import { useRouter } from "@/node_modules/next/navigation";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {
  LoginForm,
  ProConfigProvider,
  ProFormInstance,
  ProFormText,
} from "@ant-design/pro-components";
import { message } from "antd";
import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { LoginReqEntity } from "../_modules/definies";

type LoginType = "phone" | "account";

export default () => {
  const i18nGlobal = useTranslations("global");
  const i18nLogin = useTranslations("login");
  const { push } = useRouter();
  const [loginType, setLoginType] = useState<LoginType>("account");

  const loginFormRef = useRef<ProFormInstance>();

  //提交登录
  const userLogin = async (values: any) => {
    const loginData: LoginReqEntity = {
      username: values.username,
      password: values.password,
    };

    message.success("模拟：登录成功");
    push("/");
  };

  return (
    <ProConfigProvider hashed={false}>
      <div
        style={{
          height: "100vh",
          backgroundImage: "url('/bg.jpg')",
          backgroundSize: "cover",
        }}
      >
        <div>
          <LoginForm
            logo="/favicon.png"
            title={i18nGlobal("title")}
            subTitle={i18nGlobal("sub_title")}
            submitter={{
              searchConfig: {
                submitText: i18nLogin("login"),
              },
            }}
            actions={
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <p style={{ color: "rgba(255,255,255,.6)" }}>
                  ©{new Date().getFullYear()} Mortnon.
                </p>
              </div>
            }
            formRef={loginFormRef}
            onFinish={userLogin}
          >
            <ProFormText
              name="username"
              fieldProps={{
                size: "large",
                prefix: <UserOutlined className={"prefixIcon"} />,
              }}
              placeholder={i18nLogin("username")}
              rules={[
                {
                  required: true,
                  message: i18nLogin("username_hint"),
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: "large",
                prefix: <LockOutlined className={"prefixIcon"} />,
              }}
              placeholder={i18nLogin("password")}
              rules={[
                {
                  required: true,
                  message: i18nLogin("password_hint"),
                },
              ]}
            />
          </LoginForm>
        </div>
      </div>
    </ProConfigProvider>
  );
};
