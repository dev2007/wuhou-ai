"use client";

import {
  PageContainer,
  ProCard,
  ProDescriptions,
  ProForm,
  ProFormRadio,
  ProFormText,
} from "@ant-design/pro-components";

export default function AppList() {
  return (
    <PageContainer
      header={{
        title: false,
        breadcrumb: {},
      }}
    >
      <div>应用列表</div>
    </PageContainer>
  );
}
