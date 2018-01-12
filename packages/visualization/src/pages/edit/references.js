import React from 'react'
import { Input, Table, Button } from 'semantic-ui-react'

// TODO: test
export default ({references, onReferenceAdd, onReferenceUpdate, onReferenceRemove}) => (
  <Table>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>File name</Table.HeaderCell>
        <Table.HeaderCell>Document ID</Table.HeaderCell>
        <Table.HeaderCell>
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
            <Table.Cell>
              <div className='ui fluid transparent input'>
                <Input
                  placeholder='Type file name (local alias) here.'
                  value={fileName}
                  onChange={(_, {value}) => onReferenceUpdate(i, {fileName: value, id})}
                />
              </div>
            </Table.Cell>
            <Table.Cell>
              <div className='ui fluid transparent input'>
                <Input
                  placeholder='Paste document ID here.'
                  value={id}
                  onChange={(_, {value}) => onReferenceUpdate(i, {id: value, fileName})}
                />
              </div>
            </Table.Cell>
            <Table.Cell collapsing>
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
