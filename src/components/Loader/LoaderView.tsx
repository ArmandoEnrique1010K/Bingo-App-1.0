import styles from "./loader.module.css";

export default function LoaderView() {
  return (
    <div className={styles.container}>
      <div className={styles.progress}></div>;
    </div>
  );
}

// https://10015.io/tools/css-loader-generator
