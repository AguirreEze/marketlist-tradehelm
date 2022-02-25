import styles from "./styles.module.scss"
import { useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid"

export default function ItemForm({ setShowModal, listState }) {
  const [list, setList] = listState
  const [itemInput, setItemInput] = useState("")
  const [disableAdd, setDisableAdd] = useState(true)

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setShowModal(false)
    })
    return document.removeEventListener("keydown", (e) => {
      if (e.key === "Escape") setShowModal(false)
    })
  }, [])

  useEffect(() => {
    !itemInput ? setDisableAdd(true) : setDisableAdd(false)
  }, [itemInput])

  const closeForm = (e) => {
    e.preventDefault()
    setShowModal(false)
  }
  const addItem = (e) => {
    e.preventDefault()
    setDisableAdd(true)
    saveItemInLocalStorage(itemInput)
  }
  const saveItemInLocalStorage = (item) => {
    setTimeout(() => {
      const id = uuidv4()
      const itemToAdd = {
        name: item,
        id,
      }
      window.localStorage.setItem(
        "marketlist-tydrok",
        JSON.stringify([...list, itemToAdd])
      )
      setList([...list, itemToAdd])
      setShowModal(false)
    }, 1000)
  }

  return (
    <form className={styles.form} onSubmit={addItem}>
      <label className={styles.label}>Add item</label>
      <input
        onChange={(e) => setItemInput(e.target.value)}
        type="text"
        aria-label="item"
        className={styles.field}
        value={itemInput}
        autoFocus
      ></input>
      <button onClick={closeForm} className={styles.button_close} type="button">
        Close
      </button>
      <button disabled={disableAdd} className={styles.button} type="submit">
        Add
      </button>
    </form>
  )
}
