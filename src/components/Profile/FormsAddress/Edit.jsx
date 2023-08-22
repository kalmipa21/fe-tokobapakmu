import { Row, Col } from "react-bootstrap";
import ABreadCrumbs from "../../ABreadCrumbs";
import AListGroup from "../../AListGroup";
import handleErrorMessage from "../../../utils/handleErrorMessage";
import { axiosInstance } from "../../../configs/https";

import FormsAddress from "./Forms";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

export default function EditAddress() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [detail, setDetail] = useState({});

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
      href: "/address/edit",
      name: "Edit",
      active: true,
    },
  ];

  const menus = [
    {
      link: "/profile",
      title: "Profile",
    },
    {
      link: `/address/edit/${id}`,
      title: "Address",
    },
    {
      link: "/history",
      title: "History",
    },
  ];

  useEffect(() => {
    // SET LOADING
    dispatch({ type: "SET_LOADING", value: true });

    axiosInstance
      .get(`/${process.env.REACT_APP_BASE_URL}/address/${id}/detail`)
      .then((response) => {
        setDetail(response.data.data);
      })
      .catch((error) => {
        const message = error.response?.data?.message;
        toast(handleErrorMessage(message), {
          position: toast.POSITION.TOP_RIGHT,
          type: toast.TYPE.ERROR,
        });
      })
      .finally(() => {
        // SET LOADING
        dispatch({ type: "SET_LOADING", value: false });
      });
  }, [id, dispatch]);

  return (
    <Row>
      <Col xs="12">
        <ABreadCrumbs options={options} />
      </Col>
      <Col md="3">
        <AListGroup menus={menus} />
      </Col>
      <Col md="9">
        EDIT
        <FormsAddress isEdit={true} detail={detail} />
      </Col>
    </Row>
  );
}
