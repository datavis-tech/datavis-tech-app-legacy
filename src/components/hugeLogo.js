import { Container, Image } from 'semantic-ui-react'
import Link from 'next/link'

const LinkMaybe = ({ noLink, children }) => {
  if (noLink) {
    return children
  }
  return (
    <Link href='/'>
      <a>
        {children}
      </a>
    </Link>
  )
}

// This component provides a large image of the Datavis.tech logo.
export default ({ noLink }) => (
  <Container textAlign='center'>
    <LinkMaybe noLink={noLink}>
      <Image src='/static/images/Logo_Largest.png' />
    </LinkMaybe>
  </Container>
)
