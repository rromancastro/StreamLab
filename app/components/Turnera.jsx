"use client";
import { useRef, useState } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import { IoTriangleSharp } from "react-icons/io5";
import { apiCall } from "../helpers/apiCall";

export const Turnera = () => {

    const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());
    const diaSeleccionado = fechaSeleccionada.getDay();
    const mesSeleccionado = fechaSeleccionada.getMonth();
    const [showCalendar, setShowCalendar] = useState(false);

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

    //controlar calendario
    const calendarRef = useRef(null);

    const prevMonth = () => {
        setFechaSeleccionada(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    };
    const nextMonth = () => {
        setFechaSeleccionada(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    };

    //get reservas
    apiCall('reservas').then(data => console.log(data));

    return (
        <div id="turneraContainer">
            <h2 id="turneraH2">RESERVA<br />
                TU TURNO,<br />
                NO DUERMAS.
            </h2>
            <div id="turneraUtilities">
                <div id="selectersContainer">
                    <div id="fechaContainer">
                        <p id="fechaContainerLabel">Fecha</p>
                        <div id="seleccionarFechaContainer">
                            <p>{diaSeleccionado}.{meses[mesSeleccionado].toUpperCase().slice(0, 3)}</p>
                            <IoTriangleSharp style={{rotate: showCalendar ? '0deg' : '180deg'}} onClick={()=>setShowCalendar(!showCalendar)} id="seleccionarFechaIcon" />
                        </div>
                    </div>
                    <div>fecha</div>
                </div>
                {showCalendar &&<div id="calendarContainer">
                    <div id="calendarNav">
                        <IoTriangleSharp onClick={prevMonth} className="calendarRowsIcon" style={{rotate: '-90deg'}} size={35}/>
                        <p>{fechaSeleccionada.toLocaleString('es-ES', { month: 'long', year: 'numeric' })}</p>
                        <IoTriangleSharp onClick={nextMonth} className="calendarRowsIcon" style={{rotate: '90deg'}} size={35}/>
                    </div>
                    <Calendar
                        onChange={setFechaSeleccionada}
                        value={fechaSeleccionada}
                        showNavigation={false}
                    />
                </div>}
                <div>
                    <button>1</button>
                    <button>2</button>
                </div>
                <button id="buttonReservar">Reservar</button>
            </div>
        </div>
    )
}