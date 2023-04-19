import React, { useState } from 'react'
import { useGroupsStore } from '../store'

export default function GroupDetails({ groupIndex }) {
  const group = useGroupsStore((state) => state.getSingleGroup(groupIndex))
  const updateGroup = useGroupsStore((state) => state.updateGroup)

  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(group.name)
  const [category, setCategory] = useState(group.category)
  const [institution, setInstitution] = useState(group.institution)
  const [days, setDays] = useState(group.days)

  const handleSubmit = (event) => {
    event.preventDefault()
    const updatedGroup = { name, category, institution, days }
    updateGroup(groupIndex, updatedGroup)
    setEditing(false)
  }

  return (
    <div>
      <h2>{group.name}</h2>
      {editing ? (
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </label>
          <br />
          <label>
            Category:
            <input
              type="text"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            />
          </label>
          <br />
          <label>
            Institution:
            <input
              type="text"
              value={institution}
              onChange={(event) => setInstitution(event.target.value)}
            />
          </label>
          <br />
          <label>
            Days:
            <input
              type="text"
              value={days}
              onChange={(event) => setDays(event.target.value)}
            />
          </label>
          <br />
          <button type="submit">Save</button>
          <button onClick={() => setEditing(false)}>Cancel</button>
        </form>
      ) : (
        <div>
          <p>Category: {group.category}</p>
          <p>Institution: {group.institution}</p>
          <p>Days: {group.days}</p>
          <button onClick={() => setEditing(true)}>Edit</button>
        </div>
      )}
    </div>
  )
}
