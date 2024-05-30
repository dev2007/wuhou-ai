"use client";
import { useRouter } from "@/node_modules/next/navigation";
import { Flex } from "antd";
import { useEffect } from "react";
import HashLoader from "react-spinners/HashLoader";

export default function Home() {
  const { push } = useRouter();

  useEffect(()=>{
    push("/app/list");
  });

  return (
    <Flex vertical style={{ height: "100vh" }} justify="center" align="center">
      <HashLoader color="#0958d9" size="120px" />
    </Flex>
  );
}
