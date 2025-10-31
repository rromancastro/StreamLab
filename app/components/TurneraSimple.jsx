"use client";
import { useEffect, useRef, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { IoTriangleSharp } from "react-icons/io5";
import {
  crearPago,
  getAllReservas,
  subirReserva,
  verSalas,
} from "../helpers/apiCall";
import Image from "next/image";
import { useAppContext } from "../context/AppContext";

export const TurneraSimple = ({ setTurnera }) => {
  const { setTurneraSeleccionada } = useAppContext();

  const [reservas, setReservas] = useState([]);
  const [diasReservados, setDiasReservados] = useState([]);
  const [horariosReservados, setHorariosReservados] = useState([]);

  const [valorSala, setValorSala] = useState(0);
  const [external_reference, setExternal_reference] = useState("");

  useEffect(() => {
    verSalas()
      .then((data) => {
        setValorSala(Number(data.data[0].precio_por_hora));
      })
      .catch((err) => console.error("Error al obtener salas:", err));
  }, []);

  useEffect(() => {
    getAllReservas().then((data) =>
      setReservas(
        data.data.filter((reserva) => reserva.estado !== "pendiente")
      )
    );
  }, []);

  useEffect(() => {
    setDiasReservados(reservas.map((reserva) => reserva.fecha_inicio.slice(0, 10)));
  }, [reservas]);

  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const diaSeleccionado = fechaSeleccionada.getDate();
  const mesSeleccionado = fechaSeleccionada.getMonth();

  const [showCalendar, setShowCalendar] = useState(false);
  const [showHorarios, setShowHorarios] = useState(false);
  const [horarioSeleccionado, setHorarioSeleccionado] = useState(1);

  const meses = [
    "Enero","Febrero","Marzo","Abril","Mayo","Junio",
    "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"
  ];

  // NUEVOS HORARIOS
  const horarios = [
    "09:00-11:00 hs",
    "11:30-13:30 hs",
    "14:00-16:00 hs",
    "16:30-18:30 hs",
    "19:00-21:00 hs",
  ];

  // Determinar horarios reservados según la fecha seleccionada
  useEffect(() => {
    const fechaISO = fechaSeleccionada.toISOString().slice(0, 10);
    const reservasDelDia = reservas.filter(
      (r) => r.fecha_inicio.slice(0, 10) === fechaISO
    );
    const horasOcupadas = reservasDelDia.map((r) => r.fecha_inicio.slice(11, 16)); // hh:mm

    setHorariosReservados(horasOcupadas);

    // Buscar el primer horario disponible
    const primerDisponible = horarios.findIndex((h) => {
      const horaInicio = h.split("-")[0]; // "09" o "11:30"
      return !horasOcupadas.includes(`${horaInicio}:00`) && !horasOcupadas.includes(horaInicio);
    });

    setHorarioSeleccionado(primerDisponible !== -1 ? primerDisponible + 1 : null);
  }, [fechaSeleccionada, reservas]);

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

  const [turneraStep, setTurneraStep] = useState(1);
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const paymentBrickController = useRef(null);
  const [isPaymentReady, setIsPaymentReady] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [preferenceId, setPreferenceId] = useState(null);
  const MP_PUBLIC_KEY =
    process.env.NEXT_PUBLIC_MP_PUBLIC_KEY ??
    "TEST-73f12ddd-3882-4d6a-a34a-887fb09119f1";
  const MP_SITE_ID = process.env.NEXT_PUBLIC_MP_SITE_ID ?? "MLA";
  const PAYMENT_BRICK_CONTAINER_ID = "paymentBrick_container";
  const HARDCODED_PREFERENCE_ID = "1111";

  // Mismo useEffect de pago (no se toca)

  const verificarDatos = () => {
    if (userEmail === "" || !userEmail.includes("@") || !userEmail.includes(".")) {
      setErrorMessage("El eMail ingresado no es válido");
    } else if (userName.length < 3) {
      setErrorMessage("El nombre ingresado no es válido");
    } else {
      setTurneraStep(3);
    }
  };

  // click fuera
  const calendarRef = useRef(null);
  const horariosRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target) &&
        horariosRef.current &&
        !horariosRef.current.contains(event.target)
      ) {
        setShowCalendar(false);
        setShowHorarios(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // subir reserva con nuevos horarios
  const handleSubmitReserva = async () => {
    try {
      const horarioActual = horarios[horarioSeleccionado - 1];
      const [horaInicio, horaFin] = horarioActual.replace(" hs", "").split("-");

      const reserva = await subirReserva("/reservas", "POST", {
        action: "crear_reserva",
        sala_id: 1,
        cliente_id: 1,
        titulo: "Sesión de Gaming",
        descripcion: "Stream de videojuegos",
        fecha_inicio: `${fechaSeleccionada
          .toISOString()
          .slice(0, 10)} ${horaInicio.padEnd(5, ":00")}`,
        fecha_fin: `${fechaSeleccionada
          .toISOString()
          .slice(0, 10)} ${horaFin.padEnd(5, ":00")}`,
        tipo_stream: "gaming",
        observaciones: "ninguna",
        estado: "pendiente",
        email: userEmail,
        precio_total: valorSala,
      });

      if (reserva?.success && reserva.data?.reserva_id) {
        setPreferenceId(reserva.data.preference_id);
        setExternal_reference(reserva.data.reserva_id);
        setTurneraStep(5);
      } else {
        setPaymentError("No se pudo generar la reserva. Intentalo nuevamente.");
      }
    } catch (error) {
      console.error("Error creando la reserva:", error);
      setPaymentError("Hubo un error al crear la reserva. Intentalo nuevamente.");
    }
  };

  return (
    <div id="turneraContainer">
      {turneraStep === 1 && (
        <>
          <h2 className="turneraH2">
            RESERVÁ<br />TU TURNO,<br />NO DUERMAS.
          </h2>
          <div className="turneraUtilities">
            <div className="selectersContainer">
              <div className="fechaContainer">
                <p className="fechaContainerLabel">Fecha</p>
                <div className="seleccionarFechaContainer">
                  <p>
                    {diaSeleccionado}.
                    {meses[mesSeleccionado].toUpperCase().slice(0, 3)}
                  </p>
                  <IoTriangleSharp
                    style={{ rotate: showCalendar ? "0deg" : "180deg" }}
                    onClick={() => setShowCalendar(!showCalendar)}
                    className="seleccionarFechaIcon"
                  />
                </div>
              </div>

              <div className="fechaContainer">
                <p className="fechaContainerLabel">Turnos</p>
                <div className="seleccionarFechaContainer">
                  <p>
                    {horarios[horarioSeleccionado - 1] ||
                      "No disponible"}
                  </p>
                  <IoTriangleSharp
                    style={{ rotate: showHorarios ? "0deg" : "180deg" }}
                    onClick={() => setShowHorarios(!showHorarios)}
                    className="seleccionarFechaIcon"
                  />
                </div>
              </div>
            </div>

            {showCalendar && (
              <div ref={calendarRef} className="calendarContainer">
                <div className="calendarNav">
                  <IoTriangleSharp
                    onClick={prevMonth}
                    className="calendarRowsIcon"
                    style={{ rotate: "-90deg" }}
                    size={35}
                  />
                  <p>
                    {currentMonth
                      .toLocaleDateString("es-ES", { month: "long", year: "numeric" })
                      .replace(" de ", " ")
                      .replace(/^\w/, (c) => c.toUpperCase())}
                  </p>
                  <IoTriangleSharp
                    onClick={nextMonth}
                    className="calendarRowsIcon"
                    style={{ rotate: "90deg" }}
                    size={35}
                  />
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
              </div>
            )}

            {showHorarios && (
              <div ref={horariosRef} className="turnosContainer">
                {horarios.map((horario, index) => {
                  const horaInicio = horario.split("-")[0];
                  const ocupado = horariosReservados.find(
                    (h) =>
                      h.startsWith(horaInicio) ||
                      h.includes(horaInicio)
                  );

                  return (
                    <p
                      key={index}
                      style={{
                        color: ocupado
                          ? "rgba(90, 24, 154, 1)"
                          : horarios[horarioSeleccionado - 1] === horario
                          ? "#ffffff"
                          : "#8C8C8C",
                        cursor: !ocupado ? "pointer" : "default",
                      }}
                      onClick={() =>
                        !ocupado && setHorarioSeleccionado(index + 1)
                      }
                    >
                      {horario}
                    </p>
                  );
                })}
              </div>
            )}

            <div className="selectTipoTurno">
              <div className="selectTurno">
                <button>
                  <div style={{ backgroundColor: "#e0aaffff" }}></div>
                </button>
                <p>
                  TURNO<br />
                  SIMPLE
                </p>
              </div>
              <div className="selectTurno">
                <button>
                  <div
                    onClick={() => {
                      setTurnera("mensual");
                      setTurneraSeleccionada("mensual");
                    }}
                    style={{ backgroundColor: "#8c8c8cff" }}
                  ></div>
                </button>
                <p>
                  COMBO<br />
                  MENSUAL
                </p>
              </div>
            </div>

            <button className="buttonReservar" onClick={() => setTurneraStep(2)}>
              Reservar
            </button>
          </div>
        </>
      )}

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
                    <button onClick={() => verificarDatos()}>Continuar</button>
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
                    <p className="turneraStep3Total">TOTAL: ${valorSala}</p>
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
                        <button onClick={() => handleSubmitReserva()}>Pagar</button>
                    </div>
                </>
            }

            {/* STEP 5 */}
            {
                turneraStep === 5 && <>
                    <h2 className="turneraStep2Title">
                        PAGAR<br />
                        RESERVA
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
                    <p className="turneraStep3Total" style={{bottom: '105px'}}>TOTAL: ${valorSala}</p>
                    <div style={{ width: '100%', marginBottom: '-30px' }}>
                        {!isPaymentReady && !paymentError && (
                            <p style={{ textAlign: 'center', color: '#8C8C8C', position: 'absolute', bottom: '-40px' }}>Estamos cargando Mercado Pago...</p>
                        )}
                        {paymentError && (
                            <p className="turneraErrorMessage" style={{ position: 'absolute', bottom: '-40px' }}>{paymentError}</p>
                        )}
                        <div id={PAYMENT_BRICK_CONTAINER_ID} style={{ width: '100%', minHeight: '320px' }}></div>
                    </div>
                    <div className="turneraStep2Buttons">
                        <button onClick={() => setTurneraStep(4)}>Volver</button>
                    </div>
                </>
            }

            {/* STEP 6 */}
            { turneraStep === 6 && <>
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
                <p className="step6Confirmacion">Tu turno fue reservado exitosamente, te enviamos un correo con los datos de la reserva.</p>
                <button className="step6Button" onClick={() => setTurneraStep(1)}>Cerrar</button>
            </>}
        </div>
    )
}
