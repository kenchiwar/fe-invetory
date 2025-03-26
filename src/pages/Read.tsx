import { Helmet } from "react-helmet-async";
import { Space, Typography } from "antd";
import { useAppSelector } from "@redux/store";
import CounterButtons from "@components/Layout/TestRedux/CounterButtons";
import Chan from "@components/Metmoi/Chan";
export default function HomePage () {
  const value = useAppSelector((state) => state.test.value);

  return (
    <>
      <Helmet>
        <title>Trang Chủ - Read Page </title>
        <meta name="description" content="trang chủ Read page" />
      </Helmet>
      <div style={{width : '300px'}}>
      <Space direction="vertical" align="center">
      <Typography.Title level={3}>Counter Value: {value}</Typography.Title>
         
          <CounterButtons />
        </Space>
        <h1>Read Page</h1>
      </div>
    </>
  );
}