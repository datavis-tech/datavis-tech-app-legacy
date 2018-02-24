import React from 'react'
import { Button } from 'semantic-ui-react'
import { getHrefForRoute } from '../../../routesUtils'

const defaultStyle = { marginTop: '5px' }

export default ({id, style}) => (
  <Button
    as='a'
    href={`${getHrefForRoute('embed', {id})}`}
    content='Fullscreen'
    target='_blank'
    style={Object.assign({}, defaultStyle, style)}
    fluid
  />
)
