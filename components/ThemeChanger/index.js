import { useTheme } from "next-themes"
import styles from "./styles.module.scss"
import { useState, useEffect } from "react"

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
    <input
      type="checkbox"
      checked={darkTheme}
      onChange={handleChecked}
      className={styles.button}
    />
  )
}
