import assert from 'node:assert/strict'
import test from 'node:test'
import {
  createEmptySettings,
  suggestSku,
  validateProductSettings,
} from './productSettings.js'

test('empty settings fail on required fields', () => {
  const errors = validateProductSettings(createEmptySettings())
  assert.equal(errors.name, 'Enter a product name.')
  assert.equal(errors.category, 'Choose a category.')
  assert.equal(errors.sellingPrice, 'Enter a selling price.')
  assert.equal(errors.stock, 'Enter how many units you have.')
})

test('accepts a complete grocery listing', () => {
  const errors = validateProductSettings({
    ...createEmptySettings(),
    name: 'Tata Salt 1kg',
    category: 'Grocery',
    sku: 'DK-TATA-SALT',
    unit: 'pack',
    mrp: '30',
    sellingPrice: '28.50',
    costPrice: '22',
    gstRate: '5',
    stock: '40',
    lowStockAlert: '8',
    description: 'Iodised salt for daily cooking.',
  })
  assert.deepEqual(errors, {})
})

test('rejects MRP below selling price', () => {
  const errors = validateProductSettings({
    ...createEmptySettings(),
    name: 'Milk',
    category: 'Dairy',
    sellingPrice: '60',
    mrp: '55',
    stock: '10',
  })
  assert.equal(errors.mrp, 'MRP cannot be lower than the selling price.')
})

test('skips stock rules when inventory tracking is off', () => {
  const errors = validateProductSettings({
    ...createEmptySettings(),
    name: 'Soap',
    category: 'Personal care',
    sellingPrice: '40',
    trackInventory: false,
    stock: '',
    lowStockAlert: '',
  })
  assert.equal(errors.stock, undefined)
  assert.equal(errors.lowStockAlert, undefined)
})

test('suggests a SKU from the product name', () => {
  assert.equal(suggestSku('Tata Salt 1kg'), 'DK-TATA-SALT-1KG')
})
