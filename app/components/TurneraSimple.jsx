"use client";
import { useEffect, useRef, useState } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import { IoTriangleSharp } from "react-icons/io5";
import { getAllReservas } from "../helpers/apiCall";
import Image from "next/image";

export const TurneraSimple = ({setTurnera}) => {

    //fechas ocupadas
    const [reservas, setReservas] = useState([]);
    const [diasReservados, setDiasReservados] = useState([]);
    const [horariosReservados, setHorariosReservados] = useState([]);

    useEffect(() => {
        getAllReservas().then(data => setReservas(data.data));
    }, []);

    useEffect(() => {
        setDiasReservados(reservas.map(reserva => reserva.fecha_inicio.slice(0, 10)));
    }, [reservas]);

    const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const diaSeleccionado = fechaSeleccionada.getDate();
    const mesSeleccionado = fechaSeleccionada.getMonth();

    const [showCalendar, setShowCalendar] = useState(false);
    const [showHorarios, setShowHorarios] = useState(false);
    const [horarioSeleccionado, setHorarioSeleccionado] = useState(1);

    const meses = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre"
    ]

    //horarios

    useEffect(() => {
        if(diasReservados.includes(fechaSeleccionada.toISOString().slice(0, 10))) {
            const diaSeleccionado = reservas.filter(reserva => reserva.fecha_inicio.slice(0, 10) === fechaSeleccionada.toISOString().slice(0, 10));
            setHorariosReservados(diaSeleccionado.map(dia => dia.fecha_inicio.slice(11, 13)));
            console.log("horarios reservados: " + horariosReservados);
        } else {
            console.log('no reservado');
        }
    }, [fechaSeleccionada, reservas, diasReservados]);

    const horarios = [
        "10-12 hs",
        "12-14 hs",
        "14-16 hs",
        "16-18 hs",
        "18-20 hs",
        "20-22 hs",
        "22-00 hs",
    ]

    //primer Horario
    useEffect(() => {
        const fechaISO = fechaSeleccionada.toISOString().slice(0, 10);

        if (diasReservados.includes(fechaISO)) {
            const diaSeleccionado = reservas.filter(
                reserva => reserva.fecha_inicio.slice(0, 10) === fechaISO
            );

            const horasOcupadas = diaSeleccionado.map(dia =>
                dia.fecha_inicio.slice(11, 13)
            );

            setHorariosReservados(horasOcupadas);

            const horariosDisponibles = horarios.findIndex(
                horario => !horasOcupadas.includes(horario.slice(0, 2))
            );

            if (horariosDisponibles !== -1) {
                setHorarioSeleccionado(horariosDisponibles + 1);
            } else {
                setHorarioSeleccionado(null);
            }

            console.log("Horarios reservados:", horasOcupadas);
        } else {
            setHorariosReservados([]);
            setHorarioSeleccionado(1);
            console.log("No reservado");
        }
    }, [fechaSeleccionada, reservas, diasReservados]);

    //controlar calendario
    const calendarRef = useRef(null);

    const prevMonth = () => {
        setCurrentMonth(
        (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
        );
    };

    const nextMonth = () => {
        setCurrentMonth(
        (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
        );
    };

    //flow
    const [turneraStep, setTurneraStep] = useState(1);

    const [userEmail, setUserEmail] = useState('');
    const [userName, setUserName] = useState('');

    const [errorMessage, setErrorMessage] = useState('');

    const verificarDatos = () => {
        if(userEmail === '' || userEmail.includes('@') === false || userEmail.includes('.') === false) {
            setErrorMessage('El eMail ingresado no es válido');
        } else if(userName.length < 3) {
            setErrorMessage('El nombre ingresado no es válido');
        } else {
            setTurneraStep(3);
        }
    }

    return (
        <div id="turneraContainer">
            {/* STEP 1 */}
            {turneraStep === 1 && <><h2 className="turneraH2">RESERVA<br />
                TU TURNO,<br />
                NO DUERMAS.
            </h2>
            <div className="turneraUtilities">
                <div className="selectersContainer">
                    <div className="fechaContainer">
                        <p className="fechaContainerLabel">Fecha</p>
                        <div className="seleccionarFechaContainer">
                            <p>{diaSeleccionado}.{meses[mesSeleccionado].toUpperCase().slice(0, 3)}</p>
                            <IoTriangleSharp style={{rotate: showCalendar ? '0deg' : '180deg'}} onClick={()=>setShowCalendar(!showCalendar)} className="seleccionarFechaIcon" />
                        </div>
                    </div>

                    <div className="fechaContainer">
                        <p className="fechaContainerLabel">Turnos</p>
                        <div className="seleccionarFechaContainer">
                            <p>{horarios[horarioSeleccionado - 1]}</p>
                            <IoTriangleSharp style={{rotate: showHorarios ? '0deg' : '180deg'}} onClick={()=>setShowHorarios(!showHorarios)} className="seleccionarFechaIcon" />
                        </div>
                    </div>
                </div>

                {showCalendar &&<div className="calendarContainer">
                    <div className="calendarNav">
                        <IoTriangleSharp onClick={prevMonth} className="calendarRowsIcon" style={{rotate: '-90deg'}} size={35}/>
                        <p>
                            {currentMonth
                            .toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })
                            .replace(' de ', ' ')
                            .replace(/^\w/, (c) => c.toUpperCase())}
                        </p>
                        <IoTriangleSharp onClick={nextMonth} className="calendarRowsIcon" style={{rotate: '90deg'}} size={35}/>
                    </div>
                    <Calendar
                        onChange={setFechaSeleccionada}
                        value={fechaSeleccionada}
                        showNavigation={false}
                        activeStartDate={currentMonth}
                        tileDisabled={({ date: currentDate, view }) => {
                            if (view === "month") {
                            return currentDate.getMonth() !== currentMonth.getMonth();
                            }
                            return false;
                        }}
                    />
                </div>}

                {
                    showHorarios && <div className="turnosContainer">
                        {
                            horarios.map((horario, index) => {
                                return <p key={index} style={{color: horariosReservados.find(horarioReservado => horarioReservado === horario.slice(0, 2)) ? 'rgba(90, 24, 154, 1)' : horarios[horarioSeleccionado - 1] === horario ? '#ffffff' : '#8C8C8C', cursor: !horariosReservados.find(horarioReservado => horarioReservado === horario.slice(0, 2)) ? 'pointer' : 'default'}} onClick={()=> !horariosReservados.find(horarioReservado => horarioReservado === horario.slice(0, 2)) ? setHorarioSeleccionado(index + 1) : null}>{horario}</p>
                            })
                        }
                    </div>
                }

                <div className="selectTipoTurno">
                    <div className="selectTurno">
                        <button><div style={{backgroundColor: '#e0aaffff'}}></div></button>
                        <p>
                            TURNO
                            <br />
                            SIMPLE
                        </p>
                    </div>
                    <div className="selectTurno">
                        <button><div onClick={()=>setTurnera('mensual')} style={{backgroundColor: '#8c8c8cff'}}></div></button>
                        <p>
                            COMBO
                            <br />
                            MENSUAL
                        </p>
                    </div>
                </div>
                <button className="buttonReservar" onClick={()=>setTurneraStep(2)}>Reservar</button>
            </div></>}


            {/* STEP 2 */}
            {turneraStep === 2 && <>
                <h2 className="turneraStep2Title">
                    TUS
                    <br />
                    DATOS
                </h2>
                <div className="turneraStep2Inputs">
                    <p>eMail</p>
                    <input type="text" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} placeholder="tumail@ejemplo.com"/>
                </div>
                <div className="turneraStep2Inputs">
                    <p>Nombre</p>
                    <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Tu nombre"/>
                </div>
                <p className="turneraErrorMessage">{errorMessage}</p>
                <div className="turneraStep2Buttons">
                    <button onClick={() => setTurneraStep(1)}>Cancelar</button>
                    <button  onClick={() => verificarDatos()}>Continuar</button>
                </div>
            </>}

            {/* STEP 3 */}
            {
                turneraStep === 3 && <>
                    <h2 className="turneraStep2Title">
                        CONFIRMAR
                        <br />
                        RESERVA
                    </h2>
                    <div className="turneraStep3Fecha">
                        <div className="turneraStep3FechaTurno">
                            <p>TURNO<br />SIMPLE</p>
                            <div className="turneraStep3FechaContainer">
                                <p>Mes <span>{meses[mesSeleccionado]}</span></p>
                                <p>Fecha <span>{diaSeleccionado}</span></p>
                                <p>Turno <span>{horarios[horarioSeleccionado - 1]}</span></p>
                            </div>
                        </div>
                        <div className="turneraStep3UserData">
                            <p>eMail <span>{userEmail}</span></p>
                            <p>Nombre <span>{userName}</span></p>
                        </div>
                    </div>
                    <p className="turneraStep3Total">TOTAL: $57.000</p>
                    <div className="turneraStep2Buttons">
                        <button onClick={() => setTurneraStep(2)}>Cancelar</button>
                        <button  onClick={() => setTurneraStep(4)}>Continuar</button>
                    </div>
                </>
            }

            {/* STEP 4 */}
            {
                turneraStep === 4 && <>
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
                        <button  onClick={() => setTurneraStep(5)}>Pagar</button>
                    </div>
                </>
            }

            {/* STEP 5 */}
            { turneraStep === 5 && <>
                <h2 className="turneraStep2Title">
                    TURNO<br />
                    RESERVADO
                </h2>
                <div className="turneraStep3FechaTurno">
                    <p>TURNO<br />SIMPLE</p>
                    <div className="turneraStep3FechaContainer">
                        <p>Mes <span>{meses[mesSeleccionado]}</span></p>
                        <p>Fecha <span>{diaSeleccionado}</span></p>
                        <p>Turno <span>{horarios[horarioSeleccionado - 1]}</span></p>
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