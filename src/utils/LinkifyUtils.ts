//@ts-nocheck

const linkifyIt = require('linkify-it')()

linkifyIt.add('@', {
  validate: function (text: any, pos: any, self: any) {
    var tail = text.slice(pos)

    if (!self.re.twitter) {
      self.re.twitter = new RegExp(
        '^([a-zA-Z0-9_]){1,15}(?!_)(?=$|' + self.re.src_ZPCc + ')'
      )
    }
    if (self.re.twitter.test(tail)) {
      if (pos >= 2 && tail[pos - 2] === '@') {
        return false
      }
      return tail.match(self.re.twitter)[0].length
    }
    return 0
  },
  normalize: function (match) {
    match.url = '/' + match.url.replace(/^@/, '')
  },
})

export const linkify = (text: string) => {
  let result = []
  let last = 0
  let matches = linkifyIt.match(text)

  matches?.forEach(function (match: any) {
    if (last < match.index) {
      result.push(text.slice(last, match.index))
    }

    result.push(`<a target="_blank" href="${match.url}">${match.text}</a>`)
    last = match.lastIndex
  })

  if (last < text.length) {
    result.push(text.slice(last))
  }

  return result.join('')
}
