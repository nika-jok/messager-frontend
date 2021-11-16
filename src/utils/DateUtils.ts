import { russianMonths, shortRussianMonths } from './RussianMonths'

class DateUtils {
  static addMonths = (date: Date, months: number) => {
    var d = date.getDate()
    date.setMonth(date.getMonth() + +months)
    if (date.getDate() !== d) {
      date.setDate(0)
    }
    return date
  }

  static convertDate = (inputFormat: any) => {
    function pad(s: any) {
      return s < 10 ? '0' + s : s
    }
    var d = new Date(inputFormat)
    return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/')
  }

  static convertTimeToCurrentTime = (number: number): string => {
    const mins = Math.floor(number / 60)
    const secs = Number((number % 60).toFixed())
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  static convertMsToMinutesAndSeconds(time: number) {
    let mins = Math.floor(time / 60)
    if (mins < 10) {
      //@ts-ignore
      mins = '0' + String(mins)
    }
    let secs = Math.floor(time % 60)
    if (secs < 10) {
      //@ts-ignore
      secs = '0' + String(secs)
    }

    return mins + ':' + secs
  }

  static datesAreOnSameDay = (first: Date, second: Date): boolean => {
    if (
      first.getFullYear() === second.getFullYear() &&
      first.getMonth() === second.getMonth() &&
      first.getDate() === second.getDate()
    ) {
      return true
    } else {
      return false
    }
  }

  static getDayAndMonthsFromDate = (date: Date): string => {
    const currentDate = date.getDate() + ' ' + russianMonths[date.getMonth()]
    return `${currentDate}`
  }

  static getDayAndShortMonthsFromDate = (date: Date): string => {
    const currentDate =
      date.getDate() + ' ' + shortRussianMonths[date.getMonth()]
    return `${currentDate}`
  }

  static getDayAndShortMonthsAndYearFromDate = (date: Date): string => {
    const currentDate =
      date.getDate() +
      ' ' +
      shortRussianMonths[date.getMonth()] +
      ' ' +
      date.getFullYear()
    return `${currentDate}`
  }

  static getHoursAndMinutesFromCreatedDate = (createdDate: string): string => {
    const createdAt = new Date(createdDate)
    let createdAtHour: string | number = createdAt.getHours()
    let createdAtMinute: string | number = createdAt.getMinutes()

    if (createdAtHour < 10) {
      createdAtHour = `0${createdAtHour}`
    }
    if (createdAtMinute < 10) {
      createdAtMinute = `0${createdAtMinute}`
    }

    return `${createdAtHour}:${createdAtMinute}`
  }

  static lastSeenAt = (date: Date): string => {
    //@ts-ignore
    const seconds: number = Math.floor((new Date() - date) / 1000)
    const month = new Date().getMonth()
    const year = new Date().getFullYear()

    let interval = seconds / 31536000

    if (interval > 1 && interval <= 2) {
      return Math.floor(interval) + ' год'
    } else if (interval > 2 && interval <= 4) {
      return Math.floor(interval) + ' года'
    } else if (interval > 5 && interval <= 12) {
      return Math.floor(interval) + ' лет'
    }
    interval = seconds / (60 * 60 * 24 * new Date(year, month + 1, 0).getDate())

    if (interval > 1 && interval <= 2) {
      return Math.floor(interval) + ' месяц'
    } else if (interval > 2 && interval <= 4) {
      return Math.floor(interval) + ' месяца'
    } else if (interval > 4 && interval <= 12) {
      return Math.floor(interval) + ' месяцев'
    }

    interval = seconds / 86400
    if (interval > 1 && interval <= 2) {
      return Math.floor(interval) + ' день'
    } else if (interval > 2 && interval <= 4) {
      return Math.floor(interval) + ' дня'
    } else if (interval > 4 && interval <= 20) {
      return Math.floor(interval) + ' дней'
    } else if (interval > 20 && interval <= 21) {
      return Math.floor(interval) + ' день'
    } else if (interval > 21 && interval <= 22) {
      return Math.floor(interval) + ' дня'
    } else if (interval > 24 && interval <= 30) {
      return Math.floor(interval) + ' дней'
    } else if (interval > 30 && interval <= 31) {
      return Math.floor(interval) + ' день'
    }
    interval = seconds / 3600
    if (interval > 1 && interval <= 2) {
      return Math.floor(interval) + ' час'
    } else if (interval > 2 && interval <= 4) {
      return Math.floor(interval) + ' часа'
    } else if (interval > 4 && interval <= 20) {
      return Math.floor(interval) + ' часов'
    } else if (interval > 20 && interval <= 21) {
      return Math.floor(interval) + ' час'
    } else if (interval > 21 && interval <= 24) {
      return Math.floor(interval) + ' часа'
    }

    interval = Math.abs(Math.floor(seconds / 60) % 60)

    if (interval > 1 && interval <= 2) {
      return Math.floor(interval) + ' минуту'
    } else if (interval > 2 && interval <= 4) {
      return Math.floor(interval) + ' минуты'
    } else if (interval > 4 && interval <= 30) {
      return Math.floor(interval) + ' минут'
    } else if (interval > 30 && interval <= 31) {
      return Math.floor(interval) + ' минуту'
    } else if (interval > 31 && interval <= 32) {
      return Math.floor(interval) + ' минуты'
    } else if (interval > 34 && interval <= 40) {
      return Math.floor(interval) + ' минут'
    } else if (interval > 40 && interval <= 41) {
      return Math.floor(interval) + ' минуту'
    } else if (interval > 41 && interval <= 44) {
      return Math.floor(interval) + ' минуты'
    } else if (interval > 44 && interval <= 50) {
      return Math.floor(interval) + ' минут'
    } else if (interval > 50 && interval <= 51) {
      return Math.floor(interval) + ' минуту'
    } else if (interval > 51 && interval <= 54) {
      return Math.floor(interval) + ' минуты'
    } else if (interval > 55 && interval <= 60) {
      return Math.floor(interval) + ' минут'
    }

    return Math.floor(seconds) + ' секунды'
  }

  static getDifferentDates = (messages: any) => {
    let arrayOfDate =
      messages?.map((message: any) => {
        return {
          date: message.createdAt,
          id: message.id,
        }
      }) || []
    const result = []
    let prevDateElement = {}
    let countOfMatches = 0

    for (let dateElement of arrayOfDate) {
      if (!prevDateElement) {
        prevDateElement = dateElement
        result.push(dateElement.id)
        countOfMatches++
      } else if (
        DateUtils.getDayAndMonthsFromDate(
          new Date(
            //@ts-ignore
            prevDateElement.date
          )
        ) === DateUtils.getDayAndMonthsFromDate(new Date(dateElement.date)) &&
        !countOfMatches
      ) {
        countOfMatches++
      } else {
        if (
          DateUtils.getDayAndMonthsFromDate(
            new Date(
              //@ts-ignore
              prevDateElement.date
            )
          ) === DateUtils.getDayAndMonthsFromDate(new Date(dateElement.date))
        ) {
          countOfMatches++
        } else {
          result.push(dateElement.id)
          countOfMatches = 0
          prevDateElement = dateElement
        }
      }
    }

    return result
  }
}

export default DateUtils
