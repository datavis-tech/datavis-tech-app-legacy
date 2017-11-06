import {Loader} from 'semantic-ui-react'

// This component provides a spinning loading indicator.
export default ({ready, children}) => (
  ready
    ? children
    : <Loader active inline='centered' />
)
