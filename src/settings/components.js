import { getLocale } from 'src/lang'

/**
 * @type {Object}
 */
export const attrs = { dense: true, clearable: true, outlined: true, uppercase: false, useReadonly: true }

/**
 * @param value
 * @returns {string}
 */
export const parseOutput = (value) => typeof value === 'string' ? value.toUpperCase() : value

/**
 * @param value
 * @returns {string|*}
 */
export const currencyParseOutput = (value) => {
  if (typeof value !== 'string') {
    return value
  }
  return Number(value.replace(/\./g, '').replace(/,/g, '.'))
}

/**
 * @param {boolean} native
 * @returns {Object}
 */
const currency = (native = true) => {
  const style = native ? 'style' : 'mode'
  const currencyDisplay = native ? 'currencyDisplay' : 'display'
  return {
    [style]: 'currency',
    [currencyDisplay]: 'symbol',
    currency: process.env.VUE_APP_CURRENCY
  }
}

/**
 * @param value
 * @returns {string|*}
 */
export const currencyParseInput = (value) => {
  if (typeof value !== 'number') {
    return value
  }
  const formatter = new Intl.NumberFormat(getLocale(), currency())
  // noinspection JSUnresolvedFunction
  return formatter.format(value)
}

/**
 * @type {{is: string, attrs: {name: string}}}
 */
export const home = { is: 'q-icon', attrs: { name: 'important_devices' } } // home_work, desktop_windows

/**
 * @type {number}
 */
export const tableOuterHeight = 250

/**
 * @type {number}
 */
export const tableMinRowsPerPage = 10

/**
 * @param {Function} h
 * @returns {*}
 */
export const reportContext = (h) => {
  const domProps = {
    type: 'hidden',
    name: '__@context',
    value: undefined
  }
  return h('input', { domProps })
}

/**
 * @type {Object}
 */
export default {
  input: {
    is: 'q-input',
    attrs: { maxlength: 255, ...attrs, uppercase: true },
    parseOutput
  },
  plan: {
    is: 'q-input',
    attrs: { maxlength: 255, ...attrs }
  },
  number: {
    is: 'q-input',
    attrs: { type: 'number', ...attrs }
  },
  password: {
    is: 'q-input',
    attrs: { type: 'password', maxlength: 255, ...attrs }
  },
  email: {
    is: 'q-input',
    attrs: { type: 'email', maxlength: 255, ...attrs }
  },
  text: {
    is: 'q-input',
    attrs: { type: 'textarea', rows: 4, maxlength: 4000, ...attrs },
    parseOutput
  },
  checkbox: {
    is: 'q-checkbox',
    attrs: { ...attrs, useReadonly: false, 'indeterminate-value': 'maybe' }
  },
  radio: {
    is: 'q-option-group',
    attrs: { inline: true, ...attrs, useReadonly: false }
  },
  select: {
    is: 'q-select',
    attrs: { popupContentClass: 'uppercase', ...attrs, uppercase: true }
  },
  toggle: {
    is: 'q-toggle',
    attrs: { ...attrs, useReadonly: false }
  },
  remote: {
    is: 'AppSelectRemoteSingle',
    attrs: { ...attrs, uppercase: true }
  },
  remoteMultiple: {
    is: 'AppSelectRemoteMultiple',
    attrs: { ...attrs, uppercase: true }
  },
  date: {
    is: 'AppDate',
    attrs: {
      mask: '##/##/####',
      format: 'YYYY-MM-DD',
      display: 'DD/MM/YYYY',
      ...attrs
    }
  },
  datetime: {
    is: 'AppDatetime',
    attrs: {
      mask: '##/##/#### ##:##',
      format: 'YYYY-MM-DD HH:mm',
      display: 'DD/MM/YYYY HH:mm',
      ...attrs
    }
  },
  currency: {
    is: 'q-decimal',
    attrs: {
      maxlength: 14,
      inputStyle: 'text-align: right',
      hideBottomSpace: true,
      ...attrs,
      clearable: false,
      lang: getLocale(),
      ...currency(false)
    }
  }
}
