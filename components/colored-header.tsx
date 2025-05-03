import { siteColors } from "@/data/site-content"
import type { ReactNode } from "react"

interface ColoredHeaderProps {
  h: 1 | 2 | 3 | 4 | 5 | 6
  children: string
  className?: string
}

export function ColoredHeader({ h, children, className = "" }: ColoredHeaderProps) {
  const colorizedContent = colorizeLastWordFirstLetter(children)

  switch (h) {
    case 1:
      return <h1 className={className}>{colorizedContent}</h1>
    case 2:
      return <h2 className={className}>{colorizedContent}</h2>
    case 3:
      return <h3 className={className}>{colorizedContent}</h3>
    case 4:
      return <h4 className={className}>{colorizedContent}</h4>
    case 5:
      return <h5 className={className}>{colorizedContent}</h5>
    case 6:
      return <h6 className={className}>{colorizedContent}</h6>
    default:
      return <h2 className={className}>{colorizedContent}</h2>
  }
}

// Function to colorize the first letter of the last word
function colorizeLastWordFirstLetter(title: string): ReactNode {
  const words = title.split(" ")

  const style = {
    color: siteColors.accent,
    textShadow: "0px 0px 1px " + siteColors.accent,
  }

  if (words.length === 1) {
    // If there's only one word, colorize the last letter
    const word = words[0]
    const lastLetterIndex = word.length - 1
    const beforeLastLetter = word.slice(0, lastLetterIndex)
    const lastLetter = word.charAt(lastLetterIndex)

    return (
      <>
        {beforeLastLetter}
        <span style={style}>{lastLetter}</span>
      </>
    )
  }

  // For multiple words, colorize the first letter of the last word
  const lastWord = words.pop() || ""
  const firstLetter = lastWord.charAt(0)
  const restOfLastWord = lastWord.slice(1)

  return (
    <>
      {words.join(" ")} <span style={style}>{firstLetter}</span>
      {restOfLastWord}
    </>
  )
}
