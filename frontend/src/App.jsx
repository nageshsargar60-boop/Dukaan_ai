
import { useState } from 'react'
import './App.css'

const initialForm = {
  name: '',
  category: '',
  sku: '',
  unit: 'Piece',
  mrp: '',
  price: '',
  cost: '',
  gst: '18',
  stock: '0',
  lowStock: '5',
  trackStock: true,
  description: '',
  status: 'Active',
}

function App() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')
  const [saved, setSaved] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('dukaan-product-settings')) || null
    } catch {
      return null
    }
  })

  function update(field, value) {
    setForm(current => ({ ...current, [field]: value }))
    setErrors(current => ({ ...current, [field]: '' }))
    setMessage('')
  }

  function validate() {
    const next = {}
    if (!form.name.trim()) next.name = 'Product name is required.'
    if (!form.category) next.category = 'Choose a category.'

    const price = Number(form.price)
    const mrp = Number(form.mrp)
    const stock = Number(form.stock)
    const lowStock = Number(form.lowStock)

    if (form.price === '' || !Number.isFinite(price) || price <= 0) {
      next.price = 'Selling price must be greater than zero.'
    }
    if (form.mrp !== '' && (!Number.isFinite(mrp) || mrp < 0)) {
      next.mrp = 'MRP cannot be negative.'
    } else if (form.mrp !== '' && price > 0 && mrp < price) {
      next.mrp = 'MRP should be at least the selling price.'
    }
    if (form.cost !== '' && (!Number.isFinite(Number(form.cost)) || Number(form.cost) < 0)) {
      next.cost = 'Cost cannot be negative.'
    }
    if (form.trackStock && (!Number.isInteger(stock) || stock < 0)) {
      next.stock = 'Stock must be a whole number of 0 or more.'
    }
    if (form.trackStock && (!Number.isInteger(lowStock) || lowStock < 0)) {
      next.lowStock = 'Alert quantity must be a whole number of 0 or more.'
    }

    setErrors(next)
    return Object.keys(next).length === 0
  }

  function save(event) {
    event.preventDefault()
    if (!validate()) {
      setMessage('Please correct the highlighted fields.')
      return
    }

    const product = {
      ...form,
      price: Number(form.price),
      mrp: form.mrp === '' ? null : Number(form.mrp),
      cost: form.cost === '' ? null : Number(form.cost),
      stock: form.trackStock ? Number(form.stock) : null,
      lowStock: form.trackStock ? Number(form.lowStock) : null,
    }

    try {
      localStorage.setItem('dukaan-product-settings', JSON.stringify(product))
      setSaved(product)
      setMessage('Settings saved successfully.')
    } catch {
      setMessage('Could not save settings in this browser.')
    }
  }

  function clearForm() {
    setForm(initialForm)
    setErrors({})
    setMessage('')
  }

  const field = (label, key, type = 'text', required = false) => (
    <label className="field">
      <span>{label}{required && <b className="required"> REQUIRED</b>}</span>
      <input
        type={type}
        value={form[key]}
        onChange={event => update(key, event.target.value)}
        aria-invalid={Boolean(errors[key])}
        aria-describedby={errors[key] ? `${key}-error` : undefined}
      />
      {errors[key] && <small className="error" id={`${key}-error`}>{errors[key]}</small>}
    </label>
  )

  const select = (label, key, options, required = false) => (
    <label className="field">
      <span>{label}{required && <b className="required"> REQUIRED</b>}</span>
      <select
        value={form[key]}
        onChange={event => update(key, event.target.value)}
        aria-invalid={Boolean(errors[key])}
        aria-describedby={errors[key] ? `${key}-error` : undefined}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
      {errors[key] && <small className="error" id={`${key}-error`}>{errors[key]}</small>}
    </label>
  )

  return (
    <main className="page">
      <header className="page-header">
        <span className="eyebrow">DUKAANAI / INVENTORY</span>
        <h1>Product settings</h1>
        <p>Set up your product details, pricing and stock in one place.</p>
      </header>

      <form onSubmit={save} noValidate>
        <div className="layout">
          <div className="sections">
            <section className="panel">
              <h2>Basic details</h2>
              <p className="hint">What customers should see first.</p>
              <div className="grid">
                {field('Product name', 'name', 'text', true)}
                {select('Category', 'category', [
                  { value: '', label: 'Select a category' },
                  { value: 'Grocery', label: 'Grocery' },
                  { value: 'Beverages', label: 'Beverages' },
                  { value: 'Household', label: 'Household' },
                  { value: 'Personal care', label: 'Personal care' },
                  { value: 'Other', label: 'Other' },
                ], true)}
                {field('SKU', 'sku')}
                {select('Unit', 'unit', [
                  { value: 'Piece', label: 'Piece' },
                  { value: 'Kg', label: 'Kilogram (kg)' },
                  { value: 'Litre', label: 'Litre' },
                  { value: 'Pack', label: 'Pack' },
                ])}
              </div>
            </section>

            <section className="panel">
              <h2>Pricing</h2>
              <p className="hint">All prices are in Indian rupees (₹).</p>
              <div className="grid three">
                {field('MRP (₹)', 'mrp', 'number')}
                {field('Selling price (₹)', 'price', 'number', true)}
                {field('Cost price (₹)', 'cost', 'number')}
              </div>
              {select('GST rate', 'gst', [
                { value: '0', label: '0% GST' },
                { value: '5', label: '5% GST' },
                { value: '12', label: '12% GST' },
                { value: '18', label: '18% GST' },
                { value: '28', label: '28% GST' },
              ])}
              <div className="price-summary">
                <div><small>Discount vs MRP</small><strong>
                  {Number(form.mrp) > 0 && Number(form.mrp) >= Number(form.price)
                    ? `₹${(Number(form.mrp) - Number(form.price)).toFixed(2)}`
                    : '—'}
                </strong></div>
                <div><small>Margin</small><strong>
                  {form.cost !== '' && Number(form.price) >= Number(form.cost)
                    ? `₹${(Number(form.price) - Number(form.cost)).toFixed(2)}`
                    : '—'}
                </strong></div>
                <div><small>Customer price</small><strong>
                  {Number(form.price) > 0
                    ? `₹${(Number(form.price) * (1 + Number(form.gst) / 100)).toFixed(2)}`
                    : '—'}
                </strong></div>
              </div>
            </section>

            <section className="panel">
              <h2>Inventory</h2>
              <p className="hint">Turn tracking off if you do not count this item.</p>
              <label className="check">
                <input
                  type="checkbox"
                  checked={form.trackStock}
                  onChange={event => update('trackStock', event.target.checked)}
                />
                Track stock for this product
              </label>
              {form.trackStock && (
                <div className="grid">
                  {field('Stock on hand', 'stock', 'number', true)}
                  {field('Low-stock alert', 'lowStock', 'number', true)}
                </div>
              )}
            </section>

            <section className="panel">
              <h2>Listing</h2>
              <p className="hint">How this product appears in your shop.</p>
              <label className="field">
                <span>Description</span>
                <textarea
                  rows="4"
                  maxLength="500"
                  value={form.description}
                  onChange={event => update('description', event.target.value)}
                  placeholder="A short note shoppers will understand."
                />
                <small>{form.description.length}/500 characters</small>
              </label>
              <div className="grid">
                {select('Status', 'status', [
                  { value: 'Active', label: 'Active — visible in the shop' },
                  { value: 'Draft', label: 'Draft — not published' },
                  { value: 'Archived', label: 'Archived' },
                ])}
                <div className="field">
                  <span>Listing language</span>
                  <input value="English" readOnly />
                </div>
              </div>
            </section>
          </div>

          <aside className="preview panel">
            <span className="eyebrow">LIVE PREVIEW</span>
            <h2>{form.name.trim() || 'Untitled product'}</h2>
            <p>{form.category || 'No category'} · {form.unit}</p>
            <strong className="preview-price">
              {Number(form.price) > 0 ? `₹${Number(form.price).toFixed(2)}` : 'Price not set'}
            </strong>
            <div className="preview-row"><span>SKU</span><b>{form.sku || 'Not set'}</b></div>
            <div className="preview-row"><span>GST</span><b>{form.gst}%</b></div>
            <div className="preview-row"><span>Stock</span><b>
              {form.trackStock ? `${form.stock || 0} units` : 'Not tracked'}
            </b></div>
            <div className="preview-row"><span>Status</span><b>{form.status}</b></div>
            <p className="description-preview">
              {form.description || 'Add a short description to help shoppers decide.'}
            </p>
          </aside>
        </div>

        <footer className="actions">
          <p role="status" className={message.startsWith('Please') || message.startsWith('Could not') ? 'error' : 'success'}>
            {message || (saved ? 'Previously saved settings are available.' : 'Your changes are not saved yet.')}
          </p>
          <button type="button" className="secondary" onClick={clearForm}>Clear form</button>
          <button type="submit" className="primary">Save settings</button>
        </footer>
      </form>
    </main>
  )
}

export default App
