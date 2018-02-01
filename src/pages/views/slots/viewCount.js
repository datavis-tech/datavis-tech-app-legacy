import { Statistic } from 'semantic-ui-react'

// TODO: test
export default ({ viewCount }) => (
  <Statistic horizontal size='small'>
    <Statistic.Value>{viewCount}</Statistic.Value>
    <Statistic.Label>Views</Statistic.Label>
  </Statistic>
)
