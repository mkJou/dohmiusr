import axios from 'axios'
import { useState, useEffect } from 'react'

import { useRouter } from 'next/router';

const Dashboard = () => {

  const [user, setUser] = useState({
    username: ''
  })

  const [userSearch, setUserSearch] = useState("");

  const [totalGeneral, setTotalGeneral] = useState(0)
  const [totalAttendedGeneral, setTotalAttendedGeneral] = useState(0)
  const [totalNotAttendedGeneral, setTotalNotAttendedGeneral] = useState(0)

  const [totalAttendedWithoutPlanilla, setTotalAttendedWithoutPlanilla] = useState(0)

  const [totalUsers, setTotalUsers] = useState({
    attendedWithPlanilla: 0,
    attendedWithoutPlanilla: 0,

  });

  const router = useRouter()

  const handleGetProfile = async () => {
    const response = await axios.get('/api/auth/profile');
    setUser(response.data)
  }

  const logoutButton = async () => {
    try {
      await axios.post('/api/auth/logout');
      router.push('/login')
    } catch (error) {
      console.error(error)
      router.push('/login')
    }
  }

  const getTotalUsers = async () => {
    try {
      const response = await axios.get('/api/totalusers');
      const { count } = response.data
      setTotalGeneral(count)
    } catch (error) {
      console.error(error)
    }
  }

  const getTotalAttendedUsers = async () => {
    try {
      const response = await axios.post('/api/totalUsersAttended', { booleano: true, withoutPlanilla: false });
      const { count } = response.data
      console.log(count)
      setTotalAttendedGeneral(count)
    } catch (error) {
      console.error(error)
    }
  }

  const getTotalAttendedUsersWithoutPlanilla = async () => {
    try {
      const response = await axios.post('/api/totalUsersAttended', { booleano: true, withoutPlanilla: true });
      const { count } = response.data
      console.log('WH', count)
      setTotalAttendedWithoutPlanilla(count)
    } catch (error) {
      console.error(error)
    }
  }

  const getTotalNotAttendedUsers = async () => {
    try {
      const response = await axios.post('/api/totalUsersAttended', { booleano: false, withoutPlanilla: false });
      const { count } = response.data
      console.log(count)

      setTotalNotAttendedGeneral(count)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    handleGetProfile()
    getTotalUsers()
    getTotalAttendedUsers()
    getTotalNotAttendedUsers()
    getTotalAttendedUsersWithoutPlanilla()

  }, [])

  return (
    <>
      <div className="min-h-full">
        <nav className="bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img
                    className="h-8 w-8"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                    alt="Workflow"
                  />
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    <a
                      href="#"
                      className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                      aria-current="page"
                    >
                      Dashboard
                    </a>
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  <button
                    type="button"
                    className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  >
                    <span className="sr-only">View notifications</span>

                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                <button
                  type="button"
                  className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  aria-controls="mobile-menu"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open main menu</span>

                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>

                  <svg
                    className="hidden h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="md:hidden" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a
                href="#"
                className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
                aria-current="page"
              >
                Dashboard
              </a>
            </div>
            <div className="pt-4 pb-3 border-t border-gray-700">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium leading-none text-white">
                    Tom Cook
                  </div>
                  <div className="text-sm font-medium leading-none text-gray-400">
                    tom@example.com
                  </div>
                </div>
                <button
                  type="button"
                  className="ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                  <span className="sr-only">View notifications</span>

                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </nav>

        <header className="bg-white shadow">
          <div className=" max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Bienvenido/a,</h1>
            <h4 className="text-2xl font-bold text-gray-900">
              Se han detectado: {totalGeneral} participantes
            </h4>
          </div>
        </header>

        <main>
          <div>
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
              <div className="px-4 py-6 sm:px-0">
                <div>
                  <div className="md:grid md:grid-cols-3 md:gap-6">
                    <div className="md:col-span-1">
                      <div className="px-4 sm:px-0">
                        <div
                          className="border-2 px-2 py-3 rounded-lg"
                          id="chartGeneral"
                        >
                          <div className="flex justify-around">
                            <div className="flex space-x-2 items-center text-center bg-blue-300 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded ">
                              <p className="text-1xl">Asistieron</p>
                              <p className="text-2xl font-extrabold">
                                {totalAttendedGeneral}
                              </p>
                            </div>
                            <div className="flex space-x-2 items-center text-center bg-red-300 text-red-800 text-xs font-semibold px-2.5 rounded ">
                              <p className="text-1xl">No Asistieron</p>
                              <p className="text-2xl font-extrabold">
                                {totalNotAttendedGeneral}
                              </p>
                            </div>

                          </div>
                          <p className='block text-center p-2 text-red-500 font-bold'>[1] Se detectaron <span className='font-extrabold'>{totalAttendedWithoutPlanilla}</span> participantes que asisiteron sin planillas.</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 md:mt-0 md:col-span-2">
                      <h3 className="text-3xl font-medium leading-6 text-gray-900">
                        ¿A quien deseas buscar?
                      </h3>
                      <p className="mt-3 text-sm text-gray-600">
                        Introduce su número de cédula (sin puntos), o correo
                        electrónico para encontrar al participante. Podrás
                        editarlo y borrarlo.
                      </p>
                      <form className="mt-5">
                        <div className="border-2 rounded-lg">
                          <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                            <div className="grid grid-cols-1 gap-6">
                              <div className="">
                                <label
                                  htmlFor="company-website"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  {" "}
                                  Cédula de identidad{" "}
                                </label>
                                <div className="mt-1 flex rounded-md shadow-sm">
                                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="16"
                                      fill="currentColor"
                                      className="bi bi-file-person"
                                      viewBox="0 0 16 16"
                                    >
                                      <path d="M12 1a1 1 0 0 1 1 1v10.755S12 11 8 11s-5 1.755-5 1.755V2a1 1 0 0 1 1-1h8zM4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4z" />
                                      <path d="M8 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                                    </svg>
                                  </span>
                                  <input
                                    type="text"
                                    name="userci"

                                    id="userci"
                                    className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                                    placeholder="12345678"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-center px-4 py-3 bg-gray-50 text-right sm:px-6">
                            <button
                              type="button"

                              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                              Buscar
                            </button>
                          </div>
                        </div>
                      </form>
                      <div className="mt-5 bg-white border-2 overflow-hidden col-span-2 sm:rounded-lg">
                        <div className="items-center px-4 py-5 sm:px-6">
                          <div className="flex justify-start" id="title">
                            <h3 className="block text-lg leading-6 font-medium text-gray-900">
                              Datos del participante
                            </h3>
                          </div>
                          <div className="flex justify-end" id="buttons">
                            {userSearch.attendance ? (
                              <span className="flex items-center justify-center text-align-center bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900">
                                Este participante asistió
                              </span>
                            ) : (
                              <>
                                {userSearch.name ? (
                                  <span className="flex items-center justify-center text-align-center bg-red-100 text-red-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-red-200 dark:text-red-900">
                                    Este participante no asistió
                                  </span>
                                ) : (
                                  ""
                                )}
                              </>
                            )}

                            {userSearch.NOMBRE_APELLIDO ? (
                              <a
                                href={"/edit/" + userSearch.CEDULA}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                              >
                                Editar
                              </a>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <div
                          id="account-info"
                          className="border-t border-gray-200"
                        >
                          <dl>
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                              <dt className="text-sm font-medium text-gray-500">
                                Nombre y apellido
                              </dt>
                              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                <input
                                  className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300 disable"
                                  type="text"
                                  id="name"
                                  value={userSearch.NOMBRE_APELLIDO}
                                  disabled
                                />
                              </dd>
                            </div>
                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                              <dt className="text-sm font-medium text-gray-500">
                                Cédula de identidad
                              </dt>
                              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                <input
                                  className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300 disable"
                                  type="text"
                                  id="ci"
                                  value={userSearch.CEDULA}
                                  disabled
                                />
                              </dd>
                            </div>
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                              <dt className="text-sm font-medium text-gray-500">
                                Correo electrónico
                              </dt>
                              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                <input
                                  className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300 disable"
                                  type="text"
                                  id="email"
                                  value={userSearch.CORREO}
                                  disabled
                                />
                              </dd>
                            </div>
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                              <dt className="text-sm font-medium text-gray-500">
                                Teléfono
                              </dt>
                              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                <input
                                  className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300 disable"
                                  type="text"
                                  id="telephone"
                                  value={userSearch.TELEFONO}
                                  disabled
                                />
                              </dd>
                            </div>
                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                              <dt className="text-sm font-medium text-gray-500">
                                Taller
                              </dt>
                              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                <ul
                                  role="list"
                                  className="border border-gray-200 rounded-md divide-y divide-gray-200"
                                >
                                  <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                                    <div className="w-0 flex-1 flex items-center">
                                      <svg
                                        className="flex-shrink-0 h-5 w-5 text-gray-400"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                      <input
                                        className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300 disable"
                                        type="text"
                                        id="taller"
                                        value={userSearch.TALLER}
                                        disabled
                                      />
                                    </div>
                                  </li>
                                </ul>
                              </dd>
                            </div>
                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                              <dt className="text-sm font-medium text-gray-500">
                                Fase
                              </dt>
                              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                <input
                                  className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300 disable"
                                  type="text"
                                  id="fase"
                                  value={userSearch.FASE}
                                  disabled
                                />
                              </dd>
                            </div>
                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                              <dt className="text-sm font-medium text-gray-500">
                                Grupo
                              </dt>
                              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                <input
                                  className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300 disable"
                                  type="text"
                                  id="group"
                                  value={userSearch.GRUPO}
                                  disabled
                                />
                              </dd>
                            </div>
                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                              <dt className="text-sm font-medium text-gray-500">
                                Número de orden
                              </dt>
                              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                <input
                                  className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300 disable"
                                  type="text"
                                  id="orden_number"
                                  value={userSearch.ID}
                                  disabled
                                />
                              </dd>
                            </div>
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                              <dt className="text-sm font-medium text-gray-500">
                                Número de planilla
                              </dt>
                              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                <input
                                  className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300 disable"
                                  type="text"
                                  id="planilla"
                                  value={userSearch.N_PLANILLA}
                                  disabled
                                />
                              </dd>
                            </div>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
    // <>
    //   <h1>Dashboard</h1>
    //   <p>This is the dashboard page</p>
    //   <p>Username: {user.username}</p>


    //   <button>
    //     Profile
    //   </button>
    //   <button onClick={logoutButton}>
    //     Logout
    //   </button>
    // </>
  )

}

export default Dashboard