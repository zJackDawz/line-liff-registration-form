import { useState, useRef, Fragment } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { collection, addDoc } from "firebase/firestore";
import db from "./Firebase";
import ContainerElement from "./Container";
import FormWrapperElement from "./FormWrapper";
import FormHeaderElement from "./FormHeader";
import FooterElement from "./Footer";
import FormSuccessPage from "./FormSuccess";

const FormBigCleaningPage = ({ userId }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const dateRef = useRef(),
    timeRef = useRef(),
    addressRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    setLoading(true);

    const formData = {
      id: userId,
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
    <FormSuccessPage headingText="Big Cleaning" />
  ) : (
    <ContainerElement>
      <FormWrapperElement>
        <FormHeaderElement headingText="Big Cleaning" />
        <Form onSubmit={submitHandler}>
          <p className="text-danger text-center">
            บริการนี้จำเป็นต้องมีการนัดหมายเข้าไปดูสถานที่จริงและประเมินราคา
          </p>
          <Form.Group className="mb-3" controlId="formDate">
            <Form.Label>วันที่นัดหมาย</Form.Label>
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
    const docRef = await addDoc(collection(db, "big-cleaning"), {
      id: formData.id,
      date: formData.date,
      time: formData.time,
      address: formData.address,
    });

    return { status: 200, recordId: docRef.id };
  } catch (e) {
    throw new Error(e);
  }
};

export default FormBigCleaningPage;
