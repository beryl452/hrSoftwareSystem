import Breadcrumb from '../../components/Breadcrumb';
import CreateAgent from '../../components/CreateAgent';
import DefaultLayout from '../../layout/DefaultLayout';

const CreateAgents = () => {
  return (
    <DefaultLayout>

      <Breadcrumb pageName="Create Agent" />
        <CreateAgent/>      
    </DefaultLayout>
  );
};

export default CreateAgents;
