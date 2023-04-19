import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

let settingsStore = persist(
  (set, get) => ({
    dark: false,
    toggleDarkMode: () => set((state) => ({ dark: !state.dark }))
  }),
  { name: 'user_settings' }
)

let groupsStore = persist(
  (set, get) => ({
    groups: [],
    createGroup: (group) =>
      set((state) => ({ groups: [...state.groups, group] })),
    deleteGroup: (groupIndex) =>
      set((state) => ({
        groups: state.groups.filter((_, index) => index !== groupIndex)
      })),
    updateGroup: (groupIndex, updatedGroup) =>
      set((state) => {
        const updatedGroups = [...state.groups]
        updatedGroups[groupIndex] = updatedGroup
        return { groups: updatedGroups }
      }),
    getSingleGroup: (groupIndex) => {
      const group = { name: '', category: '', institution: '', days: '' }
      if (groupIndex >= 0 && groupIndex < get().groups.length) {
        const selectedGroup = get().groups[groupIndex]
        group.name = selectedGroup.name
        group.category = selectedGroup.category || ''
        group.institution = selectedGroup.institution || ''
        group.days = selectedGroup.days || ''
      }
      return group
    }
  }),
  { name: 'groups_register' }
)

settingsStore = persist(settingsStore, { name: 'user_settings' })
settingsStore = devtools(settingsStore)

groupsStore = persist(devtools(groupsStore), { name: 'groups_register' })
groupsStore = devtools(groupsStore)

export const useSettingsStore = create(settingsStore)
export const useGroupsStore = create(groupsStore)
