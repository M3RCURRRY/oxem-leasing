import { useEffect, useState } from "react"

export default function useActive() {
  const [active, setActive] = useState(document.activeElement);

  const focusHandler = (e) => {
    setActive(document.activeElement)
  }

  useEffect(() => {
    document.addEventListener("focusin", focusHandler)
    return () => {
      document.removeEventListener("focusin", focusHandler)
    }
  }, [])

  return active;
}