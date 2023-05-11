function Identity({ className = '', ...props }) {
  return (
    <>
        <figure className={"flex rounded-lg flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 rounded-bl-lg md:border-b-0 md:border-r dark:bg-gray-800 dark:border-gray-700 " + className}>
          <figcaption className="flex items-center justify-center space-x-3">
            <img
              className="rounded-full w-20 h-20"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
              alt="profile picture"
            />
            <div className="space-y-0.5 font-medium text-gray-900 dark:text-gray-400 text-left">
            <h5 className="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{JSON.parse(localStorage.getItem("auth")).user.firstname + " " + JSON.parse(localStorage.getItem("auth")).user.lastname}</h5>
              {/* <div>{JSON.parse(localStorage.getItem("auth")).user.firstname + " " + JSON.parse(localStorage.getItem("auth")).user.lastname}</div> */}
              <p className="font-normal text-gray-700 dark:text-gray-400">{JSON.parse(localStorage.getItem("auth")).user.function}</p>
              {/* <div className="text-sm text-gray-500  dark:text-gray-400">
                {JSON.parse(localStorage.getItem("auth")).user.function}
              </div> */}
            </div>
          </figcaption>
        </figure>
    </>
  );
}

export default Identity;
