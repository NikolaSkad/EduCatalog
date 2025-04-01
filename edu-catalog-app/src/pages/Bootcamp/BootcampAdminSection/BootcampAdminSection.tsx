import { useAuthStore } from '@/store/auth';
import DeleteBootcampBtn from '../DeleteBootcampBtn/DeleteBootcampBtn';
import ShowAt from '@/components/ShowAt/ShowAt';
import EditBootcampForm from '../EditBootcampForm/EditBootcampForm';
import { Bootcamp } from '@/interface/bootcamp';

interface EditBootcampInputs {
  name: string;
  description: string;
  website: string;
  email: string;
  image: string;
}

const BootcampAdminSection = ({ _id: bootcampID, user: courseOwner }: Bootcamp) => {
  const { userInfo } = useAuthStore();
  const { role, _id: userId } = userInfo || {};

  return (
    <ShowAt at={role === 'admin' || courseOwner === userId}>
      <div className="flex items-center gap-10 mb-10">
        <EditBootcampForm id={bootcampID} />
        <DeleteBootcampBtn id={bootcampID} />
      </div>
    </ShowAt>
  );
};

export default BootcampAdminSection;
