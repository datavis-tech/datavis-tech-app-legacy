import React from 'react'
import { Header } from 'semantic-ui-react'
import { title } from '../../../db/accessors'

export default ({doc}) => <Header as='h1'>{title(doc)}</Header>
