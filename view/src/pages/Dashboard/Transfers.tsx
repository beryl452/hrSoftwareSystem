import TableRole from '../../components/TableRole';
import TableTransfer from '../../components/TableTransfer.tsx';
import DefaultLayout from '../../layout/DefaultLayout.tsx';


const Transfers = () => {
 
  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
      </div>

      <div className="mt-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <TableTransfer />
      </div>
    </DefaultLayout>
  );
};

export default Transfers;