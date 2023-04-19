import React, { useState } from 'react'
import { useGroupsStore } from '../store'

export default function Groups() {
  // const groups = useGroupsStore((state) => state.groups)
  const { groups, deleteGroup, editGroup } = useGroupsStore()
  const [editingIndex, setEditingIndex] = useState(null)
  const [newGroupName, setNewGroupName] = useState('')

  const handleEdit = (index) => {
    setEditingIndex(index)
    setNewGroupName(groups[index])
  }

  const handleCancelEdit = () => {
    setEditingIndex(null)
    setNewGroupName('')
  }

  const handleSaveEdit = (index) => {
    if (newGroupName.trim() !== '') {
      editGroup(index, newGroupName.trim())
      setEditingIndex(null)
      setNewGroupName('')
    }
  }
  return (
    <div>
      {groups.map((group, index) => (
        <div key={group}>
          {editingIndex === index ? (
            <div>
              <input
                type="text"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
              />
              <button onClick={() => handleSaveEdit(index)}>Save</button>
              <button onClick={handleCancelEdit}>Cancel</button>
            </div>
          ) : (
            <div>
              <span>{group}</span>
              <button onClick={() => handleEdit(index)}>EDIT</button>
              <button onClick={() => deleteGroup(index)}>x</button>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
