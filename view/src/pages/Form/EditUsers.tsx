import Breadcrumb from '../../components/Breadcrumb';
import EditUser from '../../components/EditUser';
import DefaultLayout from '../../layout/DefaultLayout';

const EditUsers = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Edit Agent" />
      <EditUser />
    </DefaultLayout>
  );
};

export default EditUsers;
