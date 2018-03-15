import React from 'react'
import { Input, Table, Button } from 'semantic-ui-react'
import SearchReference from './searchReference'

// TODO: test
export default ({userId, references, onReferenceAdd, onReferenceUpdate, onReferenceRemove}) => (
  <Table>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell width={5}>File name</Table.HeaderCell>
        <Table.HeaderCell width={9}>Document ID</Table.HeaderCell>
        <Table.HeaderCell width={2}>
          <Button floated='right' primary size='small' compact onClick={() => onReferenceAdd()}>
            Add
          </Button>
        </Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {
        references.map(({ fileName, id }, i) => (
          <Table.Row key={i}>
            <Table.Cell width={5}>
              <div className='ui fluid transparent input'>
                <Input
                  placeholder='Type file name (local alias) here.'
                  value={fileName}
                  onChange={(_, {value}) => onReferenceUpdate(i, {fileName: value, id})}
                />
              </div>
            </Table.Cell>
            <Table.Cell width={9}>
              <div className='ui fluid transparent input'>
                <SearchReference
                  value={id}
                  userId={userId}
                  onReferenceSelect={id => onReferenceUpdate(i, {id, fileName})}
                />
              </div>
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
        ))
      }
    </Table.Body>
  </Table>
)
