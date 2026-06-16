

import ChatInterface from '../components/ChatInterface'
import styles from './Chat.module.css'

export default function Chat() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.heading}>Insights Chat</h1>
        <p className={styles.sub}>Ask any question about NovaBite sales data in plain English</p>
      </header>
      <div className={styles.chatWrap}>
        <ChatInterface />
      </div>
    </div>
  )
}
