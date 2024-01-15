import { Outlet } from 'react-router-dom';
import WorkspaceBar from './WorkspaceBar.jsx';
import SideBar from '../../utils/SideBar.jsx';



const Workspace = () => {

  return (
    
    <div>
        <WorkspaceBar/>
        <div className='flex'>
          <SideBar />
          <Outlet />
        </div>
    </div>
  );
};

export default Workspace;
