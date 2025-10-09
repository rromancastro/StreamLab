"use client";
import { useEffect, useRef, useState } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import { IoTriangleSharp } from "react-icons/io5";
import { getAllReservas } from "../helpers/apiCall";
import Image from "next/image";

export const TurneraMensual = ({ setTurnera }) => {

    //fechas ocupadas
    const [reservas, setReservas] = useState([]);
    const [diasReservados, setDiasReservados] = useState([]);
    const [horariosReservados, setHorariosReservados] = useState([[], [], [], []]); // 4 bloques

    useEffect(() => {
        getAllReservas().then(data => setReservas(data.data));
    }, []);

    useEffect(() => {
        setDiasReservados(reservas.map(reserva => reserva.fecha_inicio.slice(0, 10)));
    }, [reservas]);

    const [fechaSeleccionada, setFechaSeleccionada] = useState([new Date(), new Date(), new Date(), new Date()]);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [horarioSeleccionado, setHorarioSeleccionado] = useState([1, 1, 1, 1]);
    const [showCalendar, setShowCalendar] = useState([false, false, false, false]);
    const [showHorarios, setShowHorarios] = useState([false, false, false, false]);

    const meses = [
        "Enero", "Febrero", "Marzo", "Abril",
        "Mayo", "Junio", "Julio", "Agosto",
        "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    const horarios = [
        "10-12 hs", "12-14 hs", "14-16 hs",
        "16-18 hs", "18-20 hs", "20-22 hs",
        "22-00 hs",
    ];

    // actualizar horarios reservados
    useEffect(() => {
        const newHorarios = fechaSeleccionada.map(fecha => {
            const fechaISO = fecha.toISOString().slice(0, 10);
            if (diasReservados.includes(fechaISO)) {
                const dia = reservas.filter(r => r.fecha_inicio.slice(0, 10) === fechaISO);
                return dia.map(d => d.fecha_inicio.slice(11, 13));
            }
            return [];
        });
        setHorariosReservados(newHorarios);

        // primer horario disponible
        const nuevosHorariosSeleccionados = newHorarios.map((horasOcupadas) => {
            const index = horarios.findIndex(h => !horasOcupadas.includes(h.slice(0, 2)));
            return index !== -1 ? index + 1 : null;
        });
        setHorarioSeleccionado(nuevosHorariosSeleccionados);

    }, [fechaSeleccionada, reservas, diasReservados]);

    //controlar calendario
    const prevMonth = () => {
        setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    };

    const nextMonth = () => {
        setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    };

    //flow
    const [turneraStep, setTurneraStep] = useState(1);

    const [userEmail, setUserEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const verificarDatos = () => {
        if (userEmail === '' || userEmail.includes('@') === false || userEmail.includes('.') === false) {
            setErrorMessage('El eMail ingresado no es válido');
        } else if (userName.length < 3) {
            setErrorMessage('El nombre ingresado no es válido');
        } else {
            setTurneraStep(3);
        }
    }

    function obtenerSemana(fecha) {
        const f = new Date(fecha);
        const primerDiaDelAño = new Date(f.getFullYear(), 0, 1);
        const diasTranscurridos = Math.floor((f - primerDiaDelAño) / (24 * 60 * 60 * 1000));

        const numeroSemana = Math.ceil((diasTranscurridos + (primerDiaDelAño.getDay() + 7) % 7) / 7);

        return `${f.getFullYear()}-${numeroSemana}`;
    }

    //cerrar al hacer click afuera
    const calendarRef = useRef(null);
    const horariosRef = useRef(null);

    useEffect(() => {
    const handleClickOutside = (event) => {
        if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target) &&
        !event.target.closest(".seleccionarFechaContainer")
        ) {
        setShowCalendar([false, false, false, false]);
        }

        if (
        horariosRef.current &&
        !horariosRef.current.contains(event.target) &&
        !event.target.closest(".seleccionarFechaContainer")
        ) {
        setShowHorarios([false, false, false, false]);
        }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };
    }, []);


    //semanas correspondientes
    useEffect(() => {
        const fechaActual = fechaSeleccionada[0];
        let fecha2 = new Date(fechaActual);
        let fecha3 = new Date(fechaActual);
        let fecha4 = new Date(fechaActual);
        fecha2.setDate(fecha2.getDate() + 7);
        fecha3.setDate(fecha3.getDate() + 14);
        fecha4.setDate(fecha4.getDate() + 21);
        setFechaSeleccionada([fechaActual, fecha2, fecha3, fecha4]);
    }, [fechaSeleccionada[0]])

    const [showErrorToast, setShowErrorToast] = useState(false);

    return (
        <div id="turneraContainer">
            {
                showErrorToast && <div onClick={() => setShowErrorToast(false)} id="errorToastContainer">
                    <p>Ups, sólo podés reservar 1 turno por semana.</p>
                </div>
            }
            {/* STEP 1 */}
            {turneraStep === 1 &&
                <>
                    <h2 className="turneraH2">RESERVÁ<br />TU TURNO,<br />NO DUERMAS.</h2>
                    <div className="turneraUtilities">
                        <div className="selectersContainer selectersContainerMensual">
                            {[0, 1, 2, 3].map(i => {
                                const diaSeleccionado1 = fechaSeleccionada[i].getDate();
                                const mesSeleccionado2 = fechaSeleccionada[i].getMonth();

                                return (<div className="fechaContainerMensual" key={i}>
                                    <p className="fechaContainerMensualLabel">SEMANA {i + 1}</p>
                                    <div className="fechaContainer">
                                        {/* Fecha */}
                                        <p className="fechaContainerLabel">Fecha</p>
                                        <div className="seleccionarFechaContainer">
                                            <p>{diaSeleccionado1}.{meses[mesSeleccionado2].toUpperCase().slice(0, 3)}</p>
                                            <IoTriangleSharp
                                                style={{ rotate: showCalendar[i] ? '0deg' : '180deg' }}
                                                onClick={() => {
                                                    const newShow = [...showCalendar];
                                                    newShow[i] = !newShow[i];
                                                    setShowCalendar(newShow);
                                                }}
                                                className="seleccionarFechaIcon"
                                            />
                                        </div>
                                    </div>

                                        {/* Turnos */}
                                    <div className="fechaContainer">
                                        <p className="fechaContainerLabel">Turnos</p>
                                        <div className="seleccionarFechaContainer">
                                            <p>{horarios[horarioSeleccionado[i] - 1]}</p>
                                            <IoTriangleSharp
                                                style={{ rotate: showHorarios[i] ? '0deg' : '180deg' }}
                                                onClick={() => {
                                                    const newShow = [...showHorarios];
                                                    newShow[i] = !newShow[i];
                                                    setShowHorarios(newShow);
                                                }}
                                                className="seleccionarFechaIcon"
                                            />
                                        </div>
                                    </div>

                                        {/* Calendario */}
                                        {showCalendar[i] &&
                                            <div ref={calendarRef} className="calendarContainer">
                                                <div className="calendarNav">
                                                    <IoTriangleSharp onClick={prevMonth} className="calendarRowsIcon" style={{ rotate: '-90deg' }} size={35} />
                                                    <p>
                                                        {currentMonth
                                                            .toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })
                                                            .replace(' de ', ' ')
                                                            .replace(/^\w/, (c) => c.toUpperCase())}
                                                    </p>
                                                    <IoTriangleSharp onClick={nextMonth} className="calendarRowsIcon" style={{ rotate: '90deg' }} size={35} />
                                                </div>
                                                <Calendar
                                                onChange={(date) => {
                                                    if (i !== 0) {
                                                        const nuevaSemana = obtenerSemana(date);

                                                        const hayConflicto = fechaSeleccionada.some((f, idx) => {
                                                            if (idx === i) return false;
                                                            return obtenerSemana(f) === nuevaSemana;
                                                        });

                                                        if (hayConflicto) {
                                                            setShowErrorToast(true)
                                                            return;
                                                        }
                                                    }
                                                    const nuevasFechas = [...fechaSeleccionada];
                                                    nuevasFechas[i] = date;
                                                    setFechaSeleccionada(nuevasFechas);
                                                    }}

                                                    value={fechaSeleccionada[i]}
                                                    showNavigation={false}
                                                    activeStartDate={currentMonth}
                                                    tileDisabled={({ date: currentDate, view }) => {
                                                        if (view === "month") {
                                                            return currentDate.getMonth() !== currentMonth.getMonth();
                                                        }
                                                        return false;
                                                    }}
                                                />
                                            </div>
                                        }

                                        {/* Horarios desplegables */}
                                        {showHorarios[i] &&
                                            <div ref={horariosRef} className="turnosContainer">
                                                {horarios.map((horario, index) => {
                                                    const ocupado = horariosReservados[i].includes(horario.slice(0, 2));
                                                    const seleccionado = horarioSeleccionado[i] === index + 1;

                                                    return (
                                                        <p key={index}
                                                            style={{
                                                                color: ocupado ? 'rgba(90, 24, 154, 1)' :
                                                                    seleccionado ? '#ffffff' : '#8C8C8C',
                                                                cursor: !ocupado ? 'pointer' : 'default'
                                                            }}
                                                            onClick={() => !ocupado ? setHorarioSeleccionado(prev => {
                                                                const nuevo = [...prev];
                                                                nuevo[i] = index + 1;
                                                                return nuevo;
                                                            }) : null}
                                                        >
                                                            {horario}
                                                        </p>
                                                    )
                                                })}
                                            </div>
                                        }
                                    </div>
                                )
                            })}
                        </div>

                        <div className="selectTipoTurno">
                            <div className="selectTurno">
                                <button><div onClick={() => setTurnera('simple')} style={{ backgroundColor: '#8c8c8cff' }}></div></button>
                                <p>
                                    TURNO
                                    <br />
                                    SIMPLE
                                </p>
                            </div>
                            <div className="selectTurno">
                                <button><div style={{ backgroundColor: '#e0aaffff' }}></div></button>
                                <p>
                                    COMBO
                                    <br />
                                    MENSUAL
                                </p>
                            </div>
                        </div>
                        <button className="buttonReservar" onClick={() => setTurneraStep(2)}>Reservar</button>
                    </div>
                </>
            }

            {/* STEP 2 */}
            {turneraStep === 2 && <>
                <h2 className="turneraStep2Title">
                    TUS
                    <br />
                    DATOS
                </h2>
                <div className="turneraStep2Inputs">
                    <p>eMail</p>
                    <input type="text" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} placeholder="tumail@ejemplo.com" />
                </div>
                <div className="turneraStep2Inputs">
                    <p>Nombre</p>
                    <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Tu nombre" />
                </div>
                <p className="turneraErrorMessage">{errorMessage}</p>
                <div className="turneraStep2Buttons">
                    <button onClick={() => setTurneraStep(1)}>Cancelar</button>
                    <button onClick={() => verificarDatos()}>Continuar</button>
                </div>
            </>}

            {/* STEP 3 */}
            {turneraStep === 3 && <>
                <h2 className="turneraStep2Title">
                    CONFIRMAR
                    <br />
                    RESERVA
                </h2>
                <div className="turneraStep3Fecha">
                    <div className="turneraStep3FechaTurnosContainer">
                        <p className="turneraStep3FechaTurnoLabel">COMBO<br />MENSUAL</p>
                        <div className="turneraStep3FechaTurnos">
                            {fechaSeleccionada.map((fecha, i) => (
                                <div key={i} className="turneraStep3FechaTurno">
                                    <div className="turneraStep3FechaContainer">
                                            <p>Mes <span>{meses[fecha.getMonth()]}</span></p>
                                            <p>Fecha <span>{fecha.getDate()}</span></p>
                                            <p>Turno <span>{horarios[horarioSeleccionado[i] - 1]}</span></p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="turneraStep3UserData">
                        <p>eMail <span>{userEmail}</span></p>
                        <p>Nombre <span>{userName}</span></p>
                    </div>
                </div>
                <p className="turneraStep3Total">TOTAL: $500.000</p>
                <div className="turneraStep2Buttons">
                    <button onClick={() => setTurneraStep(2)}>Cancelar</button>
                    <button onClick={() => setTurneraStep(4)}>Continuar</button>
                </div>
            </>}

            {/* STEP 4 */}
            {turneraStep === 4 && <>
                <h2 className="turneraStep2Title">
                    METODO <br />
                    DE PAGO
                </h2>
                <div className="turneraStep4MetodoPago">
                    <Image src="/turnera/mercadoPagoLogo.png" alt="mercado pago" className="turneraStep4LogoMp" width={24} height={16} />
                    <p>Mercado Pago</p>
                    <div className="turneraStep4SelectContainer">
                        <div className="turneraStep4SelectFill"></div>
                    </div>
                </div>
                <div className="turneraStep2Buttons">
                    <button onClick={() => setTurneraStep(3)}>Cancelar</button>
                    <button onClick={() => setTurneraStep(5)}>Pagar</button>
                </div>
            </>}

            {/* STEP 5 */}
            {turneraStep === 5 && <>
                <h2 className="turneraStep2Title">
                    TURNO<br />RESERVADO
                </h2>
                    <div className="turneraStep3FechaTurnosContainer">
                        <p className="turneraStep3FechaTurnoLabel">COMBO<br />MENSUAL</p>
                        <div className="turneraStep3FechaTurnos">
                            {fechaSeleccionada.map((fecha, i) => (
                                <div key={i} className="turneraStep3FechaTurno">
                                    <div className="turneraStep3FechaContainer">
                                            <p>Mes <span>{meses[fecha.getMonth()]}</span></p>
                                            <p>Fecha <span>{fecha.getDate()}</span></p>
                                            <p>Turno <span>{horarios[horarioSeleccionado[i] - 1]}</span></p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                <div className="turneraStep3UserData">
                    <p>eMail <span>{userEmail}</span></p>
                    <p>Nombre <span>{userName}</span></p>
                </div>
                <p className="step5Confirmacion">Tu turno fue reservado exitosamente, te enviamos un correo con los datos de la reserva.</p>
                <button className="setp5Button" onClick={() => setTurneraStep(1)}>Cerrar</button>
            </>}
        </div>
    )
}
