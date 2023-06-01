import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Logo from '../images/logo/logo.svg';
import SidebarLinkGroup from './SidebarLinkGroup';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <NavLink to="/">
          <a
            href="#"
            className="text-gray-900 mb-6 flex items-center justify-center text-2xl font-semibold text-white"
          >
            <img src={Logo} className="ml-6 mr-3" alt="Logo" />
            HrSoftware
          </a>
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              MENU
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Dashboard --> */}
              <SidebarLinkGroup
                activeCondition={
                  pathname === '/' || pathname.includes('dashboard')
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          (pathname === '/' ||
                            pathname.includes('dashboard')) &&
                          'bg-graydark dark:bg-meta-4'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <svg
                          width={18}
                          height={18}
                          viewBox="0 0 1024 1024"
                          className="icon"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M388.9 597.4c-135.2 0-245.3-110-245.3-245.3s110-245.3 245.3-245.3 245.3 110 245.3 245.3-110.1 245.3-245.3 245.3zm0-405.3c-88.2 0-160 71.8-160 160s71.8 160 160 160 160-71.8 160-160-71.8-160-160-160z"
                            fill="#3688FF"
                          />
                          <path
                            d="M591.3 981.3H186.5c-76.6 0-138.8-62.3-138.8-138.8V749c0-130.6 106.2-236.9 236.9-236.9h208.8c130.6 0 236.9 106.3 236.9 236.9v93.5c-.2 76.5-62.4 138.8-139 138.8zM284.5 597.4c-83.6 0-151.5 68-151.5 151.5v93.5c0 29.5 24 53.5 53.5 53.5h404.8c29.5 0 53.5-24 53.5-53.5v-93.5c0-83.6-68-151.5-151.6-151.5H284.5z"
                            fill="#3688FF"
                          />
                          <path
                            d="M847.2 938.6c-23.6 0-42.7-19.1-42.7-42.7s19.1-42.7 42.7-42.7c29.5 0 53.5-24 53.5-53.5v-93.5c0-83.6-68-151.5-151.6-151.5h-14.3c-19.8 0-37-13.6-41.5-32.9-4.5-19.3 4.8-39.1 22.5-48 54.8-27.3 88.9-82.1 88.9-143.1 0-88.2-71.8-160-160-160-23.6 0-42.7-19.1-42.7-42.7s19.1-42.7 42.7-42.7c135.2 0 245.3 110 245.3 245.3 0 57.8-19.9 111.9-54.9 154.8 88.3 34.6 151 120.6 151 220.9v93.5c0 76.6-62.3 138.8-138.9 138.8z"
                            fill="#5F6379"
                          />
                        </svg>
                        Users
                        <svg
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && 'rotate-180'
                          }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </NavLink>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && 'hidden'
                        }`}
                      >
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <NavLink
                              to="/CreateUsers"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              Create User
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/users"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              Show Users
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* <!-- Menu Item Dashboard --> */}

              {/* <!-- Menu Item Forms --> */}
              <SidebarLinkGroup
                activeCondition={
                  pathname === '/forms' || pathname.includes('forms')
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          (pathname === '/forms' ||
                            pathname.includes('forms')) &&
                          'bg-graydark dark:bg-meta-4'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          width={20}
                          height={20}
                          x={0}
                          y={0}
                          viewBox="0 0 508.04 508.04"
                          enableBackground="new 0 0 512 512"
                          xmlSpace="preserve"
                          className=""
                        >
                          <g>
                            <path
                              fill="#7974e3"
                              d="m483.46 108.448-1.298-25.69-25.58-3.237a68.553 68.553 0 0 0-8.291-17.331l13.653-21.745-19.215-17.241-20.415 15.677a69.624 69.624 0 0 0-18.204-6.442L398.287 7.5l-25.878 1.31-3.279 25.399a69.6 69.6 0 0 0-17.462 8.245l-21.892-13.539-17.379 19.09 15.776 20.257a68.538 68.538 0 0 0-6.502 18.078l-25.123 5.8 1.298 25.69 25.58 3.237a68.553 68.553 0 0 0 8.291 17.331l-13.653 21.745 19.215 17.241 20.415-15.677a69.624 69.624 0 0 0 18.204 6.442l5.823 24.939 25.876-1.308 3.279-25.399a69.6 69.6 0 0 0 17.462-8.245l21.892 13.539 17.379-19.09-15.776-20.257a68.538 68.538 0 0 0 6.502-18.078zm-91.654 27.522c-19.847 1.003-36.743-14.157-37.738-33.86-.996-19.703 14.286-36.489 34.132-37.492s36.743 14.157 37.738 33.86-14.285 36.489-34.132 37.492z"
                              data-original="#7974e3"
                            />
                            <path
                              fill="#f0f0ff"
                              d="m182.511 287.026 162.199 71.115 72.219-164.718-29.813-76.537L278.07 69.075z"
                              data-original="#f0f0ff"
                            />
                            <path
                              fill="#e8e8ff"
                              d="m376.929 193.423-65.77 150.008 33.551 14.71 72.219-164.718-18.747-48.13z"
                              data-original="#e8e8ff"
                            />
                            <path
                              fill="#cfcfff"
                              d="m387.116 116.886-23.421 53.023 53.234 23.514z"
                              data-original="#cfcfff"
                            />
                            <path
                              fill="#96e1ff"
                              d="M336.372 269.387h128.196v127.787H336.372z"
                              data-original="#96e1ff"
                            />
                            <path
                              fill="#fdf486"
                              d="m496.091 363.657-31.523 33.518V269.387l31.523-33.518z"
                              data-original="#fdf486"
                            />
                            <path
                              fill="#fd6dc3"
                              d="M464.568 269.387H336.372l31.524-33.518h128.195z"
                              data-original="#fd6dc3"
                            />
                            <path
                              fill="#7974e3"
                              d="m383.269 485.993 14.813-14.827-12.026-17.226a55.856 55.856 0 0 0 5.94-14.483l20.602-3.636-.086-21.035-20.632-3.767a56.714 56.714 0 0 0-6.058-14.521l11.886-17.15-14.934-14.921-17.14 11.902a56.707 56.707 0 0 0-14.527-6.045l-3.785-20.629-21.035-.067-3.617 20.605a55.848 55.848 0 0 0-14.478 5.953l-17.237-12.011-14.813 14.827 12.026 17.226a55.856 55.856 0 0 0-5.94 14.483l-20.602 3.636.086 21.035 20.632 3.767a56.714 56.714 0 0 0 6.058 14.521l-11.886 17.15 14.935 14.921 17.14-11.902a56.707 56.707 0 0 0 14.527 6.045l3.785 20.629 21.035.067 3.617-20.605a55.848 55.848 0 0 0 14.478-5.953zm-64.77-42.3c-10.396-10.386-10.464-27.172-.153-37.493s27.097-10.267 37.493.119c10.395 10.386 10.464 27.172.153 37.493s-27.097 10.267-37.493-.119z"
                              data-original="#7974e3"
                            />
                            <path
                              fill="#fdf486"
                              d="M233.173 57.759c-1.225 0-2.452.01-3.683.04C147.765 59.733 81.478 127.27 80.705 209.32c-.556 59.015 32.178 110.395 80.492 136.414v25.715c0 10.5 8.48 19.012 18.941 19.012h53.035z"
                              data-original="#fdf486"
                            />
                            <path
                              fill="#cfcfff"
                              d="M233.173 390.46h-53.035v41.938c0 18.838 15.271 34.109 34.109 34.109h18.926z"
                              data-original="#cfcfff"
                            />
                            <path
                              fill="#6b64e8"
                              d="m391.996 439.456 20.602-3.636-.086-21.035-20.632-3.767a56.714 56.714 0 0 0-6.058-14.521l11.886-17.15-14.935-14.921-17.14 11.901a56.665 56.665 0 0 0-13.945-5.882c16.414 13.386 26.902 33.763 26.902 56.595 0 19.77-7.872 37.691-20.635 50.837a55.54 55.54 0 0 0 8.076-3.895l17.237 12.011 14.813-14.827-12.026-17.226a55.83 55.83 0 0 0 5.941-14.484z"
                              data-original="#6b64e8"
                            />
                            <g fill="#060606">
                              <path
                                d="M503.563 235.495c-.194-3.912-3.536-7.126-7.472-7.126h-86.294l14.002-31.935a7.599 7.599 0 0 0 .12-5.734l-7.169-18.403a77.092 77.092 0 0 0 11.563-5.361l17.974 11.116c3.323 1.853 6.487 1.409 9.491-1.33l17.379-19.09a7.5 7.5 0 0 0 .372-9.657l-12.906-16.572a76.06 76.06 0 0 0 3.915-10.89l20.61-4.758a7.499 7.499 0 0 0 5.803-7.687l-1.298-25.689a7.5 7.5 0 0 0-6.548-7.062l-20.985-2.656a76.025 76.025 0 0 0-4.993-10.439l11.169-17.788a7.499 7.499 0 0 0-1.343-9.57l-19.215-17.241a7.5 7.5 0 0 0-9.577-.366L421.4 30.128a77.099 77.099 0 0 0-11.042-3.911l-4.768-20.42c-.826-3.533-4.071-5.989-7.682-5.785L372.03 1.319a7.5 7.5 0 0 0-7.06 6.53l-2.685 20.797a77.028 77.028 0 0 0-10.591 5.005L333.72 22.535a7.501 7.501 0 0 0-9.491 1.33l-17.379 19.09a7.498 7.498 0 0 0-.371 9.657l12.905 16.571a76.224 76.224 0 0 0-3.173 8.425l-35.129-15.402c-4.359-1.442-7.652-.156-9.88 3.857l-29.818 68.009V17.565c0-9.697-15-9.697-15 0v32.851c-51.404 2.173-98.814 29.333-127.275 73.11-5.11 7.859 7.025 16.713 12.576 8.176 25.694-39.521 68.383-64.111 114.699-66.275V382.96h-46.245c-6.309 0-11.441-5.164-11.441-11.512v-25.715a7.502 7.502 0 0 0-3.944-6.604c-47.729-25.704-77.061-75.417-76.549-129.74a144.477 144.477 0 0 1 6.554-41.736c2.89-9.256-11.428-13.729-14.318-4.471a159.431 159.431 0 0 0-7.234 46.066c-.55 58.397 30.178 111.967 80.492 140.893v21.307c0 12.006 8.004 22.168 18.941 25.419v35.53c0 22.943 18.666 41.609 41.609 41.609h12.136v26.533c0 9.697 15 9.697 15 0V321.028l76.42 33.506-1.719 9.796a63.362 63.362 0 0 0-7.375 3.034l-13.467-9.383a7.497 7.497 0 0 0-9.593.853l-14.813 14.826a7.5 7.5 0 0 0-.844 9.594l9.396 13.458a63.386 63.386 0 0 0-3.028 7.379l-16.037 2.83a7.501 7.501 0 0 0-6.197 7.416l.086 21.035a7.502 7.502 0 0 0 6.153 7.348l16.134 2.945a64.16 64.16 0 0 0 3.116 7.477l-9.264 13.366a7.5 7.5 0 0 0 .864 9.578l14.934 14.921a7.5 7.5 0 0 0 9.579.854l13.358-9.275a64.22 64.22 0 0 0 7.479 3.109l2.96 16.132a7.5 7.5 0 0 0 7.353 6.146l21.035.066h.024a7.5 7.5 0 0 0 7.387-6.203l2.816-16.04a63.29 63.29 0 0 0 7.375-3.034l13.466 9.383a7.494 7.494 0 0 0 9.593-.853l14.813-14.826a7.5 7.5 0 0 0 .844-9.594l-9.396-13.458a63.386 63.386 0 0 0 3.028-7.379l16.037-2.83a7.502 7.502 0 0 0 6.197-7.416l-.085-21.035a7.502 7.502 0 0 0-6.153-7.348l-15.166-2.768c21.465-.096 43.265-.099 64.461-.099 2.482.466 4.774-.276 6.876-2.227l31.523-33.519a7.504 7.504 0 0 0 2.037-5.139V235.869c-.001-.126-.023-.248-.029-.374zm-24.822 7.874-17.089 18.171H354.048l17.09-18.171zm-84.637-129.206a7.639 7.639 0 0 0-3.977-4.146l-28.466-12.481c1.359-13.669 12.666-24.707 26.918-25.427 15.705-.763 29.084 11.208 29.87 26.748.644 12.74-7.454 24.196-19.333 28.173zm-7.424 22.27 8.101 20.795 8.569 21.998-29.764-13.147zm-52.591-72.781-11.893-15.271 8.932-9.812 16.595 10.263a7.503 7.503 0 0 0 8.055-.105 62.079 62.079 0 0 1 15.581-7.357 7.501 7.501 0 0 0 5.209-6.201l2.477-19.185 13.362-.675 4.398 18.837a7.503 7.503 0 0 0 5.809 5.645 62.06 62.06 0 0 1 16.243 5.749 7.503 7.503 0 0 0 8.024-.708l15.475-11.884 9.876 8.861-10.293 16.394a7.501 7.501 0 0 0 .104 8.138 61.11 61.11 0 0 1 7.386 15.436 7.5 7.5 0 0 0 6.212 5.187l19.348 2.449.664 13.143-19.003 4.387a7.5 7.5 0 0 0-5.657 5.786 61.016 61.016 0 0 1-5.792 16.101 7.503 7.503 0 0 0 .716 8.107l11.894 15.272-8.933 9.812-16.595-10.263a7.504 7.504 0 0 0-8.054.104 62.112 62.112 0 0 1-12.927 6.456l-6.742-17.307c17.784-6.289 29.842-23.635 28.867-42.911-1.203-23.801-21.66-42.183-45.607-40.971-20.086 1.015-36.336 15.499-40.344 34.189l-17.439-7.646a61.26 61.26 0 0 1 4.767-11.912 7.498 7.498 0 0 0-.715-8.108zM214.247 459.007c-14.672 0-26.609-11.937-26.609-26.609V397.96h38.745v61.047zm27.137-287.579 40.544-92.472 95.288 41.779-20.382 46.143c-1.455 4.355-.178 7.651 3.83 9.891l46.393 20.493-13.639 31.108h-25.523a7.498 7.498 0 0 0-5.463 2.361l-31.523 33.519c-1.546 1.643-2.358 6.026-2.166 8.389v69.457l-1.968-.006-85.391-37.439zm163.689 258.104-14.38 2.538a7.5 7.5 0 0 0-5.965 5.536 48.333 48.333 0 0 1-5.142 12.54 7.5 7.5 0 0 0 .321 8.086l8.43 12.076-5.934 5.939-12.084-8.42a7.5 7.5 0 0 0-8.087-.313 48.35 48.35 0 0 1-12.534 5.153 7.498 7.498 0 0 0-5.531 5.97l-2.525 14.383-8.488-.027-2.661-14.502a7.5 7.5 0 0 0-5.481-5.903 49.251 49.251 0 0 1-12.607-5.245 7.5 7.5 0 0 0-8.093.297l-11.994 8.327-6.07-6.063 8.317-12.001a7.5 7.5 0 0 0 .289-8.093 49.294 49.294 0 0 1-5.257-12.604 7.502 7.502 0 0 0-5.908-5.476l-14.504-2.648-.035-8.487 14.379-2.538a7.5 7.5 0 0 0 5.965-5.536 48.333 48.333 0 0 1 5.142-12.54 7.501 7.501 0 0 0-.32-8.086l-8.431-12.076 5.934-5.939 12.083 8.42a7.495 7.495 0 0 0 8.086.313 48.4 48.4 0 0 1 12.536-5.153 7.498 7.498 0 0 0 5.531-5.97l2.524-14.383 8.488.027 2.661 14.502a7.5 7.5 0 0 0 5.481 5.903 49.222 49.222 0 0 1 12.607 5.245 7.496 7.496 0 0 0 8.093-.297l11.993-8.327 6.07 6.063-8.317 12.001a7.5 7.5 0 0 0-.29 8.093 49.294 49.294 0 0 1 5.257 12.604 7.502 7.502 0 0 0 5.908 5.476l14.505 2.648zm67.016-51.301c-.003-7.385-.021-25.63-.021-25.63 0-9.697-15-9.697-15 0v36.939c-18.935.001-38.267.015-57.366.098l4.171-6.019a7.5 7.5 0 0 0-.863-9.578l-14.935-14.921a7.5 7.5 0 0 0-9.579-.854l-13.357 9.275a64.22 64.22 0 0 0-7.479-3.109L354.7 348.3c-.945-5.15-6.382-6.815-10.853-6.158-.123-8.33.78-51.887 0-65.254h113.222v36.555c0 9.697 15 9.697 15 0 0 0 .023-28.199.023-41.106l16.5-17.544v105.892z"
                                fill="#060606"
                                data-original="#060606"
                                className=""
                              />
                              <path
                                d="m337.085 390.995-.111-.001c-9.053 0-17.549 3.516-23.933 9.905-6.41 6.416-9.92 14.958-9.883 24.053.037 9.075 3.603 17.615 10.041 24.047s14.98 9.99 24.055 10.019h.111c9.053 0 17.55-3.516 23.934-9.905 6.41-6.416 9.92-14.958 9.883-24.053-.037-9.074-3.603-17.614-10.04-24.046-6.44-6.432-14.983-9.99-24.057-10.019zm13.601 47.516c-3.564 3.567-8.322 5.562-13.386 5.507-5.088-.016-9.883-2.016-13.5-5.63-3.618-3.615-5.622-8.408-5.643-13.496-.021-5.068 1.931-9.823 5.495-13.391a18.666 18.666 0 0 1 13.385-5.507c5.088.017 9.883 2.016 13.501 5.631 3.618 3.614 5.622 8.407 5.642 13.495.021 5.069-1.93 9.823-5.494 13.391zM101.695 86.327c6.296 0 9.756-8.35 5.304-12.803L81.425 47.946c-6.856-6.858-17.464 3.749-10.607 10.605L96.391 84.13a7.478 7.478 0 0 0 5.304 2.197zM47.888 204.487H11.722c-9.697 0-9.697 15 0 15h36.167c9.697 0 9.697-15-.001-15zM98.679 338.897l-25.573 25.578c-6.857 6.857 3.751 17.464 10.607 10.605l25.573-25.578c6.857-6.857-3.751-17.463-10.607-10.605z"
                                fill="#060606"
                                data-original="#060606"
                                className=""
                              />
                            </g>
                          </g>
                        </svg>
                        Projects
                        <svg
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && 'rotate-180'
                          }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </NavLink>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && 'hidden'
                        }`}
                      >
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <NavLink
                              to="/CreateProjects"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              Create Project
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/projects"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              Show Projects
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* <!-- Menu Item Forms --> */}
              {/* <!-- Menu Item Forms --> */}
              <SidebarLinkGroup
                activeCondition={
                  pathname === '/forms' || pathname.includes('forms')
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          (pathname === '/forms' ||
                            pathname.includes('forms')) &&
                          'bg-graydark dark:bg-meta-4'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={20}
                          height={20}
                          viewBox="0 0 682.667 682.667"
                          style={{
                            enableBackground: 'new 0 0 512 512',
                          }}
                          xmlSpace="preserve"
                        >
                          <defs>
                            <clipPath id="a" clipPathUnits="userSpaceOnUse">
                              <path
                                d="M0 512h512V0H0Z"
                                data-original="#000000"
                              />
                            </clipPath>
                          </defs>
                          <g
                            clipPath="url(#a)"
                            transform="matrix(1.33333 0 0 -1.33333 0 682.667)"
                          >
                            <path
                              d="M0 0v404.454c0 9.109 7.385 16.493 16.494 16.493h333.467c9.109 0 16.494-7.384 16.494-16.493V0c0-9.109-7.385-16.494-16.494-16.494H16.494C7.385-16.494 0-9.109 0 0"
                              style={{
                                fillOpacity: 1,
                                fillRule: 'nonzero',
                                stroke: 'none',
                              }}
                              transform="translate(43.998 23.994)"
                              fill="#0e80ac"
                              data-original="#0e80ac"
                            />
                            <path
                              d="M0 0h-19.184v-420.947c0-9.11-7.384-16.494-16.494-16.494H0c9.109 0 16.494 7.384 16.494 16.494v404.454C16.494-7.384 9.109 0 0 0"
                              style={{
                                fillOpacity: 1,
                                fillRule: 'nonzero',
                                stroke: 'none',
                              }}
                              transform="translate(393.959 444.941)"
                              fill="#057195"
                              data-original="#057195"
                            />
                            <path
                              d="M0 0v-386.128c0-6.009 4.871-10.879 10.88-10.879h273.285c6.008 0 10.879 4.87 10.879 10.879V0z"
                              style={{
                                fillOpacity: 1,
                                fillRule: 'nonzero',
                                stroke: 'none',
                              }}
                              transform="translate(79.704 444.941)"
                              fill="#f7f0f0"
                              data-original="#f7f0f0"
                            />
                            <path
                              d="M0 0c0 13.064-10.591 23.654-23.654 23.654h-18.037c-13.064 0-23.654-10.59-23.654-23.654 0-6.627-5.373-12-12-12h-14.433c-13.202 0-23.904-10.702-23.904-23.904v-12.558c0-6.267 5.08-11.346 11.346-11.346H38.99c6.267 0 11.347 5.079 11.347 11.346v12.558C50.337-22.702 39.635-12 26.433-12H12C5.372-12 0-6.627 0 0"
                              style={{
                                fillOpacity: 1,
                                fillRule: 'nonzero',
                                stroke: 'none',
                              }}
                              transform="translate(259.898 480.846)"
                              fill="#fd7e42"
                              data-original="#fd7e42"
                            />
                            <path
                              d="M0 0h-14.433c-6.628 0-12 5.373-12 12 0 13.063-10.59 23.654-23.654 23.654h-12.207V-.499c0-6.627 5.373-12 12-12h14.433c13.202 0 23.904-10.702 23.904-23.904v-11.406h24.515c6.266 0 11.346 5.081 11.346 11.347v12.558C23.904-10.702 13.202 0 0 0"
                              style={{
                                fillOpacity: 1,
                                fillRule: 'nonzero',
                                stroke: 'none',
                              }}
                              transform="translate(286.331 468.846)"
                              fill="#fa6931"
                              data-original="#fa6931"
                            />
                            <path
                              d="m0 0 16.441-14.614c2.826-2.512 7.209-1.996 9.375 1.101l24.596 35.178"
                              style={{
                                strokeWidth: 15,
                                strokeLinecap: 'round',
                                strokeLinejoin: 'round',
                                strokeMiterlimit: 10,
                                strokeDasharray: 'none',
                                strokeOpacity: 1,
                              }}
                              transform="translate(127.276 345.432)"
                              fill="none"
                              stroke="#000"
                              strokeWidth={15}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeMiterlimit={10}
                              data-original="#000000"
                            />
                            <path
                              d="m0 0 16.441-14.615c2.826-2.511 7.209-1.996 9.375 1.101l24.596 35.179"
                              style={{
                                strokeWidth: 15,
                                strokeLinecap: 'round',
                                strokeLinejoin: 'round',
                                strokeMiterlimit: 10,
                                strokeDasharray: 'none',
                                strokeOpacity: 1,
                              }}
                              transform="translate(127.276 235.872)"
                              fill="none"
                              stroke="#000"
                              strokeWidth={15}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeMiterlimit={10}
                              data-original="#000000"
                            />
                            <path
                              d="m0 0 16.441-14.614c2.826-2.512 7.209-1.996 9.375 1.101l24.596 35.178"
                              style={{
                                strokeWidth: 15,
                                strokeLinecap: 'round',
                                strokeLinejoin: 'round',
                                strokeMiterlimit: 10,
                                strokeDasharray: 'none',
                                strokeOpacity: 1,
                              }}
                              transform="translate(127.276 127.783)"
                              fill="none"
                              stroke="#000"
                              strokeWidth={15}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeMiterlimit={10}
                              data-original="#000000"
                            />
                            <path
                              d="M0 0h105.991"
                              style={{
                                strokeWidth: 15,
                                strokeLinecap: 'round',
                                strokeLinejoin: 'round',
                                strokeMiterlimit: 10,
                                strokeDasharray: 'none',
                                strokeOpacity: 1,
                              }}
                              transform="translate(221.185 363.156)"
                              fill="none"
                              stroke="#000"
                              strokeWidth={15}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeMiterlimit={10}
                              data-original="#000000"
                            />
                            <path
                              d="M0 0h105.991"
                              style={{
                                strokeWidth: 15,
                                strokeLinecap: 'round',
                                strokeLinejoin: 'round',
                                strokeMiterlimit: 10,
                                strokeDasharray: 'none',
                                strokeOpacity: 1,
                              }}
                              transform="translate(221.185 329.825)"
                              fill="none"
                              stroke="#000"
                              strokeWidth={15}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeMiterlimit={10}
                              data-original="#000000"
                            />
                            <path
                              d="M0 0h105.991"
                              style={{
                                strokeWidth: 15,
                                strokeLinecap: 'round',
                                strokeLinejoin: 'round',
                                strokeMiterlimit: 10,
                                strokeDasharray: 'none',
                                strokeOpacity: 1,
                              }}
                              transform="translate(221.185 256)"
                              fill="none"
                              stroke="#000"
                              strokeWidth={15}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeMiterlimit={10}
                              data-original="#000000"
                            />
                            <path
                              d="M0 0h52.995"
                              style={{
                                strokeWidth: 15,
                                strokeLinecap: 'round',
                                strokeLinejoin: 'round',
                                strokeMiterlimit: 10,
                                strokeDasharray: 'none',
                                strokeOpacity: 1,
                              }}
                              transform="translate(221.185 222.669)"
                              fill="none"
                              stroke="#000"
                              strokeWidth={15}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeMiterlimit={10}
                              data-original="#000000"
                            />
                            <path
                              d="M0 0v60.947c0 9.11-7.385 16.494-16.494 16.494h-83.724"
                              style={{
                                strokeWidth: 15,
                                strokeLinecap: 'round',
                                strokeLinejoin: 'round',
                                strokeMiterlimit: 10,
                                strokeDasharray: 'none',
                                strokeOpacity: 1,
                              }}
                              transform="translate(410.453 367.5)"
                              fill="none"
                              stroke="#000"
                              strokeWidth={15}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeMiterlimit={10}
                              data-original="#000000"
                            />
                            <path
                              d="M0 0h-83.725c-9.108 0-16.493-7.385-16.493-16.494v-404.453c0-9.11 7.385-16.494 16.493-16.494h333.468c9.109 0 16.494 7.384 16.494 16.494v191.089"
                              style={{
                                strokeWidth: 15,
                                strokeLinecap: 'round',
                                strokeLinejoin: 'round',
                                strokeMiterlimit: 10,
                                strokeDasharray: 'none',
                                strokeOpacity: 1,
                              }}
                              transform="translate(144.216 444.941)"
                              fill="none"
                              stroke="#000"
                              strokeWidth={15}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeMiterlimit={10}
                              data-original="#000000"
                            />
                            <path
                              d="M0 0v0c0 13.064-10.591 23.654-23.654 23.654h-18.037c-13.064 0-23.654-10.59-23.654-23.654 0-6.627-5.373-12-12-12h-14.433c-13.202 0-23.904-10.702-23.904-23.904v-12.558c0-6.267 5.08-11.346 11.346-11.346H38.99c6.267 0 11.347 5.079 11.347 11.346v12.558C50.337-22.702 39.635-12 26.433-12H12C5.372-12 0-6.627 0 0Z"
                              style={{
                                strokeWidth: 15,
                                strokeLinecap: 'round',
                                strokeLinejoin: 'round',
                                strokeMiterlimit: 10,
                                strokeDasharray: 'none',
                                strokeOpacity: 1,
                              }}
                              transform="translate(259.898 480.846)"
                              fill="none"
                              stroke="#000"
                              strokeWidth={15}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeMiterlimit={10}
                              data-original="#000000"
                            />
                            <path
                              d="M0 0v-386.128c0-6.009 4.871-10.879 10.88-10.879h124.206"
                              style={{
                                strokeWidth: 15,
                                strokeLinecap: 'round',
                                strokeLinejoin: 'round',
                                strokeMiterlimit: 10,
                                strokeDasharray: 'none',
                                strokeOpacity: 1,
                              }}
                              transform="translate(79.704 444.941)"
                              fill="none"
                              stroke="#000"
                              strokeWidth={15}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeMiterlimit={10}
                              data-original="#000000"
                            />
                            <path
                              d="M0 0v122.098"
                              style={{
                                strokeWidth: 15,
                                strokeLinecap: 'round',
                                strokeLinejoin: 'round',
                                strokeMiterlimit: 10,
                                strokeDasharray: 'none',
                                strokeOpacity: 1,
                              }}
                              transform="translate(374.748 322.844)"
                              fill="none"
                              stroke="#000"
                              strokeWidth={15}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeMiterlimit={10}
                              data-original="#000000"
                            />
                            <path
                              d="m0 0-31.135-.225H98.531c6.009 0 10.88 4.871 10.88 10.879v111.812"
                              style={{
                                strokeWidth: 15,
                                strokeLinecap: 'round',
                                strokeLinejoin: 'round',
                                strokeMiterlimit: 10,
                                strokeDasharray: 'none',
                                strokeOpacity: 1,
                              }}
                              transform="translate(265.337 48.16)"
                              fill="none"
                              stroke="#000"
                              strokeWidth={15}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeMiterlimit={10}
                              data-original="#000000"
                            />
                            <path
                              d="m0 0-29.124 23.343-10.032-5.424-170.156-212.302-27.048-54.314a10.474 10.474 0 0 1 15.974-12.804l47.121 38.227L-3.109-10.973z"
                              style={{
                                fillOpacity: 1,
                                fillRule: 'nonzero',
                                stroke: 'none',
                              }}
                              transform="translate(438.602 296.45)"
                              fill="#fa6931"
                              data-original="#fa6931"
                            />
                            <path
                              d="m0 0-27.199-54.616A10.533 10.533 0 0 1-11.136-67.49l47.383 38.438z"
                              style={{
                                fillOpacity: 1,
                                fillRule: 'nonzero',
                                stroke: 'none',
                              }}
                              transform="translate(229.524 102.36)"
                              fill="#557981"
                              data-original="#557981"
                            />
                            <path
                              d="M0 0c-9.954 7.979-24.491 6.377-32.47-3.578l-27.433-34.229 36.047-28.891L3.578-32.469C11.556-22.515 9.954-7.978 0 0"
                              style={{
                                fillOpacity: 1,
                                fillRule: 'nonzero',
                                stroke: 'none',
                              }}
                              transform="translate(459.349 352.176)"
                              fill="#ffc3ab"
                              data-original="#ffc3ab"
                            />
                            <path
                              d="m0 0-170.156-212.302-27.048-54.314a10.475 10.475 0 0 1 15.974-12.804l47.122 38.227L36.047-28.892"
                              style={{
                                strokeWidth: 15,
                                strokeLinecap: 'round',
                                strokeLinejoin: 'round',
                                strokeMiterlimit: 10,
                                strokeDasharray: 'none',
                                strokeOpacity: 1,
                              }}
                              transform="translate(399.445 314.37)"
                              fill="none"
                              stroke="#000"
                              strokeWidth={15}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeMiterlimit={10}
                              data-original="#000000"
                            />
                            <path
                              d="m0 0-36.247 29.052"
                              style={{
                                strokeWidth: 15,
                                strokeLinecap: 'round',
                                strokeLinejoin: 'round',
                                strokeMiterlimit: 10,
                                strokeDasharray: 'none',
                                strokeOpacity: 1,
                              }}
                              transform="translate(265.77 73.308)"
                              fill="none"
                              stroke="#000"
                              strokeWidth={15}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeMiterlimit={10}
                              data-original="#000000"
                            />
                            <path
                              d="M0 0v0c-9.954 7.979-24.491 6.377-32.47-3.578l-27.433-34.229 36.047-28.891L3.578-32.469C11.556-22.515 9.954-7.978 0 0Z"
                              style={{
                                strokeWidth: 15,
                                strokeLinecap: 'round',
                                strokeLinejoin: 'round',
                                strokeMiterlimit: 10,
                                strokeDasharray: 'none',
                                strokeOpacity: 1,
                              }}
                              transform="translate(459.349 352.176)"
                              fill="none"
                              stroke="#000"
                              strokeWidth={15}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeMiterlimit={10}
                              data-original="#000000"
                            />
                          </g>
                        </svg>
                        Tasks
                        <svg
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && 'rotate-180'
                          }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </NavLink>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && 'hidden'
                        }`}
                      >
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <NavLink
                              to="/forms/form-elements"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              Create User
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/forms/form-layout"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              Form Layout
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/CreateProjects"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              Create Project
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              <SidebarLinkGroup
                activeCondition={
                  pathname === '/forms' || pathname.includes('forms')
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          (pathname === '/forms' ||
                            pathname.includes('forms')) &&
                          'bg-graydark dark:bg-meta-4'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={20}
                          height={20}
                          viewBox="0 0 682.667 682.667"
                          style={{
                            enableBackground: 'new 0 0 512 512',
                          }}
                          xmlSpace="preserve"
                        >
                          <defs>
                            <clipPath id="a" clipPathUnits="userSpaceOnUse">
                              <path
                                d="M0 512h512V0H0Z"
                                data-original="#000000"
                              />
                            </clipPath>
                          </defs>
                          <g
                            clipPath="url(#a)"
                            transform="matrix(1.33333 0 0 -1.33333 0 682.667)"
                          >
                            <path
                              d="M0 0h-168.088c-21.027 0-38.135-17.108-38.135-38.137v-31.898h21.869v31.898c0 8.97 7.297 16.268 16.266 16.268H0c8.97 0 16.268-7.298 16.268-16.268v-31.898h21.869v31.898C38.137-17.108 21.029 0 0 0"
                              style={{
                                fillOpacity: 1,
                                fillRule: 'nonzero',
                                stroke: 'none',
                              }}
                              transform="translate(303.155 497.056)"
                              fill="#576574"
                              data-original="#576574"
                            />
                            <path
                              d="M0 0c0 30.684 26.916 41.75 26.916 41.75l72.697 28.183v22.349l.007-.004c-11.451 7.314-19.059 21.05-21.382 34.083h-310.212V-76.833c0-6.682 5.467-12.149 12.15-12.149H0Z"
                              style={{
                                fillOpacity: 1,
                                fillRule: 'nonzero',
                                stroke: 'none',
                              }}
                              transform="translate(255.185 144.289)"
                              fill="#c46f5f"
                              data-original="#c46f5f"
                            />
                            <path
                              d="M0 0v203.194h-30.104V0c0-6.682 5.468-12.149 12.151-12.149h30.102C5.468-12.149 0-6.682 0 0"
                              style={{
                                fillOpacity: 1,
                                fillRule: 'nonzero',
                                stroke: 'none',
                              }}
                              transform="translate(53.314 67.457)"
                              fill="#b45f4a"
                              data-original="#b45f4a"
                            />
                            <path
                              d="M0 0c0-7.217 5.904-13.122 13.121-13.122h44.832c7.217 0 13.121 5.905 13.121 13.122v24.416H0Z"
                              style={{
                                fillOpacity: 1,
                                fillRule: 'nonzero',
                                stroke: 'none',
                              }}
                              transform="translate(72.33 246.234)"
                              fill="#feca57"
                              data-original="#feca57"
                            />
                            <path
                              d="M0 0v24.416h-30.104V0c0-7.217 5.905-13.122 13.122-13.122h30.103C5.904-13.122 0-7.217 0 0"
                              style={{
                                fillOpacity: 1,
                                fillRule: 'nonzero',
                                stroke: 'none',
                              }}
                              transform="translate(102.433 246.234)"
                              fill="#f4b537"
                              data-original="#f4b537"
                            />
                            <path
                              d="M0 0h46.857v3.458l.007-.004c-11.451 7.314-19.059 21.05-21.382 34.084h-38.603V13.122C-13.121 5.905-7.217 0 0 0"
                              style={{
                                fillOpacity: 1,
                                fillRule: 'nonzero',
                                stroke: 'none',
                              }}
                              transform="translate(307.941 233.113)"
                              fill="#feca57"
                              data-original="#feca57"
                            />
                            <path
                              d="M0 0v24.416h-30.104V0c0-7.217 5.905-13.122 13.122-13.122h30.103C5.904-13.122 0-7.217 0 0"
                              style={{
                                fillOpacity: 1,
                                fillRule: 'nonzero',
                                stroke: 'none',
                              }}
                              transform="translate(324.924 246.234)"
                              fill="#f4b537"
                              data-original="#f4b537"
                            />
                            <path
                              d="M0 0c-12.783-1.935-22.756 7.303-22.756 18.613 0 5.202 2.358 9.786 5.958 13.124v24.307c0 36.36 24.474 60.835 60.833 60.835 22.335 0 42.058-11.131 53.961-28.138v53.193c0 7.217-5.905 13.122-13.122 13.122h-396.903c-7.217 0-13.121-5.905-13.121-13.122V5.807c0-7.217 5.904-13.121 13.121-13.121H.734A48.479 48.479 0 0 0 0 0"
                              style={{
                                fillOpacity: 1,
                                fillRule: 'nonzero',
                                stroke: 'none',
                              }}
                              transform="translate(332.69 275.965)"
                              fill="#b45f4a"
                              data-original="#b45f4a"
                            />
                            <path
                              d="M0 0v136.127c0 7.217 5.904 13.122 13.121 13.122h-30c-7.217 0-13.121-5.905-13.121-13.122V0c0-7.217 5.904-13.122 13.121-13.122h30C5.904-13.122 0-7.217 0 0"
                              style={{
                                fillOpacity: 1,
                                fillRule: 'nonzero',
                                stroke: 'none',
                              }}
                              transform="translate(37.539 281.772)"
                              fill="#a85140"
                              data-original="#a85140"
                            />
                            <path
                              d="M0 0c-36.249 0-65.633-29.384-65.633-65.633v-26.711c4.386 4.066 11.452 6.276 17.544 5.462v3.271c0 2.6 2.22 4.653 4.794 4.458 25.376-1.823 50.375 6.241 69.901 18.997a4.47 4.47 0 0 0 5.718-.698c16.694-17.943 15.768-17.249 15.768-19.592v-6.422c6.677 1.001 13.425-1.062 17.541-4.888v26.123C65.633-29.384 36.249 0 0 0"
                              style={{
                                fillOpacity: 1,
                                fillRule: 'nonzero',
                                stroke: 'none',
                              }}
                              transform="translate(376.728 397.844)"
                              fill="#576574"
                              data-original="#576574"
                            />
                            <path
                              d="M0 0c0 30.99 21.484 56.946 50.366 63.829A65.759 65.759 0 0 1 35.1 65.633C-1.149 65.633-30.533 36.249-30.533 0v-26.71c4.386 4.065 11.452 6.275 17.544 5.461v3.271c0 2.6 2.219 4.654 4.794 4.458 2.738-.196 5.472-.271 8.195-.244z"
                              style={{
                                fillOpacity: 1,
                                fillRule: 'nonzero',
                                stroke: 'none',
                              }}
                              transform="translate(341.628 332.21)"
                              fill="#3e4b5a"
                              data-original="#3e4b5a"
                            />
                            <path
                              d="M0 0v-36.163c0-.392-.021-.779-.03-1.17 12.798-1.938 22.82 7.309 22.82 18.665C22.79-7.289 12.759 1.913 0 0"
                              style={{
                                fillOpacity: 1,
                                fillRule: 'nonzero',
                                stroke: 'none',
                              }}
                              transform="translate(425.513 313.561)"
                              fill="#ffbeab"
                              data-original="#ffbeab"
                            />
                            <path
                              d="M0 0v36.65c-11.296 1.509-23.106-7.16-23.106-18.912 0-11.499 10.138-20.89 23.135-18.924C.02-.79 0-.396 0 0"
                              style={{
                                fillOpacity: 1,
                                fillRule: 'nonzero',
                                stroke: 'none',
                              }}
                              transform="translate(328.26 277.156)"
                              fill="#ffbeab"
                              data-original="#ffbeab"
                            />
                            <path
                              d="M0 0c-4.142 3.887-10.128 5.988-16.878 4.976v-36.163c0-.393-.02-.78-.03-1.17C-10.137-33.383-4.144-31.275 0-27.383z"
                              style={{
                                fillOpacity: 1,
                                fillRule: 'nonzero',
                                stroke: 'none',
                              }}
                              transform="translate(442.39 308.585)"
                              fill="#f7af9f"
                              data-original="#f7af9f"
                            />
                            <path
                              d="M0 0a18.974 18.974 0 0 0-6.228 14.093c0 5.37 2.471 10.093 6.228 13.499v5.413c-11.295 1.509-23.106-7.16-23.106-18.912 0-11.498 10.139-20.89 23.135-18.924C.02-4.435 0-4.041 0-3.645Z"
                              style={{
                                fillOpacity: 1,
                                fillRule: 'nonzero',
                                stroke: 'none',
                              }}
                              transform="translate(328.26 280.801)"
                              fill="#f7af9f"
                              data-original="#f7af9f"
                            />
                            <path
                              d="M0 0c-10.604 0-19.922 2.911-27.543 7.78v-25.582L-.118-51.654l27.425 33.852V8.507A47.94 47.94 0 0 0 0 0"
                              style={{
                                fillOpacity: 1,
                                fillRule: 'nonzero',
                                stroke: 'none',
                              }}
                              transform="translate(377.427 230.934)"
                              fill="#ffbeab"
                              data-original="#ffbeab"
                            />
                            <path
                              d="M0 0a48.518 48.518 0 0 0-2.99-.101c-10.604 0-19.922 2.912-27.543 7.781v-25.583l27.425-33.852L0-47.917Z"
                              style={{
                                fillOpacity: 1,
                                fillRule: 'nonzero',
                                stroke: 'none',
                              }}
                              transform="translate(380.417 231.034)"
                              fill="#f7af9f"
                              data-original="#f7af9f"
                            />
                            <path
                              d="m0 0-72.552 28.098-27.425-33.852-27.424 33.852L-199.878 0s-26.834-11.032-26.834-41.622V-161.63a8.942 8.942 0 0 1 8.941-8.942H17.893a8.942 8.942 0 0 1 8.941 8.942v120.008C26.834-11.032 0 0 0 0"
                              style={{
                                fillOpacity: 1,
                                fillRule: 'nonzero',
                                stroke: 'none',
                              }}
                              transform="translate(477.285 186.685)"
                              fill="#e4eaf8"
                              data-original="#e4eaf8"
                            />
                            <path
                              d="M0 0v133.239c0 20.133 11.622 31.792 19.569 37.412L-3.7 161.63s-26.834-11.032-26.834-41.622V0a8.942 8.942 0 0 1 8.941-8.942H8.941A8.942 8.942 0 0 0 0 0"
                              style={{
                                fillOpacity: 1,
                                fillRule: 'nonzero',
                                stroke: 'none',
                              }}
                              transform="translate(281.107 25.055)"
                              fill="#d8dce5"
                              data-original="#d8dce5"
                            />
                            <path
                              d="m0 0 20.509 41.101-26.197 10.146-27.425-33.852 26.738-18.99A4.325 4.325 0 0 1 0 0"
                              style={{
                                fillOpacity: 1,
                                fillRule: 'nonzero',
                                stroke: 'none',
                              }}
                              transform="translate(410.422 163.536)"
                              fill="#d8dce5"
                              data-original="#d8dce5"
                            />
                            <path
                              d="m0 0-20.508 41.101L5.689 51.247l27.425-33.852L6.376-1.595A4.326 4.326 0 0 0 0 0"
                              style={{
                                fillOpacity: 1,
                                fillRule: 'nonzero',
                                stroke: 'none',
                              }}
                              transform="translate(344.232 163.536)"
                              fill="#d8dce5"
                              data-original="#d8dce5"
                            />
                            <path
                              d="M0 0v.023L-.017.012l-.016.011V0L-19.48-13.812l9.192-13.835h20.543l9.193 13.835z"
                              style={{
                                fillOpacity: 1,
                                fillRule: 'nonzero',
                                stroke: 'none',
                              }}
                              transform="translate(377.344 180.907)"
                              fill="#ee5253"
                              data-original="#ee5253"
                            />
                            <path
                              d="m0 0-17.602 103.995h-20.543L-55.746 0c-.185-1.34.209-2.7 1.048-3.624l26.808-29.492v-.036l.017.018.017-.018v.036L-1.048-3.624C-.208-2.7.186-1.34 0 0"
                              style={{
                                fillOpacity: 1,
                                fillRule: 'nonzero',
                                stroke: 'none',
                              }}
                              transform="translate(405.2 49.265)"
                              fill="#ff6b6b"
                              data-original="#ff6b6b"
                            />
                            <path
                              d="m0 0 4.59 3.26-12.197 8.663v.023l-.017-.011-.017.011v-.023L-27.088-1.889l9.192-13.836H2.647l1.943 2.923-5.444 8.195A3.366 3.366 0 0 0 0 0"
                              style={{
                                fillOpacity: 1,
                                fillRule: 'nonzero',
                                stroke: 'none',
                              }}
                              transform="translate(384.951 168.984)"
                              fill="#d83941"
                              data-original="#d83941"
                            />
                            <path
                              d="m0 0 15.659 92.521-1.942 11.474H-6.826L-24.428 0c-.184-1.34.209-2.7 1.048-3.624L3.429-33.115v-.037l.016.018.017-.018v.037l12.197 13.417L1.048-3.624C.208-2.7-.186-1.34 0 0"
                              style={{
                                fillOpacity: 1,
                                fillRule: 'nonzero',
                                stroke: 'none',
                              }}
                              transform="translate(373.882 49.265)"
                              fill="#ee5253"
                              data-original="#ee5253"
                            />
                            <path
                              d="M0 0a4.47 4.47 0 0 1-5.719.697c-19.525-12.755-45.35-20.819-70.726-18.996-2.574.195-4.794-1.858-4.794-4.458v-39.21c0-25.201 19.746-48.218 49.614-48.218 26.587 0 48.218 21.631 48.218 48.218v42.375c0 2.342.1 1.649-16.593 19.592"
                              style={{
                                fillOpacity: 1,
                                fillRule: 'nonzero',
                                stroke: 'none',
                              }}
                              transform="translate(409.052 339.467)"
                              fill="#ffcdbf"
                              data-original="#ffcdbf"
                            />
                            <path
                              d="M0 0v45.031c-8.456-1.458-17.123-1.982-25.74-1.363-2.573.195-4.794-1.858-4.794-4.458V0c0-25.201 19.746-48.217 49.614-48.217 5.15 0 10.11.82 14.768 2.322C12.996-39.448 0-20.443 0 0"
                              style={{
                                fillOpacity: 1,
                                fillRule: 'nonzero',
                                stroke: 'none',
                              }}
                              transform="translate(358.347 277.5)"
                              fill="#ffbeab"
                              data-original="#ffbeab"
                            />
                            <path
                              d="M0 0c0-7.217 5.905-13.122 13.122-13.122h44.832c7.217 0 13.121 5.905 13.121 13.122v22.416H0Z"
                              style={{
                                strokeWidth: 15,
                                strokeLinecap: 'round',
                                strokeLinejoin: 'round',
                                strokeMiterlimit: 10,
                                strokeDasharray: 'none',
                                strokeOpacity: 1,
                              }}
                              transform="translate(72.306 246.234)"
                              fill="none"
                              stroke="#000"
                              strokeWidth={15}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeMiterlimit={10}
                              data-original="#000000"
                            />
                            <path
                              d="M0 0c-12.783-1.935-22.757 7.303-22.757 18.613 0 5.202 2.358 9.786 5.958 13.124v24.307c0 36.36 29.474 65.835 65.834 65.835 22.335 0 42.057-11.131 53.96-28.138v48.193c0 7.217-5.904 13.122-13.121 13.122H-307.03c-7.216 0-13.121-5.905-13.121-13.122V5.807c0-7.217 5.905-13.121 13.121-13.121H.734A48.35 48.35 0 0 0 0 0Z"
                              style={{
                                strokeWidth: 15,
                                strokeLinecap: 'round',
                                strokeLinejoin: 'round',
                                strokeMiterlimit: 10,
                                strokeDasharray: 'none',
                                strokeOpacity: 1,
                              }}
                              transform="translate(327.667 275.965)"
                              fill="none"
                              stroke="#000"
                              strokeWidth={15}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeMiterlimit={10}
                              data-original="#000000"
                            />
                            <path
                              d="M0 0a4.483 4.483 0 0 1-5.736.699c-19.585-12.794-45.49-20.882-70.943-19.054-2.582.196-4.809-1.864-4.809-4.472v-39.33c0-25.278 19.806-48.365 49.765-48.365 26.669 0 48.367 21.697 48.367 48.365v42.505c0 2.35.1 1.654-16.644 19.652z"
                              style={{
                                strokeWidth: 15,
                                strokeLinecap: 'round',
                                strokeLinejoin: 'round',
                                strokeMiterlimit: 10,
                                strokeDasharray: 'none',
                                strokeOpacity: 1,
                              }}
                              transform="translate(409.126 339.288)"
                              fill="none"
                              stroke="#000"
                              strokeWidth={15}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeMiterlimit={10}
                              data-original="#000000"
                            />
                            <path
                              d="M0 0c-10.636 0-19.982 2.92-27.627 7.805v-22.349L-.118-48.5l27.509 33.956V8.533A48.087 48.087 0 0 0 0 0Z"
                              style={{
                                strokeWidth: 15,
                                strokeLinecap: 'round',
                                strokeLinejoin: 'round',
                                strokeMiterlimit: 10,
                                strokeDasharray: 'none',
                                strokeOpacity: 1,
                              }}
                              transform="translate(377.403 228.766)"
                              fill="none"
                              stroke="#000"
                              strokeWidth={15}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeMiterlimit={10}
                              data-original="#000000"
                            />
                            <path
                              d="M0 0v-36.063c0-.392-.021-.777-.03-1.167 12.762-1.933 22.758 7.289 22.758 18.614C22.728-7.269 12.724 1.907 0 0Z"
                              style={{
                                strokeWidth: 15,
                                strokeLinecap: 'round',
                                strokeLinejoin: 'round',
                                strokeMiterlimit: 10,
                                strokeDasharray: 'none',
                                strokeOpacity: 1,
                              }}
                              transform="translate(425.77 313.194)"
                              fill="none"
                              stroke="#000"
                              strokeWidth={15}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeMiterlimit={10}
                              data-original="#000000"
                            />
                            <path
                              d="M0 0v36.05c-11.111 1.483-22.729-7.044-22.729-18.603 0-11.31 9.973-20.548 22.757-18.613C.019-.777 0-.39 0 0Z"
                              style={{
                                strokeWidth: 15,
                                strokeLinecap: 'round',
                                strokeLinejoin: 'round',
                                strokeMiterlimit: 10,
                                strokeDasharray: 'none',
                                strokeOpacity: 1,
                              }}
                              transform="translate(327.639 277.13)"
                              fill="none"
                              stroke="#000"
                              strokeWidth={15}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeMiterlimit={10}
                              data-original="#000000"
                            />
                            <path
                              d="M0 0c-36.36 0-65.834-29.474-65.834-65.834v-24.308c4.4 4.079 10.659 6.295 16.771 5.479v3.28c0 2.608 2.226 4.668 4.808 4.472 25.453-1.828 51.357 6.26 70.942 19.055a4.485 4.485 0 0 0 5.737-.699c16.744-17.999 16.643-17.302 16.643-19.653v-6.441c6.698 1.003 12.639-1.066 16.767-4.904v23.719C65.834-29.474 36.36 0 0 0Z"
                              style={{
                                strokeWidth: 15,
                                strokeLinecap: 'round',
                                strokeLinejoin: 'round',
                                strokeMiterlimit: 10,
                                strokeDasharray: 'none',
                                strokeOpacity: 1,
                              }}
                              transform="translate(376.702 397.844)"
                              fill="none"
                              stroke="#000"
                              strokeWidth={15}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeMiterlimit={10}
                              data-original="#000000"
                            />
                            <path
                              d="M0 0v118.797"
                              style={{
                                strokeWidth: 15,
                                strokeLinecap: 'round',
                                strokeLinejoin: 'round',
                                strokeMiterlimit: 10,
                                strokeDasharray: 'none',
                                strokeOpacity: 1,
                              }}
                              transform="translate(458.675 14.945)"
                              fill="none"
                              stroke="#000"
                              strokeWidth={15}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeMiterlimit={10}
                              data-original="#000000"
                            />
                            <path
                              d="M0 0v118.797"
                              style={{
                                strokeWidth: 15,
                                strokeLinecap: 'round',
                                strokeLinejoin: 'round',
                                strokeMiterlimit: 10,
                                strokeDasharray: 'none',
                                strokeOpacity: 1,
                              }}
                              transform="translate(295.973 14.945)"
                              fill="none"
                              stroke="#000"
                              strokeWidth={15}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeMiterlimit={10}
                              data-original="#000000"
                            />
                            <path
                              d="m0 0 20.571 41.227-26.277 10.176-27.509-33.955L-6.395-1.6A4.339 4.339 0 0 1 0 0Z"
                              style={{
                                strokeWidth: 15,
                                strokeLinecap: 'round',
                                strokeLinejoin: 'round',
                                strokeMiterlimit: 10,
                                strokeDasharray: 'none',
                                strokeOpacity: 1,
                              }}
                              transform="translate(410.5 162.819)"
                              fill="none"
                              stroke="#000"
                              strokeWidth={15}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeMiterlimit={10}
                              data-original="#000000"
                            />
                            <path
                              d="m0 0-20.571 41.227L5.706 51.403l27.509-33.955L6.395-1.6A4.339 4.339 0 0 0 0 0Z"
                              style={{
                                strokeWidth: 15,
                                strokeLinecap: 'round',
                                strokeLinejoin: 'round',
                                strokeMiterlimit: 10,
                                strokeDasharray: 'none',
                                strokeOpacity: 1,
                              }}
                              transform="translate(344.108 162.819)"
                              fill="none"
                              stroke="#000"
                              strokeWidth={15}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeMiterlimit={10}
                              data-original="#000000"
                            />
                            <path
                              d="M0 0v.023L-.017.012l-.016.011V0l-19.508-13.854 9.221-13.878h20.606l9.221 13.878z"
                              style={{
                                strokeWidth: 15,
                                strokeLinecap: 'round',
                                strokeLinejoin: 'round',
                                strokeMiterlimit: 10,
                                strokeDasharray: 'none',
                                strokeOpacity: 1,
                              }}
                              transform="translate(377.321 180.243)"
                              fill="none"
                              stroke="#000"
                              strokeWidth={15}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeMiterlimit={10}
                              data-original="#000000"
                            />
                            <path
                              d="m0 0-17.655 104.313h-20.607L-55.917 0c-.186-1.344.209-2.708 1.051-3.635l26.891-29.582v-.036l.017.018.017-.018v.036l26.89 29.582C-.209-2.708.186-1.344 0 0Z"
                              style={{
                                strokeWidth: 15,
                                strokeLinecap: 'round',
                                strokeLinejoin: 'round',
                                strokeMiterlimit: 10,
                                strokeDasharray: 'none',
                                strokeOpacity: 1,
                              }}
                              transform="translate(405.263 48.198)"
                              fill="none"
                              stroke="#000"
                              strokeWidth={15}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeMiterlimit={10}
                              data-original="#000000"
                            />
                            <path
                              d="M0 0c0 30.684 26.916 41.75 26.916 41.75l72.698 28.183v22.349l.006-.004c-11.451 7.314-19.058 19.05-21.381 32.083h-305.213V-76.833c0-6.682 5.468-12.149 12.15-12.149H0Z"
                              style={{
                                strokeWidth: 15,
                                strokeLinecap: 'round',
                                strokeLinejoin: 'round',
                                strokeMiterlimit: 10,
                                strokeDasharray: 'none',
                                strokeOpacity: 1,
                              }}
                              transform="translate(250.162 144.289)"
                              fill="none"
                              stroke="#000"
                              strokeWidth={15}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeMiterlimit={10}
                              data-original="#000000"
                            />
                            <path
                              d="M0 0h41.858v3.458l.006-.004c-11.451 7.314-19.058 19.05-21.381 32.084h-33.604V13.122C-13.121 5.905-7.217 0 0 0Z"
                              style={{
                                strokeWidth: 15,
                                strokeLinecap: 'round',
                                strokeLinejoin: 'round',
                                strokeMiterlimit: 10,
                                strokeDasharray: 'none',
                                strokeOpacity: 1,
                              }}
                              transform="translate(307.918 233.113)"
                              fill="none"
                              stroke="#000"
                              strokeWidth={15}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeMiterlimit={10}
                              data-original="#000000"
                            />
                            <path
                              d="M0 0h-63.61c-21.029 0-38.136-17.108-38.136-38.137v-27.898h21.869v27.898c0 8.97 7.298 16.268 16.267 16.268h168.088c8.969 0 16.266-7.298 16.266-16.268v-27.898h21.869v27.898C142.613-17.108 125.506 0 104.478 0H35"
                              style={{
                                strokeWidth: 15,
                                strokeLinecap: 'round',
                                strokeLinejoin: 'round',
                                strokeMiterlimit: 10,
                                strokeDasharray: 'none',
                                strokeOpacity: 1,
                              }}
                              transform="translate(198.655 497.056)"
                              fill="none"
                              stroke="#000"
                              strokeWidth={15}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeMiterlimit={10}
                              data-original="#000000"
                            />
                            <path
                              d="M0 0v40.15C0 70.834-26.916 81.9-26.916 81.9l-72.774 28.183-27.509-33.955-27.509 33.955-72.698-28.183s-26.916-11.066-26.916-41.75V-80.225a8.97 8.97 0 0 1 8.969-8.969H-8.97A8.97 8.97 0 0 1 0-80.225V-35"
                              style={{
                                strokeWidth: 15,
                                strokeLinecap: 'round',
                                strokeLinejoin: 'round',
                                strokeMiterlimit: 10,
                                strokeDasharray: 'none',
                                strokeOpacity: 1,
                              }}
                              transform="translate(504.484 104.139)"
                              fill="none"
                              stroke="#000"
                              strokeWidth={15}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeMiterlimit={10}
                              data-original="#000000"
                            />
                          </g>
                        </svg>
                        Agents
                        <svg
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && 'rotate-180'
                          }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </NavLink>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && 'hidden'
                        }`}
                      >
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <NavLink
                              to="/forms/form-elements"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              Create User
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/forms/form-layout"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              Form Layout
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/CreateProjects"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              Create Project
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              {/* <!-- Menu Item Calendar --> */}
              <li>
                <NavLink
                  to="/calendar"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('calendar') &&
                    'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  <svg
                    className="fill-current"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.7499 2.9812H14.2874V2.36245C14.2874 2.02495 14.0062 1.71558 13.6405 1.71558C13.2749 1.71558 12.9937 1.99683 12.9937 2.36245V2.9812H4.97803V2.36245C4.97803 2.02495 4.69678 1.71558 4.33115 1.71558C3.96553 1.71558 3.68428 1.99683 3.68428 2.36245V2.9812H2.2499C1.29365 2.9812 0.478027 3.7687 0.478027 4.75308V14.5406C0.478027 15.4968 1.26553 16.3125 2.2499 16.3125H15.7499C16.7062 16.3125 17.5218 15.525 17.5218 14.5406V4.72495C17.5218 3.7687 16.7062 2.9812 15.7499 2.9812ZM1.77178 8.21245H4.1624V10.9968H1.77178V8.21245ZM5.42803 8.21245H8.38115V10.9968H5.42803V8.21245ZM8.38115 12.2625V15.0187H5.42803V12.2625H8.38115ZM9.64678 12.2625H12.5999V15.0187H9.64678V12.2625ZM9.64678 10.9968V8.21245H12.5999V10.9968H9.64678ZM13.8374 8.21245H16.228V10.9968H13.8374V8.21245ZM2.2499 4.24683H3.7124V4.83745C3.7124 5.17495 3.99365 5.48433 4.35928 5.48433C4.7249 5.48433 5.00615 5.20308 5.00615 4.83745V4.24683H13.0499V4.83745C13.0499 5.17495 13.3312 5.48433 13.6968 5.48433C14.0624 5.48433 14.3437 5.20308 14.3437 4.83745V4.24683H15.7499C16.0312 4.24683 16.2562 4.47183 16.2562 4.75308V6.94683H1.77178V4.75308C1.77178 4.47183 1.96865 4.24683 2.2499 4.24683ZM1.77178 14.5125V12.2343H4.1624V14.9906H2.2499C1.96865 15.0187 1.77178 14.7937 1.77178 14.5125ZM15.7499 15.0187H13.8374V12.2625H16.228V14.5406C16.2562 14.7937 16.0312 15.0187 15.7499 15.0187Z"
                      fill=""
                    />
                  </svg>
                  Calendar
                </NavLink>
              </li>
              {/* <!-- Menu Item Calendar --> */}
              {/* <!-- Menu Item Profile --> */}
              <li>
                <NavLink
                  to="/profile"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes('profile') && 'bg-graydark dark:bg-meta-4'
                  }`}
                >
                  <svg
                    className="fill-current"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.0002 7.79065C11.0814 7.79065 12.7689 6.1594 12.7689 4.1344C12.7689 2.1094 11.0814 0.478149 9.0002 0.478149C6.91895 0.478149 5.23145 2.1094 5.23145 4.1344C5.23145 6.1594 6.91895 7.79065 9.0002 7.79065ZM9.0002 1.7719C10.3783 1.7719 11.5033 2.84065 11.5033 4.16252C11.5033 5.4844 10.3783 6.55315 9.0002 6.55315C7.62207 6.55315 6.49707 5.4844 6.49707 4.16252C6.49707 2.84065 7.62207 1.7719 9.0002 1.7719Z"
                      fill=""
                    />
                    <path
                      d="M10.8283 9.05627H7.17207C4.16269 9.05627 1.71582 11.5313 1.71582 14.5406V16.875C1.71582 17.2125 1.99707 17.5219 2.3627 17.5219C2.72832 17.5219 3.00957 17.2407 3.00957 16.875V14.5406C3.00957 12.2344 4.89394 10.3219 7.22832 10.3219H10.8564C13.1627 10.3219 15.0752 12.2063 15.0752 14.5406V16.875C15.0752 17.2125 15.3564 17.5219 15.7221 17.5219C16.0877 17.5219 16.3689 17.2407 16.3689 16.875V14.5406C16.2846 11.5313 13.8377 9.05627 10.8283 9.05627Z"
                      fill=""
                    />
                  </svg>
                  Profile
                </NavLink>
              </li>
              {/* <!-- Menu Item Profile --> */}
            </ul>
          </div>

          {/* <!-- Others Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              OTHERS
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Auth Pages --> */}
              <SidebarLinkGroup
                activeCondition={
                  pathname === '/auth' || pathname.includes('auth')
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                          (pathname === '/auth' || pathname.includes('auth')) &&
                          'bg-graydark dark:bg-meta-4'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <svg
                          className="fill-current"
                          width="18"
                          height="19"
                          viewBox="0 0 18 19"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_130_9814)">
                            <path
                              d="M12.7127 0.55835H9.53457C8.80332 0.55835 8.18457 1.1771 8.18457 1.90835V3.84897C8.18457 4.18647 8.46582 4.46772 8.80332 4.46772C9.14082 4.46772 9.45019 4.18647 9.45019 3.84897V1.88022C9.45019 1.82397 9.47832 1.79585 9.53457 1.79585H12.7127C13.3877 1.79585 13.9221 2.33022 13.9221 3.00522V15.0709C13.9221 15.7459 13.3877 16.2802 12.7127 16.2802H9.53457C9.47832 16.2802 9.45019 16.2521 9.45019 16.1959V14.2552C9.45019 13.9177 9.16894 13.6365 8.80332 13.6365C8.43769 13.6365 8.18457 13.9177 8.18457 14.2552V16.1959C8.18457 16.9271 8.80332 17.5459 9.53457 17.5459H12.7127C14.0908 17.5459 15.1877 16.4209 15.1877 15.0709V3.03335C15.1877 1.65522 14.0627 0.55835 12.7127 0.55835Z"
                              fill=""
                            />
                            <path
                              d="M10.4346 8.60205L7.62207 5.7333C7.36895 5.48018 6.97519 5.48018 6.72207 5.7333C6.46895 5.98643 6.46895 6.38018 6.72207 6.6333L8.46582 8.40518H3.45957C3.12207 8.40518 2.84082 8.68643 2.84082 9.02393C2.84082 9.36143 3.12207 9.64268 3.45957 9.64268H8.49395L6.72207 11.4427C6.46895 11.6958 6.46895 12.0896 6.72207 12.3427C6.83457 12.4552 7.00332 12.5114 7.17207 12.5114C7.34082 12.5114 7.50957 12.4552 7.62207 12.3145L10.4346 9.4458C10.6877 9.24893 10.6877 8.85518 10.4346 8.60205Z"
                              fill=""
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_130_9814">
                              <rect
                                width="18"
                                height="18"
                                fill="white"
                                transform="translate(0 0.052124)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                        Authentication
                        <svg
                          className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${
                            open && 'rotate-180'
                          }`}
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </NavLink>
                      {/* <!-- Dropdown Menu Start --> */}
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && 'hidden'
                        }`}
                      >
                        <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <NavLink
                              to="/auth/signin"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              Sign In
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/auth/signup"
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              Sign Up
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                      {/* <!-- Dropdown Menu End --> */}
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              {/* <!-- Menu Item Auth Pages --> */}
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
