import styles from "./Footer.module.scss";

function Footer() {
  return (
    <div className={styles.footer}>
      <a>Om oss</a>
      <a>Kundtjänst</a>
      <a>Vanliga frågor</a>
    </div>
  );
}

export { Footer };
