"use client";
import {
  CalendarOutlined,
  GithubFilled,
  InfoOutlined,
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
import { Dropdown, MenuProps, Tooltip } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import { useTranslations } from "next-intl";
import "./styles.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const i18nGlobal = useTranslations("global");
  const i18nMenu = useTranslations("menu");
  const { push } = useRouter();

  const [pathname, setPathname] = useState("/chat");

  const [pageName, setPageName] = useState(
    generatePageTitle(
      <FontAwesomeIcon icon={faCommentDots} color="#4096ff" />,
      i18nMenu("chat")
    )
  );

  //用户下拉菜单点击操作
  const onActionClick: MenuProps["onClick"] = ({ key }) => {
    if (key === "logout") {
      push("/login");
    } else if (key === "profile") {
      push("/user/profile");
    }
  };

  function generatePageTitle(icon: ReactNode, name: string) {
    return (
      <div style={{ color: "#4096ff" }}>
        {icon} <span>{i18nMenu("pre")}{name}</span>
      </div>
    );
  }

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
        menu={{
          type: "group",
          collapsedShowTitle: true,
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
              name: i18nMenu('app'),
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
          ],
        }}
        location={{
          pathname,
        }}
        menuItemRender={(item, dom) => (
          <div
            onClick={() => {
              setPathname(item.path || "/chat");
              setPageName(generatePageTitle(item.icon, item.name));
            }}
          >
            <Link href={item.path !== undefined ? item.path : ""}>{dom}</Link>
          </div>
        )}
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
                      key: "account",
                      icon: <UserOutlined />,
                      label: i18nMenu("account_info"),
                    },
                    {
                      key: "log",
                      icon: <CalendarOutlined />,
                      label: i18nMenu("log"),
                    },
                    {
                      key: "api",
                      icon: <KeyOutlined />,
                      label: i18nMenu("api_key"),
                    },
                    {
                      key: "customize",
                      icon: <FontAwesomeIcon icon={faPalette} />,
                      label: i18nMenu("customize"),
                    },
                    {
                      key: "notice",
                      icon: <NotificationOutlined />,
                      label: i18nMenu("notice"),
                    },
                    {
                      type: "divider",
                    },
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
        <PageContainer title={pageName}>{children}</PageContainer>
      </ProLayout>
    </div>
  );
}
