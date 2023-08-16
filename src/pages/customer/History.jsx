import { Row, Col } from "react-bootstrap";
import ABreadCrumbs from "../../components/ABreadCrumbs";
import AListGroup from "../../components/AListGroup";
import CheckoutHistory from "../../components/Profile/CheckoutHistory";

export default function History() {
  const options = [
    {
      href: "/",
      name: "Landing Page",
      active: false,
    },
    {
      href: "/history",
      name: "History",
      active: true,
    },
  ];

  const menus = [
    {
      link: "/profile",
      title: "Profile",
    },
    {
      link: "/address",
      title: "Address",
    },
    {
      link: "/history",
      title: "History",
    },
  ];
  return (
    <Row>
      <Col xs="12">
        <ABreadCrumbs options={options} />
      </Col>
      <Col md="3">
        <AListGroup menus={menus} />
      </Col>
      <Col md="9">
        <CheckoutHistory />
      </Col>
    </Row>
  );
}
