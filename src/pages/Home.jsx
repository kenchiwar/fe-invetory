import { Helmet } from "react-helmet-async"
import { Button, Typography, Card, Row, Col, Tag, Carousel, Rate, Badge, Space } from "antd"
import {
  ShoppingCartOutlined,
  PhoneOutlined,
  CheckCircleOutlined,
  PrinterOutlined,
  RocketOutlined,
  StarOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons"

const { Title, Paragraph, Text } = Typography
const { Meta } = Card

export default function HomePage() {
  // Sample products data
  const featuredProducts = [
    {
      id: 1,
      title: "Danh thiếp cao cấp",
      description: "In danh thiếp chất lượng cao với giấy mỹ thuật 300gsm",
      price: 120000,
      originalPrice: 150000,
      image: "/placeholder.svg?height=200&width=300",
      rating: 5,
    },
    {
      id: 2,
      title: "Tờ rơi quảng cáo A5",
      description: "In tờ rơi 2 mặt, giấy couche 150gsm, thiết kế chuyên nghiệp",
      price: 800000,
      originalPrice: 950000,
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.5,
    },
    {
      id: 3,
      title: "Catalogue sản phẩm",
      description: "In catalogue 20 trang, khổ A4, giấy couche 200gsm",
      price: 2500000,
      originalPrice: 2800000,
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.8,
    },
    {
      id: 4,
      title: "Hộp đựng sản phẩm",
      description: "In hộp đựng sản phẩm cao cấp, giấy Ivory 300gsm",
      price: 1500000,
      originalPrice: 1800000,
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.7,
    },
  ]

  // Sample categories
  const categories = [
    {
      title: "Danh thiếp",
      icon: <PrinterOutlined />,
      image: "/placeholder.svg?height=100&width=100",
      color: "#1677ff",
    },
    {
      title: "Tờ rơi & Brochure",
      icon: <PrinterOutlined />,
      image: "/placeholder.svg?height=100&width=100",
      color: "#52c41a",
    },
    {
      title: "Catalogue",
      icon: <PrinterOutlined />,
      image: "/placeholder.svg?height=100&width=100",
      color: "#fa8c16",
    },
    {
      title: "Hộp & Bao bì",
      icon: <PrinterOutlined />,
      image: "/placeholder.svg?height=100&width=100",
      color: "#eb2f96",
    },
    {
      title: "Tem nhãn",
      icon: <PrinterOutlined />,
      image: "/placeholder.svg?height=100&width=100",
      color: "#722ed1",
    },
    {
      title: "Lịch & Thiệp",
      icon: <PrinterOutlined />,
      image: "/placeholder.svg?height=100&width=100",
      color: "#faad14",
    },
  ]

  // Sample testimonials
  const testimonials = [
    {
      content:
        "Dịch vụ in ấn chuyên nghiệp, chất lượng sản phẩm tuyệt vời. Tôi rất hài lòng với danh thiếp được in tại đây.",
      author: "Nguyễn Văn A",
      company: "Công ty ABC",
      rating: 5,
    },
    {
      content:
        "Đặt in catalogue cho công ty và nhận được sản phẩm đúng hẹn, chất lượng vượt mong đợi. Sẽ tiếp tục sử dụng dịch vụ.",
      author: "Trần Thị B",
      company: "Doanh nghiệp XYZ",
      rating: 5,
    },
    {
      content: "Giá cả hợp lý, chất lượng tốt, giao hàng đúng hẹn. Đã sử dụng dịch vụ nhiều lần và luôn hài lòng.",
      author: "Lê Văn C",
      company: "Cửa hàng DEF",
      rating: 4,
    },
  ]

  // Format price to VND
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price)
  }

  return (
    <>
      <Helmet>
        <title>In Ấn Chuyên Nghiệp - Dịch vụ in ấn chất lượng cao</title>
        <meta
          name="description"
          content="Dịch vụ in ấn chuyên nghiệp, chất lượng cao với giá cả cạnh tranh. Danh thiếp, tờ rơi, catalogue, hộp đựng sản phẩm và nhiều hơn nữa."
        />
      </Helmet>

      {/* Hero Banner */}
      <Carousel autoplay className="tw:mb-8">
        <div>
          <div className="tw:relative tw:h-[400px] tw:overflow-hidden tw:rounded-lg">
            <div
              className="tw:absolute tw:inset-0 tw:bg-cover tw:bg-center"
              style={{
                backgroundImage: `url('/placeholder.svg?height=400&width=1200')`,
                filter: "brightness(0.7)",
              }}
            ></div>
            <div className="tw:absolute tw:inset-0 tw:flex tw:flex-col tw:justify-center tw:items-center tw:text-white tw:p-8 tw:text-center">
              <Title level={1} style={{ color: "white", marginBottom: "1rem" }}>
                Dịch Vụ In Ấn Chuyên Nghiệp
              </Title>
              <Paragraph style={{ color: "white", fontSize: "1.2rem", maxWidth: "800px" }}>
                Chúng tôi cung cấp dịch vụ in ấn chất lượng cao với giá cả cạnh tranh. Từ danh thiếp đến catalogue,
                chúng tôi đáp ứng mọi nhu cầu in ấn của bạn.
              </Paragraph>
              <div className="tw:mt-6">
                <Button type="primary" size="large" icon={<ShoppingCartOutlined />} className="tw:mr-4">
                  Đặt hàng ngay
                </Button>
                <Button size="large" icon={<PhoneOutlined />} ghost>
                  Liên hệ tư vấn
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="tw:relative tw:h-[400px] tw:overflow-hidden tw:rounded-lg">
            <div
              className="tw:absolute tw:inset-0 tw:bg-cover tw:bg-center"
              style={{
                backgroundImage: `url('/placeholder.svg?height=400&width=1200')`,
                filter: "brightness(0.7)",
              }}
            ></div>
            <div className="tw:absolute tw:inset-0 tw:flex tw:flex-col tw:justify-center tw:items-center tw:text-white tw:p-8 tw:text-center">
              <Title level={1} style={{ color: "white", marginBottom: "1rem" }}>
                Khuyến Mãi Đặc Biệt
              </Title>
              <Paragraph style={{ color: "white", fontSize: "1.2rem", maxWidth: "800px" }}>
                Giảm 20% cho tất cả đơn hàng in danh thiếp và tờ rơi trong tháng này. Đừng bỏ lỡ cơ hội!
              </Paragraph>
              <div className="tw:mt-6">
                <Button type="primary" size="large" danger>
                  Xem ưu đãi
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Carousel>

      {/* Categories */}
      <div className="tw:mb-12">
        <Title level={2} className="tw:text-center tw:mb-8">
          Dịch Vụ In Ấn Của Chúng Tôi
        </Title>
        <Row gutter={[24, 24]} justify="center">
          {categories.map((category, index) => (
            <Col xs={12} sm={8} md={4} key={index}>
              <Card
                hoverable
                className="tw:text-center tw:h-full"
                cover={
                  <div
                    className="tw:h-24 tw:flex tw:items-center tw:justify-center"
                    style={{ background: `${category.color}20` }}
                  >
                    <PrinterOutlined style={{ fontSize: "2.5rem", color: category.color }} />
                  </div>
                }
              >
                <Meta title={category.title} />
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Promotion Banner */}
      <div className="tw:bg-blue-50 tw:p-6 tw:rounded-lg tw:mb-12 tw:text-center">
        <Row align="middle" justify="center" gutter={[24, 24]}>
          <Col xs={24} md={16}>
            <Title level={3} style={{ margin: 0 }}>
              Giảm 20% Cho Đơn Hàng Đầu Tiên
            </Title>
            <Paragraph className="tw:text-lg tw:mb-0">
              Sử dụng mã <Text strong>WELCOME20</Text> khi thanh toán
            </Paragraph>
          </Col>
          <Col xs={24} md={8} className="tw:text-center md:tw:text-right">
            <Button type="primary" size="large">
              Đặt hàng ngay
            </Button>
          </Col>
        </Row>
      </div>

      {/* Featured Products */}
      <div className="tw:mb-12">
        <Title level={2} className="tw:text-center tw:mb-8">
          Sản Phẩm Nổi Bật
        </Title>
        <Row gutter={[24, 24]}>
          {featuredProducts.map((product) => (
            <Col xs={24} sm={12} lg={6} key={product.id}>
              <Badge.Ribbon text="Giảm giá" color="red">
                <Card
                  hoverable
                  className="tw:h-full"
                  cover={
                    <img
                      alt={product.title}
                      src={product.image || "/placeholder.svg"}
                      style={{ height: 200, objectFit: "cover" }}
                    />
                  }
                  actions={[
                    <Rate disabled defaultValue={product.rating} />,
                    <Button type="primary" icon={<ShoppingCartOutlined />}>
                      Đặt hàng
                    </Button>,
                  ]}
                >
                  <Meta
                    title={product.title}
                    description={
                      <>
                        <Paragraph ellipsis={{ rows: 2 }} key={product.id}>
                          {product.description}
                        </Paragraph>
                        <div className="tw:mt-2">
                          <Text delete type="secondary" className="tw:mr-2">
                            {formatPrice(product.originalPrice)}
                          </Text>
                          <Text strong style={{ color: "#f5222d", fontSize: "1.1rem" }}>
                            {formatPrice(product.price)}
                          </Text>
                        </div>
                      </>
                    }
                  />
                </Card>
              </Badge.Ribbon>
            </Col>
          ))}
        </Row>
      </div>

      {/* Why Choose Us */}
      <div className="tw:bg-gray-50 tw:p-8 tw:rounded-lg tw:mb-12">
        <Title level={2} className="tw:text-center tw:mb-8">
          Tại Sao Chọn Chúng Tôi?
        </Title>
        <Row gutter={[32, 32]}>
          <Col xs={24} sm={12} lg={6}>
            <Card className="tw:h-full tw:text-center">
              <CheckCircleOutlined style={{ fontSize: "3rem", color: "#52c41a", marginBottom: "1rem" }} />
              <Title level={4}>Chất Lượng Cao</Title>
              <Paragraph>
                Sử dụng công nghệ in hiện đại và vật liệu chất lượng cao để đảm bảo sản phẩm hoàn hảo.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card className="tw:h-full tw:text-center">
              <RocketOutlined style={{ fontSize: "3rem", color: "#1677ff", marginBottom: "1rem" }} />
              <Title level={4}>Giao Hàng Nhanh</Title>
              <Paragraph>Cam kết giao hàng đúng hẹn, thậm chí có dịch vụ giao hàng nhanh trong ngày.</Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card className="tw:h-full tw:text-center">
              <StarOutlined style={{ fontSize: "3rem", color: "#faad14", marginBottom: "1rem" }} />
              <Title level={4}>Dịch Vụ Chuyên Nghiệp</Title>
              <Paragraph>Đội ngũ tư vấn và thiết kế chuyên nghiệp, hỗ trợ khách hàng 24/7.</Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card className="tw:h-full tw:text-center">
              <EnvironmentOutlined style={{ fontSize: "3rem", color: "#eb2f96", marginBottom: "1rem" }} />
              <Title level={4}>Nhiều Chi Nhánh</Title>
              <Paragraph>
                Có mặt tại nhiều tỉnh thành trên cả nước, thuận tiện cho việc đặt hàng và nhận hàng.
              </Paragraph>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Process */}
      <div className="tw:mb-12">
        <Title level={2} className="tw:text-center tw:mb-8">
          Quy Trình Đặt Hàng
        </Title>
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={12} md={6}>
            <Card className="tw:h-full tw:text-center">
              <div className="tw:inline-flex tw:items-center tw:justify-center tw:w-12 tw:h-12 tw:rounded-full tw:bg-blue-100 tw:text-blue-500 tw:text-xl tw:font-bold tw:mb-4">
                1
              </div>
              <Title level={4}>Tư Vấn & Báo Giá</Title>
              <Paragraph>Liên hệ với chúng tôi để được tư vấn và nhận báo giá chi tiết cho sản phẩm của bạn.</Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card className="tw:h-full tw:text-center">
              <div className="tw:inline-flex tw:items-center tw:justify-center tw:w-12 tw:h-12 tw:rounded-full tw:bg-green-100 tw:text-green-500 tw:text-xl tw:font-bold tw:mb-4">
                2
              </div>
              <Title level={4}>Thiết Kế & Duyệt Mẫu</Title>
              <Paragraph>Đội ngũ thiết kế sẽ tạo mẫu và gửi cho bạn duyệt trước khi tiến hành in ấn.</Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card className="tw:h-full tw:text-center">
              <div className="tw:inline-flex tw:items-center tw:justify-center tw:w-12 tw:h-12 tw:rounded-full tw:bg-orange-100 tw:text-orange-500 tw:text-xl tw:font-bold tw:mb-4">
                3
              </div>
              <Title level={4}>In Ấn & Gia Công</Title>
              <Paragraph>Tiến hành in ấn và gia công sản phẩm theo yêu cầu với chất lượng cao nhất.</Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card className="tw:h-full tw:text-center">
              <div className="tw:inline-flex tw:items-center tw:justify-center tw:w-12 tw:h-12 tw:rounded-full tw:bg-purple-100 tw:text-purple-500 tw:text-xl tw:font-bold tw:mb-4">
                4
              </div>
              <Title level={4}>Giao Hàng & Thanh Toán</Title>
              <Paragraph>Giao hàng tận nơi và thanh toán linh hoạt theo nhiều hình thức khác nhau.</Paragraph>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Testimonials */}
      <div className="tw:bg-gray-50 tw:p-8 tw:rounded-lg tw:mb-12">
        <Title level={2} className="tw:text-center tw:mb-8">
          Khách Hàng Nói Gì Về Chúng Tôi
        </Title>
        <Row gutter={[32, 32]}>
          {testimonials.map((testimonial, index) => (
            <Col xs={24} md={8} key={index}>
              <Card className="tw:h-full">
                <Rate disabled defaultValue={testimonial.rating} className="tw:mb-4" />
                <Paragraph className="tw:text-lg tw:italic">"{testimonial.content}"</Paragraph>
                <div className="tw:mt-4">
                  <Text strong>{testimonial.author}</Text>
                  <br />
                  <Text type="secondary">{testimonial.company}</Text>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* CTA Section */}
      <div className="tw:relative tw:p-12 tw:rounded-lg tw:mb-8 tw:overflow-hidden">
        <div
          className="tw:absolute tw:inset-0 tw:bg-cover tw:bg-center"
          style={{
            backgroundImage: `url('/placeholder.svg?height=300&width=1200')`,
            filter: "brightness(0.4)",
          }}
        ></div>
        <div className="tw:relative tw:text-center tw:text-white">
          <Title level={2} style={{ color: "white" }}>
            Bắt Đầu Dự Án In Ấn Của Bạn Ngay Hôm Nay
          </Title>
          <Paragraph className="tw:text-lg tw:mb-6 tw:max-w-2xl tw:mx-auto">
            Liên hệ với chúng tôi để được tư vấn miễn phí và nhận báo giá chi tiết cho dự án của bạn. Chúng tôi cam kết
            mang đến sản phẩm chất lượng với giá cả cạnh tranh nhất.
          </Paragraph>
          <Space size="large">
            <Button type="primary" size="large" icon={<PhoneOutlined />}>
              Gọi Ngay: 0123.456.789
            </Button>
            <Button ghost size="large" icon={<ShoppingCartOutlined />}>
              Đặt Hàng Trực Tuyến
            </Button>
          </Space>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="tw:text-center tw:mb-8">
        <Row gutter={[16, 16]} justify="center" align="middle">
          <Col>
            <Tag color="blue" icon={<CheckCircleOutlined />}>
              Thanh toán an toàn
            </Tag>
          </Col>
          <Col>
            <Tag color="green" icon={<CheckCircleOutlined />}>
              Bảo hành sản phẩm
            </Tag>
          </Col>
          <Col>
            <Tag color="orange" icon={<ClockCircleOutlined />}>
              Hỗ trợ 24/7
            </Tag>
          </Col>
          <Col>
            <Tag color="purple" icon={<CheckCircleOutlined />}>
              Miễn phí vận chuyển
            </Tag>
          </Col>
        </Row>
      </div>
    </>
  )
}

