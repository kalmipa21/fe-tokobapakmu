import { Spinner } from "react-bootstrap";

export default function loading() {
  return (
    <>
      <div className="loading__overlay show">
        <Spinner animation="grow" size="sm" />
        <Spinner animation="grow" size="sm" className="mx-1" />
        <Spinner animation="grow" size="sm" />
      </div>
    </>
  );
}
