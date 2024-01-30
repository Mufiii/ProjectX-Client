import { Outlet } from 'react-router-dom';
import WorkspaceBar from './WorkspaceBar.jsx';
import SideBar from '../../utils/SideBar.jsx';
import Card from '../Board/Card.jsx';
import Secondbar from '../../utils/Secondbar.jsx';

const Workspace = () => {
  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <div style={{ flex: '0 0 auto', width: '200px' }}>
        <div className='flex flex-col'>
          <WorkspaceBar />
          <Secondbar/>
        </div>
        <SideBar />
      </div>
      <div style={{ flex: '1', overflow: 'auto',marginLeft:"5em",marginTop:"3em"}}>
        <Outlet />
        <Card />
      </div>
    </div>
  );
};

export default Workspace;
