"use client";
import { useEffect, useRef, useState } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import { IoTriangleSharp } from "react-icons/io5";
import { crearPago, getAllReservas, subirReserva, verSalas } from "../helpers/apiCall";
import Image from "next/image";
import { useAppContext } from "../context/AppContext";
import { set } from "date-fns";

export const TurneraSimple = ({setTurnera}) => {

    const {setTurneraSeleccionada} = useAppContext();

    //fechas ocupadas
    const [reservas, setReservas] = useState([]);
    const [diasReservados, setDiasReservados] = useState([]);
    const [horariosReservados, setHorariosReservados] = useState([]);

    // valor de la sala
    const [valorSala, setValorSala] = useState(0);
    const [external_reference, setExternal_reference] = useState('');

 
    useEffect(() => {
        verSalas()
            .then(data => {
            console.log("Datos recibidos:", data.data[0]);
            setValorSala(Number(data.data[0].precio_por_hora));
            })
            .catch(err => console.error("Error al obtener salas:", err));
    }, []);


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
        } else {
            setHorariosReservados([]);
            setHorarioSeleccionado(1);
        }
    }, [fechaSeleccionada, reservas, diasReservados]);

    //controlar calendario
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
    const paymentBrickController = useRef(null);
    const [isPaymentReady, setIsPaymentReady] = useState(false);
    const [paymentError, setPaymentError] = useState('');
    const [preferenceId, setPreferenceId] = useState(null);
    const MP_PUBLIC_KEY = process.env.NEXT_PUBLIC_MP_PUBLIC_KEY ?? "TEST-73f12ddd-3882-4d6a-a34a-887fb09119f1";
    const MP_SITE_ID = process.env.NEXT_PUBLIC_MP_SITE_ID ?? "MLA";
    const PAYMENT_BRICK_CONTAINER_ID = "paymentBrick_container";
    const HARDCODED_PREFERENCE_ID = "1111";
    

    useEffect(() => {
        if (turneraStep !== 5) {
            if (paymentBrickController.current) {
                paymentBrickController.current.unmount();
                paymentBrickController.current = null;
                window.paymentBrickController = null;
            }
            setIsPaymentReady(false);
            return;
        }

        if (typeof window === "undefined") {
            return;
        }

        if (!window.MercadoPago) {
            setPaymentError("No pudimos cargar Mercado Pago. Refresca la pagina e intenta nuevamente.");
            return;
        }

        if (!MP_PUBLIC_KEY || MP_PUBLIC_KEY === "YOUR_PUBLIC_KEY") {
            setPaymentError("Configura la clave publica de Mercado Pago antes de continuar.");
            return;
        }

        const preferenceLooksPlaceholder = HARDCODED_PREFERENCE_ID === "1111" && preferenceId === HARDCODED_PREFERENCE_ID;

        if (!preferenceId) {
            //setPaymentError("Configura un preferenceId valido antes de continuar.");
            return;
        }

        if (preferenceLooksPlaceholder) {
            console.warn("HARDCODED_PREFERENCE_ID usa un valor de prueba. Reemplazalo por un preferenceId real antes de salir a produccion.");
        }

        setPaymentError('');
        setIsPaymentReady(false);

        const mp = new window.MercadoPago(MP_PUBLIC_KEY, { locale: "es-AR", siteId: MP_SITE_ID });
        const bricksBuilder = mp.bricks();

        const renderBrick = async () => {
            try {
                const controller = await bricksBuilder.create("payment", PAYMENT_BRICK_CONTAINER_ID, {
                    initialization: {
                        amount: valorSala,
                        preferenceId: preferenceId,
                    },
                    customization: {
                        visual: {
                            style: {
                                theme: "dark",
                            },
                        },
                        paymentMethods: {
                            mercadoPago: "all",
                            creditCard: "all",
                            debitCard: "all",
                        },
                    },
                    callbacks: {
                        onSubmit: ({ selectedPaymentMethod, formData }) => {
                            console.log("Submitting payment:", { selectedPaymentMethod, formData });
                            return new Promise((resolve, reject) => {
                                const payload = {
                                    ...formData,
                                    selectedPaymentMethod: selectedPaymentMethod ?? 'mercadopago',
                                    transactionAmount: formData?.transactionAmount ?? valorSala,
                                    titulo: 'Reserva Turno Simple',
                                    email: formData?.email ?? formData?.payer?.email ?? userEmail,
                                    reserva_id: external_reference, // 💥 clave para linkear el pago con la reserva
                                };

                                crearPago('', 'POST', payload)
                                    .then((response) => {
                                        if (!response?.success) {
                                            setPaymentError(response?.message ?? "Ocurrio un error al procesar el pago. Intentalo nuevamente.");
                                            reject(new Error(response?.message ?? 'Pago rechazado'));
                                            return;
                                        }
                                        setTurneraStep(6);
                                        resolve();
                                    })
                                    .catch((error) => {
                                        console.error("Error enviando pago:", error);
                                        setPaymentError("Ocurrio un error al procesar el pago. Intentalo nuevamente.");
                                        reject(error);
                                    });
                            });
                        },
                        onError: (error) => {
                            console.error("Payment Brick error:", error);
                            setPaymentError("Ocurrio un error al procesar el pago. Intentalo nuevamente.");
                        },
                        onReady: () => {
                            setIsPaymentReady(true);
                        },
                    },
                });

                paymentBrickController.current = controller;
                window.paymentBrickController = controller;
            } catch (error) {
                console.error("Error creando el Payment Brick:", error);
                setPaymentError("No pudimos cargar el formulario de pago. Actualiza la pagina e intenta nuevamente.");
            }
        };

        renderBrick();

        return () => {
            if (paymentBrickController.current) {
                paymentBrickController.current.unmount();
                paymentBrickController.current = null;
                window.paymentBrickController = null;
            }
        };
    }, [turneraStep, preferenceId, MP_PUBLIC_KEY]);

    const verificarDatos = () => {
        if(userEmail === '' || userEmail.includes('@') === false || userEmail.includes('.') === false) {
            setErrorMessage('El eMail ingresado no es valido');
        } else if(userName.length < 3) {
            setErrorMessage('El nombre ingresado no es valido');
        } else {
            setTurneraStep(3);
        }
    };



    //cerrar al hacer click afuera
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
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    //SUBIR RESERVA
    const handleSubmitReserva = async () => {
        const reserva = await subirReserva('/reservas', 'POST', {
            action: 'crear_reserva',
            sala_id: 1,
            cliente_id: 1,
            titulo: 'Sesión de Gaming',
            descripcion: 'Stream de videojuegos',
            fecha_inicio: `${fechaSeleccionada.toISOString().slice(0, 10)} ${horarios[horarioSeleccionado - 1].slice(0, 2)}:00:00`,
            fecha_fin: `${fechaSeleccionada.toISOString().slice(0, 10)} ${horarios[horarioSeleccionado - 1].slice(3, 5)}:00:00`,
            tipo_stream: 'gaming',
            observaciones: 'ninguna',
            estado: 'pendiente',
            email: userEmail,
        });
        //console.log(reserva);
        //console.log('reserva id', reserva.data.reserva_id);
        if (reserva && reserva.success && reserva.data && reserva.data.reserva_id) {
            setPreferenceId(reserva.data.preference_id);
            setExternal_reference(reserva.data.reserva_id);
        }
    }

    return (
        <div id="turneraContainer">
            {/* STEP 1 */}
            {turneraStep === 1 && <><h2 className="turneraH2">RESERVÁ<br />
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

                {showCalendar &&<div ref={calendarRef} className="calendarContainer">
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
                    showHorarios && <div ref={horariosRef} className="turnosContainer">
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
                        <button><div onClick={()=>{setTurnera('mensual'); setTurneraSeleccionada('mensual')}} style={{backgroundColor: '#8c8c8cff'}}></div></button>
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
                        <button onClick={() => {setTurneraStep(5);handleSubmitReserva()}}>Pagar</button>
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
                    <p className="turneraStep3Total">TOTAL: ${valorSala}</p>
                    <div style={{ width: '100%', marginTop: '24px' }}>
                        {!isPaymentReady && !paymentError && (
                            <p style={{ textAlign: 'center', color: '#8C8C8C', marginBottom: '16px' }}>Estamos cargando Mercado Pago...</p>
                        )}
                        {paymentError && (
                            <p className="turneraErrorMessage" style={{ marginBottom: '16px' }}>{paymentError}</p>
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
