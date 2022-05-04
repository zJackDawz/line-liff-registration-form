import { Button } from "react-bootstrap";
import liff from "@line/liff";
import ContainerElement from "./Container";
import FormHeaderElement from "./FormHeader";
import FormWrapperElement from "./FormWrapper";
import FooterElement from "./Footer";

const FormSuccessPage = ({ headingText }) => {
  const closeWindow = () => {
    liff.isInClient() ? liff.closeWindow() : (window.location.href = "/");
  };

  return (
    <ContainerElement>
      <FormWrapperElement>
        <FormHeaderElement headingText={headingText} />
        <div className="text-center">
          <p className="text-success">
            สำเร็จ! เจ้าหน้าที่จะติดต่อกลับโดยเร็วที่สุด
          </p>
          <Button
            type="button"
            variant="primary"
            className="px-4"
            onClick={closeWindow}
          >
            ตกลง
          </Button>
        </div>
      </FormWrapperElement>
      <FooterElement />
    </ContainerElement>
  );
};

export default FormSuccessPage;
