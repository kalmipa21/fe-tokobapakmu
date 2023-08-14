import { ListGroup } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { axiosInstance } from "../configs/https";
import { toast } from "react-toastify";
import handleErrorMessage from "../utils/handleErrorMessage";

export default function AListGroup({ menus }) {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  function handleLogout() {
    const _id = user._id;

    dispatch({ type: "SET_LOADING", value: true });
    axiosInstance
      .post(`/users/${_id}/logout`)
      .then((response) => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        const message = response.data.message;
        toast(handleErrorMessage(message), {
          position: toast.POSITION.TOP_RIGHT,
          type: toast.TYPE.SUCCESS,
        });
        // TO PAGE LOGIN
        window.location.href = "/login";
      })
      .catch((error) => {
        const message = error.response?.data?.message;

        toast(handleErrorMessage(message), {
          position: toast.POSITION.TOP_RIGHT,
          type: toast.TYPE.ERROR,
        });
      })
      .finally(() => {
        dispatch({ type: "SET_LOADING", value: false });
      });
  }

  const location = useLocation();
  const navigate = useNavigate();

  function handleGoToLink(link) {
    navigate(`${link}`);
  }
  return (
    <ListGroup>
      {menus.map((menu, index) => (
        <ListGroup.Item
          key={`list-menu-${menu}-${index}`}
          active={menu.link === location.pathname}
          action
          onClick={() => handleGoToLink(menu.link)}
        >
          {menu.title}
        </ListGroup.Item>
      ))}
      <ListGroup.Item action onClick={() => handleLogout()}>
        Logout
      </ListGroup.Item>
    </ListGroup>
  );
}
