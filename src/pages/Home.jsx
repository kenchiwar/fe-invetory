import { Helmet } from "react-helmet-async";
export default function HomePage () {
  return (
    <>
      <Helmet>
        <title>Trang Chủ - Home Page </title>
        <meta name="description" content="trang chủ Home page" />
      </Helmet>

      <div>
        <h1>Home Page</h1>
      </div>
    </>
  );
}