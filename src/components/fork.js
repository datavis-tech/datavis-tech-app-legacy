import React from 'react'
import { Router } from '../routes'
import { fork } from '../db/actions'
import { id } from '../db/accessors'

export default class Fork extends React.Component {

  constructor (props) {
    super(props)
    this.onFork = () => Router.pushRoute('edit', {id: id(fork(props.doc, props.user.id))})
  }

  render () {
    return this.props.children({onFork: this.onFork})
  }

}
