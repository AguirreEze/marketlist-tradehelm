import Head from "next/head"
import { useEffect, useState } from "react"
import ItemForm from "../components/ItemForm"
import Modal from "../components/Modal"
import styles from "./styles.module.scss"

export default function Home() {
  const [list, setList] = useState([])
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const data = window.localStorage.getItem("marketlist-tydrok")
    if (data) setList(JSON.parse(data))
  }, [])

  const removeItem = (e) => {
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
            <ItemForm setShowModal={setShowModal} listState={[list, setList]} />
          </Modal>
        )}
      </main>
    </div>
  )
}
