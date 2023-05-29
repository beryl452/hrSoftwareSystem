import Breadcrumb from '../../components/Breadcrumb';
import EditAgent from '../../components/EditAgent';
import DefaultLayout from '../../layout/DefaultLayout';

const EditAgents = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Edit Agent" />
      <EditAgent />
    </DefaultLayout>
  );
};

export default EditAgents;
