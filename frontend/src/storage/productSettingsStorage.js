const STORAGE_KEY = 'dukaanai.productSettings.v1'

export function loadProductSettings() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object') return null
    return parsed
  } catch {
    return null
  }
}

export function saveProductSettings(values) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(values))
}

export function clearProductSettings() {
  window.localStorage.removeItem(STORAGE_KEY)
}
