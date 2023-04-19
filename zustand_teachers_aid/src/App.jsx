import React, { useEffect } from 'react'
import { useSettingsStore } from './store'

import Groups from './components/Groups'
import Input from './components/Input'

function App() {
  const toggleDarkMode = useSettingsStore((state) => state.toggleDarkMode)
  const dark = useSettingsStore((state) => state.dark)

  useEffect(() => {
    if (dark) {
      document.querySelector('body').classList.add('dark')
    } else {
      document.querySelector('body').classList.remove('dark')
    }
  }, [dark])

  return (
    <div className="App">
      <div>
        <button onClick={toggleDarkMode}>Toggle Dark Mode</button>
        <p>Groups</p>
        <Input />
        <Groups />
      </div>
    </div>
  )
}

export default App
