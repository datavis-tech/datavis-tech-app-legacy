import React from 'react'
import { Grid } from 'semantic-ui-react'

export default (slots) => (
  <div>
    {slots.Header}
    {slots.Content}
    <Grid columns={2} divided>
      <Grid.Row>
        <Grid.Column width={12}>
          {slots.Description}
          {slots.References}
          {slots.ForkedFrom}
        </Grid.Column>
        <Grid.Column width={4}>
          {slots.Avatar}
          {slots.EditButton}
          {slots.ForkButton}
          {slots.EmbedButton}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </div>
)
