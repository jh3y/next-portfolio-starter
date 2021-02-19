import { useEffect, useState } from 'react'

const useAudio = (src) => {
  const [audio, setAudio] = useState(null)
  useEffect(() => {
    setAudio(new Audio(src))
  }, [src])
  return {
    play: () => audio.play(),
  }
}
export default useAudio
