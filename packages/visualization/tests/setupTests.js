// This script runs before all tests,
// and sets up the Enzyme adapter.
// See the following related documentation:
// http://airbnb.io/enzyme/docs/installation/index.html#working-with-react-16
// https://github.com/airbnb/enzyme/issues/1265
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })
