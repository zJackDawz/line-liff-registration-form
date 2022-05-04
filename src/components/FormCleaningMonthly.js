import { useState, useRef, Fragment } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { collection, addDoc } from "firebase/firestore";
import db from "./Firebase";
import ContainerElement from "./Container";
import FormWrapperElement from "./FormWrapper";
import FormHeaderElement from "./FormHeader";
import FooterElement from "./Footer";
import FormSuccessPage from "./FormSuccess";

const contractValue = [
  { key: "1 เดือน" },
  { key: "3 เดือน" },
  { key: "6 เดือน" },
  { key: "1 ปี" },
  { key: "อื่นๆ" },
];

const packageValue = [
  { key: "4 ชั่วโมง" },
  { key: "6 ชั่วโมง" },
  { key: "8 ชั่วโมง" },
];

const timeValue = {
  package1: [
    { key: "08:00-12:00" },
    { key: "09:00-13:00" },
    { key: "10:00-14:00" },
    { key: "11:00-15:00" },
    { key: "12:00-16:00" },
    { key: "13:00-17:00" },
  ],
  package2: [
    { key: "08:00-15:00" },
    { key: "09:00-16:00" },
    { key: "10:00-17:00" },
    { key: "11:00-18:00" },
    { key: "12:00-19:00" },
    { key: "13:00-20:00" },
  ],
  package3: [
    { key: "08:00-17:00" },
    { key: "09:00-18:00" },
    { key: "10:00-19:00" },
  ],
};

const FormCleaningMonthlyPage = ({ userId }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formPackageValue, setFormPackageValue] = useState("4 ชั่วโมง");
  const [formAmountValue, setFormAmountValue] = useState(1);

  const contractRef = useRef(),
    packageRef = useRef(),
    amountRef = useRef(),
    dateRef = useRef(),
    timeRef = useRef(),
    addressRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    setLoading(true);

    const formData = {
      id: userId,
      contract: contractRef.current.value,
      package: packageRef.current.value,
      amount: amountRef.current.value,
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
    <FormSuccessPage headingText="พนักงานทำความสะอาดรายเดือน" />
  ) : (
    <ContainerElement>
      <FormWrapperElement>
        <FormHeaderElement headingText="พนักงานทำความสะอาดรายเดือน" />
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formContract">
            <Form.Label>ระยะสัญญา</Form.Label>
            <Form.Select ref={contractRef} required>
              {contractValue.map((value) => {
                return (
                  <option key={value.key} value={value.key}>
                    {value.key}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPackage">
            <Form.Label>ระยะเวลา</Form.Label>
            <Form.Select
              ref={packageRef}
              value={formPackageValue}
              onChange={(event) => {
                setFormPackageValue(event.target.value);
              }}
              required
            >
              {packageValue.map((value) => {
                return (
                  <option key={value.key} value={value.key}>
                    {value.key}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formAmount">
            <div className="d-flex">
              <div className="flex-grow-1">
                <Form.Label>จำนวนพนักงาน</Form.Label>
              </div>
              <span>{formAmountValue}</span>
            </div>
            <Form.Range
              ref={amountRef}
              min="1"
              max="9"
              step="1"
              value={formAmountValue}
              onChange={(event) => {
                setFormAmountValue(event.target.value);
              }}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDate">
            <Form.Label>วันที่เริ่มสัญญา</Form.Label>
            <Form.Control
              type="date"
              ref={dateRef}
              min={new Date().toLocaleDateString("sv")}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formTime">
            <Form.Label>เวลา</Form.Label>
            <Form.Select ref={timeRef} disabled={!formPackageValue} required>
              {formPackageValue === "4 ชั่วโมง"
                ? timeValue.package1.map((value) => {
                    return (
                      <option key={value.key} value={value.key}>
                        {value.key}
                      </option>
                    );
                  })
                : formPackageValue === "6 ชั่วโมง"
                ? timeValue.package2.map((value) => {
                    return (
                      <option key={value.key} value={value.key}>
                        {value.key}
                      </option>
                    );
                  })
                : formPackageValue === "8 ชั่วโมง"
                ? timeValue.package3.map((value) => {
                    return (
                      <option key={value.key} value={value.key}>
                        {value.key}
                      </option>
                    );
                  })
                : ""}
            </Form.Select>
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
    const docRef = await addDoc(collection(db, "cleaning-monthly"), {
      id: formData.id,
      contract: formData.contract,
      package: formData.package,
      amount: formData.amount,
      date: formData.date,
      time: formData.time,
      address: formData.address,
    });

    return { status: 200, recordId: docRef.id };
  } catch (e) {
    throw new Error(e);
  }
};

export default FormCleaningMonthlyPage;
