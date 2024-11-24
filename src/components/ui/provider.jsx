import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { ColorModeProvider } from './color-mode'

export function Provider({children, props}) {
  return (
    <ChakraProvider value={defaultSystem}>
      {/* <ColorModeProvider {...props} /> */}
      {children}
    </ChakraProvider>
  )
}
