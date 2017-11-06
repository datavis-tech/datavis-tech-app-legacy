/**
 * Auto Completer Component to display list on the basis of user input 
 * using rendrer and query
 */

import React from 'react'
import { Form, Search } from 'semantic-ui-react'

import _ from 'lodash'

import { AUTOCOMPLETER_LIMIT } from '../../constants'

export default class AutoCompleter extends React.Component {

  constructor (props) {
    super(props)
  }
 
  //Initialize search filter with default as close
  componentWillMount() {
    this.resetComponent()
  }

  //Reset the Search Filter
  resetComponent = (settings = {}) => {
    const { field } = this.props
    
    this.setState({
      isLoading: false, 
      results: [], 
      value: ''
    })

    this.props.onSelect({field, result: null})
  }

  //open the modal
  open = (event) => {
    event.preventDefault() // Prevent form submission.
    this.setState({
      show: true
    })
  }

  // Close the modal
  close = () => {
    this.setState({
      show: false
    });
  }

  //Handling Result selection
  handleResultSelect = (e, { result }) => {
    const { field } = this.props
    
    this.setState({ 
      value: result.title 
    }) 
    
    this.props.onSelect({field, result})
  }
  
  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })
    if (value.length < 1) return this.resetComponent()
    
    this.props.resultSource({
        username: {$regex: `^${this.state.value}`}, 
        $limit: AUTOCOMPLETER_LIMIT
      }, (results) => {
      this.setState({
        isLoading: false,
        results: results,
      })
    });
  }

  render () {
    const {
      open,
      close,
      state: { isLoading, show, results, value, selected }
    } = this

    const { title, resultRenderer } = this.props;
    
    return (
      <Form.Field>
        <label>Username</label>
        <Search
          resultRenderer = {resultRenderer}
          loading={isLoading}
          fluid
          onResultSelect={this.handleResultSelect}
          onSearchChange={this.handleSearchChange}
          results={results}
          value={value}
        />
      </Form.Field>
    )
  }
}
