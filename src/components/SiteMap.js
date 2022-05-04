import { Link } from "react-router-dom";
import styles from "./SiteMap.module.css";

const SiteMapElement = () => {
  return (
    <div className="text-center">
      <ul className={styles.SiteMapLists}>
        <Link to="/cleaning-hourly" className={styles.SiteMapLink}>
          <li>พนักงานทำความสะอาดรายชั่วโมง</li>
        </Link>
        <Link to="/cleaning-monthly" className={styles.SiteMapLink}>
          <li>พนักงานทำความสะอาดรายเดือน</li>
        </Link>
        <Link to="/spray" className={styles.SiteMapLink}>
          <li>ฉีดพ่นฆ่าเชื้อ</li>
        </Link>
        <Link to="/big-cleaning" className={styles.SiteMapLink}>
          <li>Big Cleaning</li>
        </Link>
        <Link to="/vent" className={styles.SiteMapLink}>
          <li>ทำความสะอาดเครื่องปรับอากาศ</li>
        </Link>
      </ul>
    </div>
  );
};

export default SiteMapElement;
