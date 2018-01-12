import React from 'react'
import ProfileQuerySubscription from '../../../db/subscriptions/profileQuerySubscription'
import ReferencedBySubscription from '../../../db/subscriptions/referencedBySubscription'
import ForkedFromSubscription from '../../../db/subscriptions/documentSubscription'
import CompositeSubscription from '../../../db/subscriptions/compositeSubscription'
import {id, owner, forkedFrom} from '../../../db/accessors'
import BaseViewPageContent from '../baseViewPageContent'
import DataViewPageLayout from './layout'

export default class DataViewPageContent extends React.Component {

  constructor (props) {
    super(props)

    this.subscription = CompositeSubscription({
      profile: ProfileQuerySubscription({id: owner(props.doc)}),
      referenceDocs: ReferencedBySubscription({id: id(props.doc)}),
      forkedFrom: ForkedFromSubscription({id: forkedFrom(props.doc)}, {projection: true})
    })
  }

  render () {
    return (
      <BaseViewPageContent
        {...this.props}
        subscription={this.subscription}
        Layout={DataViewPageLayout}
      />
    )
  }

}
