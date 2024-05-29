"use client";
import { useRouter } from "@/node_modules/next/navigation";
import {
    LockOutlined, UserOutlined
} from "@ant-design/icons";
import {
    LoginForm,
    ProConfigProvider, ProFormInstance, ProFormText
} from "@ant-design/pro-components";
import { message } from "antd";
import { useRef, useState } from "react";
import { LoginReqEntity } from "../_modules/definies";

type LoginType = "phone" | "account";

export default () => {
  const router = useRouter();
  const [loginType, setLoginType] = useState<LoginType>("account");

  const loginFormRef = useRef<ProFormInstance>();

  //提交登录
  const userLogin = async (values: any) => {
    const loginData: LoginReqEntity = {
      username: values.username,
      password: values.password,
    };

    message.success("模拟：登录成功");
    router.push("/");
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
            title="WuHou AI"
            subTitle="基于 LLM 大语言模型的知识库问答系统"
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
              placeholder={"用户名"}
              rules={[
                {
                  required: true,
                  message: "请输入用户名",
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: "large",
                prefix: <LockOutlined className={"prefixIcon"} />,
              }}
              placeholder={"密码"}
              rules={[
                {
                  required: true,
                  message: "请输入密码",
                },
              ]}
            />
          </LoginForm>
        </div>
      </div>
    </ProConfigProvider>
  );
};
