import React from 'react'
import { Button } from 'semantic-ui-react'
import { Link } from '../../../routes'

export default (params) => (
  <Link route='edit' params={params}>
    <a>
      <Button fluid>Edit</Button>
    </a>
  </Link>
)
