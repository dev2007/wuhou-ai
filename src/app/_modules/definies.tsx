import { ReactNode } from "react";

//登录请求
export type LoginReqEntity = {
  username: string;
  password: string;
};

//应用相关信息
export type AppData = {
  key: string;
  icon: ReactNode;
  name: string;
  title: ReactNode;
};
