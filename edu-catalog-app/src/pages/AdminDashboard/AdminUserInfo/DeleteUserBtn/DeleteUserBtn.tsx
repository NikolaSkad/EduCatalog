import DeleteButton from '@/components/DeleteButton/DeleteButton';
import { UserResponse } from '@/interface/user';
import { deleteUser } from '@/services/user';

const DeleteUserBtn = ({ id }: { id: string }) => {
  return (
    <DeleteButton<UserResponse['data']>
      id={id}
      mutationFn={deleteUser}
      queryKeys={[['all-users']]}
      successMessage="You successfully deleted this user!"
      errorMessage="An error occurred while deleting the user."
    />
  );
};

export default DeleteUserBtn;
