import { Typography } from '@mui/material'
import React from 'react'

const Secondbar = () => {


  return (
    <div>
      <div style={{ backgroundColor: "gray"}} className="h-14  flex items-center justify-between">
          <div className="flex mt-96 w-[106.6em] items-center px-8 space-x-5">
              <div>
                  <Typography>
                      Board Name
                  </Typography>
              </div>
          </div>
      </div>
    </div>
  )
}

export default Secondbar