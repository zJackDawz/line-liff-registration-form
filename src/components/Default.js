import ContainerElement from "./Container";
import SiteMapElement from "./SiteMap";
import FooterElement from "./Footer";
import styles from "./Default.module.css";
import logo from "../logo.png";

const DefaultPage = () => {
  return (
    <ContainerElement>
      <div className={styles.Wrapper}>
        <div className="text-center">
          <img
            src={logo}
            alt="Logo"
            className="img-fluid mb-4"
            style={{ maxHeight: "60px" }}
          />
          <SiteMapElement />
        </div>
      </div>
      <FooterElement />
    </ContainerElement>
  );
};

export default DefaultPage;
