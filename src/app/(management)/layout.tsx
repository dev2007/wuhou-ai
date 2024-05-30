"use client";
import {
  CalendarOutlined,
  GithubFilled,
  KeyOutlined,
  LogoutOutlined,
  NotificationOutlined,
  QuestionCircleFilled,
  UserOutlined,
} from "@ant-design/icons";
import { PageContainer, ProLayout } from "@ant-design/pro-components";
import {
  faCommentDots,
  faDatabase,
  faPalette,
  faPuzzlePiece,
  faRobot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dropdown, MenuProps } from "antd";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import "./styles.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const i18nGlobal = useTranslations("global");
  const i18nMenu = useTranslations("menu");
  const { push } = useRouter();

  const pathName = usePathname();
  const [pathname, setPathname] = useState(pathName);

  //用户下拉菜单点击操作
  const onActionClick: MenuProps["onClick"] = ({ key }) => {
    if (key === "logout") {
      push("/login");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
      }}
    >
      <ProLayout
        title={i18nGlobal("title")}
        logo="/favicon.png"
        siderWidth={180}
        style={{
          height: "100vh",
        }}
        token={{
          sider: {
            colorMenuBackground: "#fff",
            colorMenuItemDivider: "#dfdfdf",
            colorTextMenu: "#595959",
            colorTextMenuSelected: "#4096ff",
            colorBgMenuItemSelected: "rgba(230,243,254,1)",
          },
        }}
        route={{
          path: "/chat",
          routes: [
            {
              path: "/chat",
              name: i18nMenu("chat"),
              icon: <FontAwesomeIcon icon={faCommentDots} />,
              component: "./chat",
            },
            {
              path: "/app/list",
              name: i18nMenu("app"),
              icon: <FontAwesomeIcon icon={faRobot} />,
              component: "./app",
            },
            {
              path: "/plugin/list",
              name: i18nMenu("plugin"),
              icon: <FontAwesomeIcon icon={faPuzzlePiece} />,
              component: "./plugin",
            },
            {
              path: "/dataset/list",
              name: i18nMenu("dataset"),
              icon: <FontAwesomeIcon icon={faDatabase} />,
              component: "./dataset",
            },
            {
              path: "/account",
              name: i18nMenu("account"),
              icon: <UserOutlined />,
              component: "./account",
              routes: [
                {
                  path: "/account/info",
                  name: i18nMenu("account_info"),
                  icon: <UserOutlined />,
                  component: "./info",
                },
                {
                  path: "/account/log",
                  name: i18nMenu("account_log"),
                  icon: <CalendarOutlined />,
                  component: "./log",
                },
                {
                  path: "/account/api",
                  name: i18nMenu("account_api"),
                  icon: <KeyOutlined />,
                  component: "./api",
                },
                {
                  path: "/account/customize",
                  name: i18nMenu("account_customize"),
                  icon: <FontAwesomeIcon icon={faPalette} />,
                  component: "./customize",
                },
                {
                  path: "/account/notice",
                  name: i18nMenu("account_notice"),
                  icon: <NotificationOutlined />,
                  component: "./notice",
                },
              ],
            },
          ],
        }}
        location={{
          pathname,
        }}
        menuItemRender={(item, dom) => {
          let shouldRenderIcon =
            item.pro_layout_parentKeys && item.pro_layout_parentKeys.length > 0;
          return (
            <div
              onClick={() => {
                setPathname(item.path || "/chat");
              }}
            >
              <Link href={item.path !== undefined ? item.path : ""}>
                {shouldRenderIcon ? (
                  <span style={{ display: "flex", alignItems: "center" }}>
                    {item.icon}
                    <span style={{ marginLeft: "8px" }}>{dom}</span>
                  </span>
                ) : (
                  dom
                )}
              </Link>
            </div>
          );
        }}
        subMenuItemRender={(item, dom) => {
          let shouldRenderIcon =
            item.pro_layout_parentKeys && item.pro_layout_parentKeys.length > 0;
          return (
            <>
              {shouldRenderIcon ? (
                <span style={{ display: "flex", alignItems: "center" }}>
                  {item.icon}
                  <span style={{ marginLeft: "8px" }}>{dom}</span>
                </span>
              ) : (
                dom
              )}
            </>
          );
        }}
        avatarProps={{
          src: "/avatar.jpeg",
          size: "small",
          title: "Mortnon",
          render: (props, dom) => {
            return (
              <Dropdown
                menu={{
                  items: [
                    {
                      key: "logout",
                      icon: <LogoutOutlined />,
                      label: i18nMenu("logout"),
                    },
                  ],
                  onClick: onActionClick,
                }}
              >
                {dom}
              </Dropdown>
            );
          },
        }}
        actionsRender={(props) => {
          if (props.isMobile) return [];
          return [
            <QuestionCircleFilled key="QuestionCircleFilled" />,
            <Link
              key="github"
              href="https://github.com/mortise-and-tenon/wuhou-ai"
              target="_blank"
            >
              <GithubFilled key="GithubFilled" style={{ color: "gray" }} />
            </Link>,
          ];
        }}
        footerRender={(props) => {
          return (
            <p
              style={{
                textAlign: "center",
                color: "rgba(0,0,0,0.6)",
              }}
            >
              ©{new Date().getFullYear()} Mortnon. (V1.0.0)
            </p>
          );
        }}
      >
        <PageContainer
          header={{
            breadcrumb: {},
          }}
        >
          {children}
        </PageContainer>
      </ProLayout>
    </div>
  );
}
