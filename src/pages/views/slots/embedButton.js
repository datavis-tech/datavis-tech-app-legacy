import React from 'react'
import routes from '../../../routes'
import { Button, Popup } from 'semantic-ui-react'

// TODO: test

const Trigger = <Button content='Embed' style={{marginTop: '5px'}} fluid />

export default ({id}) => (
  <Popup flowing trigger={Trigger} on='click'>
    <Popup.Header>Embed visualization</Popup.Header>
    <Popup.Content />
    <code>{`<iframe src="https://datavis.tech${routes.findByName('vis').getAs({id})}/embed" width="960" height="500"></iframe>`}</code>
  </Popup>
)
