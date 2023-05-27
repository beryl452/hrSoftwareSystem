import Breadcrumb from '../../components/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import CreateAgent from '../../components/CreateAgent';

const SignUp = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Create Agent" />
      <CreateAgent />
    </DefaultLayout>
  );
};

export default SignUp;
