import { useTheme } from "next-themes"
import styles from "./styles.module.scss"
import { useState, useEffect } from "react"
import Sun from "../icons/Sun"
import Moon from "../icons/Moon"

export default function ThemeChanger() {
  const [darkTheme, setDarkTheme] = useState(false)
  const { setTheme } = useTheme()

  const handleChecked = (e) => {
    setDarkTheme(e.target.checked)
    e.target.checked ? setTheme("dark") : setTheme("light")
  }

  useEffect(() => {
    if (window.localStorage.getItem("theme") === "dark") setDarkTheme(true)
  }, [])

  return (
    <div className={styles.container}>
      <input
        type="checkbox"
        checked={darkTheme}
        onChange={handleChecked}
        className={styles.button}
      />
      <div className={styles.slider}></div>
      <div className={styles.switch}>{darkTheme ? <Sun /> : <Moon />}</div>
    </div>
  )
}
