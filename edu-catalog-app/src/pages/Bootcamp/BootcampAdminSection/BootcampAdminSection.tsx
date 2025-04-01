import { useAuthStore } from '@/store/auth';
import DeleteBootcampBtn from '../DeleteBootcampBtn/DeleteBootcampBtn';
import ShowAt from '@/components/ShowAt/ShowAt';
import EditBootcampForm from '../EditBootcampForm/EditBootcampForm';

interface EditBootcampInputs {
  name: string;
  description: string;
  website: string;
  email: string;
  image: string;
}

const BootcampAdminSection = ({ id }: { id: string }) => {
  const { userInfo } = useAuthStore();
  const { role } = userInfo || {};

  return (
    <ShowAt at={role === 'admin'}>
      <div className="flex items-center gap-10 mb-10">
        <EditBootcampForm id={id} />
        <DeleteBootcampBtn id={id} />
      </div>
    </ShowAt>
  );
};

export default BootcampAdminSection;
