import Head from "next/head"
import { useEffect, useState } from "react"
import Modal from "../components/Modal"
import styles from "./styles.module.scss"

const SIMULATED_DELAY = 1000

export default function Home() {
  const [list, setList] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [itemInput, setItemInput] = useState("")
  const [disableAdd, setDisableAdd] = useState(true)

  useEffect(() => {
    const data = window.localStorage.getItem("marketlist-tydrok")
    if (data) setList(JSON.parse(data))
  }, [])

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
    }, SIMULATED_DELAY)
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
  const removeItem = (e) => {
    setTimeout(() => {
      const updatedList = list.filter((item) => item.name !== e)
      window.localStorage.setItem(
        "marketlist-tydrok",
        JSON.stringify(updatedList)
      )
      setList(updatedList)
    }, SIMULATED_DELAY)
  }
  return (
    <div className={styles.background}>
      <Head>
        <title>Marketlist</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.view}>
        <h1 className={styles.title}>Supermarket list</h1>
        <h2 className={styles.counter}>{list.length} item(s)</h2>
        <ul className={styles.list}>
          {list.map((e) => {
            return (
              <li key={e.name} className={styles.item}>
                <span>{e.name}</span>
                <button
                  className={styles.delete}
                  onClick={() => removeItem(e.name)}
                >
                  delete
                </button>
              </li>
            )
          })}
        </ul>
        <button onClick={() => setShowModal(true)} className={styles.button}>
          Add item
        </button>
        {showModal && (
          <Modal>
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
              <button
                disabled={disableAdd}
                className={styles.button}
                type="submit"
              >
                Add
              </button>
            </form>
          </Modal>
        )}
      </main>
    </div>
  )
}
