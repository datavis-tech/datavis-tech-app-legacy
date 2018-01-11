import React from 'react'
import { Button, Input, Popup } from 'semantic-ui-react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { getHrefForRoute } from '../../../routesUtils'

const removeWhiteSpace = str => str.replace('\n', '').replace(/ +/g, ' ').trim()

// TODO: test
export default class EmbedButton extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      copied: false,
      url: removeWhiteSpace(`
        <iframe
          src="${getHrefForRoute('embed', {id: props.id})}"
          width="8960"
          height="500"
          scrolling="no"
          style="border: 'solid 1px #ddd'"
        ></iframe>
      `)
    }

    this.copy = this.copy.bind(this)
  }

  render () {
    return (
      <Popup flowing trigger={this.renderEmbedTrigger()} on='click'>
        <Popup.Header>Embed visualization</Popup.Header>
        <Popup.Content >
          <Input ref={ref => { this.urlContainer = ref }} value={this.state.url} />
          <Popup position='bottom right' open={this.state.copied} trigger={this.renderCopyTrigger()}>
            Copied
          </Popup>
        </Popup.Content>
      </Popup>

    )
  }

  renderEmbedTrigger () {
    return <Button content='Embed' style={{marginTop: '5px'}} fluid />
  }

  renderCopyTrigger () {
    return (
      <CopyToClipboard text={this.state.url} onCopy={this.copy}>
        <Button icon='copy' />
      </CopyToClipboard>
    )
  }

  copy () {

    if (this.urlContainer) {
      this.urlContainer.inputRef.select()
    }

    this.setState({ copied: true })

    setTimeout(() => {
      this.setState({ copied: false })
    }, 2500)
  }

}
