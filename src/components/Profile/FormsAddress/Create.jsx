import { Row, Col } from "react-bootstrap";
import ABreadCrumbs from "../../ABreadCrumbs";
import AListGroup from "../../AListGroup";

import FormsAddress from "./Forms";

export default function CreateAddress() {
  const options = [
    {
      href: "/",
      name: "Landing Page",
      active: false,
    },
    {
      href: "/address",
      name: "Address",
      active: false,
    },
    {
      href: "/address/create",
      name: "Create",
      active: true,
    },
  ];

  const menus = [
    {
      link: "/profile",
      title: "Profile",
    },
    {
      link: "/address/create",
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
        <FormsAddress />
      </Col>
    </Row>
  );
}
