// TODO delete/archive this file
import {
  Card,
  Image,
  List
} from 'semantic-ui-react'

export default ({title, description, img, links}) => (
  <Card centered>
    <a href={links[0].href}>
      <Image src={img} />
    </a>
    <Card.Content>
      <Card.Header>
        {title}
      </Card.Header>
      <Card.Description>
        {description}
      </Card.Description>
      <List>
        {
          links.map(({icon, href, title}, i) => (
            <List.Item key={i}>
              <List.Icon name={icon} />
              <List.Content>
                <a href={href}>{title}</a>
              </List.Content>
            </List.Item>
          ))
        }
      </List>
    </Card.Content>
  </Card>
)
