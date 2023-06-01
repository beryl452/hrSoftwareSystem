import { Props } from 'react-apexcharts';

const CardTwo = ({ toDo, doing, done, awaitingValidation, name }: Props,) => {
  return (
    <>
      <div
        onClick={() => {
          if (toDo) {
            console.log('toDo');
          } else if (doing) {
            console.log('doing');
          } else if (done) {
            console.log('done');
          } else {
            console.log('awaitingValidation');
          }
        }}
        className="cursor-pointer rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:rounded-lg"
      >
        <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
          <svg
            width={20}
            height={20}
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
            className="icon"
          >
            <path d="M280 752h80c4.4 0 8-3.6 8-8V280c0-4.4-3.6-8-8-8h-80c-4.4 0-8 3.6-8 8v464c0 4.4 3.6 8 8 8zm192-280h80c4.4 0 8-3.6 8-8V280c0-4.4-3.6-8-8-8h-80c-4.4 0-8 3.6-8 8v184c0 4.4 3.6 8 8 8zm192 72h80c4.4 0 8-3.6 8-8V280c0-4.4-3.6-8-8-8h-80c-4.4 0-8 3.6-8 8v256c0 4.4 3.6 8 8 8zm216-432H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656z" />
          </svg>
        </div>

        <div className="mt-4 flex items-end justify-between">
          <div>
            <h4 className="text-title-md font-bold text-black dark:text-white">
              {toDo ? toDo : '00'}{' '}
            </h4>
            <span className="text-sm font-medium">
              {name == 'toDo'
                ? 'To Do'
                : name == 'doing'
                ? 'Doing'
                : name == 'done'
                ? 'Fait'
                : name == 'awaitingValidation'
                ? 'En attente de validation'
                : '***'}
            </span>
          </div>

          {/* <span className="flex items-center gap-1 text-sm font-medium text-meta-3">
          ****
        </span> */}
        </div>
      </div>
    </>
  );
};

export default CardTwo;
