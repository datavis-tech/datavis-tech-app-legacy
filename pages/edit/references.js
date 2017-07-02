import { Table, Input, Button } from 'semantic-ui-react'

class References extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      references: [
        {
          fileName: 'iris.cskv',
          id: '92f2f3a74cb84acc9f8527317d2f39f7'
        }
      ]
    }
  }

  render () {
    return (
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>File name</Table.HeaderCell>
            <Table.HeaderCell>Document ID</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {
            this.state.references.map(({ fileName, id}, i) => (
              <Table.Row key={id}>
                <Table.Cell>
                  <Input transparent fluid placeholder='File name...' value={fileName} ref={(el) => console.log(el)}/>
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
        <Table.Footer fullWidth>
          <Table.Row>
            <Table.HeaderCell colSpan='3'>
              <Button floated='right' primary size='small' compact>
                Add
              </Button>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    )
  }
}

export default References
