import Breadcrumb from '../../components/Breadcrumb';
import CreateRole from '../../components/CreateRole';
import DefaultLayout from '../../layout/DefaultLayout';

const CreateRoles = () => {
  return (
    <DefaultLayout>

      <Breadcrumb pageName="Create Role" />
        <CreateRole/>      
    </DefaultLayout>
  );
};

export default CreateRoles;
