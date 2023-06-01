import Breadcrumb from '../../components/Breadcrumb';
import CreateAbsence from '../../components/CreateAbsence';
import DefaultLayout from '../../layout/DefaultLayout';

const CreateAbsences = () => {
  return (
    <DefaultLayout>

      <Breadcrumb pageName="Create Absence" />
        <CreateAbsence/>      
    </DefaultLayout>
  );
};

export default CreateAbsences;
