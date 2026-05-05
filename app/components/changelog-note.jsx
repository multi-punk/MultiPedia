import clsx from 'clsx'
import styles from './changelog-note.module.css'

/** Акцентный блок под стиль «плашки» из Telegram — стили через CSS Modules (без глобального Tailwind). */
export function ChangelogNote({ children, className }) {
  return (
    <div className={clsx(styles.wrap, className)}>
      {children}
    </div>
  )
}
