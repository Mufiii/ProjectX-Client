import { Typography } from '@mui/material';

const ProjectItemCreated = ({ project }) => {

  console.log(project, 'qwertyuiolkjhgfd');
  const calculateTimeAgo = (timestamp) => {
    const currentTime = new Date();
    const projectTime = new Date(timestamp);
    const timeDifference = currentTime - projectTime;

    // Calculate time units
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7); // Fix: use 'days' instead of 'weeks'

    if (seconds < 60) {
      return `${seconds} seconds ago`;
    } else if (minutes < 60) {
      return `${minutes} minutes ago`;
    } else if (hours < 24) {
      return `${hours} hours ago`;
    } else if (days < 7) {
      return `${days} days ago`;
    } else {
      return `${weeks} weeks ago`;
    }
  };

  const createdAtDate = new Date(project.created_at);

  return (
    <div>
      <Typography style={{ marginBottom: '4px' }}>
        Posted {calculateTimeAgo(createdAtDate)}
      </Typography>
    </div>
  );
};

export default ProjectItemCreated;
