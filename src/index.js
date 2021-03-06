import React from 'react'
import styles from './styles.module.css'

export const ExampleComponent = ({ text }) => {
  return <div className={styles.test}>Example Component: {text}</div>
}

export { default as apolloClient } from './graphql/apollo-client'

export { default as useDevice } from './hooks/useDevice'
