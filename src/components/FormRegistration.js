import { useState, useRef, Fragment } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { doc, setDoc } from "firebase/firestore";
import db from "./Firebase";
import ContainerElement from "./Container";
import FormWrapperElement from "./FormWrapper";
import FormHeaderElement from "./FormHeader";
import FooterElement from "./Footer";

const FormRegistrationPage = ({ userId }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const firstNameRef = useRef(),
    lastNameRef = useRef(),
    emailRef = useRef(),
    phoneRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    setLoading(true);

    const formData = {
      id: userId,
      name: firstNameRef.current.value + " " + lastNameRef.current.value,
      email: emailRef.current.value,
      phone: phoneRef.current.value,
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
    <ContainerElement>
      <FormWrapperElement>
        <FormHeaderElement headingText="ลงทะเบียน" />
        <div className="text-center">
          <p className="text-success">ลงทะเบียนสำเร็จ!</p>
          <Button href="/" variant="primary" className="px-4">
            ตกลง
          </Button>
        </div>
      </FormWrapperElement>
    </ContainerElement>
  ) : (
    <ContainerElement>
      <FormWrapperElement>
        <FormHeaderElement headingText="ลงทะเบียน" />
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formFirstName">
            <Form.Label>ชื่อ</Form.Label>
            <Form.Control type="text" ref={firstNameRef} required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formLastName">
            <Form.Label>นามสกุล</Form.Label>
            <Form.Control type="text" ref={lastNameRef} required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>อีเมล</Form.Label>
            <Form.Control type="email" ref={emailRef} required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPhone">
            <Form.Label>เบอร์โทรศัพท์</Form.Label>
            <Form.Control
              type="tel"
              ref={phoneRef}
              minLength="10"
              maxLength="10"
              pattern="[0]{1}[0-9]{9}"
              inputMode="numeric"
              required
            />
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
    await setDoc(doc(db, "users", formData.id), {
      id: formData.id,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
    });

    return { status: 200 };
  } catch (e) {
    throw new Error(e);
  }
};

export default FormRegistrationPage;
