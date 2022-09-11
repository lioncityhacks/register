import * as React from 'react'
import NextApp from 'next/app'
import '../styles/app.css'
import theme from '../lib/theme'
import { ThemeProvider } from 'theme-ui'
import ForceTheme from '../components/force-theme'
import NProgress from '../components/nprogress'
import Meta from '../components/meta'
import Head from 'next/head'

export default class App extends NextApp {
  render() {
    const { Component, pageProps } = this.props
    return (
      <ThemeProvider theme={theme}>
        <Meta
          as={Head}
          name="Register for Lion City Hacks!" // site name
          title="Register for Lion City Hacks!" // page title
          description="" // page description
          image="https://cloud-1pe4a62r6-hack-club-bot.vercel.app/0compressed-bg.jpg" // large summary card image URL
          color="#ec3750" // theme color
        />
        <NProgress color={'#ec3750'} />
        <ForceTheme theme="light" />
        <div
          style={{
            position: 'relative',
            top: 0,
            left: 0,
            height: '100vh',
            width: '100vw'
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 1,
              height: '100vh',
              width: '100vw',
              backgroundImage: 'linear-gradient(144deg, rgba(23,23,29,0.7) 0%, rgba(23,23,29,0.9) 100%), linear-gradient(144deg, rgba(236,55,80,0.5) 0%, rgba(255,140,55,0.5) 100%), url("https://cloud-fn342sml8-hack-club-bot.vercel.app/0screenshot_2022-08-30_at_11.42.24_pm.jpg")',
              backgroundSize: 'cover',
              backgroundPosition: 'bottom-left',
              overflowY: 'scroll'
            }}
          >
            <Component {...pageProps} />
          </div>
        </div>
        <style>
          {`
         
          * {
            box-sizing: border-box;
          }
        `}
        </style>
      </ThemeProvider>
    )
  }
}
