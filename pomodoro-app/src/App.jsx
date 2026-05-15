import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const FOCUS_TIME = 25 * 60
  const BREAK_TIME = 5 * 60

  const [timeLeft, setTimeLeft] = useState(FOCUS_TIME)
  const [isActive, setIsActive] = useState(false)
  const [sessionType, setSessionType] = useState('Focus') // 'Focus' or 'Break'

  useEffect(() => {
    let interval = null
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      clearInterval(interval)
      // Switch session
      if (sessionType === 'Focus') {
        setSessionType('Break')
        setTimeLeft(BREAK_TIME)
      } else {
        setSessionType('Focus')
        setTimeLeft(FOCUS_TIME)
      }
      setIsActive(false)
      alert(`${sessionType === 'Focus' ? 'Focus session' : 'Break session'} is over!`)
    }
    return () => clearInterval(interval)
  }, [isActive, timeLeft, sessionType])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleStartPause = () => setIsActive(!isActive)
  
  const handleReset = () => {
    setIsActive(false)
    setSessionType('Focus')
    setTimeLeft(FOCUS_TIME)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#1a1a2e] text-white p-4">
      <div className="timer-card w-full max-w-md text-center">
        {/* Cute Mascot */}
        <div className="text-6xl mb-4 animate-bounce-slow">
          {sessionType === 'Focus' ? '🔥' : '☕'}
        </div>
        
        <h1 className="text-2xl font-bold mb-2 opacity-80 uppercase tracking-widest">
          {sessionType === 'Focus' ? 'Work Hard' : 'Chill Out'}
        </h1>
        
        <div className="text-8xl font-black mb-8 font-mono tracking-tighter text-pomodoro-accent">
          {formatTime(timeLeft)}
        </div>

        <div className="flex gap-4 justify-center">
          <button 
            onClick={handleStartPause}
            className={`btn-primary ${isActive ? 'bg-orange-500' : 'bg-pomodoro-focus'} hover:opacity-90`}
          >
            {isActive ? 'Pause' : 'Start'}
          </button>
          
          <button 
            onClick={handleReset}
            className="btn-primary bg-white/20 hover:bg-white/30"
          >
            Reset
          </button>
        </div>

        <div className="mt-8 flex justify-center gap-2">
          <div className={`h-2 w-12 rounded-full transition-all ${sessionType === 'Focus' ? 'bg-pomodoro-focus w-16' : 'bg-white/20'}`}></div>
          <div className={`h-2 w-12 rounded-full transition-all ${sessionType === 'Break' ? 'bg-pomodoro-break w-16' : 'bg-white/20'}`}></div>
        </div>
      </div>

      <footer className="mt-8 text-white/40 text-sm flex items-center gap-2">
        <span>Made by Kodari for AI 1인 기업 대표님</span>
        <span className="text-xl">🐟</span>
      </footer>
    </div>
  )
}

export default App
