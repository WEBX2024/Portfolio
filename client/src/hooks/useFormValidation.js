import { useState, useCallback } from 'react';

/**
 * Simple form validation hook.
 * @param {Object} initialValues - Initial form field values.
 * @param {Function} validate - Validation function returning an errors object.
 * @returns {Object} - Form state, handlers, and validation helpers.
 */
export function useFormValidation(initialValues, validate) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));

    // Clear error on change if field was touched
    setErrors((prev) => {
      if (prev[name]) {
        const next = { ...prev };
        delete next[name];
        return next;
      }
      return prev;
    });
  }, []);

  const handleBlur = useCallback(
    (e) => {
      const { name } = e.target;
      setTouched((prev) => ({ ...prev, [name]: true }));

      // Validate single field on blur
      if (validate) {
        const allErrors = validate(values);
        if (allErrors[name]) {
          setErrors((prev) => ({ ...prev, [name]: allErrors[name] }));
        }
      }
    },
    [values, validate]
  );

  const validateAll = useCallback(() => {
    if (!validate) return true;
    const allErrors = validate(values);
    setErrors(allErrors);

    // Mark all fields as touched
    const allTouched = {};
    Object.keys(values).forEach((key) => {
      allTouched[key] = true;
    });
    setTouched(allTouched);

    return Object.keys(allErrors).length === 0;
  }, [values, validate]);

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateAll,
    reset,
  };
}
