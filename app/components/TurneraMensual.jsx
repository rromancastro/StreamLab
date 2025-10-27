"use client";
import { useEffect, useRef, useState } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import { IoTriangleSharp } from "react-icons/io5";
import { crearPago, getAllReservas, subirReserva, verSalas } from "../helpers/apiCall";
import Image from "next/image";
import { useAppContext } from "../context/AppContext";

export const TurneraMensual = ({ setTurnera, isMobile}) => {

    const {setTurneraSeleccionada} = useAppContext();

    //fechas ocupadas
    const [reservas, setReservas] = useState([]);
    const [diasReservados, setDiasReservados] = useState([]);
    const [horariosReservados, setHorariosReservados] = useState([[], [], [], []]); // 4 bloques
    // Registramos el precio del combo y los ids generados para consolidar la preferencia de pago.
    const [precioCombo, setPrecioCombo] = useState(0);
    const [reservasCreadas, setReservasCreadas] = useState([]);
    const [externalReference, setExternalReference] = useState('');

    useEffect(() => {
        getAllReservas().then(data => setReservas(data.data));
    }, []);

    useEffect(() => {
        setDiasReservados(reservas.map(reserva => reserva.fecha_inicio.slice(0, 10)));
    }, [reservas]);

    // Traemos el precio vigente del combo mensual para usarlo en el resumen y el pago.
    useEffect(() => {
        verSalas()
            .then((data) => {
                const combo = Number(data?.data?.[0]?.precio_combo) || 0;
                setPrecioCombo(combo);
            })
            .catch((err) => {
                console.error("Error al obtener salas para combo mensual:", err);
            });
    }, []);

    const [fechaSeleccionada, setFechaSeleccionada] = useState([new Date(), new Date(), new Date(), new Date()]);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [horarioSeleccionado, setHorarioSeleccionado] = useState([1, 1, 1, 1]);
    const [showCalendar, setShowCalendar] = useState([false, false, false, false]);
    const [showHorarios, setShowHorarios] = useState([false, false, false, false]);
    // Estados dedicados a la integracion con Mercado Pago (mismo patron que TurneraSimple).
    const paymentBrickController = useRef(null);
    const [isPaymentReady, setIsPaymentReady] = useState(false);
    const [paymentError, setPaymentError] = useState('');
    const [preferenceId, setPreferenceId] = useState(null);
    const [isPreparingPayment, setIsPreparingPayment] = useState(false);
    const MP_PUBLIC_KEY = process.env.NEXT_PUBLIC_MP_PUBLIC_KEY ?? "TEST-73f12ddd-3882-4d6a-a34a-887fb09119f1";
    const MP_SITE_ID = process.env.NEXT_PUBLIC_MP_SITE_ID ?? "MLA";
    const PAYMENT_BRICK_CONTAINER_ID = "paymentBrick_container_mensual";
    const HARDCODED_PREFERENCE_ID = "1111";

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
    // Costo final del paquete mensual (4 sesiones) segun el precio que expone la sala.
    const totalCombo = precioCombo * 4;

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
        const primerDiaDelAno = new Date(f.getFullYear(), 0, 1);
        const diasTranscurridos = Math.floor((f - primerDiaDelAno) / (24 * 60 * 60 * 1000));

        const numeroSemana = Math.ceil((diasTranscurridos + (primerDiaDelAno.getDay() + 7) % 7) / 7);

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

    const clearPagoMensualState = () => {
        setReservasCreadas([]);
        setPreferenceId(null);
        setExternalReference('');
        setIsPaymentReady(false);
        setPaymentError('');
        if (paymentBrickController.current) {
            paymentBrickController.current.unmount();
            paymentBrickController.current = null;
        }
        if (typeof window !== "undefined") {
            window.paymentBrickMensualController = null;
        }
    };

    // Creamos la reserva mensual en un único request y recibimos la preferencia lista para Mercado Pago.
    const handleSubmitReservas = async () => {
        if (!userEmail || !userName) {
            setPaymentError("Completa tus datos antes de continuar con el pago mensual.");
            setTurneraStep(2);
            return;
        }

        if (reservasCreadas.length === 4 && preferenceId) {
            setTurneraStep(5);
            return;
        }

        setPaymentError('');

        if (precioCombo <= 0) {
            setPaymentError("El precio del combo no está disponible, intenta nuevamente en unos segundos.");
            setIsPreparingPayment(false);
            return;
        }
        setIsPreparingPayment(true);

        try {
            const turnosPayload = fechaSeleccionada.map((fecha, index) => {
                if (!horarioSeleccionado[index]) {
                    throw new Error("Selecciona un horario disponible para las cuatro semanas.");
                }

                const horarioActual = horarios[horarioSeleccionado[index] - 1];
                const fechaISO = fecha.toISOString().slice(0, 10);
                const horaInicio = horarioActual?.slice(0, 2);
                const horaFin = horarioActual?.slice(3, 5);

                if (!horaInicio || !horaFin) {
                    throw new Error("No pudimos determinar el horario seleccionado.");
                }

                return {
                    fecha_inicio: `${fechaISO} ${horaInicio}:00:00`,
                    fecha_fin: `${fechaISO} ${horaFin}:00:00`,
                    titulo: 'Sesion de Gaming',
                    descripcion: 'Stream de videojuegos',
                    tipo_stream: 'gaming',
                    observaciones: 'ninguna',
                    estado: 'pendiente',
                    precio_total: precioCombo
                };
            });

            const response = await subirReserva('/reservas', 'POST', {
                action: 'crear_reserva_mensual',
                sala_id: 1,
                cliente_id: 1,
                email: userEmail,
                titulo: 'Sesion de Gaming',
                descripcion: 'Stream de videojuegos',
                tipo_stream: 'gaming',
                observaciones: 'Combo mensual',
                estado: 'pendiente',
                precio_por_turno: precioCombo,
                turnos: turnosPayload
            });

            if (!response?.success || !response?.data?.preference_id) {
                throw new Error(response?.message ?? "No se pudo preparar la preferencia del combo mensual.");
            }

            const ids = response?.data?.reservas ?? [];
            setReservasCreadas(ids);
            setPreferenceId(response.data.preference_id);
            setExternalReference(response.data.external_reference ?? ids.join('-'));
            setTurneraStep(5);
        } catch (error) {
            console.error("Error generando combo mensual:", error);
            setPaymentError(error?.message ?? "Ocurrio un error al preparar el pago mensual.");
        } finally {
            setIsPreparingPayment(false);
        }
    };

    // Montamos y desmontamos el Payment Brick cuando el paso 5 (pago) esta activo.
    useEffect(() => {
        if (turneraStep !== 5) {
            if (paymentBrickController.current) {
                paymentBrickController.current.unmount();
                paymentBrickController.current = null;
                window.paymentBrickMensualController = null;
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

        if (!preferenceId) {
            // Esperamos a que la preferencia se genere via handleSubmitReservas.
            return;
        }

        if (HARDCODED_PREFERENCE_ID === "1111" && preferenceId === HARDCODED_PREFERENCE_ID) {
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
                        amount: totalCombo,
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
                            maxInstallments: 1
                        },
                    },
                    callbacks: {
                        onSubmit: ({ selectedPaymentMethod, formData }) => {
                            return new Promise((resolve, reject) => {
                                if (window.paymentBrickMensualController) {
                                    window.paymentBrickMensualController.unmount();
                                    window.paymentBrickMensualController = null;
                                }

                                const payload = {
                                    ...formData,
                                    selectedPaymentMethod: selectedPaymentMethod ?? 'mercadopago',
                                    transactionAmount: totalCombo,
                                    transaction_amount: totalCombo,
                                    titulo: 'Reserva Combo Mensual',
                                    email: formData?.email ?? formData?.payer?.email ?? userEmail,
                                    reserva_id: externalReference,
                                    reservas: reservasCreadas,
                                    tipo_turno: 'mensual'
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
                                        console.error("Error enviando pago mensual:", error);
                                        setPaymentError("Ocurrio un error al procesar el pago. Intentalo nuevamente.");
                                        reject(error);
                                    });
                            });
                        },
                        onError: (error) => {
                            console.error("Payment Brick mensual error:", error);
                            setPaymentError("Ocurrio un error al procesar el pago. Intentalo nuevamente.");
                        },
                        onReady: () => {
                            setIsPaymentReady(true);
                        },
                    },
                });

                paymentBrickController.current = controller;
                window.paymentBrickMensualController = controller;
            } catch (error) {
                console.error("Error creando el Payment Brick mensual:", error);
                setPaymentError("No pudimos cargar el formulario de pago. Actualiza la pagina e intenta nuevamente.");
            }
        };

        renderBrick();

        return () => {
            if (paymentBrickController.current) {
                paymentBrickController.current.unmount();
                paymentBrickController.current = null;
                window.paymentBrickMensualController = null;
            }
        };
    }, [turneraStep, preferenceId, MP_PUBLIC_KEY, totalCombo, externalReference, reservasCreadas]);

    const resetMensualFlow = () => {
        clearPagoMensualState();
        setIsPreparingPayment(false);
        setTurneraStep(1);
    };

    return (
        <div style={{height: isMobile ? '735px' : null}} id="turneraContainer">
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
                                <button><div onClick={() => {setTurnera('simple'); setTurneraSeleccionada('simple')}} style={{ backgroundColor: '#8c8c8cff' }}></div></button>
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
                <p className="turneraStep3Total">TOTAL: ${totalCombo.toLocaleString("es-AR")}</p>
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
                {paymentError && (
                    <p className="turneraErrorMessage" style={{ marginTop: '16px' }}>{paymentError}</p>
                )}
                <div className="turneraStep2Buttons">
                    <button onClick={() => { clearPagoMensualState(); setIsPreparingPayment(false); setTurneraStep(3); }}>Cancelar</button>
                    <button onClick={handleSubmitReservas} disabled={isPreparingPayment}>
                        {isPreparingPayment ? "Preparando pago..." : "Pagar"}
                    </button>
                </div>
            </>}

            {/* STEP 5 */}
            {turneraStep === 5 && <>
                <h2 className="turneraStep2Title">
                    PAGAR<br />
                    RESERVA
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
                <p className="turneraStep3Total">TOTAL: ${totalCombo.toLocaleString("es-AR")}</p>
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
                    <button onClick={() => { clearPagoMensualState(); setTurneraStep(4); }}>Volver</button>
                </div>
            </>}

            {/* STEP 6 */}
            {turneraStep === 6 && <>
                <h2 className="turneraStep2Title">
                    COMBO<br />
                    RESERVADO
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
                <p className="step5Confirmacion">Tu combo mensual fue reservado exitosamente. Te enviamos un correo con el detalle de las cuatro sesiones.</p>
                <button className="setp5Button" onClick={() => resetMensualFlow()}>Cerrar</button>
            </>}
        </div>
    )
}
