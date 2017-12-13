import React from 'react'
import ProfileQuerySubscription from '../../../db/subscriptions/profileQuerySubscription'
import ReferencesSubscription from '../../../db/subscriptions/documentSubscriptions'
import ForkedFromSubscription from '../../../db/subscriptions/documentSubscription'
import CompositeSubscription from '../../../db/subscriptions/compositeSubscription'
import {referenceIds, owner, forkedFrom} from '../../../db/accessors'
import BaseViewPageContent from '../baseViewPageContent'
import VisViewPageLayout from './layout'

export default class VisViewPageContent extends React.Component {

  constructor (props) {
    super(props)

    this.subscription = CompositeSubscription({
      profile: ProfileQuerySubscription({id: owner(props.doc)}),
      referenceDocs: ReferencesSubscription({ids: referenceIds(props.doc)}),
      forkedFrom: ForkedFromSubscription({id: forkedFrom(props.doc)}, {projection: true})
    })
  }

  render () {
    return (
      <BaseViewPageContent
        {...this.props}
        subscription={this.subscription}
        Layout={VisViewPageLayout}
      />
    )
  }

}
