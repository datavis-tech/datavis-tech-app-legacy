import { Dropdown } from 'semantic-ui-react'
import { Link } from '../routes'
import { VIS_DOC_TYPE, DATA_DOC_TYPE, TECH_DOC_TYPE } from '../constants'
import { typeWords } from '../words/typeWords'

const CreateMenuItem = ({type}) => (
  <Dropdown.Item>
    <Link route='create' params={{type}}>
      <a>{typeWords[type]}</a>
    </Link>
  </Dropdown.Item>
)

export const CreateMenu = ({user}) => {
  if (user) {
    return (
      <Dropdown item text='Create'>
        <Dropdown.Menu>
          <CreateMenuItem type={DATA_DOC_TYPE} />
          <CreateMenuItem type={VIS_DOC_TYPE} />
          <CreateMenuItem type={TECH_DOC_TYPE} />
        </Dropdown.Menu>
      </Dropdown>
    )
  }
  return null
}
