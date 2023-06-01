// import React, { useEffect } from 'react';

type Props = {
    seeSubmit: boolean,
    setSeeSubmit: (seeSubmit: boolean) => void,
    children: React.ReactNode,
    title: string,
}
const FormSubmitTask = ({ seeSubmit, setSeeSubmit, children, title}: Props) => {

    return (
        <>
        {seeSubmit && (<div id="medium-modal" tabIndex={-1} className="my-9 mx-35 grid place-items-center fixed top-0 right-0 left-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full bg-opacity-50 bg-gray-50 dark:bg-gray-700 text-xs uppercase text-black dark:text-white">
          <div className="relative w-full max-w-lg max-h-full">
            <div className="relative bg-white rounded-lg shadow  p-5 dark:bg-gray-700">
              <div className="flex items-center justify-between p-1 mb-3 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                  {title}
                </h3>
                <button 
                onClick={()=>{
                  setSeeSubmit(false);
                }}
                type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="medium-modal">
                  <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
                {children}
            </div>
          </div>
        </div>)}
      </>
    );
}

export default FormSubmitTask;