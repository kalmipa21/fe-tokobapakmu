import { Card, Row, Col, Image, Form, Button } from "react-bootstrap";
import DefaultPhoto from "../../assets/images/profile.png?url";

export default function CardProfile() {
  return (
    <Form>
      <Card className="p-4 mt-md-0 mt-2">
        <Card.Body className="mt-md-3">
          <Row>
            {/* IMG PROFILE */}
            <Col md="3" className="mb-md-0 mb-3">
              <Image src={DefaultPhoto} thumbnail className="w-full mx-auto" />
            </Col>
            {/* IMNPUT FORM LEFT*/}
            <Col md="5">
              <Form.Group className="mb-2">
                <Form.Label htmlFor="full_name" className="mb-2">
                  Full Name
                </Form.Label>
                <Form.Control
                  id="full_name"
                  name="full_name"
                  type="text"
                  placeholder="Full Name"
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label htmlFor="email" className="mb-2">
                  Email
                </Form.Label>
                <Form.Control
                  id="email"
                  name="email"
                  type="text"
                  placeholder="example@user.id"
                />
              </Form.Group>
            </Col>
            {/* IMNPUT FORM RIGHT*/}

            <Col md="4">
              <Form.Group className="mb-2">
                <Form.Label htmlFor="image" className="mb-2">
                  Picture
                </Form.Label>
                <Form.Control
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                />
              </Form.Group>
              <Form.Group className=" mb-2">
                <Form.Label htmlFor="password" className="mb-2">
                  Password
                </Form.Label>
                <Form.Control
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col className=" d-flex justify-content-end mt-2">
              <Button type="button" variant="light" className=" me-2">
                Cancel
              </Button>
              <Button type="submit" variant="success">
                Update
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Form>
  );
}
