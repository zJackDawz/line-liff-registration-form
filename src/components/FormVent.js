import { useState, useRef, Fragment } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { collection, addDoc } from "firebase/firestore";
import db from "./Firebase";
import ContainerElement from "./Container";
import FormWrapperElement from "./FormWrapper";
import FormHeaderElement from "./FormHeader";
import FooterElement from "./Footer";
import FormSuccessPage from "./FormSuccess";

const packageValue = [
  { key: "เครื่องปรับอากาศผนัง" },
  { key: "เครื่องปรับอากาศแขวน/ตู้" },
  { key: "เครื่องปรับอากาศฝังฝ้า 4 ทิศทาง" },
];

const FormVentPage = ({ userId }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const packageRef = useRef(),
    dateRef = useRef(),
    timeRef = useRef(),
    addressRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    setLoading(true);

    const formData = {
      id: userId,
      package: packageRef.current.value,
      date: dateRef.current.value,
      time: timeRef.current.value,
      address: addressRef.current.value,
    };

    const processFormData = async () => {
      const result = await addData(formData);

      if (result.status === 200) {
        setSuccess(true);
      }

      setLoading(false);
    };

    processFormData();
  };

  return success ? (
    <FormSuccessPage headingText="ทำความสะอาดเครื่องปรับอากาศ" />
  ) : (
    <ContainerElement>
      <FormWrapperElement>
        <FormHeaderElement headingText="ทำความสะอาดเครื่องปรับอากาศ" />
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formPackage">
            <Form.Label>ประเภท</Form.Label>
            <Form.Select ref={packageRef} required>
              {packageValue.map((value) => {
                return (
                  <option key={value.key} value={value.key}>
                    {value.key}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDate">
            <Form.Label>วันที่</Form.Label>
            <Form.Control
              type="date"
              ref={dateRef}
              min={new Date().toLocaleDateString("sv")}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formTime">
            <Form.Label>เวลา</Form.Label>
            <Form.Control type="time" ref={timeRef} required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formAddress">
            <Form.Label>สถานที่</Form.Label>
            <Form.Control type="text" ref={addressRef} required />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button
              type="submit"
              variant="primary"
              className="px-4"
              disabled={loading}
            >
              {loading ? (
                <Fragment>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                  ยืนยัน
                </Fragment>
              ) : (
                "ยืนยัน"
              )}
            </Button>
          </div>
        </Form>
      </FormWrapperElement>
      <FooterElement />
    </ContainerElement>
  );
};

const addData = async (formData) => {
  try {
    const docRef = await addDoc(collection(db, "vent"), {
      id: formData.id,
      package: formData.package,
      date: formData.date,
      time: formData.time,
      address: formData.address,
    });

    return { status: 200, recordId: docRef.id };
  } catch (e) {
    throw new Error(e);
  }
};

export default FormVentPage;
