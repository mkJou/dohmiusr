import axios from 'axios'
import { useState, useEffect } from 'react'
import * as XLSX from 'xlsx';

import Head from 'next/head';

import { useRouter } from 'next/router';

import { Chart, ArcElement } from "chart.js";
Chart.register(ArcElement);
import { Pie } from "react-chartjs-2";

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

  const handleChangeOptionSelect = (e) => {
    setOptionSelect(parseInt(e.target.value))
  }

  const [usersFinded, setUsersFinded] = useState([])
  const [whatSearch, setWhatSearch] = useState({})

  const handleChangeSearchInput = async (e) => {

    let whatSearch = {
      select: `${optionSelect ? 'CEDULA' : 'NOMBRE_APELLIDO'}`,
      inputr: e.target.value
    }

    setWhatSearch({
      ...whatSearch,
      select: `${optionSelect ? 'CEDULA' : 'NOMBRE_APELLIDO'}`,
      inputr: e.target.value
    })
    //const response = await axios.post('/api/searchUserInput', whatSearch);
    //console.log(response)
  }

  const [optionSelect, setOptionSelect] = useState(0)

  const dataChart = {
    labels: ["Red", "Blue"],
    datasets: [
      {
        label: ["My First Dataset", "asd"],
        data: [totalNotAttendedGeneral, totalAttendedGeneral, totalAttendedWithoutPlanilla],
        backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)", "rgb(255, 255, 0)"],
        hoverOffset: 4,
      },
    ],
  };

  const router = useRouter()

  const handleGetProfile = async () => {
    const response = await axios.get('/api/auth/profile');
    setUser(response.data)
  }

  const [isSearching, setIsSearching] = useState(false)

  const searchUserButton = async () => {

    setIsSearching(true)

    const response = await axios.post('/api/searchUserInput', whatSearch);
    setUsersFinded((planilla) => [...response.data]);
    setIsSearching(false)
    console.log(usersFinded)

    // let pepe = '125.23.2.22';
    // let newp = ''
    // const divi = pepe.split('.')
    // newp.concat(divi[0])
    // console.log('>>', 'test test test')
    // divi.map(dv => {

    //   newp = `${newp}${dv}`

    // })
    // console.log('New number cedula', parseInt(newp))
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

  const getNotPlanilla = async () => {

    try {
      const response = await axios.post('/api/totaluserswoplanilla');
      console.log(response.data)

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
      <Head>
        <title>Dashboard - DohmiUSR</title>
      </Head>
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
            <h1 className="text-3xl font-bold text-gray-900">Bienvenido/a, {user.username.toUpperCase()} </h1>
            <h4 className="text-3xl font-bold text-gray-900">
              Se encontraron {totalGeneral} participantes en total.
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
                        {totalAttendedWithoutPlanilla > 0 ? <>
                          <div className="flex p-4 mb-4 text-xs text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
                            <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
                            <span className="sr-only">Info</span>
                            <div>
                              Se detectó que <span className='font-bold'>{totalAttendedWithoutPlanilla} participantes</span> asistieron sin planilla.
                            </div>
                          </div>
                        </> : ''}
                        <div
                          className="border-2 px-2 py-3 rounded-lg"
                          id="chartGeneral"
                        >
                          <div className="flex space-x-3 mb-5 justify-around">
                            <div className="flex space-x-2 items-center text-center bg-blue-300 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded ">
                              <p className="text-1xl">Asistieron</p>
                              <p className="text-2xl font-extrabold">
                                {totalAttendedGeneral}
                              </p>
                            </div>
                            <div className="flex space-x-2 items-center text-center bg-yellow-300 text-red-800 text-xs font-semibold px-2.5 rounded ">
                              <p className="text-1xl">Asistieron S/Planilla</p>
                              <p className="text-2xl font-extrabold">
                                {totalAttendedWithoutPlanilla}
                              </p>
                            </div>
                            <div className="space-x-2 items-center text-center bg-red-300 text-red-800 text-xs font-semibold px-2.5 rounded ">
                              <p className="text-1xl">No Asistieron</p>
                              <p className="text-xs font-extrabold">
                                A: {totalNotAttendedGeneral - 321}
                              </p>
                              <p className="text-xs font-extrabold">
                                SA: 321
                              </p>
                              <p className="text-xs font-extrabold">
                                TOTAL: {totalNotAttendedGeneral}
                              </p>
                            </div>

                          </div>


                          <Pie data={dataChart} />
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
                          <div className="flex justify-center px-4 py-3 bg-white space-y-2 sm:p-6">
                            <div className="grid grid-cols-1 gap-2">

                              <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                  Buscar por
                                </label>
                                <select onChange={handleChangeOptionSelect} className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                                  <option value={parseInt("0")}>Nombre y apellido</option>
                                  <option value={parseInt("1")}>Cédula de identidad</option>
                                </select>
                              </div>
                              <div className="flex flex-wrap">
                                <div className=" w-full">
                                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                                    Datos
                                  </label>
                                  <input onChange={handleChangeSearchInput} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder={optionSelect ? 'Cédula de identidad' : 'Nombre o apellido'} />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex justify-center px-4 py-3 bg-gray-50 text-right sm:px-6">
                            <button
                              type="button"
                              onClick={searchUserButton}
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
                              Resultados de la busqueda
                            </h3>
                          </div>
                          {usersFinded.valuer}
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
                        <div className="overflow-x-auto relative">
                          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                              <tr>
                                <th scope="col" className="py-3 px-6">
                                  NOMBRE Y APELLIDO
                                </th>
                                <th scope="col" className="py-3 px-6">
                                  CÉDULA DE IDENTIDAD
                                </th>
                                <th scope="col" className="py-3 px-6">
                                  PLANILLA
                                </th>
                                <th scope="col" className="py-3 px-6">
                                  TALLER
                                </th>
                                <th scope="col" className="py-3 px-6">
                                  ASISTIÓ
                                </th>
                                <th scope="col" className="py-3 px-6">
                                  ACCIONAR
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {isSearching ? (<>

                                <span>asd</span>

                              </>) : 'NADA'}
                              {usersFinded.map((user) => (<>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                  <th
                                    scope="row"
                                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                  >
                                    {user.NOMBRE_APELLIDO}
                                  </th>
                                  <td className="py-4 px-6">{user.CEDULA}</td>
                                  <td className="py-4 px-6">{user.N_PLANILLA}</td>
                                  <td className="py-4 px-6">{user.TALLER}</td>
                                  <td className="py-4 px-6">
                                    {user.ATTENDED ? "SI" : "NO"}
                                  </td>

                                  <td className="py-4 px-6">
                                    <a href={"/edit/" + user.CEDULA}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                                      <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                      <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                                    </svg></a>
                                  </td>
                                </tr>
                              </>))}
                              {/* {totalUsersNotPlanilla.map((user) => (
                                <>
                                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th
                                      scope="row"
                                      className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                      {user.NOMBRE_APELLIDO}
                                    </th>
                                    <td className="py-4 px-6">{user.CEDULA}</td>
                                    <td className="py-4 px-6">{user.N_PLANILLA}</td>
                                    <td className="py-4 px-6">{user.TALLER}</td>
                                    <td className="py-4 px-6">
                                      {user.ATTENDED ? "SI" : "NO"}
                                    </td>
                                    <td className="py-4 px-6">
                                      {user.FASE ? (
                                        user.FASE
                                      ) : (
                                        <>
                                          <span className="text-red-200">
                                            Sin asignar
                                          </span>
                                        </>
                                      )}
                                    </td>
                                    <td className="py-4 px-6">
                                      {user.GRUPO ? (
                                        user.GRUPO
                                      ) : (
                                        <>
                                          <span className="text-red-200">
                                            Sin asignar
                                          </span>
                                        </>
                                      )}
                                    </td>
                                    <td className="py-4 px-6">
                                      <a href={"/edit/" + user.CEDULA}>Editar</a>
                                    </td>
                                  </tr>
                                </>
                              ))} */}
                            </tbody>
                          </table>
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