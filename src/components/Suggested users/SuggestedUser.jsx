import React from 'react'
import { Avatar, Box, Flex } from "@chakra-ui/react";


const SuggestedUser = () => {
  return (
    <div className='flex items-center gap-2 my-4'>
      <Avatar src={"/img3.png"} size={"md"} name="roseline" />
        <div className='flex flex-col flex-grow gap-1'>
          <p className="font-bold">Roseline Odunze</p>
          <p className="font-light">1134 followers</p>
        </div>
        <button className=" text-sm">Follow</button>
      
    </div>
  )
}

export default SuggestedUser