"use client";

import { faRightToBracket } from "@/node_modules/@fortawesome/free-solid-svg-icons/index";
import {
  PageContainer,
  ProCard,
  ProDescriptions,
  ProForm,
  ProFormRadio,
  ProFormText,
} from "@ant-design/pro-components";
import {
  ClearOutlined,
  MailOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  CaretLeftOutlined,
  CaretRightOutlined,
} from "@ant-design/icons";
import { faCommentDots, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslations } from "next-intl";
import { Button, Grid, Row, Col, Flex, Menu, MenuProps, Drawer } from "antd";
const { useBreakpoint } = Grid;
import { useState } from "react";

export default function Chat() {
  const i18n = useTranslations();

  type MenuItem = Required<MenuProps>["items"][number];

  //demo
  const appItems: MenuItem[] = [
    {
      key: "app1",
      label: "自定义应用1",
      icon: <MailOutlined />,
    },
    {
      key: "app2",
      label: "自定义应用2",
      icon: <MailOutlined />,
    },
    {
      key: "app3",
      label: "自定义应用3",
      icon: <MailOutlined />,
    },
  ];

  //demo
  const dialogItems: MenuItem[] = [
    {
      key: "dialog1",
      label: "新会话1",
      icon: <MailOutlined />,
    },
    {
      key: "dialog2",
      label: "新会话2",
      icon: <MailOutlined />,
    },
  ];

  //小屏的抽屉菜单控制
  //是否展示抽屉菜单
  const [open, setOpen] = useState(false);

  //展示抽屉菜单
  const showDrawer = () => {
    setOpen(true);
  };

  //隐藏抽屉菜单
  const hideDrawer = () => {
    setOpen(false);
  };

  //关闭抽屉菜单
  const onClose = () => {
    setOpen(false);
  };

  //当前屏幕大小情况
  const screens = useBreakpoint();

  //抽屉菜单中选中的标签页
  const [tab, setTab] = useState("appTab");

  const setActiveTab = (key: string) => {
    setTab(key);
  };

  //是否展示对话列表
  const [dialogListShow, setDialogListShow] = useState(true);

  const toggleDialog = () => {
    setDialogListShow(!dialogListShow);
    //当对话列表收起时，展开按钮一直呈现
    if (!dialogListShow) {
      setShowDialogToggleBtn(true);
    }
  };

  //是否展示对话列表的收起/展示按钮
  const [showDialogToggleBtn, setShowDialogToggleBtn] = useState(false);

  const dialogListMouseEnter = () => {
    setShowDialogToggleBtn(true);
  };

  const dialogListMouseLeave = () => {
    if (!dialogListShow) {
      setShowDialogToggleBtn(true);
    } else {
      setShowDialogToggleBtn(false);
    }
  };

  return (
    <Row>
      <Col
        xs={0}
        sm={0}
        md={0}
        lg={4}
        xl={4}
        style={{ zIndex: 2, height: `100vh`,backgroundColor:"#FFFFFF" }}
      >
        <div style={{zIndex: 2}}>
          <Flex justify="center" align="center" style={{ margin: "16px" }}>
            <Button
              href="/app/list"
              block
              icon={<FontAwesomeIcon icon={faArrowLeft} />}
            >
              <span style={{ margin: "0 16px 0" }}>{i18n("chat.exit")}</span>
            </Button>
          </Flex>
          <ProCard
            style={{
              border: "0",
              padding: "0 16px",
            }}
            title={i18n("chat.app_list")}
            headerBordered
            bordered
            ghost
          >
            <Menu
              items={appItems}
              style={{ border: "0px", margin: "8px 0 0" }}
              mode="inline"
            />
          </ProCard>
        </div>
      </Col>
      <Col
        xs={0}
        sm={0}
        md={0}
        lg={dialogListShow ? 6 : 0}
        xl={dialogListShow ? 6 : 0}
        style={{ zIndex: 2 }}
      >
        <div
          onMouseEnter={dialogListMouseEnter}
          onMouseLeave={dialogListMouseLeave}
        >
          <ProCard style={{ height: `100vh` }} title="自定义应用1" bordered>
            <Flex justify="space-between">
              <div style={{ width: "80%" }}>
                <Button
                  type="primary"
                  shape="round"
                  block
                  icon={<FontAwesomeIcon icon={faCommentDots} />}
                >
                  {i18n("chat.new_dialog")}
                </Button>
              </div>
              <Button shape="circle" icon={<ClearOutlined />} danger />
            </Flex>
            <Menu
              items={dialogItems}
              style={{ border: "0", margin: "8px 0 0" }}
              mode="inline"
            />
          </ProCard>
        </div>
      </Col>
      <Col
        xs={24}
        sm={24}
        md={24}
        lg={dialogListShow ? 14 : 20}
        xl={dialogListShow ? 14 : 20}
        style={{ zIndex: 0 }}
      >
        <Drawer placement="left" closable={false} onClose={onClose} open={open}>
          <Flex
            vertical
            justify="space-between"
            style={{
              height: "100%",
            }}
          >
            <ProCard
              tabs={{
                tabPosition: "top",
                activeKey: tab,
                onChange: setActiveTab,
                tabBarExtraContent: (
                  <Flex justify="space-between" gap="small">
                    <Button
                      type="primary"
                      shape="round"
                      icon={<FontAwesomeIcon icon={faCommentDots} />}
                    >
                      {i18n("chat.new_dialog")}
                    </Button>
                    <Button
                      type="dashed"
                      icon={<MenuFoldOutlined />}
                      onClick={hideDrawer}
                    />
                  </Flex>
                ),
              }}
            >
              <ProCard.TabPane key="appTab" tab={i18n("chat.app_list")}>
                <Menu
                  items={appItems}
                  style={{ border: "0", margin: "8px 0 0" }}
                  mode="inline"
                />
              </ProCard.TabPane>
              <ProCard.TabPane key="recordTab" tab={i18n("chat.dialog_list")}>
                <Menu
                  items={dialogItems}
                  style={{ border: "0", margin: "8px 0 0" }}
                  mode="inline"
                />
              </ProCard.TabPane>
            </ProCard>
            <Flex justify="center" align="center">
              <Button
                href="/app/list"
                block
                icon={<FontAwesomeIcon icon={faArrowLeft} />}
              >
                <span style={{ margin: "0 16px 0" }}>{i18n("chat.exit")}</span>
              </Button>
            </Flex>
          </Flex>
        </Drawer>

        <ProCard
          style={{ height: `100vh` }}
          title={
            <Flex justify="space-between" align="center">
              {Object.entries(screens)
                .filter((screen) => !!screen[1])
                .some(([key, value]) => key === "lg") ? (
                <></>
              ) : (
                <MenuUnfoldOutlined
                  onClick={showDrawer}
                  style={{ margin: "0 16px 0 0" }}
                />
              )}
              <span>我的对话</span>
            </Flex>
          }
          headerBordered
          bordered
        >
          {showDialogToggleBtn && (
            <Button
              style={{
                position: "absolute",
                top: "50%",
                left: "-6px",
                transform: "translateY(-50%)",
                height: "60px",
                width: "32px",
                borderTopLeftRadius: "0",
                borderBottomLeftRadius: "0",
                zIndex: 1,
              }}
              icon={
                dialogListShow ? (
                  <CaretLeftOutlined style={{ fontSize: "24px" }} />
                ) : (
                  <CaretRightOutlined style={{ fontSize: "24px" }} />
                )
              }
              onClick={toggleDialog}
              onMouseEnter={dialogListMouseEnter}
              onMouseLeave={dialogListMouseLeave}
            />
          )}

          <div>右侧内容</div>
        </ProCard>
      </Col>
    </Row>
  );
}
