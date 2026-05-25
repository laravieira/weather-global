import { describe, it, expect, beforeEach, jest } from '@jest/globals'
import type { RecentLocation } from './useRecentLocations'

const mockUseSyncExternalStore = jest.fn<
  (subscribe: (onStoreChange: () => void) => void, getSnapshot: () => string) => string
>()

jest.mock('react', () => {
  const actual = jest.requireActual('react') as Record<string, unknown>
  return {
    ...actual,
    useSyncExternalStore: (subscribe: () => void, getSnapshot: () => string) =>
      mockUseSyncExternalStore(subscribe, getSnapshot),
  }
})

import useRecentLocations from './useRecentLocations'

type Store = Record<string, string>

const store: Store = {}
const localStorageMock = {
  getItem: jest.fn((key: string) => (key in store ? store[key] : null)),
  setItem: jest.fn((key: string, value: string) => {
    store[key] = value
  }),
  removeItem: jest.fn((key: string) => {
    delete store[key]
  }),
  clear: jest.fn(() => {
    Object.keys(store).forEach(key => delete store[key])
  }),
}

const windowMock = {
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
}

class MockEvent {
  type: string

  constructor(type: string) {
    this.type = type
  }
}

function seedRecents(recents: RecentLocation[]) {
  store.recents = JSON.stringify(
    recents.map(recent => ({
      ...recent,
      createdAt: recent.createdAt.toISOString(),
    })),
  )
}

beforeEach(() => {
  localStorageMock.clear()
  jest.clearAllMocks()

  mockUseSyncExternalStore.mockImplementation(
    (_subscribe: (onStoreChange: () => void) => void, getSnapshot: () => string) => {
      return getSnapshot()
    },
  )

  globalThis.localStorage = localStorageMock as unknown as Storage
  globalThis.window = windowMock as unknown as Window & typeof globalThis
  globalThis.Event = MockEvent as unknown as typeof Event
})

describe('useRecentLocations', () => {
  it('returns recents sorted by createdAt and converted to Date', () => {
    seedRecents([
      {
        id: 1,
        name: 'Older',
        latitude: 10,
        longitude: 20,
        createdAt: new Date('2024-01-01T00:00:00.000Z'),
      },
      {
        id: 2,
        name: 'Newer',
        latitude: 11,
        longitude: 21,
        createdAt: new Date('2024-02-01T00:00:00.000Z'),
      },
    ])

    const { recents } = useRecentLocations()

    expect(recents).toHaveLength(2)
    expect(recents[0].id).toBe(2)
    expect(recents[0].createdAt).toBeInstanceOf(Date)
  })

  it('adds a new location and caps the list to five', () => {
    seedRecents([
      { id: 1, name: 'A', latitude: 1, longitude: 1, createdAt: new Date('2024-01-01T00:00:00.000Z') },
      { id: 2, name: 'B', latitude: 2, longitude: 2, createdAt: new Date('2024-01-02T00:00:00.000Z') },
      { id: 3, name: 'C', latitude: 3, longitude: 3, createdAt: new Date('2024-01-03T00:00:00.000Z') },
      { id: 4, name: 'D', latitude: 4, longitude: 4, createdAt: new Date('2024-01-04T00:00:00.000Z') },
      { id: 5, name: 'E', latitude: 5, longitude: 5, createdAt: new Date('2024-01-05T00:00:00.000Z') },
    ])

    const { addToRecents } = useRecentLocations()

    addToRecents({ id: 99, name: 'Z', latitude: 9, longitude: 9 })

    const stored = JSON.parse(store.recents)
    expect(stored).toHaveLength(5)
    expect(stored[0].id).toBe(99)
    expect(stored.map((item: RecentLocation) => item.id)).toEqual([99, 5, 4, 3, 2])
    expect(windowMock.dispatchEvent).toHaveBeenCalledWith(expect.objectContaining({ type: 'storage' }))
  })

  it('does not add duplicate locations', () => {
    seedRecents([
      { id: 1, name: 'A', latitude: 1, longitude: 1, createdAt: new Date('2024-01-01T00:00:00.000Z') },
    ])
    localStorageMock.setItem.mockClear()
    windowMock.dispatchEvent.mockClear()

    const { addToRecents } = useRecentLocations()

    addToRecents({ id: 1, name: 'A', latitude: 1, longitude: 1 })

    expect(localStorageMock.setItem).not.toHaveBeenCalled()
    expect(windowMock.dispatchEvent).not.toHaveBeenCalled()
  })

  it('removes a location by id', () => {
    seedRecents([
      { id: 1, name: 'A', latitude: 1, longitude: 1, createdAt: new Date('2024-01-01T00:00:00.000Z') },
      { id: 2, name: 'B', latitude: 2, longitude: 2, createdAt: new Date('2024-01-02T00:00:00.000Z') },
    ])

    const { removeFromRecents } = useRecentLocations()

    removeFromRecents(1)

    const stored = JSON.parse(store.recents)
    expect(stored).toHaveLength(1)
    expect(stored[0].id).toBe(2)
    expect(windowMock.dispatchEvent).toHaveBeenCalledWith(expect.objectContaining({ type: 'storage' }))
  })
})
