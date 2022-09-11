import Error from 'next/error'
import {
  Box,
  Input,
  Divider,
  Card,
  Container,
  Text,
  Button,
  Heading,
  Flex,
  Select,
  Textarea,
  Field,
  Grid
} from 'theme-ui'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Register({ notFound, registrationRecord, params }) {
  return (
    <Container py={4} variant="copy">
      <Card
        px={[4, 4]}
        py={[4, 4]}
        sx={{
          color: 'blue',
          textAlign: 'left'
        }}
      >
        <Text sx={{ color: 'red', fontSize: '27px', fontWeight: 800, mb: 2 }}>
          Thank you for signing up!
        </Text>
        <br />
        <Text>
          ❤️ We can't wait to meet you! Make sure you check your email in
          the coming weeks for important updates. Feel free to join our{' '}
          <Text
            as={'a'}
            href="https://discord.gg/ZC6JtMHEXC"
            target="_blank"
            sx={{ color: 'purple' }}
          >
            Discord server
          </Text>{' '}
          to meet other hackers.
        </Text>
      </Card>
    </Container>
  )
}
