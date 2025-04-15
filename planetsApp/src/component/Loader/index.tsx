import { MoonLoader } from "react-spinners";
import styles from "./loader.module.scss";

const Loader = () => {
  return (
    <div className={styles.contentLoader}>
      <MoonLoader color="#ffff" />
    </div>
  );
};

export default Loader;
 