// A testing page for ShareDB.
// Draws from
//   https://github.com/share/sharedb/blob/master/examples/textarea/client.js

import { Header, Container } from 'semantic-ui-react'
import { PublicPage } from 'next-github-auth'
import Layout from '../components/layout'
import NavbarSecret from '../components/navbarSecret'

import sharedb from 'sharedb/lib/client'
import StringBinding from 'sharedb-string-binding'
import ReconnectingWebSocket from 'reconnecting-websocket'

class Editor extends React.Component {

  shouldComponentUpdate(nextProps) {
    return nextProps.doc !== this.props.doc
  }

  render() {
    if(!this.props.docInitialized){
      return <div>Loading...</div>
    }
    return (
      <textarea
        style={{
          width: '100%',
          height: '500px',
          fontFamily: 'mono'
        }}
        ref={(el) => {
          if(el) {
            new StringBinding(el, this.props.doc).setup()
          } else {
            // TODO handle unmounting
          }
        }}
      />
    )
  }
}

const Runner = ({content}) => (
  <iframe
    style={{
      height: '300px',
      width: '100%',
      border: 'solid 1px #ddd'
    }}
    srcDoc={content}
  />
)

class Pad extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      docInitialized: false
    }
    if(process.browser){
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
      const socket = new ReconnectingWebSocket(protocol + window.location.host)
      const connection = new sharedb.Connection(socket)
      const doc = connection.get('examples', 'textarea')

      doc.subscribe((err) => {
        if (err) {
          console.error(err)
        }
        if (doc.type === null) {
          doc.create('')
        }
        this.setState({
          docInitialized: true,
          doc,
          content: doc.data
        })
        doc.on('op', (op) => {
          this.setState({
            content: doc.data
          })
        })
      })
    }
  }

  render() {
    return (
      <Layout NavbarComponent={NavbarSecret}>
        <div style={{marginTop: '5px'}} />
        <Runner content={this.state.content}/>
        <Editor docInitialized={this.state.docInitialized} doc={this.state.doc}/>
      </Layout>
    )
  }
}

export default PublicPage(Pad)
