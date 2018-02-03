import { Statistic } from 'semantic-ui-react'
import { format } from 'd3-format'

const commaFormat = format(',')

export default ({ viewCount }) => (
  <Statistic horizontal size='small' style={{ marginTop: '0.2em', marginBottom: '0.7em' }}>
    <Statistic.Value>
      {commaFormat(viewCount)}
    </Statistic.Value>
    <Statistic.Label>
      Views
    </Statistic.Label>
  </Statistic>
)
