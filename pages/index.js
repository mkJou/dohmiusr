import { useRouter } from 'next/router';
import Link from "next/link";
import axios from 'axios'
import { useState, useEffect } from 'react'

const Home = () => {

  const [user, setUser] = useState({
    username: ''
  })

  const [totalPTaller, setTotalPTaller] = useState([])

  const [tpTaller, settpTaller] = useState([])

  const [totalGeneral, setTotalGeneral] = useState(0)
  const [totalAttendedGeneral, setTotalAttendedGeneral] = useState(0)
  const [totalNotAttendedGeneral, setTotalNotAttendedGeneral] = useState(0)

  const [totalAttendedWithoutPlanilla, setTotalAttendedWithoutPlanilla] = useState(0)

  const [viewTaller, setViewTaller] = useState(false)

  const handleGetProfile = async () => {
    const response = await axios.get('/api/auth/profile');
    setUser(response.data)
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

  const getParticipantes = async (talleres) => {

    for (let index = 0; index < talleres.length; index++) {
      const element = talleres[index];

      try {
        const response = await axios.post('/api/getTotalUsersTaller', { taller: element });
        const { countA, countNa } = response.data

        let newlist = {
          name: element,
          attended: countA,
          nattended: countNa
        }

        settpTaller(result => ([
          ...result,
          newlist
        ]))

        // settpTaller(result => ([
        //   ...result,
        //   [String(element)]: {
        //     attended: countA,
        //     nattended: countNa
        //   }
        // ]))

        // totalPTaller.push({
        //   name: String(element),
        //   attended: countA,
        //   nattended: countNa
        // })
        console.log(String(element), countA)
      } catch (error) {
        console.log(error)
      }
    }

    setViewTaller(true)

    // try {
    //   
    //   

    //   
    //   //console.log(response)
    //   //setTotalAttendedGeneral(count)
    // } catch (error) {
    //   console.error(error)
    // }
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

  useEffect(() => {
    //getParticipantes()
    handleGetProfile()
    getTotalUsers()
    getTotalAttendedUsers()
    getTotalNotAttendedUsers()
    getTotalAttendedUsersWithoutPlanilla()

    getParticipantes([
      'BARISMO',
      'TALLER-PIZZERIA',
      'ASISTENTE-COCINA',
      'REPOSTERIA',
    ])

  }, [])

  return (
    <>
      <main className="bg-gray-100 dark:bg-gray-800 h-screen overflow-hidden relative">
        <div className="flex items-start justify-between">
          <div className="h-screen hidden lg:block shadow-lg relative w-80">
            <div className="bg-white h-full text-center dark:bg-gray-700">
              <div className="bg-white flex items-center justify-start pt-6">
                <img src="logogob.png" alt="asd" />
              </div>
              <nav className="mt-6">
                <div>
                  <Link key={"homet"} href="/">
                    <a className="w-full text-gray-800 dark:text-white flex items-center pl-6 p-2 my-2 transition-colors duration-200 justify-start border-l-4 border-purple-500">
                      <span className="text-left">
                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1472 992v480q0 26-19 45t-45 19h-384v-384h-256v384h-384q-26 0-45-19t-19-45v-480q0-1 .5-3t.5-3l575-474 575 474q1 2 1 6zm223-69l-62 74q-8 9-21 11h-3q-13 0-21-7l-692-577-692 577q-12 8-24 7-13-2-21-11l-62-74q-8-10-7-23.5t11-21.5l719-599q32-26 76-26t76 26l244 204v-195q0-14 9-23t23-9h192q14 0 23 9t9 23v408l219 182q10 8 11 21.5t-7 23.5z">
                          </path>
                        </svg>
                      </span>
                      <span className="mx-2 text-sm font-normal">
                        Inicio
                      </span>
                    </a>
                  </Link>
                  <Link key={'searchuser'} href="/search">
                    <a className="w-full text-gray-400 flex items-center pl-6 p-2 my-2 transition-colors duration-200 justify-start hover:text-gray-800 border-l-4 border-transparent">
                      <span className="text-left">
                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 2048 1792" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1070 1178l306-564h-654l-306 564h654zm722-282q0 182-71 348t-191 286-286 191-348 71-348-71-286-191-191-286-71-348 71-348 191-286 286-191 348-71 348 71 286 191 191 286 71 348z">
                          </path>
                        </svg>
                      </span>
                      <span className="mx-2 text-sm font-normal">
                        Buscar
                        <span className="p-1 ml-4 rounded-lg w-4 h-2 bg-gray-200 text-gray-400 text-xs">
                          0
                        </span>
                      </span>
                    </a>
                  </Link>

                  <a className="w-full text-gray-400 flex items-center pl-6 p-2 my-2 transition-colors duration-200 justify-start hover:text-gray-800 border-l-4 border-transparent" href="#">
                    <span className="text-left">
                      <svg width="20" height="20" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1728 608v704q0 92-66 158t-158 66h-1216q-92 0-158-66t-66-158v-960q0-92 66-158t158-66h320q92 0 158 66t66 158v32h672q92 0 158 66t66 158z">
                        </path>
                      </svg>
                    </span>
                    <span className="mx-4 text-sm font-normal">
                      Resources
                    </span>
                  </a>
                  <a className="w-full text-gray-400 flex items-center pl-6 p-2 my-2 transition-colors duration-200 justify-start hover:text-gray-800 border-l-4 border-transparent" href="#">
                    <span className="text-left">
                      <svg width="20" height="20" fill="currentColor" viewBox="0 0 2048 1792" xmlns="http://www.w3.org/2000/svg">
                        <path d="M580 461q0-41-25-66t-66-25q-43 0-76 25.5t-33 65.5q0 39 33 64.5t76 25.5q41 0 66-24.5t25-65.5zm743 507q0-28-25.5-50t-65.5-22q-27 0-49.5 22.5t-22.5 49.5q0 28 22.5 50.5t49.5 22.5q40 0 65.5-22t25.5-51zm-236-507q0-41-24.5-66t-65.5-25q-43 0-76 25.5t-33 65.5q0 39 33 64.5t76 25.5q41 0 65.5-24.5t24.5-65.5zm635 507q0-28-26-50t-65-22q-27 0-49.5 22.5t-22.5 49.5q0 28 22.5 50.5t49.5 22.5q39 0 65-22t26-51zm-266-397q-31-4-70-4-169 0-311 77t-223.5 208.5-81.5 287.5q0 78 23 152-35 3-68 3-26 0-50-1.5t-55-6.5-44.5-7-54.5-10.5-50-10.5l-253 127 72-218q-290-203-290-490 0-169 97.5-311t264-223.5 363.5-81.5q176 0 332.5 66t262 182.5 136.5 260.5zm592 561q0 117-68.5 223.5t-185.5 193.5l55 181-199-109q-150 37-218 37-169 0-311-70.5t-223.5-191.5-81.5-264 81.5-264 223.5-191.5 311-70.5q161 0 303 70.5t227.5 192 85.5 263.5z">
                        </path>
                      </svg>
                    </span>
                    <span className="mx-4 text-sm font-normal">
                      Store feedback
                    </span>
                  </a>
                </div>
              </nav>
            </div>
          </div>
          <div className="flex flex-col w-full md:space-y-4">
            <header className="w-full h-16 z-40 flex items-center justify-between">
              <div className="block lg:hidden ml-6">
                <button className="flex p-2 items-center rounded-full bg-white shadow text-gray-500 text-md">
                  <svg width="20" height="20" className="text-gray-400" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1664 1344v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45z">
                    </path>
                  </svg>
                </button>
              </div>
              <div className="relative z-20 flex flex-col justify-end h-full px-3 md:w-full">
                <div className="text-white relative p-1 flex items-center w-full space-x-4 justify-end">
                  <p className='text-right'>
                    <span className='text-sm'>Ha iniciado sesión:</span>
                    <br />
                    <span className='text-lg uppercase font-bold'>ADMINGOB</span>
                  </p>
                </div>
              </div>
            </header>
            <div className="overflow-auto h-screen pb-24 px-4 md:px-6">
              <h1 className="text-4xl font-semibold text-gray-800 dark:text-white">
                Bienvenido(a), ADMINGOB
              </h1>
              <h2 className="text-md text-gray-400">
                Panel de consulta de información sobre los participantes del programa Saber y Emprender de la Gobernación del Zulia.
              </h2>
              {/** ALERT */}
              {totalAttendedWithoutPlanilla > 0 ? (<>
                <div className="bg-yellow-600 mt-6 ">
                  <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between flex-wrap">
                      <div className="w-0 flex-1 flex items-center">
                        <span className="flex p-2 rounded-lg bg-yellow-800 ">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="h-6 w-6 text-white" viewBox="0 0 1792 1792">
                            <path d="M1024 1375v-190q0-14-9.5-23.5t-22.5-9.5h-192q-13 0-22.5 9.5t-9.5 23.5v190q0 14 9.5 23.5t22.5 9.5h192q13 0 22.5-9.5t9.5-23.5zm-2-374l18-459q0-12-10-19-13-11-24-11h-220q-11 0-24 11-10 7-10 21l17 457q0 10 10 16.5t24 6.5h185q14 0 23.5-6.5t10.5-16.5zm-14-934l768 1408q35 63-2 126-17 29-46.5 46t-63.5 17h-1536q-34 0-63.5-17t-46.5-46q-37-63-2-126l768-1408q17-31 47-49t65-18 65 18 47 49z">
                            </path>
                          </svg>
                        </span>
                        <p className="ml-3 font-medium text-white truncate">
                          <span className="md:hidden">
                            This site use cookies!
                          </span>
                          <span className="hidden md:inline">
                            Se han encontrado <span className='font-extrabold text-1xl'>{totalAttendedWithoutPlanilla}</span> participantes sin número de planilla.
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </>) : ''}

              <div className="flex my-6 items-center w-full space-y-4 md:space-x-4 md:space-y-0 flex-col md:flex-row">
                <div className="flex items-center w-full space-x-4">
                  <div className="w-1/2">
                    <div className="shadow-lg px-4 py-6 w-full bg-white dark:bg-gray-700 relative">
                      <p className="text-2xl text-black dark:text-white font-bold">
                        {totalGeneral} Participantes
                      </p>
                      <p className="text-white font-semibold text-sm">
                        Total de participantes
                      </p>
                    </div>
                  </div>
                  <div className="w-1/2">
                    <div className="shadow-lg px-4 py-6 w-full bg-sky-700 relative">
                      <p className="text-2xl text-black dark:text-white font-bold">
                        {totalAttendedGeneral}
                      </p>
                      <p className="text-white font-semibold text-sm">
                        Participantes asistidos
                      </p>
                      <span className="rounded-full absolute p-4 bg-sky-500 top-2 right-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="text-white h-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" width="40" fill="currentColor" height="40" viewBox="0 0 16 16">
                          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                          <path d="M12.331 9.5a1 1 0 0 1 0 1A4.998 4.998 0 0 1 8 13a4.998 4.998 0 0 1-4.33-2.5A1 1 0 0 1 4.535 9h6.93a1 1 0 0 1 .866.5zM7 6.5c0 .828-.448 0-1 0s-1 .828-1 0S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 0-1 0s-1 .828-1 0S9.448 5 10 5s1 .672 1 1.5z" />
                        </svg>
                      </span>
                    </div>
                  </div>
                  <div className="w-1/2">
                    <div className="shadow-lg px-4 py-6 w-full bg-red-700 relative">
                      <p className="text-2xl text-black dark:text-white font-bold">
                        {totalNotAttendedGeneral}
                      </p>
                      <p className="text-white font-semibold text-sm">
                        Participantes no asistidos
                      </p>
                      <span className="rounded-full absolute p-4 bg-red-500 top-2 right-4">

                        <svg xmlns="http://www.w3.org/2000/svg" className="text-white h-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" width="40" fill="currentColor" height="40" viewBox="0 0 16 16">
                          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                          <path d="M4.285 12.433a.5.5 0 0 0 .683-.183A3.498 3.498 0 0 1 8 10.5c1.295 0 2.426.703 3.032 1.75a.5.5 0 0 0 .866-.5A4.498 4.498 0 0 0 8 9.5a4.5 4.5 0 0 0-3.898 2.25.5.5 0 0 0 .183.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center">

                <hr></hr>

              </div>
              {tpTaller.BARISMO?.attended}
              <button onClick={() => console.log(tpTaller)}>Click me</button>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
                {totalPTaller.map(taller => <>
                  <div key={taller?.name} className="w-full">
                    <div className="shadow-lg px-4 py-6 w-full bg-white dark:bg-gray-700 relative">
                      <p className="text-sm w-max text-gray-700 dark:text-white font-semibold border-b border-gray-200">
                        {taller?.name}
                      </p>
                      <div className="flex items-end space-x-2 my-6">
                        <p className="text-5xl text-black dark:text-white font-bold">
                          {taller.attended + taller.nattended}
                        </p>
                        <span className="text-white text-xl font-bold flex items-center">
                          participantes
                        </span>
                      </div>
                      <div className='mb-4'>
                        <div>
                          <span>Asistidos: {taller.attended}</span>
                        </div>
                        <div>
                          <span>No Asistidos: {taller.nattended}</span>
                        </div>
                      </div>
                      <button onClick={() => console.log('>>', totalPTaller)} className="bg-blue-500 w-full flex items-center justify-center space-x-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                          <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                          <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                        </svg>
                        <span>Visualizar</span>
                      </button>
                    </div>
                  </div>
                </>)}
                {/* <div className="w-full">
                  <div className="shadow-lg px-4 py-6 w-full bg-white dark:bg-gray-700 relative">
                    <p className="text-sm w-max text-gray-700 dark:text-white font-semibold border-b border-gray-200">
                      Barismo
                    </p>
                    <div className="flex items-end space-x-2 my-6">
                      <p className="text-5xl text-black dark:text-white font-bold">
                        {totalPTaller.BARISMO?.ATTENDED + totalPTaller.BARISMO?.NATTENDED}
                      </p>
                      <span className="text-white text-xl font-bold flex items-center">
                        participantes
                      </span>
                    </div>
                    <div className='mb-4'>
                      <div>
                        <span>Asistidos: {totalPTaller.BARISMO?.ATTENDED}</span>
                      </div>
                      <div>
                        <span>No Asistidos: {totalPTaller.BARISMO?.NATTENDED}</span>
                      </div>
                    </div>
                    <button onClick={() => console.log('>>', totalPTaller)} className="bg-blue-500 w-full flex items-center justify-center space-x-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                      </svg>
                      <span>Visualizar</span>
                    </button>
                  </div>
                </div>
                <div className="w-full">
                  <div className="shadow-lg px-4 py-6 w-full bg-white dark:bg-gray-700 relative">
                    <p className="text-sm w-max text-gray-700 dark:text-white font-semibold border-b border-gray-200">
                      Reposteria
                    </p>
                    <div className="flex items-end space-x-2 my-6">
                      <p className="text-5xl text-black dark:text-white font-bold">
                        125
                      </p>
                      <span className="text-white text-xl font-bold flex items-center">
                        participantes
                      </span>
                    </div>
                    <button className="bg-blue-500 w-full flex items-center justify-center space-x-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                      </svg>
                      <span>Visualizar</span>
                    </button>
                  </div>
                </div>
                <div className="w-full">
                  <div className="shadow-lg px-4 py-6 w-full bg-white dark:bg-gray-700 relative">
                    <p className="text-sm w-max text-gray-700 dark:text-white font-semibold border-b border-gray-200">
                      Panaderia Comercial
                    </p>
                    <div className="flex items-end space-x-2 my-6">
                      <p className="text-5xl text-black dark:text-white font-bold">
                        125
                      </p>
                      <span className="text-white text-xl font-bold flex items-center">
                        participantes
                      </span>
                    </div>
                    <button className="bg-blue-500 w-full flex items-center justify-center space-x-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                      </svg>
                      <span>Visualizar</span>
                    </button>
                  </div>
                </div>
                <div className="w-full">
                  <div className="shadow-lg px-4 py-6 w-full bg-white dark:bg-gray-700 relative">
                    <p className="text-sm w-max text-gray-700 dark:text-white font-semibold border-b border-gray-200">
                      Pizzeria
                    </p>
                    <div className="flex items-end space-x-2 my-6">
                      <p className="text-5xl text-black dark:text-white font-bold">
                        125
                      </p>
                      <span className="text-white text-xl font-bold flex items-center">
                        participantes
                      </span>
                    </div>
                    <button className="bg-blue-500 w-full flex items-center justify-center space-x-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                      </svg>
                      <span>Visualizar</span>
                    </button>
                  </div>
                </div>
                <div className="w-full">
                  <div className="shadow-lg px-4 py-6 w-full bg-white dark:bg-gray-700 relative">
                    <p className="text-sm w-max text-gray-700 dark:text-white font-semibold border-b border-gray-200">
                      Asistente de cocina
                    </p>
                    <div className="flex items-end space-x-2 my-6">
                      <p className="text-5xl text-black dark:text-white font-bold">
                        125
                      </p>
                      <span className="text-white text-xl font-bold flex items-center">
                        participantes
                      </span>
                    </div>
                    <button className="bg-blue-500 w-full flex items-center justify-center space-x-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                      </svg>
                      <span>Visualizar</span>
                    </button>
                  </div>
                </div> */}
                <div className="w-full">
                  <div className="shadow-lg px-4 py-6 w-full bg-white dark:bg-gray-700 relative">
                    <p className="text-sm w-max text-gray-700 dark:text-white font-semibold border-b border-gray-200">
                      Salsa para pastas
                    </p>
                    <div className="flex items-end space-x-2 my-6">
                      <p className="text-5xl text-black dark:text-white font-bold">
                        125
                      </p>
                      <span className="text-white text-xl font-bold flex items-center">
                        participantes
                      </span>
                    </div>
                    <button className="bg-blue-500 w-full flex items-center justify-center space-x-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                      </svg>
                      <span>Visualizar</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

    </>
  )
}

export default Home