import { useState } from "react"
import styles from "./styles.module.scss"

export default function Item({ data, listState }) {
  const [list, setList] = listState
  const [disabled, setDisabled] = useState(false)

  const removeItem = (id) => {
    setDisabled(true)
    removeItemInLocalStorage(id)
  }
  const removeItemInLocalStorage = (id) => {
    setTimeout(() => {
      const updatedList = list.filter((item) => item.id !== id)
      window.localStorage.setItem(
        "marketlist-tydrok",
        JSON.stringify(updatedList)
      )
      setList(updatedList)
      setDisabled(false)
    }, 1000)
  }
  return (
    <li className={styles.item}>
      <span>{data.name}</span>
      <button
        className={styles.delete}
        onClick={() => removeItem(data.id)}
        disabled={disabled}
      >
        delete
      </button>
    </li>
  )
}
