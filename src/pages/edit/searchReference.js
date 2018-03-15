import React from 'react'
import { Search } from 'semantic-ui-react'
import queryReferencesForCompletion from '../../db/queries/queryReferencesForCompletion'

export default class SearchReference extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      isOpen: false,
      isLoading: false,
      value: props.value,
      results: []
    }

    this.onSearchChange = this.onSearchChange.bind(this)
    this.onResultSelect = this.onResultSelect.bind(this)
  }

  render () {
    return (
      <Search
        style={{width: '100%'}}
        input={{ icon: 'search', iconPosition: 'left', placeholder: 'Start typing or paste document ID here.' }}
        open={this.state.isOpen}
        loading={this.state.isLoading}
        value={this.state.value}
        results={this.state.results}
        onSearchChange={this.onSearchChange}
        onResultSelect={this.onResultSelect}
      />
    )
  }

  async onSearchChange (event, { value: pattern }) {
    this.setState({ isLoading: true, value: pattern })
    const results = await queryReferencesForCompletion(this.props.userId, pattern)
    this.setState({ results, isLoading: false, isOpen: true })
  }

  onResultSelect (event, { result }) {
    this.props.onReferenceSelect(result.id)
    this.setState({ value: result.id, isOpen: false })
  }

}
