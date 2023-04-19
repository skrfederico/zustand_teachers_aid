import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

let settingsStore = (set) => ({
  dark: false,
  toggleDarkMode: () => set((state) => ({ dark: !state.dark }))
})

let groupsStore = (set) => ({
  groups: [],
  addGroup: (group) => set((state) => ({ groups: [...state.groups, group] })),
  deleteGroup: (groupIndex) =>
    set((state) => ({
      groups: state.groups.filter((_, index) => index !== groupIndex)
    })),
  editGroup: (groupIndex, newName) =>
    set((state) => {
      const updatedGroups = [...state.groups]
      updatedGroups[groupIndex] = newName
      return { groups: updatedGroups }
    })
})

settingsStore = devtools(settingsStore)
settingsStore = persist(settingsStore, { name: 'user_settings' })

groupsStore = devtools(groupsStore)

export const useSettingsStore = create(settingsStore)
export const useGroupsStore = create(groupsStore)
