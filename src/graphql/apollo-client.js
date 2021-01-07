import { ApolloClient } from 'apollo-client'

import {
  InMemoryCache,
  IntrospectionFragmentMatcher
} from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'

const apolloClient = (url, auth, language) => {
  const fragmentMatcher = new IntrospectionFragmentMatcher({
    introspectionQueryResultData: {
      __schema: {
        types: [
          {
            kind: 'INTERFACE',
            name: 'IAttachment',
            possibleTypes: [
              {
                name: 'DownloadAttachment'
              },
              {
                name: 'PreviewAttachment'
              }
            ]
          }
        ]
      }
    }
  })

  const cache = new InMemoryCache({ fragmentMatcher })
  const link = createHttpLink({ uri: url, useGETForQueries: false })

  const authLink = setContext(async (_, { headers }) => {
    return {
      headers: {
        ...headers,
        'Accept-Language': language,
        ...(auth.accessToken && {
          authorization: `Bearer ${auth.accessToken}`
        })
      }
    }
  })

  return new ApolloClient({
    link: authLink.concat(link),
    cache,
    defaultOptions: {
      mutate: {
        errorPolicy: 'all'
      }
    }
  })
}

export default apolloClient
