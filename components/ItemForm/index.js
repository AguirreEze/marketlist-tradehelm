import styles from "./styles.module.scss"
import { useEffect, useState } from "react"

export default function ItemForm({ setShowModal, listState }) {
  const [list, setList] = listState
  const [itemInput, setItemInput] = useState("")
  const [disableAdd, setDisableAdd] = useState(true)

  useEffect(() => {
    !itemInput ? setDisableAdd(true) : setDisableAdd(false)
  }, [itemInput])

  const closeForm = (e) => {
    e.preventDefault()
    setShowModal(false)
    setDisableAdd(true)
  }
  const addItem = (e) => {
    e.preventDefault()
    setDisableAdd(true)
    setTimeout(() => {
      saveItemInLocalStorage(itemInput)
    }, 1000)
  }
  const saveItemInLocalStorage = (item) => {
    const itemToAdd = {
      name: item,
    }
    window.localStorage.setItem(
      "marketlist-tydrok",
      JSON.stringify([...list, itemToAdd])
    )
    setList([...list, itemToAdd])
    setShowModal(false)
  }

  return (
    <form className={styles.form} onSubmit={addItem}>
      <label className={styles.label}>Add item</label>
      <input
        onChange={(e) => setItemInput(e.target.value)}
        type="text"
        className={styles.field}
      ></input>
      <button onClick={closeForm} className={styles.button_close}>
        Close
      </button>
      <button disabled={disableAdd} className={styles.button} type="submit">
        Add
      </button>
    </form>
  )
}
