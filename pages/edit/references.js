import React from 'react'
import { Table, Input, Button } from 'semantic-ui-react'

class References extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      references: props.doc.data.references || []
    }

    const updateState = () => {
      this.setState({
        references: props.doc.data.references || []
      })
    }

    // This gets invoked when the user clicks the "Add" button.
    this.addReference = (event) => {
      event.preventDefault() // Prevent form submission

      const doc = this.props.doc

      // If references is undefined, then create an empty array.
      if (!doc.data.references) {
        doc.submitOp([{p: ['references'], oi: []}])
      }

      // Push an empty reference object onto the references array.
      doc.submitOp([{p: ['references', doc.data.references.length], li: {
        fileName: '',
        id: ''
      }}])

      updateState()
    }
  }

  render () {
    return (
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>File name</Table.HeaderCell>
            <Table.HeaderCell>Document ID</Table.HeaderCell>
            <Table.HeaderCell>
              <Button onClick={this.addReference} floated='right' primary size='small' compact>
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
                  <Input transparent fluid placeholder='File name...' value={fileName} />
                </Table.Cell>
                <Table.Cell>
                  <Input transparent fluid placeholder='Document ID...' value={id}/>
                </Table.Cell>
                <Table.Cell collapsing>
                  <Button floated='right' negative size='small' compact>
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
