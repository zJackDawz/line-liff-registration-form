import styles from "./FormHeader.module.css";
import logo from "../logo.png";

const FormHeaderElement = ({ headingText }) => {
  return (
    <div className="text-center pb-4">
      <div className="pb-3">
        <img
          src={logo}
          alt="Logo"
          className="img-fluid"
          style={{ maxHeight: "60px" }}
        />
      </div>
      <h3 className={styles.Heading}>{headingText}</h3>
    </div>
  );
};

export default FormHeaderElement;
