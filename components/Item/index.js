import { useState } from "react"
import styles from "./styles.module.scss"

export default function Item({ data, listState }) {
  const [list, setList] = listState
  const [disabled, setDisabled] = useState(false)

  const removeItem = (e) => {
    setDisabled(true)
    setTimeout(() => {
      const updatedList = list.filter((item) => item.name !== e)
      window.localStorage.setItem(
        "marketlist-tydrok",
        JSON.stringify(updatedList)
      )
      setList(updatedList)
    }, 1000)
  }
  return (
    <li className={styles.item}>
      <span>{data.name}</span>
      <button
        className={styles.delete}
        onClick={() => removeItem(data.name)}
        disabled={disabled}
      >
        delete
      </button>
    </li>
  )
}
