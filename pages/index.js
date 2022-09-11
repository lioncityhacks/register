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
import Icon from '@hackclub/icons'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { manifest, requiredList } from '../lib/manifest.js'
import nookies from 'nookies'
import { useRouter } from 'next/router'
import { toast, ToastContainer } from 'react-nextjs-toast'

export default function Register({ notFound, registrationRecord, params }) {
  const [data, setData] = useState({})
  const [disabled, setDisabled] = useState(false);

  let keys = manifest.questions.flatMap(x => x.items.map(y => y.key))

  const router = useRouter()

  if (notFound) {
    return <Error statusCode="404" />
  }
  return (
    <Container py={4} variant="copy">
      <ToastContainer align="right" />
      <Card
        px={[4, 4]}
        pb={[3, 3]}
        pt={["20px", "20px"]}
        sx={{
          color: 'blue',
          textAlign: 'left'
        }}
      >
        <Box sx={{ display: ['block', 'flex'], alignItems: 'center' }}>
          <Flex sx={{ alignItems: 'center', flexGrow: 1 }}>
            <Text
              variant="subheadline"
              sx={{
                fontWeight: 900,
                mb: 0,
                flexGrow: 1,
                ml: 2,
                textAlign: 'center',
                fontSize: 4,
                textDecoration: 'underline',
                color: 'orange'
              }}
              as="div"
            >
              Register for{' '}
              <Text
                sx={{
                  textDecoration: 'none',
                  color: 'orange',
                  cursor: 'pointer'
                }}
                onClick={() => window.open('https://hack.innovationcircuit.com')}
              >
                🦁 Lion City Hacks
              </Text>
              !
            </Text>
          </Flex>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              cursor: 'pointer',
              '> svg': { display: ['none', 'inline'] },
              mt: [2, 0]
            }}
            onClick={() => poster()}
          ></Box>
        </Box>
      </Card>
      <Card px={[4, 4]} py={[4, 4]} mt={4}>
        <Box bg="sunken" p={3} mb={3} sx={{ borderRadius: 3 }}>
          Dear hacker,
          <br />
          <br />
          We're inviting you to Lion City Hacks, a hackathon for teenagers in Singapore, on December 3rd. Join us for twelve hours of hacking, workshops & friendship.
          <br />
          <br />
          📅 Date & Time: Starts at 9:00am and ends at 9:00pm on December 3rd.
          <br />
          <br />
          📍 Venue: to be confirmed, watch this space!
          <br />
          <br />
          👋 Eligibility: all secondary, pre-university and JC students are welcome to join (no experience required!).
          <br />
          <br />
          🦠 COVID-19: We require all participants to be vaccinated against COVID-19 or to have a medical exemption. We will be providing participants with N95 masks.
          <br />
          <br />
          We're so excited to meet you at Lion City Hacks this December. Please fill out
          the registration form below to help us make the event magical for you.
          Feel free to contact{' '}
          <a href="mailto:contact@innovationcircuit.com">contact@innovationcircuit.com</a> for
          help!
        </Box>
        {manifest.questions.map((sectionItem, sectionIndex) => {
          if (typeof sectionItem.check != 'undefined') {
            if (sectionItem.check(data)) {
              return null
            }
          }
          return (
            <Box
              key={sectionIndex}
              sx={{ mb: sectionIndex == manifest.questions.length -1 ? 4 : 5, mt: sectionIndex == 0 ? 4 : 5 }}
            >
              <Box sx={{ textAlign: 'left', mb: 2 }}>
                <Text sx={{ color: 'red', fontSize: '27px', fontWeight: 800 }}>
                  {sectionItem['header']}
                </Text>
              </Box>
              <Box>
                {sectionItem.label && (
                  <Box sx={{ color: 'muted', mb: 3 }}>
                    {sectionItem['label']}
                  </Box>
                )}
                {sectionItem.items.map((item, index) => {
                  if (typeof item.check != 'undefined') {
                    if (item.check(data)) {
                      return null
                    }
                  }
                  return (
                    <Box
                      mt={1}
                      mb={4}
                      key={'form-item-' + sectionIndex + '-' + index}
                    >
                      <Field
                        label={
                          <>
                            <Text
                              mb={1}
                              sx={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px'
                              }}
                            >
                              {item['label']}{' '}
                              <Text
                                as="small"
                                sx={{
                                  color: 'muted',
                                  display: item.optional ? 'inline' : 'none',
                                  fontSize: '13px'
                                }}
                              >
                                (Optional)
                              </Text>
                            </Text>
                            {item.sublabel && (
                              <Text
                                sx={{
                                  fontSize: '15px',
                                  color: '#555',
                                  fontWeight: '500',
                                  mb: 2
                                }}
                                as="p"
                              >
                                {item['sublabel']}
                              </Text>
                            )}
                          </>
                        }
                        onChange={e => {
                          let newData = {}
                          newData[item.key] = e.target.value
                          setData({ ...data, ...newData })
                        }}
                        placeholder={item['placeholder']}
                        as={
                          item.type == 'string'
                            ? Input
                            : item.type == 'paragraph'
                            ? Textarea
                            : item.inputType == 'checkbox'
                            ? Input
                            : Select
                        }
                        type={item.inputType}
                        required={!item.optional}
                        value={
                          data[item.key] !== undefined ? data[item.key] : ''
                        }
                        sx={{
                          border: '1px solid',
                          borderColor: 'rgb(221, 225, 228)',
                          resize: 'vertical',
                          display:
                            item.inputType == 'checkbox'
                              ? '-webkit-box'
                              : 'block'
                        }}
                        {...(item.type == 'select'
                          ? item.options
                            ? {
                                children: (
                                  <>
                                    <option value="" disabled>
                                      Select One
                                    </option>
                                    {item['options'].map(option => (
                                      <option key={option}>{option}</option>
                                    ))}
                                  </>
                                )
                              }
                            : {
                                children: <></>
                              }
                          : {})}
                      />
                      {item.words && (
                        <Text
                          sx={{ fontSize: '18px', color: 'muted', mt: 1 }}
                          as="p"
                        >
                          ( Aim for about {item.words} words
                          {data[item.key] &&
                          ', ' +
                            data[item.key].split(' ').length +
                            ' ' +
                            data[item.key].split(' ').length ==
                            1
                            ? 'word'
                            : 'words' + ' ' + 'so far.'}
                          )
                        </Text>
                      )}
                    </Box>
                  )
                })}
              </Box>
            </Box>
          )
        })}
        <Button
          onClick={() => {
            setDisabled(true);
            toast.notify('Submitting your registration...', { duration: 60, title: 'Working...' })
            console.log(data)
            fetch('/api/submit', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
            })
              .then(response => response.json())
              .then(
                ({ success, error }) => {
                  setDisabled(false);
                  success ? window.location.replace('/success') : toast.notify(error, { type: 'error', title: 'Oops!', duration: 60 })
                }
              )
          }}
          style={{
             filter: disabled ? 'grayscale(1)' : 'grayscale(0)',
           }}
           disabled={disabled}
        >
          Submit
        </Button>
      </Card>
    </Container>
  )
}
