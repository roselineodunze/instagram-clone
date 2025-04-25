import { Image } from "@chakra-ui/react";
import { Wrench } from "lucide-react";
import { useParams } from "react-router-dom";


const FunctionalityNotReady = () => {
  const { username } = useParams();

  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="flex items-center gap-2">
        <Wrench className="h-10 w-10 text-gray-500"/>
        <div>
          <h3 className="text-lg font-bold text-gray-300">This functionality is not ready yet.</h3>
          <p className="text-base font-semibold text-gray-300">Check back later 🙂</p>
        </div>
      </div>
    </div>
  )
}

export default FunctionalityNotReady