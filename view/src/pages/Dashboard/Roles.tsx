import TableRole from '../../components/TableRole';
import DefaultLayout from '../../layout/DefaultLayout.tsx';
import React, { useEffect } from "react";
import axios from "axios";

const Roles = () => {
 
  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
      </div>

      <div className="mt-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <TableRole />
      </div>
    </DefaultLayout>
  );
};

export default Roles;