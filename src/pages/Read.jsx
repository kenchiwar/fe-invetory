import { Helmet } from "react-helmet-async";
export default function HomePage () {
  return (
    <>
      <Helmet>
        <title>Trang Chủ - Read Page </title>
        <meta name="description" content="trang chủ Read page" />
      </Helmet>
      <div>
        <h1>Read Page</h1>
      </div>
    </>
  );
}