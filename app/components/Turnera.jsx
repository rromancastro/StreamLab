"use client";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { IoTriangleSharp } from "react-icons/io5";

export const Turnera = () => {

    const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());
    const [diaSeleccionado, setDiaSeleccionado] = useState(fechaSeleccionada.getDay());
    const [mesSeleccionado, setMesSeleccionado] = useState(fechaSeleccionada.getMonth());
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
                            <IoTriangleSharp id="seleccionarFechaIcon" />
                        </div>
                        <DatePicker id="datePicker" selected={fechaSeleccionada} onChange={(date) => fechaSeleccionada(date)} />
                    </div>
                    <div>fecha</div>
                </div>
                <div>
                    <button>1</button>
                    <button>2</button>
                </div>
                <button>Reservar</button>
            </div>
        </div>
    )
}