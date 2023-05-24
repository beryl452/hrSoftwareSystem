import TableAbilities from '../../components/TableAbilities.tsx';
import DefaultLayout from '../../layout/DefaultLayout.tsx';
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const Abilities = () => {

  const location = useLocation();

  useEffect(() => {
    console.log(location.state);
  });
  return (
    <DefaultLayout>
      <div className="mt-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <TableAbilities role={location.state.role} />
      </div>
    </DefaultLayout>
  );
};

export default Abilities;