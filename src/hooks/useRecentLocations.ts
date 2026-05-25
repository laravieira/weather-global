import { useSyncExternalStore } from 'react'

const RECENTS_KEY = 'recents'
const STORAGE_EVENT_NAME = 'storage'
const RECENTS_MAX_LOCATIONS = 5

export type RecentLocation = {
  id: number
  name: string
  latitude: number
  longitude: number
  createdAt: Date
}

function subscribe(callback: () => void) {
  window.addEventListener(STORAGE_EVENT_NAME, callback)
  return () => window.removeEventListener(STORAGE_EVENT_NAME, callback)
}

function getClientSnapshot() {
  return localStorage.getItem(RECENTS_KEY) ?? '[]'
}

function getServerSnapshot() {
  return '[]'
}

function useRecentLocations() {
  const raw = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot)
  const data = raw ? JSON.parse(raw) : []
  const recents: RecentLocation[] = (data as RecentLocation[])
    .map(raw => ({ ...raw, createdAt: new Date(raw.createdAt) }))
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())

  function addToRecents({ id, name, latitude, longitude }: Omit<RecentLocation, 'createdAt'>) {
    const existing = recents.find(recent => recent.id === id)
    if (existing) return
    const newRecents = [
      { id, name, latitude, longitude, createdAt: new Date() },
      ...recents.slice(0, RECENTS_MAX_LOCATIONS - 1),
    ]
    localStorage.setItem(RECENTS_KEY, JSON.stringify(newRecents))
    window.dispatchEvent(new Event(STORAGE_EVENT_NAME))
  }

  function removeFromRecents(id: number) {
    const newRecents = recents.filter(recent => recent.id !== id)
    localStorage.setItem(RECENTS_KEY, JSON.stringify(newRecents))
    window.dispatchEvent(new Event(STORAGE_EVENT_NAME))
  }

  return {
    recents,
    addToRecents,
    removeFromRecents,
  }
}

export default useRecentLocations
