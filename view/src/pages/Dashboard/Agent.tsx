import TableAgent from '../../components/TableAgent.tsx';
import DefaultLayout from '../../layout/DefaultLayout.tsx';


const Agents = () => {
 
  return (
    <DefaultLayout>
      <div className="mt-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <TableAgent />
      </div>
    </DefaultLayout>
  );
};

export default Agents;