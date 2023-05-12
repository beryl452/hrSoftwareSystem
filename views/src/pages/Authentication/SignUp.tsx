import Breadcrumb from '../../components/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import CreateUser from '../../components/CreateUser';

const SignUp = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Sign Up" />
      <CreateUser />
    </DefaultLayout>
  );
};

export default SignUp;
