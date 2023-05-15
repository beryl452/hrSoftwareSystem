import Breadcrumb from '../../components/Breadcrumb';
import CreateProject from '../../components/CreateProject';
import DefaultLayout from '../../layout/DefaultLayout';

const CreateProjects = () => {
  return (
    <DefaultLayout>

      <Breadcrumb pageName="Create Project" />
        <CreateProject/>      
    </DefaultLayout>
  );
};

export default CreateProjects;
