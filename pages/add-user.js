import Head from "next/head";
import { useState, useEffect } from "react";

import { createUser, readUser } from "../lib/users";

export default function Home() {
  const [name, setName] = useState("");
  const [ci, setCI] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [taller, setTaller] = useState("");
  const [planilla, setPlanilla] = useState("");
  const [fase, setFase] = useState("");
  const [group, setGroup] = useState("");
  const [ordenNumber, setOrdenNumber] = useState("");
  const [attendance, setAttendance] = useState("");
  const [appr, setAppr] = useState("");
  const [approved, setApproved] = useState(false);
  const [observaciones, setObservaciones] = useState("")

  function handleChangeName(event) {
    setName(event.target.value);
  }

  function handleChangeObservaciones(event) {
    setObservaciones(event.target.value);
  }

  function handleChangeCI(event) {
    setCI(event.target.value);
  }

  function handleChangeEmail(event) {
    setEmail(event.target.value);
  }

  function handleChangeTelephone(event) {
    setTelephone(event.target.value);
  }

  function handleChangeTaller(event) {
    setTaller(event.target.value);
  }

  function handleChangePlanilla(event) {
    setPlanilla(event.target.value);
  }

  function handleChangeFase(event) {
    setFase(event.target.value);
  }

  function handleChangeGroup(event) {
    setGroup(event.target.value);
  }

  function handleChangeOrdenNumber(event) {
    setOrdenNumber(event.target.value);
  }

  function handleChangeAttendance(event) {
    setAttendance(event.target.value);
  }

  function handleChangeAppr(event) {
    setAppr(event.target.value);
  }

  function handleChangeApproved(event) {
    setApproved(event.target.value);
  }

  const buttonSendNewUser = async () => {
    const exect = await createUser(
      appr,
      approved,
      attendance,
      ci,
      email,
      fase,
      group,
      name,
      ordenNumber,
      planilla,
      taller,
      telephone,
      observaciones
    );

    console.log(exect);
    alert("Agregado");

    console.log(
      name,
      ci,
      email,
      telephone,
      taller,
      planilla,
      fase,
      group,
      ordenNumber,
      attendance,
      appr,
      approved
    );
  };

  return (
    <>
      <Head>
        <title>Agregar partipante</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
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
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          </div>
        </header>

        <main>
          <div className="hidden sm:block" aria-hidden="true">
            <div className="py-5">
              <div className="border-t border-gray-200"></div>
            </div>
          </div>
          <div className="mt-10 sm:mt-0">
            <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Nuevo participante
                  </h3>
                </div>
              </div>
              <div className="mt-5 md:mt-0 md:col-span-2">
                <form>
                  <div className="shadow overflow-hidden sm:rounded-md">
                    <div className="px-4 py-5 bg-white sm:p-6">
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="first-name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Nombre y apellidos
                          </label>
                          <input
                            type="text"
                            name="first-name"
                            id="name"
                            onChange={handleChangeName}
                            autoComplete="given-name"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="last-name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Cédula de identidad
                          </label>
                          <input
                            type="text"
                            name="last-name"
                            onChange={handleChangeCI}
                            id="ci"
                            autoComplete="family-name"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-4">
                          <label
                            htmlFor="email-address"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Correo electrónico
                          </label>
                          <input
                            type="text"
                            name="email-address"
                            onChange={handleChangeEmail}
                            id="email"
                            autoComplete="email"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-4">
                          <label
                            htmlFor="email-address"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Teléfono
                          </label>
                          <input
                            type="text"
                            name="email-address"
                            id="email-address"
                            onChange={handleChangeTelephone}
                            autoComplete="email"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="country"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Talleres
                          </label>
                          <select
                            id="taller"
                            name="taller"
                            onChange={handleChangeTaller}
                            autoComplete="country-name"
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          >
                            {/**
                             * FRITURA ZULIANA *
                             * SALSA PARA PASTAS *
                             * POSTRES LIGERPS *
                             * PANADERIA COMERCIAL *
                             * COMIDA RAPIDA
                             * ASISTENTE DE COCINA
                             *
                             */}
                            <option value="TALLER-PIZZERIA">
                              TALLER DE PIZZERIA
                            </option>
                            <option value="TALLER-PASTAS-FRESCAS">
                              TALLER DE PASTAS FRESCAS
                            </option>
                            <option value="TALLER-REPOSTERIA">
                              REPOSTERIA
                            </option>
                            <option value="PANADERIA-COMERCIAL">
                              PANADERIA COMERCIAL
                            </option>
                            <option value="BARISMO">BARISMO</option>
                            <option value="FRITURA-ZULIANA">
                              FRITURA ZULIANA
                            </option>
                            <option value="SALSA-PASTAS">
                              SALSA PARA PASTAS
                            </option>
                            <option value="POSTRES-LIGEROS">
                              POSTRES LIGEROS
                            </option>
                            <option value="COMIDA-RAPIDA">COMIDA RAPIDA</option>
                            <option value="ASISTENTE-COCINA">
                              ASISTENTE DE COCINA
                            </option>
                          </select>
                        </div>

                        <div className="col-span-6">
                          <label
                            htmlFor="street-address"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Número de planilla
                          </label>
                          <input
                            type="text"
                            name="street-address"
                            onChange={handleChangePlanilla}
                            id="planilla"
                            autoComplete="street-address"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                          <label
                            htmlFor="city"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Fase
                          </label>
                          <input
                            type="text"
                            id="fase"
                            onChange={handleChangeFase}
                            autoComplete="address-level2"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                          <label
                            htmlFor="region"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Grupo
                          </label>
                          <input
                            type="text"
                            onChange={handleChangeGroup}
                            name="region"
                            id="group"
                            autoComplete="address-level1"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                          <label
                            htmlFor="postal-code"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Orden
                          </label>
                          <input
                            type="text"
                            name="postal-code"
                            id="orden_number"
                            onChange={handleChangeOrdenNumber}
                            autoComplete="postal-code"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="country"
                            className="block text-sm font-medium text-gray-700"
                          >
                            ¿Asistió?
                          </label>
                          <select
                            id="attendance"
                            name="taller"
                            autoComplete="country-name"
                            onChange={handleChangeAttendance}
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          >
                            <option value={true}>SI</option>
                            <option value={false}>NO</option>
                          </select>
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="country"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Participante
                          </label>
                          <select
                            id="appr"
                            name="taller"
                            onChange={handleChangeAppr}
                            autoComplete="country-name"
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          >
                            <option value="0">NO ASISTIÓ</option>
                            <option value="1">INDUCCIÓN</option>
                            <option value="2">COMPLETO EL CURSO</option>
                          </select>
                        </div>
                        <div className="col-span-6">
                          <label
                            htmlFor="street-address"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Observaciones
                          </label>
                          <input
                            type="text"
                            name="street-address"
                            onChange={handleChangePlanilla}
                            id="planilla"
                            autoComplete="street-address"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                      <button
                        onClick={buttonSendNewUser}
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
