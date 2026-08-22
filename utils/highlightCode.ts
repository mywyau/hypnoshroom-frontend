import hljs from 'highlight.js/lib/core'
import bash from 'highlight.js/lib/languages/bash'
import java from 'highlight.js/lib/languages/java'
import javascript from 'highlight.js/lib/languages/javascript'
import plaintext from 'highlight.js/lib/languages/plaintext'
import python from 'highlight.js/lib/languages/python'
import scala from 'highlight.js/lib/languages/scala'
import sql from 'highlight.js/lib/languages/sql'
import typescript from 'highlight.js/lib/languages/typescript'
import xml from 'highlight.js/lib/languages/xml'

hljs.registerLanguage('bash', bash)
hljs.registerLanguage('java', java)
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('plaintext', plaintext)
hljs.registerLanguage('python', python)
hljs.registerLanguage('scala', scala)
hljs.registerLanguage('sql', sql)
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('xml', xml)

const languageFor = (label: string) => {
  const language = label.toLowerCase()

  if (language.includes('scala') || language.includes('sbt')) return 'scala'
  if (language.includes('typescript')) return 'typescript'
  if (language.includes('javascript')) return 'javascript'
  if (language.includes('python')) return 'python'
  if (language.includes('java')) return 'java'
  if (language.includes('sql')) return 'sql'
  if (language.includes('xml')) return 'xml'
  if (language.includes('shell') || language.includes('bash') || language.includes('redis')) return 'bash'

  return 'plaintext'
}

export const highlightCode = (source: string, languageLabel: string) =>
  hljs.highlight(source, {
    language: languageFor(languageLabel),
    ignoreIllegals: true,
  }).value
