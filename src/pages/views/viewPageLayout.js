import React from 'react'
import { Grid } from 'semantic-ui-react'

export default (slots) => (
  <div>
    { slots.Header }
    { slots.Content }
    <Grid stackable columns={2} divided>
      <Grid.Row>
        <Grid.Column width={12}>
          { slots.Avatar}
          { slots.Description }
          { slots.References }
          { slots.ForkedFrom }
        </Grid.Column>
        <Grid.Column textAlign='center' width={4}>
          { slots.ViewCount }
          { slots.EditButton }
          { slots.ForkButton }
          { slots.EmbedButton }
          { slots.ExportButton }
          { slots.FullscreenButton }
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </div>
)
