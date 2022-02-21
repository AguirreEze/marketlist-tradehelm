import "../styles/globals.css"
import { useState, useEffect } from "react"
import styles from "./layout.module.scss"

function MyApp({ Component, pageProps }) {
  const [darkTheme, setDarkTheme] = useState(false)

  const handleChecked = (e) => {
    setDarkTheme(e.target.checked)
  }

  useEffect(() => {
    if (window.localStorage.getItem("checklist-theme") === "dark")
      setDarkTheme(true)
  }, [])

  useEffect(() => {
    if (darkTheme) {
      document.documentElement.setAttribute("data-theme", "dark")
      window.localStorage.setItem("checklist-theme", "dark")
    } else {
      document.documentElement.removeAttribute("data-theme")
      window.localStorage.setItem("checklist-theme", "light")
    }
  }, [darkTheme])
  return (
    <>
      <input
        type="checkbox"
        checked={darkTheme}
        onChange={handleChecked}
        className={styles.button}
      />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
