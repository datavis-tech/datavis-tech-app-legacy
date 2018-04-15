import { Container, List } from 'semantic-ui-react'
import { Link } from '../routes'

export default ({ children, title, user, hideNav }) => (
  <Container fluid textAlign='center' style={{ paddingTop: '40px' }} >
    <List bulleted horizontal link>
      <List.Item>
        <Link route='about'>
          <a>About</a>
        </Link>
      </List.Item>
      <List.Item>
        <a href='https://github.com/datavis-tech/community/blob/master/README.md'>Community</a>
      </List.Item>
      <List.Item>
        <Link route='pricing'>
          <a>Pricing</a>
        </Link>
      </List.Item>
      <List.Item>
        <a href='static/legal/Terms of Use.pdf'>Terms of Use</a>
      </List.Item>
      <List.Item>
        <a href='static/legal/Privacy Policy.pdf'>Privacy Policy</a>
      </List.Item>
    </List>
  </Container>
)

// An alternative design
//  <Container>
//    <List floated='right' horizontal bulleted>
//      <List.Item disabled href='#'>© Datavis Tech, Inc.</List.Item>
//      <List.Item href='static/legal/Terms of Use.pdf'>Terms</List.Item>
//      <List.Item href='static/legal/Privacy Policy.pdf'>Privacy</List.Item>
//      <List.Item href='mailto:curran@datavis.tech'>Contact</List.Item>
//    </List>
//
//    <List horizontal bulleted>
//      <List.Item>
//        <Link route='about'>
//          <a>About</a>
//        </Link>
//      </List.Item>
//
//      <List.Item>
//        <a href='https://github.com/datavis-tech/community/blob/master/README.md'>Community</a>
//      </List.Item>
//
//      <List.Item>
//        <Link route='pricing'>
//          <a>Pricing</a>
//        </Link>
//      </List.Item>
//    </List>
//  </Container>
