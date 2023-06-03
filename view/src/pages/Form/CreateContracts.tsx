import Breadcrumb from '../../components/Breadcrumb';
import CreateContract from '../../components/CreateContract';
import DefaultLayout from '../../layout/DefaultLayout';

const CreateContracts = () => {
  return (
    <DefaultLayout>

      <Breadcrumb pageName="Create Contract" />
        <CreateContract/>      
    </DefaultLayout>
  );
};

export default CreateContracts;
