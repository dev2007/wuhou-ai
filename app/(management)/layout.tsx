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
import "./styles.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { push } = useRouter();

  const [pathname, setPathname] = useState("/chat");

  const [pageName, setPageName] = useState(
    generatePageTitle(
      <FontAwesomeIcon icon={faCommentDots} color="#4096ff" />,
      "聊天"
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
        {icon} <span>我的{name}</span>
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
        title="武侯 AI"
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
              name: "聊天",
              icon: <FontAwesomeIcon icon={faCommentDots} />,
              component: "./chat",
            },
            {
              path: "/app/list",
              name: "应用",
              icon: <FontAwesomeIcon icon={faRobot} />,
              component: "./app",
            },
            {
              path: "/plugin/list",
              name: "插件",
              icon: <FontAwesomeIcon icon={faPuzzlePiece} />,
              component: "./plugin",
            },
            {
              path: "/dataset/list",
              name: "知识库",
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
                      label: "个人信息",
                    },
                    {
                      key: "log",
                      icon: <CalendarOutlined />,
                      label: "使用记录",
                    },
                    {
                      key: "api",
                      icon: <KeyOutlined />,
                      label: "API 密钥",
                    },
                    {
                      key: "customize",
                      icon: <FontAwesomeIcon icon={faPalette} />,
                      label: "个性化",
                    },
                    {
                      key: "notice",
                      icon: <NotificationOutlined />,
                      label: "通知",
                    },
                    {
                      type: "divider",
                    },
                    {
                      key: "logout",
                      icon: <LogoutOutlined />,
                      label: "退出登录",
                    },
                    {
                      type: "divider",
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
                textAlign: 'center',
                color: 'rgba(0,0,0,0.6)',
              }}
            >
              ©{new Date().getFullYear()} Mortnon. (V1.0.0)
            </p>
          );
        }}
      >
        <PageContainer
          title={pageName}
        >
          {children}
        </PageContainer>
      </ProLayout>
    </div>
  );
}
