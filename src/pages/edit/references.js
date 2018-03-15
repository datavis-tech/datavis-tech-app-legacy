import React from 'react'
import { Table, Button } from 'semantic-ui-react'

// TODO: test
export default ({
  references,
  onReferenceAdd,
  onReferenceRemove
}) => (
  <Table>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell width={5}>File name</Table.HeaderCell>
        <Table.HeaderCell width={9}>Document ID</Table.HeaderCell>
        <Table.HeaderCell width={2}>
          <Button
            floated='right'
            primary
            size='small'
            compact
            onClick={() => onReferenceAdd()}
          >
                        Add
          </Button>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {references.map(({ fileName, id }, i) => (
        <Table.Row key={i}>
          <Table.Cell width={5}>
            <div className='ui fluid transparent'>{fileName}</div>
          </Table.Cell>
          <Table.Cell width={9}>
            <div className='ui fluid transparent'>{id}</div>
          </Table.Cell>
          <Table.Cell width={2} collapsing>
            <Button
              floated='right'
              negative
              size='small'
              compact
              onClick={() => onReferenceRemove(i)}
            >
                            Remove
            </Button>
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
)
