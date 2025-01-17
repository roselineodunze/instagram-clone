import { Box, Container } from '@chakra-ui/react'
import React from 'react'
import FeedPosts from '../../components/FeedPosts/FeedPosts'
import SuggestedUsers from '../../components/Suggested users/SuggestedUsers'

const HomePage = () => {
  return (
    <Container maxW={"container.lg"}>
      <div className='flex w-full gap-7'>
        <Box flex={2} pt={{base: 9, md: 20}}>
          <FeedPosts/>
        </Box>
        <Box flex={3} maxW={"350px"}
        display={{base:"none", lg:"block"}}
        >
          <SuggestedUsers/>
        </Box>
      </div>
    </Container>
  )
}

export default HomePage