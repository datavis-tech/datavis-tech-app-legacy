import React from 'react'
import marked from 'marked'

/**
 * This component provides default description for view pages
 */
export default function ({doc}) {
  return (
    <div dangerouslySetInnerHTML={{__html: marked(doc.data.description)}} />
  )
}
