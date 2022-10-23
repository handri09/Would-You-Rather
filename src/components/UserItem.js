import { Avatar } from '@material-ui/core';

function UserItem (props) {
  const { name, wrote, answered,total, user } = props;
  return (
    <div className="user">
      <Avatar alt={name} src={user.avatarURL} className="avatar" />
        <div className='user-info'>
          <div>
            <span>{name}</span>
            <li>Has written <strong>{wrote}</strong> questions, and has answered <strong>{answered}</strong> questions. Total Score = <strong>{total}</strong></li>
          </div>
        </div>
      <Avatar>{total}</Avatar>
    </div>
  );
}

export default UserItem;