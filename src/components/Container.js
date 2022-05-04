import { Container } from "react-bootstrap";
import styles from "./Container.module.css";

const ContainerElement = ({ children }) => {
  return <Container className={styles.FormContainer}>{children}</Container>;
};

export default ContainerElement;
