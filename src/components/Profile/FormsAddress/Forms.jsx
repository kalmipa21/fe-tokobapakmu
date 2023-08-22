import { Card, Col, Row, Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { axiosInstance } from "../../../configs/https";
import handleErrorMessage from "../../../utils/handleErrorMessage";
import ASelect from "../../ASelect";

const initialValues = {
  name: "",
  province: {
    _id: "",
    name: "",
  },
  regency: {
    _id: "",
    name: "",
  },
  district: {
    _id: "",
    name: "",
  },
  village: {
    _id: "",
    name: "",
  },
  passcode: "",
  address: "",
};

const validationSchema = Yup.object({
  name: Yup.string().required("Field Name is Required"),
  province: Yup.object().shape({
    _id: Yup.string().required("Field Province is Required"),
  }),
  regency: Yup.object().shape({
    _id: Yup.string().required("Field Regency is Required"),
  }),
  district: Yup.object().shape({
    _id: Yup.string().required("Field District is Required"),
  }),
  village: Yup.object().shape({
    _id: Yup.string().required("Field Village is Required"),
  }),
  passcode: Yup.number().required("Field Postcode is Required"),
  address: Yup.string().required("Field Address is Required"),
});

export default function FormsAddress({ isEdit = false, detail = {} }) {
  // FORMIK
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleOnSubmit,
  });

  // PROPS DETAIL
  useEffect(() => {
    if (isEdit && JSON.stringify(detail) !== "{}") {
      formik.setFieldValue("name", detail.name);
      formik.setFieldValue("address", detail.address);
      formik.setFieldValue("passcode", detail.passcode);
      setIsLoadProvince(true);
      getOptionsDistrict(detail.regency._id);
      getOptionsVillage(detail.district._id);

      handleChangeProvince(
        { target: { name: "province._id", value: detail.province._id } },
        "province.name"
      );
      handleChangeRegency(
        { target: { name: "regency._id", value: detail.regency._id } },
        "regency.name"
      );
      handleChangeDistrict(
        { target: { name: "district._id", value: detail.district._id } },
        "district.name"
      );
      handleChangeVillage(
        { target: { name: "village._id", value: detail.village._id } },
        "village.name"
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, detail]);

  const dispatch = useDispatch();

  const [isLoadProvince, setIsLoadProvince] = useState(true);
  const [dataProvince, setDataProvince] = useState([]);

  useEffect(() => {
    if (isLoadProvince) {
      // SET LOADING
      dispatch({ type: "SET_LOADING", value: true });

      axiosInstance
        .get("/api-wilayah/provinces.json")
        .then((response) => {
          setDataProvince(response.data);
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
          setIsLoadProvince(false);
        });
    }
  }, [isLoadProvince, dispatch]);

  function handleIsError(key, sub_key) {
    if (sub_key)
      return (
        formik.touched[key] &&
        formik.errors[key] &&
        formik.touched[key][sub_key] &&
        formik.errors[key][sub_key]
      );

    return formik.touched[key] && formik.errors[key];
  }

  function handleChangeProvince(event, key) {
    formik.setFieldValue(event.target.name, event.target.value);
    const findByID = dataProvince.find(
      (province) => province.id === event.target.value
    );
    formik.setFieldValue(key, findByID ? findByID.name : "");
    if (findByID) getOptionsRegency(findByID.id);
    formik.setFieldValue("regency", { _id: "", name: "" });
    formik.setFieldValue("district", { _id: "", name: "" });
    formik.setFieldValue("village", { _id: "", name: "" });
  }

  // REGENCY
  const [dataRegency, setDataRegency] = useState([]);
  function getOptionsRegency(id) {
    // SET LOADING
    dispatch({ type: "SET_LOADING", value: true });

    axiosInstance
      .get(`/api-wilayah/regencies/${id}.json`)
      .then((response) => {
        setDataRegency(response.data);
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
  }

  function handleChangeRegency(event, key) {
    formik.setFieldValue(event.target.name, event.target.value);
    const findByID = dataRegency.find(
      (regency) => regency.id === event.target.value
    );
    formik.setFieldValue(key, findByID ? findByID.name : "");
    if (findByID) getOptionsDistrict(findByID.id);
    formik.setFieldValue("district", { _id: "", name: "" });
    formik.setFieldValue("village", { _id: "", name: "" });
  }

  // DISTRICT
  const [dataDistrict, setDataDistrict] = useState([]);
  function getOptionsDistrict(id) {
    // SET LOADING
    dispatch({ type: "SET_LOADING", value: true });

    axiosInstance
      .get(`/api-wilayah/districts/${id}.json`)
      .then((response) => {
        setDataDistrict(response.data);
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
  }

  function handleChangeDistrict(event, key) {
    formik.setFieldValue(event.target.name, event.target.value);
    const findByID = dataDistrict.find(
      (district) => district.id === event.target.value
    );
    formik.setFieldValue(key, findByID ? findByID.name : "");
    if (findByID) getOptionsVillage(findByID.id);
    formik.setFieldValue("village", { _id: "", name: "" });
  }

  // VILLAGE
  const [dataVillage, setDataVillage] = useState([]);
  function getOptionsVillage(id) {
    // SET LOADING
    dispatch({ type: "SET_LOADING", value: true });

    axiosInstance
      .get(`/api-wilayah/villages/${id}.json`)
      .then((response) => {
        setDataVillage(response.data);
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
  }

  function handleChangeVillage(event, key) {
    formik.setFieldValue(event.target.name, event.target.value);
    const findByID = dataVillage.find(
      (village) => village.id === event.target.value
    );
    formik.setFieldValue(key, findByID ? findByID.name : "");
  }

  const navigate = useNavigate();

  function handleOnSubmit(values) {
    if (!isEdit) createAddress(values);
    else {
      editAddress(values);
    }
  }

  function createAddress(payload) {
    // SET LOADING
    dispatch({ type: "SET_LOADING", value: true });
    axiosInstance
      .post(`${process.env.REACT_APP_BASE_URL}/address/new`, payload)
      .then((response) => {
        navigate("/address");
        toast(response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
          type: toast.TYPE.SUCCESS,
        });
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
  }

  function editAddress(payload) {
    // SET LOADING
    dispatch({ type: "SET_LOADING", value: true });
    axiosInstance
      .put(
        `${process.env.REACT_APP_BASE_URL}/address/${detail._id}/update`,
        payload
      )
      .then((response) => {
        navigate("/address");
        toast(response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
          type: toast.TYPE.SUCCESS,
        });
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
  }

  function handleChance() {
    formik.resetForm();
    navigate("/address");
  }
  return (
    <Card>
      <Card.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Row>
            {/* NAME */}
            <Col md="6">
              <Form.Group className="mt-lg-0 mt-2 mb-2">
                <Form.Label htmlFor="name" className="mb-2">
                  Name
                </Form.Label>
                <Form.Control
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Nama Alamat"
                  value={formik.values.name}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  className={handleIsError("name") && "border-danger"}
                />
                {formik.touched.name && formik.errors.name && (
                  <small className="text-danger text__5">
                    {formik.errors.name}
                  </small>
                )}
              </Form.Group>
            </Col>

            {/* PROVINCE */}
            <Col md="6">
              <ASelect
                id="province"
                label="Province"
                name="province._id"
                value={formik.values.province._id}
                onBlur={formik.handleBlur}
                keyChange="province.name"
                handleChange={(event, keyChange) =>
                  handleChangeProvince(event, keyChange)
                }
                isError={handleIsError("province", "_id")}
                msgErorr={formik.errors.province && formik.errors.province._id}
                option={dataProvince}
              />
            </Col>

            {/* REGENCY/CITY */}
            <Col md="6">
              <ASelect
                id="regency"
                label="Regional/City"
                name="regency._id"
                value={formik.values.regency._id}
                onBlur={formik.handleBlur}
                keyChange="regency.name"
                handleChange={(event, keyChange) =>
                  handleChangeRegency(event, keyChange)
                }
                isError={handleIsError("regency", "_id")}
                msgErorr={formik.errors.regency && formik.errors.regency._id}
                option={dataRegency}
              />
            </Col>

            {/* DISTRICT */}
            <Col md="6">
              <ASelect
                id="district"
                label="District"
                name="district._id"
                value={formik.values.district._id}
                onBlur={formik.handleBlur}
                keyChange="district.name"
                handleChange={(event, keyChange) =>
                  handleChangeDistrict(event, keyChange)
                }
                isError={handleIsError("district", "_id")}
                msgErorr={formik.errors.district && formik.errors.district._id}
                option={dataDistrict}
              />
            </Col>

            {/* VILLAGE */}
            <Col md="6">
              <ASelect
                id="village"
                label="Village"
                name="village._id"
                value={formik.values.village._id}
                onBlur={formik.handleBlur}
                keyChange="village.name"
                handleChange={(event, keyChange) =>
                  handleChangeVillage(event, keyChange)
                }
                isError={handleIsError("village", "_id")}
                msgErorr={formik.errors.village && formik.errors.village._id}
                option={dataVillage}
              />
            </Col>

            {/* POSTCODE */}
            <Col md="6">
              <Form.Group className="mt-lg-0 mt-2 mb-2">
                <Form.Label htmlFor="passcode" className="mb-2">
                  Post Code
                </Form.Label>
                <Form.Control
                  id="passcode"
                  name="passcode"
                  type="number"
                  placeholder="Post Code"
                  value={formik.values.passcode}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  onInput={(e) => (e.target.value = e.target.value.slice(0, 5))}
                  className={handleIsError("passcode") && "border-danger"}
                />
                {formik.touched.passcode && formik.errors.passcode && (
                  <small className="text-danger text__5">
                    {formik.errors.name}
                  </small>
                )}
              </Form.Group>
            </Col>

            {/* ADDRESS */}
            <Col md="12">
              <Form.Group className="mt-lg-0 mt-2 mb-2">
                <Form.Label htmlFor="address" className="mb-2">
                  Address
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  id="address"
                  name="address"
                  type="text"
                  placeholder="Post Code"
                  value={formik.values.address}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  className={handleIsError("address") && "border-danger"}
                />
                {formik.touched.address && formik.errors.address && (
                  <small className="text-danger text__5">
                    {formik.errors.name}
                  </small>
                )}
              </Form.Group>
            </Col>
            <Col
              xs="12"
              className="d-flex justify-content-end align-items-center mt-2"
            >
              {isEdit && (
                <Button
                  type="button"
                  variant="light"
                  onClick={handleChance}
                  className="me-2"
                >
                  Cancel
                </Button>
              )}
              <Button type="submit" variant="success">
                {isEdit ? "Update" : "Create"}
              </Button>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
}
