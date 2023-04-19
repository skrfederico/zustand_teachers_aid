import React, { useRef } from 'react'

import { useGroupsStore } from '../store'

export default function Input() {
  const inputRef = useRef()
  const addGroup = useGroupsStore((state) => state.addGroup)

  const add = () => {
    addGroup(inputRef.current.value)
    inputRef.current.value = ''
  }
  return (
    <div>
      <input type="text" ref={inputRef} />
      <button onClick={add}>Add Group</button>
    </div>
  )
}
