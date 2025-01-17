import { useToast } from '@chakra-ui/react'

const useShowToast = () => {
    const toast = useToast();
    const showToast = ({
        title = 'Default Title',
        description = 'Default description',
        status = 'info', 
        duration = 5000,
        isClosable = true,
      }) => {
        toast({
          title,
          description,
          status,
          duration,
          isClosable,
        });
      };
  return {showToast}
}

export default useShowToast