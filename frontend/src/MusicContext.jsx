import { createContext, useContext, useRef, useState } from 'react'

const MusicContext = createContext(null)

export function MusicProvider({ children }) {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const toggleMusic = async () => {
    const audio = audioRef.current
    if (!audio) return

    if (audio.paused) {
      try {
        await audio.play()
      } catch (error) {
        console.error('Unable to play music:', error)
      }
    } else {
      audio.pause()
    }
  }

  return (
    <MusicContext.Provider value={{ isPlaying, toggleMusic }}>
      <audio
        ref={audioRef}
        src="/audio/jasar-afrin-song.mp3"
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      {children}
    </MusicContext.Provider>
  )
}

export function useMusic() {
  return useContext(MusicContext)
}
