import React from 'react'
import Page from '../components/page'

class ViewPage extends React.Component {
  static async getInitialProps ({ query }) {
    return { id: query.id }
  }

  render () {
    const { id, user } = this.props

    const userJSON = JSON.stringify(user, null, 2)

    return (
      <div>
        <h1>{id}</h1>
        <pre>{userJSON}</pre>
      </div>
    )
  }
}

export default Page(ViewPage)
