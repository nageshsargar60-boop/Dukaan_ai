export function Field({
  id,
  label,
  hint,
  error,
  required = false,
  children,
}) {
  const hintId = `${id}-hint`
  const errorId = `${id}-error`
  const describedBy = [error ? errorId : null, hint && !error ? hintId : null]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={`field${error ? ' field--error' : ''}`}>
      <label htmlFor={id}>
        <span>{label}</span>
        {required ? <span className="field__required">Required</span> : null}
      </label>
      {typeof children === 'function'
        ? children({
            id,
            describedBy: describedBy || undefined,
            invalid: Boolean(error),
          })
        : children}
      {error ? (
        <p id={errorId} className="field__error" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p id={hintId} className="field__hint">
          {hint}
        </p>
      ) : null}
    </div>
  )
}
