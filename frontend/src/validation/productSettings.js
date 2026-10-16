export const CATEGORIES = [
  'Grocery',
  'Snacks',
  'Dairy',
  'Beverages',
  'Personal care',
  'Household',
  'Other',
]

export const UNITS = [
  { value: 'piece', label: 'Piece' },
  { value: 'pack', label: 'Pack' },
  { value: 'kg', label: 'Kilogram (kg)' },
  { value: 'g', label: 'Gram (g)' },
  { value: 'litre', label: 'Litre' },
  { value: 'ml', label: 'Millilitre (ml)' },
  { value: 'dozen', label: 'Dozen' },
]

export const GST_RATES = ['0', '5', '12', '18', '28']

export const STATUSES = [
  { value: 'active', label: 'Active — visible in the shop' },
  { value: 'hidden', label: 'Hidden — saved, not shown' },
  { value: 'out_of_stock', label: 'Out of stock' },
]

export const LISTING_LANGUAGES = [
  { value: 'en', label: 'English' },
  { value: 'hi', label: 'Hindi' },
  { value: 'en-hi', label: 'English + Hindi' },
]

const SKU_PATTERN = /^[A-Za-z0-9][A-Za-z0-9-]{1,23}$/
const MAX_NAME = 80
const MAX_DESCRIPTION = 500
const MAX_MONEY = 999999.99

export function createEmptySettings() {
  return {
    name: '',
    category: '',
    sku: '',
    unit: 'piece',
    mrp: '',
    sellingPrice: '',
    costPrice: '',
    gstRate: '18',
    trackInventory: true,
    stock: '',
    lowStockAlert: '5',
    description: '',
    status: 'active',
    featured: false,
    aiRewrite: true,
    listingLanguage: 'en',
  }
}

export function parseMoney(value) {
  if (value === '' || value == null) return null
  const normalized = String(value).trim().replace(/,/g, '')
  if (normalized === '') return null
  const amount = Number(normalized)
  return Number.isFinite(amount) ? amount : NaN
}

export function parseInteger(value) {
  if (value === '' || value == null) return null
  const normalized = String(value).trim()
  if (normalized === '') return null
  if (!/^-?\d+$/.test(normalized)) return NaN
  return Number(normalized)
}

export function hasAtMostTwoDecimals(value) {
  const text = String(value).trim().replace(/,/g, '')
  if (text === '') return true
  return /^\d+(\.\d{1,2})?$/.test(text)
}

export function suggestSku(name) {
  const slug = String(name)
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 16)

  if (!slug) return ''
  return `DK-${slug}`
}

export function getPricingSummary(values) {
  const sellingPrice = parseMoney(values.sellingPrice)
  const mrp = parseMoney(values.mrp)
  const costPrice = parseMoney(values.costPrice)

  const discountPercent =
    Number.isFinite(mrp) && mrp > 0 && Number.isFinite(sellingPrice)
      ? ((mrp - sellingPrice) / mrp) * 100
      : null

  const marginPercent =
    Number.isFinite(sellingPrice) &&
    sellingPrice > 0 &&
    Number.isFinite(costPrice)
      ? ((sellingPrice - costPrice) / sellingPrice) * 100
      : null

  return { sellingPrice, mrp, costPrice, discountPercent, marginPercent }
}

export function validateProductSettings(values) {
  const errors = {}
  const name = String(values.name ?? '').trim()

  if (!name) {
    errors.name = 'Enter a product name.'
  } else if (name.length < 2) {
    errors.name = 'Name must be at least 2 characters.'
  } else if (name.length > MAX_NAME) {
    errors.name = `Keep the name under ${MAX_NAME} characters.`
  }

  if (!String(values.category ?? '').trim()) {
    errors.category = 'Choose a category.'
  } else if (!CATEGORIES.includes(values.category)) {
    errors.category = 'Choose a category from the list.'
  }

  const sku = String(values.sku ?? '').trim()
  if (sku && !SKU_PATTERN.test(sku)) {
    errors.sku =
      'SKU can use letters, numbers, and hyphens (2–24 characters).'
  }

  if (!UNITS.some((unit) => unit.value === values.unit)) {
    errors.unit = 'Choose a unit.'
  }

  const sellingPrice = parseMoney(values.sellingPrice)
  if (values.sellingPrice === '' || values.sellingPrice == null) {
    errors.sellingPrice = 'Enter a selling price.'
  } else if (Number.isNaN(sellingPrice)) {
    errors.sellingPrice = 'Selling price must be a number.'
  } else if (!hasAtMostTwoDecimals(values.sellingPrice)) {
    errors.sellingPrice = 'Use up to 2 decimal places.'
  } else if (sellingPrice <= 0) {
    errors.sellingPrice = 'Selling price must be greater than 0.'
  } else if (sellingPrice > MAX_MONEY) {
    errors.sellingPrice = 'Selling price is too high.'
  }

  if (values.mrp !== '' && values.mrp != null) {
    const mrp = parseMoney(values.mrp)
    if (Number.isNaN(mrp)) {
      errors.mrp = 'MRP must be a number.'
    } else if (!hasAtMostTwoDecimals(values.mrp)) {
      errors.mrp = 'Use up to 2 decimal places.'
    } else if (mrp <= 0) {
      errors.mrp = 'MRP must be greater than 0.'
    } else if (mrp > MAX_MONEY) {
      errors.mrp = 'MRP is too high.'
    } else if (Number.isFinite(sellingPrice) && mrp < sellingPrice) {
      errors.mrp = 'MRP cannot be lower than the selling price.'
    }
  }

  if (values.costPrice !== '' && values.costPrice != null) {
    const costPrice = parseMoney(values.costPrice)
    if (Number.isNaN(costPrice)) {
      errors.costPrice = 'Cost price must be a number.'
    } else if (!hasAtMostTwoDecimals(values.costPrice)) {
      errors.costPrice = 'Use up to 2 decimal places.'
    } else if (costPrice < 0) {
      errors.costPrice = 'Cost price cannot be negative.'
    } else if (costPrice > MAX_MONEY) {
      errors.costPrice = 'Cost price is too high.'
    }
  }

  if (!GST_RATES.includes(String(values.gstRate))) {
    errors.gstRate = 'Choose a GST rate.'
  }

  if (values.trackInventory) {
    const stock = parseInteger(values.stock)
    if (values.stock === '' || values.stock == null) {
      errors.stock = 'Enter how many units you have.'
    } else if (Number.isNaN(stock)) {
      errors.stock = 'Stock must be a whole number.'
    } else if (stock < 0) {
      errors.stock = 'Stock cannot be negative.'
    } else if (stock > 999999) {
      errors.stock = 'Stock is too high.'
    }

    const lowStockAlert = parseInteger(values.lowStockAlert)
    if (values.lowStockAlert === '' || values.lowStockAlert == null) {
      errors.lowStockAlert = 'Enter a low-stock alert number.'
    } else if (Number.isNaN(lowStockAlert)) {
      errors.lowStockAlert = 'Low-stock alert must be a whole number.'
    } else if (lowStockAlert < 0) {
      errors.lowStockAlert = 'Low-stock alert cannot be negative.'
    } else if (lowStockAlert > 99999) {
      errors.lowStockAlert = 'Low-stock alert is too high.'
    }
  }

  const description = String(values.description ?? '')
  if (description.length > MAX_DESCRIPTION) {
    errors.description = `Keep the description under ${MAX_DESCRIPTION} characters.`
  }

  if (!STATUSES.some((status) => status.value === values.status)) {
    errors.status = 'Choose a listing status.'
  }

  if (
    !LISTING_LANGUAGES.some((language) => language.value === values.listingLanguage)
  ) {
    errors.listingLanguage = 'Choose a listing language.'
  }

  return errors
}

export function firstErrorField(errors) {
  const order = [
    'name',
    'category',
    'sku',
    'unit',
    'mrp',
    'sellingPrice',
    'costPrice',
    'gstRate',
    'stock',
    'lowStockAlert',
    'description',
    'status',
    'listingLanguage',
  ]

  return order.find((field) => errors[field]) ?? null
}
