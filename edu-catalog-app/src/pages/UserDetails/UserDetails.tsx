import { useAuthStore } from '@/store/auth';
import EditUserInfo from './EditUserInfo/EditUserInfo';
import UserInfo from './UserInfo/UserInfo';
import EditPassword from './EditPassword/EditPassword';
import PublisherBootcamps from './PublisherBootcamps/PublisherBootcamps';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import AddBootcampForm from '../Bootcamp/AddBootcampForm/AddBootcampForm';

const UserDetails = () => {
  const { userInfo } = useAuthStore();
  const navigate = useNavigate();

  if (!userInfo) {
    navigate('/');
  }

  useEffect(() => {
    if (!userInfo) {
      navigate('/');
    }
  }, [userInfo, navigate]);

  if (!userInfo) return null;

  return (
    <div className="flex justify-center min-h-screen bg-base-200 rounded-2xl">
      <div className="card-body space-y-10">
        <UserInfo {...userInfo} />
        <EditUserInfo />
        <EditPassword />
        {userInfo.role === 'publisher' && <PublisherBootcamps />}
      </div>
    </div>
  );
};

export default UserDetails;
