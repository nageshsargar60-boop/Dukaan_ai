import { useEffect, useMemo, useRef, useState } from 'react'
import {
  clearProductSettings,
  loadProductSettings,
  saveProductSettings,
} from '../storage/productSettingsStorage.js'
import {
  CATEGORIES,
  GST_RATES,
  LISTING_LANGUAGES,
  STATUSES,
  UNITS,
  createEmptySettings,
  firstErrorField,
  getPricingSummary,
  parseInteger,
  suggestSku,
  validateProductSettings,
} from '../validation/productSettings.js'
import { Field } from './Field.jsx'
import './ProductSettingsForm.css'

function formatRupees(amount) {
  if (!Number.isFinite(amount)) return '—'
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(amount)
}

function formatPercent(value) {
  if (!Number.isFinite(value)) return '—'
  return `${value.toFixed(1)}%`
}

function loadInitialSettings() {
  const stored = loadProductSettings()
  const values = stored
    ? { ...createEmptySettings(), ...stored }
    : createEmptySettings()
  return {
    values,
    snapshot: JSON.stringify(values),
    skuLocked: Boolean(String(values.sku ?? '').trim()),
  }
}

export function ProductSettingsForm() {
  const initial = useMemo(() => loadInitialSettings(), [])
  const [values, setValues] = useState(initial.values)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [skuLocked, setSkuLocked] = useState(initial.skuLocked)
  const [banner, setBanner] = useState(null)
  const [savedSnapshot, setSavedSnapshot] = useState(initial.snapshot)
  const formRef = useRef(null)
  const bannerTimer = useRef(null)
  const touchedRef = useRef({})

  useEffect(() => {
    touchedRef.current = touched
  }, [touched])

  useEffect(() => {
    return () => {
      if (bannerTimer.current) window.clearTimeout(bannerTimer.current)
    }
  }, [])

  const isDirty = JSON.stringify(values) !== savedSnapshot
  const pricing = useMemo(() => getPricingSummary(values), [values])
  const stock = parseInteger(values.stock)
  const lowStockAlert = parseInteger(values.lowStockAlert)
  const isLowStock =
    values.trackInventory &&
    Number.isFinite(stock) &&
    Number.isFinite(lowStockAlert) &&
    stock <= lowStockAlert

  function showBanner(type, message) {
    setBanner({ type, message })
    if (bannerTimer.current) window.clearTimeout(bannerTimer.current)
    bannerTimer.current = window.setTimeout(() => setBanner(null), 4500)
  }

  function updateField(name, nextValue) {
    setValues((current) => {
      const next = { ...current, [name]: nextValue }
      if (name === 'name' && !skuLocked) {
        next.sku = suggestSku(nextValue)
      }
      if (Object.keys(touchedRef.current).length > 0) {
        setErrors(validateProductSettings(next))
      }
      return next
    })
    setBanner(null)
  }

  function handleChange(event) {
    const { name, type, checked, value } = event.target
    updateField(name, type === 'checkbox' ? checked : value)
  }

  function handleBlur(event) {
    const { name } = event.target
    setTouched((current) => ({ ...current, [name]: true }))
    setErrors(validateProductSettings(values))
  }

  function handleSkuChange(event) {
    setSkuLocked(true)
    updateField('sku', event.target.value)
  }

  function focusField(name) {
    const field = formRef.current?.querySelector(`[name="${name}"]`)
    if (field instanceof HTMLElement) field.focus()
  }

  function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = validateProductSettings(values)
    setErrors(nextErrors)
    setTouched(
      Object.fromEntries(Object.keys(createEmptySettings()).map((key) => [key, true])),
    )

    const invalidField = firstErrorField(nextErrors)
    if (invalidField) {
      showBanner('error', 'Please fix the highlighted fields, then save again.')
      focusField(invalidField)
      return
    }

    const cleaned = {
      ...values,
      name: values.name.trim(),
      sku: values.sku.trim(),
      description: values.description.trim(),
    }
    saveProductSettings(cleaned)
    setValues(cleaned)
    setSavedSnapshot(JSON.stringify(cleaned))
    showBanner('success', 'Product settings saved on this device.')
  }

  function handleReset() {
    if (isDirty && !window.confirm('Discard unsaved changes?')) return
    const empty = createEmptySettings()
    setValues(empty)
    setErrors({})
    setTouched({})
    setSkuLocked(false)
    clearProductSettings()
    setSavedSnapshot(JSON.stringify(empty))
    showBanner('success', 'Form cleared. Nothing is saved.')
  }

  function visibleError(name) {
    return touched[name] ? errors[name] : undefined
  }

  return (
    <div className="settings">
      <header className="settings__hero">
        <p className="eyebrow">DukaanAI</p>
        <h1>Product settings</h1>
        <p className="lede">
          Fill this in once per item. We check prices, stock, and listing details
          before saving so your shop stays tidy.
        </p>
      </header>

      {banner ? (
        <div
          className={`banner banner--${banner.type}`}
          role={banner.type === 'error' ? 'alert' : 'status'}
        >
          {banner.message}
        </div>
      ) : null}

      <form ref={formRef} className="settings__layout" onSubmit={handleSubmit} noValidate>
        <div className="settings__main">
          <section className="card">
            <div className="card__header">
              <h2>Basic details</h2>
              <p>What customers should see first.</p>
            </div>
            <div className="grid grid--2">
              <Field
                id="name"
                label="Product name"
                required
                error={visibleError('name')}
                hint="Use the name printed on the pack when you can."
              >
                {({ id, describedBy, invalid }) => (
                  <input
                    id={id}
                    name="name"
                    type="text"
                    autoComplete="off"
                    maxLength={80}
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-describedby={describedBy}
                    aria-invalid={invalid}
                    placeholder="e.g. Tata Salt 1 kg"
                  />
                )}
              </Field>
              <Field
                id="category"
                label="Category"
                required
                error={visibleError('category')}
              >
                {({ id, describedBy, invalid }) => (
                  <select
                    id={id}
                    name="category"
                    value={values.category}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-describedby={describedBy}
                    aria-invalid={invalid}
                  >
                    <option value="">Select a category</option>
                    {CATEGORIES.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                )}
              </Field>
              <Field
                id="sku"
                label="SKU"
                error={visibleError('sku')}
                hint="Filled automatically from the name. Edit if you use your own codes."
              >
                {({ id, describedBy, invalid }) => (
                  <input
                    id={id}
                    name="sku"
                    type="text"
                    autoComplete="off"
                    maxLength={24}
                    value={values.sku}
                    onChange={handleSkuChange}
                    onBlur={handleBlur}
                    aria-describedby={describedBy}
                    aria-invalid={invalid}
                    placeholder="DK-TATA-SALT"
                  />
                )}
              </Field>
              <Field id="unit" label="Unit" required error={visibleError('unit')}>
                {({ id, describedBy, invalid }) => (
                  <select
                    id={id}
                    name="unit"
                    value={values.unit}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-describedby={describedBy}
                    aria-invalid={invalid}
                  >
                    {UNITS.map((unit) => (
                      <option key={unit.value} value={unit.value}>
                        {unit.label}
                      </option>
                    ))}
                  </select>
                )}
              </Field>
            </div>
          </section>

          <section className="card">
            <div className="card__header">
              <h2>Pricing</h2>
              <p>All amounts are in Indian rupees (₹).</p>
            </div>
            <div className="grid grid--3">
              <Field
                id="mrp"
                label="MRP"
                error={visibleError('mrp')}
                hint="Optional printed maximum price."
              >
                {({ id, describedBy, invalid }) => (
                  <input
                    id={id}
                    name="mrp"
                    inputMode="decimal"
                    value={values.mrp}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-describedby={describedBy}
                    aria-invalid={invalid}
                    placeholder="30.00"
                  />
                )}
              </Field>
              <Field
                id="sellingPrice"
                label="Selling price"
                required
                error={visibleError('sellingPrice')}
              >
                {({ id, describedBy, invalid }) => (
                  <input
                    id={id}
                    name="sellingPrice"
                    inputMode="decimal"
                    value={values.sellingPrice}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-describedby={describedBy}
                    aria-invalid={invalid}
                    placeholder="28.50"
                  />
                )}
              </Field>
              <Field
                id="costPrice"
                label="Cost price"
                error={visibleError('costPrice')}
                hint="Optional. Used only to show your margin."
              >
                {({ id, describedBy, invalid }) => (
                  <input
                    id={id}
                    name="costPrice"
                    inputMode="decimal"
                    value={values.costPrice}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-describedby={describedBy}
                    aria-invalid={invalid}
                    placeholder="22.00"
                  />
                )}
              </Field>
            </div>
            <Field id="gstRate" label="GST rate" error={visibleError('gstRate')}>
              {({ id, describedBy, invalid }) => (
                <select
                  id={id}
                  name="gstRate"
                  value={values.gstRate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-describedby={describedBy}
                  aria-invalid={invalid}
                >
                  {GST_RATES.map((rate) => (
                    <option key={rate} value={rate}>
                      {rate}% GST
                    </option>
                  ))}
                </select>
              )}
            </Field>
            <div className="metrics" aria-live="polite">
              <div>
                <span>Discount vs MRP</span>
                <strong>{formatPercent(pricing.discountPercent)}</strong>
              </div>
              <div>
                <span>Margin</span>
                <strong>{formatPercent(pricing.marginPercent)}</strong>
              </div>
              <div>
                <span>Customer pays</span>
                <strong>{formatRupees(pricing.sellingPrice)}</strong>
              </div>
            </div>
          </section>

          <section className="card">
            <div className="card__header">
              <h2>Inventory</h2>
              <p>Turn tracking off if you do not count this item.</p>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                name="trackInventory"
                checked={values.trackInventory}
                onChange={handleChange}
              />
              <span>Track stock for this product</span>
            </label>
            {values.trackInventory ? (
              <div className="grid grid--2">
                <Field
                  id="stock"
                  label="Stock on hand"
                  required
                  error={visibleError('stock')}
                >
                  {({ id, describedBy, invalid }) => (
                    <input
                      id={id}
                      name="stock"
                      inputMode="numeric"
                      value={values.stock}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-describedby={describedBy}
                      aria-invalid={invalid}
                      placeholder="40"
                    />
                  )}
                </Field>
                <Field
                  id="lowStockAlert"
                  label="Low-stock alert"
                  required
                  error={visibleError('lowStockAlert')}
                  hint="We flag the listing when stock reaches this number."
                >
                  {({ id, describedBy, invalid }) => (
                    <input
                      id={id}
                      name="lowStockAlert"
                      inputMode="numeric"
                      value={values.lowStockAlert}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-describedby={describedBy}
                      aria-invalid={invalid}
                      placeholder="5"
                    />
                  )}
                </Field>
              </div>
            ) : (
              <p className="field__hint">
                Stock fields are hidden because tracking is off.
              </p>
            )}
            {isLowStock ? (
              <p className="notice">
                Stock is at or below the alert level. Consider restocking soon.
              </p>
            ) : null}
          </section>

          <section className="card">
            <div className="card__header">
              <h2>Listing</h2>
              <p>How this product appears and how AI should write copy.</p>
            </div>
            <Field
              id="description"
              label="Description"
              error={visibleError('description')}
              hint={`${values.description.length}/500 characters`}
            >
              {({ id, describedBy, invalid }) => (
                <textarea
                  id={id}
                  name="description"
                  rows={4}
                  maxLength={500}
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-describedby={describedBy}
                  aria-invalid={invalid}
                  placeholder="A short note shoppers will understand — size, flavour, or use."
                />
              )}
            </Field>
            <div className="grid grid--2">
              <Field id="status" label="Status" error={visibleError('status')}>
                {({ id, describedBy, invalid }) => (
                  <select
                    id={id}
                    name="status"
                    value={values.status}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-describedby={describedBy}
                    aria-invalid={invalid}
                  >
                    {STATUSES.map((status) => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </select>
                )}
              </Field>
              <Field
                id="listingLanguage"
                label="Listing language"
                error={visibleError('listingLanguage')}
              >
                {({ id, describedBy, invalid }) => (
                  <select
                    id={id}
                    name="listingLanguage"
                    value={values.listingLanguage}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-describedby={describedBy}
                    aria-invalid={invalid}
                  >
                    {LISTING_LANGUAGES.map((language) => (
                      <option key={language.value} value={language.value}>
                        {language.label}
                      </option>
                    ))}
                  </select>
                )}
              </Field>
            </div>
            <div className="toggles">
              <label className="switch">
                <input
                  type="checkbox"
                  name="featured"
                  checked={values.featured}
                  onChange={handleChange}
                />
                <span>Feature this product</span>
              </label>
              <label className="switch">
                <input
                  type="checkbox"
                  name="aiRewrite"
                  checked={values.aiRewrite}
                  onChange={handleChange}
                />
                <span>Allow AI to improve the description later</span>
              </label>
            </div>
          </section>
        </div>

        <aside className="settings__side">
          <section className="preview" aria-live="polite">
            <p className="preview__kicker">Live preview</p>
            <h3>{values.name.trim() || 'Untitled product'}</h3>
            <p className="preview__meta">
              {values.category || 'No category'} ·{' '}
              {UNITS.find((unit) => unit.value === values.unit)?.label}
            </p>
            <p className="preview__price">
              <strong>{formatRupees(pricing.sellingPrice)}</strong>
              {Number.isFinite(pricing.mrp) ? (
                <s>{formatRupees(pricing.mrp)}</s>
              ) : null}
            </p>
            <dl>
              <div>
                <dt>SKU</dt>
                <dd>{values.sku.trim() || 'Not set'}</dd>
              </div>
              <div>
                <dt>GST</dt>
                <dd>{values.gstRate}%</dd>
              </div>
              <div>
                <dt>Stock</dt>
                <dd>
                  {values.trackInventory
                    ? values.stock === ''
                      ? 'Not set'
                      : `${values.stock} units`
                    : 'Not tracked'}
                </dd>
              </div>
              <div>
                <dt>Status</dt>
                <dd>
                  {STATUSES.find((status) => status.value === values.status)?.label.split(
                    ' — ',
                  )[0] ?? values.status}
                </dd>
              </div>
            </dl>
            {values.description.trim() ? (
              <p className="preview__copy">{values.description.trim()}</p>
            ) : (
              <p className="preview__copy preview__copy--muted">
                Add a short description to help shoppers decide.
              </p>
            )}
          </section>
        </aside>

        <div className="actions">
          <p className="actions__status">
            {isDirty ? 'You have unsaved changes.' : 'All changes are saved.'}
          </p>
          <div className="actions__buttons">
            <button type="button" className="button button--ghost" onClick={handleReset}>
              Clear form
            </button>
            <button type="submit" className="button button--primary">
              Save settings
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
