import Breadcrumb from '../../components/Breadcrumb';
import CreateUser from '../../components/CreateUser';
import DefaultLayout from '../../layout/DefaultLayout';

const SignUp = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Create User" />
      <CreateUser />
    </DefaultLayout>
  );
};

export default SignUp;
