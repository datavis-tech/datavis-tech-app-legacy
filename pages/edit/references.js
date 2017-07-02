import { Table, Input } from 'semantic-ui-react'

const References = () => (
  <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>File name</Table.HeaderCell>
        <Table.HeaderCell>Document ID</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Table.Row>
        <Table.Cell>
          <Input transparent fluid placeholder='File name...' value='iris.csv' />
        </Table.Cell>
        <Table.Cell>
          <Input transparent fluid placeholder='Document ID...' value='92f2f3a74cb84acc9f8527317d2f39f7'/>
        </Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <Input transparent fluid placeholder='File name...' />
        </Table.Cell>
        <Table.Cell>
          <Input transparent fluid placeholder='Document ID...' />
        </Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>
)

export default References
