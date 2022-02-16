import styles from "./styles.module.scss"

export default function Button({ children, disabled }) {
  return (
    <button className={styles.button} disabled={disabled}>
      {children}
    </button>
  )
}
