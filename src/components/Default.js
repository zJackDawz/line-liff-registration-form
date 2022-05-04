import ContainerElement from "./Container";
import SiteMapElement from "./SiteMap";
import FooterElement from "./Footer";
import styles from "./Default.module.css";

const DefaultPage = ({ headingText }) => {
  return (
    <ContainerElement>
      <div className={styles.Wrapper}>
        <div>
          <h1 className={styles.Heading + " text-center"}>{headingText}</h1>
          <SiteMapElement />
        </div>
      </div>
      <FooterElement />
    </ContainerElement>
  );
};

export default DefaultPage;
