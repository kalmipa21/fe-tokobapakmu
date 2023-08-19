import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function TableAddress({ list, handleDeleteAddress = () => {} }) {
  const navigate = useNavigate();

  function handleEditAddress(_id) {
    console.log("EDIT", _id);
    navigate(`/address/edit/${_id}`);
  }

  return (
    <Table responsive="sm">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th className="text-end">Action</th>
        </tr>
      </thead>
      <tbody>
        {list.length ? (
          list.map((address, index) => (
            <tr key={`item-address-${index}`}>
              <td className="w-25">{index + 1}</td>
              <td className="w-50 text-capitalize fw-bold">{address.name}</td>
              <td className="w-25 text-end">
                <Button
                  variant="success"
                  size="sm"
                  className="me-1 rounded-end-0"
                  onClick={() => handleEditAddress(address._id)}
                >
                  <i className="bi bi-pencil-fill"></i>
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  className=" rounded-start-0"
                  onClick={() => handleDeleteAddress(address._id)}
                >
                  <i className="bi bi-trash-fill"></i>
                </Button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={3} className="w-25 text-center">
              Empty
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
}
