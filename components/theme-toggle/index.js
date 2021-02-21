import { useEffect, useRef, useState, Fragment } from 'react'
import Head from 'next/head'
import useAudio from '@/hooks/useAudio'
const ThemeToggle = () => {
  const [pressed, setPressed] = useState(false)
  const { play } = useAudio('/audio/chip--success.mp3')
  const toggleRef = useRef(null)
  useEffect(() => {
    document.body.className = pressed ? 'dark' : ''
    console.info('hurrah')
  }, [setPressed, pressed])
  return (
    <Fragment>
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
        console.info("TODO:: Do Dark mode things")
        `,
          }}
        />
      </Head>
      <button
        ref={toggleRef}
        aria-pressed={pressed}
        onPointerDown={() => play()}
        onClick={() => setPressed(!pressed)}>
        Toggle Theme
      </button>
    </Fragment>
  )
}

export default ThemeToggle
