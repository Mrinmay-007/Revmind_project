
import styles from './KPICard.module.css'

export default function KPICard({ label, value, sub, accent = false }) {
  return (
    <div className={`${styles.card} ${accent ? styles.accent : ''}`}>
      <p className={styles.label}>{label}</p>
      <p className={styles.value}>{value}</p>
      {sub && <p className={styles.sub}>{sub}</p>}
    </div>
  )
}
