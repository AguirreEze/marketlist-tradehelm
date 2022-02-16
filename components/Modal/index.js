import styles from "./styles.module.scss"

export default function Modal({ children }) {
  return <div className={styles.background}>{children}</div>
}
