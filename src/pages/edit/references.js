import React from 'react'
import { Table, Button } from 'semantic-ui-react'
import StringBinding from '../../components/stringBinding'
import { references } from '../../db/accessors'
import { addReference } from '../../db/actions'

class References extends React.Component {

  constructor (props) {
    super(props)
    const doc = this.props.doc

    this.state = {
      references: references(doc)
    }

    const updateState = () => {
      this.setState({
        references: references(doc)
      })
    }

    // TODO only call updateState if the op may have changed the "references" array.
    doc.on('op', updateState)
  }

  // This gets invoked when the user clicks the "Remove" button.
  // This gets invoked when the user clicks the "Add" button.
  // TODO refactor into "action"
  removeReference (index) {
    const doc = this.props.doc

    // Remove the element from the array.
    doc.submitOp([{
      p: ['references', index],
      ld: doc.data.references[index]
    }])
  }

  render () {
    const doc = this.props.doc
    return (
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>File name</Table.HeaderCell>
            <Table.HeaderCell>Document ID</Table.HeaderCell>
            <Table.HeaderCell>
              <Button floated='right' primary size='small' compact
                onClick={(event) => {
                  event.preventDefault() // Prevent form submission
                  addReference(doc)
                }}
              >
                Add
              </Button>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {
            this.state.references.map(({ fileName, id }, i) => (
              <Table.Row key={i}>
                <Table.Cell>
                  <div className='ui fluid transparent input'>
                    <StringBinding
                      type='input'
                      doc={doc}
                      path={['references', i, 'fileName']}
                      placeholder='Type file name (local alias) here.'
                    />
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <div className='ui fluid transparent input'>
                    <StringBinding
                      type='input'
                      doc={doc}
                      path={['references', i, 'id']}
                      placeholder='Paste document ID here.'
                    />
                  </div>
                </Table.Cell>
                <Table.Cell collapsing>
                  <Button floated='right' negative size='small' compact
                    onClick={(event) => {
                      event.preventDefault() // Prevent form submission
                      this.removeReference(i)
                    }}
                  >
                    Remove
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))
          }
        </Table.Body>
      </Table>
    )
  }
}

export default References
