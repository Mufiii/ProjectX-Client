import { useSelector } from "react-redux";
import { selectBoardDetails } from '../Redux/slices/BoardDataSlice';

const Secondbar = () => {

  const boardDetails = useSelector(selectBoardDetails);

  return (
    <div>
      <div style={{ backgroundColor: "gray" }} className="h-16 mt-2 w-full flex items-center justify-between">
        {/* <div className="flex mt-96 w-[106.6em] items-center px-8 space-x-5">
        </div> */}
        <p style={{ color: "white", fontSize: "1.4em", fontWeight: "700" }} className="ml-10 text-center flex-grow">
          {boardDetails.title}
        </p>
      </div>
    </div>
  )
}

export default Secondbar