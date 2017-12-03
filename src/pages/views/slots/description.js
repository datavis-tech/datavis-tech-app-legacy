import React from 'react'
import marked from 'marked'
import { description } from '../../../db/accessors'

/**
 * This component provides default description for view pages
 */
export default function ({doc}) {
  return (
    <div dangerouslySetInnerHTML={{
      __html: marked(description(doc))
    }} />
  )
}
