import { useSelector } from "react-redux";
import { selectBoardDetails } from '../Redux/slices/BoardDataSlice';
// import { Avatar, AvatarGroup } from "@mui/material"

const Secondbar = () => {

  // const boardDetails = useSelector(selectBoardDetails);

  return (
    <div>
      <div style={{ backgroundColor: "gray" }} className="h-16 mt-2 w-full flex items-center justify-between">
        <div >
          <p style={{ color: "white", fontSize: "1.4em", fontWeight: "700" }} className="ml-10 flex-grow">
            {/* {boardDetails.title} */}
          </p>
          {/* <div>
            <AvatarGroup style={{size:"2px"}} max={4}>
              <Avatar  alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
              <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
              <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
              <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
            </AvatarGroup>
          </div> */}
        </div>
      </div>
    </div>
  )
}

export default Secondbar