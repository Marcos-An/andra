import styles from './dotsLoading.module.scss'

export function DotsLoading({ color = 'var(--primary)' }: { color?: string }) {
  return (
    <div className="flex justify-center items-center m-auto h-5">
      <div className={styles.dot} style={{ backgroundColor: color }}></div>
      <div className={styles.dot} style={{ backgroundColor: color }}></div>
      <div className={styles.dot} style={{ backgroundColor: color }}></div>
    </div>
  )
}
