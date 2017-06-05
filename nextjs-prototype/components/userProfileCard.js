import {
  Card,
  Image,
  List
} from 'semantic-ui-react'

export default ({name, img, links, description}) => (
  <Card centered>
    <Image src={img}/>
    <Card.Content>
      <Card.Header>
        {name}
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
