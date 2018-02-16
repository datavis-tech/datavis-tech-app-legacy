import React from 'react'
import { Button } from 'semantic-ui-react'
import { getHrefForRoute } from '../../../routesUtils'

export default ({id}) => (
  <Button as='a' href={`${getHrefForRoute('export', {id})}`} content='Export' style={{marginTop: '5px'}} fluid />
)
