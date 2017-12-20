import React from 'react'
import marked from 'marked'

/**
 * This component provides default description for view pages
 */
export default function ({description}) {
  return (
    <div dangerouslySetInnerHTML={{
      __html: marked(description)
    }} />
  )
}
