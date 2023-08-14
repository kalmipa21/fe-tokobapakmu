import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import CustProfileNavBar from "../components/Profile/CustProfileNavBar";

export default function LayoutProfileCust() {
  return (
    <>
      <CustProfileNavBar />
      <Container className="py-5">
        <Outlet />
      </Container>
    </>
  );
}
