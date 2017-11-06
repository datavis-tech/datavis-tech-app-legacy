/**
 * Auto Completer Component to display list on the basis of user input 
 * using provided renderer and query
 */

import React from 'react'
import PropTypes from 'prop-types'

import { Form, Search, Label } from 'semantic-ui-react'
import { AUTOCOMPLETER_LIMIT } from '../../constants'

export default class AutoCompleter extends React.Component {

  constructor (props) {
    super(props)

    this.state = this.getInitialState()

    this.reset = this.reset.bind(this)
    this.sendResult = this.sendResult.bind(this)

    this.handleResultSelect = this.handleResultSelect.bind(this)
    this.handleSearchChange = this.handleSearchChange.bind(this)
  }

  getInitialState () {
    return {
      loading: false,
      results: [],
      value: ''
    }
  }

  // Reset the Search Filter
  reset () {
    this.setState(this.getInitialState())
  }

  // sending result back to parent component
  sendResult (result) {
    const { field, onInput } = this.props
    onInput({field, result})
  }

  // Handling Result selection
  handleResultSelect (e, { result }) {
    this.setState({
      value: result.title
    })

    this.sendResult(result)
  }

  handleSearchChange (e, { value }) {

    // Setting Loader
    this.setState({
      loading: true,
      value
    })

    if (value.length < 1) {
      this.sendResult(null)
      return this.reset()
    }

    console.log(this.props.resultSource)
    this.props.resultSource.init({value}, {
      onUpdate: (results) => {
        console.log(results)
        // Rendering the fetched results
        this.setState({
          loading: false,
          results: results
        })
      }
    })
  }

  render () {

    const { resultRenderer, label } = this.props

    return (
      <Form.Field>
        <label>{label}</label>
        <Search
          {...this.state}
          resultRenderer={resultRenderer}
          onResultSelect={this.handleResultSelect}
          onSearchChange={this.handleSearchChange}
          fluid
        />
      </Form.Field>
    )
  }
}

AutoCompleter.propTypes = {
  label: PropTypes.string,
  field: PropTypes.string.isRequired,
  resultRenderer: PropTypes.func,
  resultSource: PropTypes.func.isRequired,
  onInput: PropTypes.func.isRequired
}

AutoCompleter.defaultProps = {
  label: '',
  resultRenderer: ({ title }) => <Label content={title} />
}
