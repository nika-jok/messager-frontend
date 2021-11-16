export default class FormValidator {
  static validatePassword(
    password: string,
    shouldBeCapitalLetter: boolean,
    shouldBeAnyNumber: boolean,
    minPasswordLength?: number
  ): 'no_capital' | 'no_number' | 'small_length' | undefined {
    if (shouldBeCapitalLetter && !password.match(/[A-Z]/)) {
      return 'no_capital'
    }

    if (shouldBeAnyNumber && !password.match(/[0-9]/)) {
      return 'no_number'
    }

    if (minPasswordLength && password.length < minPasswordLength) {
      return 'small_length'
    }

    return undefined
  }

  static isValidEmail(email: string): boolean {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return emailRegex.test(email)
  }

  static isValidCardNumber(cardNumber: string): boolean {
    const cardRegex =
      /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/
    return cardRegex.test(cardNumber)
  }

  static isNumber(string: string): boolean {
    const len = string.length
    for (let i = 0; i < len; i += 1) {
      const c = string[i]
      if (c < '0' || c > '9') return false
    }
    return true
  }
}
