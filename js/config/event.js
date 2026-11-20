/* ==========================================================================
   CONFIGURACIÓN CENTRALIZADA · REVELACIÓN DE GÉNERO
   --------------------------------------------------------------------------
   Aquí cambias TODO: fotografías, nombres, fecha, ubicación, textos, colores
   y música. No hace falta tocar ningún otro archivo (salvo la vista previa
   del enlace en index.html, bloque "OG:START").

   El nombre del evento (abajo: 'revelacion-camila-diego') debe ser ÚNICO y
   escribirse IGUAL en la lista PINS de tu Google Apps Script.
   Al final del archivo, DEFAULT_EVENT debe tener ese mismo nombre.

   FOTOGRAFÍAS - dos formas de definir cada una:
     1) Foto propia:  { src: 'assets/images/portada.jpg' }
     2) Foto de Unsplash:  { id: '1529626455594-4ff0802cfb7e' }
   Si una foto no carga, se muestra una imagen de respaldo de
   assets/images/respaldo/ para que nunca se vea un espacio vacío.

   TEXTOS "niño / niña": si prefieres "varón / mujer", cámbialos en
   texts.guess (más abajo) y en heroBoy / heroGirl.
   ========================================================================== */

window.EVENTS = {

  'revelacion-camila-diego': {
    type: 'revelacion',
    lang: 'es',

    // Pantalla completa al tocar el sobre (en Android el sistema muestra
    // un aviso que la página no puede ocultar). false = no pedirla.
    fullscreen: true,

    /* ---------- Papás ---------- */
    names: {
      first: 'Camila',
      second: 'Diego',
      initials: '?',                    // dentro del sello
      together: 'Camila & Diego'
    },

    /* ---------- Fecha (con zona horaria) ---------- */
    date: {
      iso: '2027-04-10T16:00:00-05:00',
      display: '10 · 04 · 2027',
      long: 'Sábado, 10 de abril de 2027',
      time: '4:00 p. m.'
    },

    /* ---------- Textos ---------- */
    texts: {
      envelopeKicker: 'Tenemos un secreto para ti',
      envelopeHint: 'Toca para abrir',
      heroKicker: 'Estamos esperando un bebé',
      heroBoy: 'niño',
      heroOr: 'o',
      heroGirl: 'niña',
      heroScroll: 'Desliza',
      quoteKicker: 'Una noticia dulce',
      quote: 'Una personita muy chiquita está por llegar y queremos que tú seas de los primeros en descubrir quién es.',
      quoteSign: 'Camila & Diego',
      countdownKicker: 'Falta muy poco',
      countdownTitle: 'La cuenta regresiva ha comenzado',
      countdownDone: 'Hoy es el gran día',
      calendarBtn: 'Agregar al calendario',
      labels: { days: 'Días', hours: 'Horas', minutes: 'Minutos', seconds: 'Segundos' },

      lineKicker: 'Nuestro tendedero',
      lineTitle: 'Recuerdos colgados',
      lineHint: 'Desliza el tendedero',

      flipKicker: 'Adivina adivinador',
      flipTitle: 'Voltea las cartas',
      flipHint: 'Toca una carta para descubrirla',
      flipBtn: 'Tapar las cartas',

      popKicker: 'Cuidado que explotan',
      popTitle: 'Revienta los globos',
      popHint: 'Toca un globo para ver qué esconde',
      popBtn: 'Inflar otra vez',

      duoKicker: 'Los futuros papás',
      duoTitle: 'Mamá y papá',
      duoHint: 'Desliza la barra',
      duoLeft: 'Mamá',
      duoRight: 'Papá',

      beltKicker: 'Siempre juntos',
      beltTitle: 'Nuestra cinta de momentos',
      beltHint: 'Toca para detenerla',

      infoKicker: 'El gran día',
      infoTitle: 'Programa',
      schedule: [
        { time: '4:00', ampm: 'p. m.', title: 'Bienvenida',     text: 'Llegan, se sirven algo rico y hacen su apuesta. Te pedimos llegar puntual.' },
        { time: '5:00', ampm: 'p. m.', title: 'Juegos y apuestas', text: 'Nos divertimos un rato antes del momento más esperado.' },
        { time: '6:00', ampm: 'p. m.', title: 'La gran revelación', text: 'Rosa o celeste… ¡por fin lo sabremos todos juntos!' }
      ],
      dressKicker: 'Código de vestimenta',
      dress: 'Ven de rosa si crees que es niña y de celeste si crees que es niño. ¡Y si no te decides, mezcla los dos!',

      placeKicker: 'Ubicación',
      mapBtn: 'Abrir en Google Maps',

      rsvpKicker: 'Confirmación',
      rsvpTitle: '¿Nos acompañas?',
      rsvpText: 'Confirma tu asistencia antes del 20 de marzo de 2027 y apuesta qué será.',
      rsvpName: 'Tu nombre completo',
      rsvpGuests: 'Número de asistentes',
      rsvpYes: 'Allí estaré',
      rsvpNo: 'No podré asistir',
      rsvpMsg: 'Un mensaje para el bebé (opcional)',
      rsvpBtn: 'Enviar confirmación',
      rsvpErrorName: 'Escribe tu nombre para continuar.',
      rsvpErrorChoice: 'Elige una opción.',
      rsvpSending: 'Enviando…',
      rsvpThanks: '¡Gracias! Tu respuesta y tu apuesta quedaron registradas.',
      rsvpFail: 'No se pudo enviar. Inténtalo de nuevo.',

      // Apuesta (los dos círculos grandes)
      guess: {
        label: '¿Y tú qué crees que será?',
        sub: 'Apuesta en secreto. ¡No vale hacer trampa!',
        girl: 'Niña',
        boy: 'Niño',
        girlSay: '¡Apostaste por niña! Lo tendremos en cuenta.',
        boySay: '¡Apostaste por niño! Lo tendremos en cuenta.',
        pick: 'Toca un círculo'
      },

      // Panel privado de organizadores (doble toque en la foto de agradecimiento)
      admin: {
        pinTitle: 'Acceso de organizadores',
        pinLead: 'Ingresa tu PIN de 4 dígitos',
        checking: 'Verificando…',
        wrong: 'PIN incorrecto. Intentos restantes: ',
        locked: 'Demasiados intentos. Inténtalo de nuevo en ',
        offline: 'No se pudo conectar. Revisa tu internet.',
        notReady: 'El panel aún no está conectado a Google Sheets.',
        title: 'Invitados',
        confirmed: 'Personas confirmadas',
        answers: 'Respuestas',
        declined: 'No asistirán',
        yes: 'Asistirá',
        no: 'No asistirá',
        empty: 'Aún no hay respuestas.',
        refresh: 'Actualizar',
        exit: 'Salir',
        del: 'Eliminar',
        sure: '¿Seguro? Toca otra vez',
        clearAll: 'Vaciar lista',
        votesGirl: 'Creen niña',
        votesBoy: 'Creen niño',
        girl: 'Niña',
        boy: 'Niño'
      },

      thanksKicker: 'Gracias',
      thanksTitle: 'Gracias por ser parte de este momento tan especial',
      thanksText: 'Tu presencia es el mejor regalo.',
      thanksSign: 'Con cariño, Camila & Diego',

      // Caja sorpresa final
      boxKicker: 'Una última sorpresa',
      boxTitle: 'Abre la cajita',
      boxHint: 'Toca la caja',
      boxReveal: 'Aún no sabemos si es niño o niña…',
      boxReveal2: '¡Espera al gran día para descubrirlo!',
      boxClose: 'Cerrar la cajita'
    },

    /* ---------- Ubicación ---------- */
    location: {
      name: 'Casa Jardín Los Olivos',
      address: 'Av. Los Olivos 1250, Lima, Perú',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Casa+Jard%C3%ADn+Los+Olivos+Lima'
    },

    /* ---------- Confirmación (RSVP) ---------- */
    rsvp: {
      whatsapp: '51999999999',   // solo se usa si sheets.url está vacío o whatsappToo es true
      whatsappToo: false
    },

    /* ---------- Google Sheets (vía Google Apps Script) ----------
       Pega la URL de tu "Aplicación web" (termina en /exec). Puede ser LA MISMA
       que usas en tus otros eventos; lo que los separa es el nombre del evento. */
     sheets: {
      url: 'https://script.google.com/macros/s/AKfycbz64C6qv6NXwHNaDAoYnutkIZOZRlh_Lr6mqvfTRUaOShCMnjlCV-Uv3LwGPfqC2Uns/exec'
    },

    /* ---------- Música ---------- */
    music: {
      src: 'assets/audio/musica.mp3',
      autoplayOnOpen: true,
      volume: 0.55
    },

    /* ---------- Colores ---------- */
    theme: {
      ink: '#2b3556',          // azul noche (fondos oscuros y textos)
      ink2: '#3d4a78',
      paper: '#fffaf2',        // crema
      paper2: '#fdeee4',
      gold: '#d08a3c',         // miel
      goldLight: '#ffd9a0',
      blush: '#ffe3ec',
      pink: '#f58fb3',         // rosa (niña)
      pinkSoft: '#ffe3ec',
      blue: '#6eb2f2',         // celeste (niño)
      blueSoft: '#dff0ff',
      butter: '#ffe9a8',
      seal: '#e4709b',
      sealLight: '#ff9fc0'
    },

    /* ---------- Fotografías de espacios fijos ---------- */
    photos: {
      sobre:      { src: 'assets/images/fondo.jpg', alt: 'Fondo del sobre' },
      carta:      { src: 'assets/images/carta.jpg', alt: 'Tarjeta de invitación' },
      portada:    { src: 'assets/images/portada.jpg', alt: 'Camila y Diego' },
      frase:      { src: 'assets/images/frase.jpg', alt: 'Camila y Diego' },
      cuenta:     { src: 'assets/images/cuenta.jpg', alt: 'Cuenta regresiva' },
      ubicacion:  { src: 'assets/images/ubicacion.jpg', alt: 'Lugar del evento' },
      gracias:    { src: 'assets/images/gracias.jpg', alt: 'Gracias' },
      // Imagen que se ve al compartir el enlace (1200 × 630), independiente del sobre
      vistaPrevia:{ src: 'assets/images/vista-previa.jpg' }
    },

    /* ---------- Fotos de cada efecto ----------
       Cada sección tiene SU PROPIA lista, para que las fotos no se repitan.
       Reemplaza cada id por tu propia foto: { src: 'assets/images/tendedero-1.jpg', caption: '...' }
         tendedero: 6 fotos · voltea: 6 · globos: 6 · duo: 2 (mamá y papá) · cinta: 8   */
    sets: {
      tendedero: [
        { src: 'assets/images/historia_1.jpg', caption: 'Nuestro primer baile' },
        { src: 'assets/images/historia_2.jpg', caption: 'Un sí para siempre' },
        { src: 'assets/images/historia_3.jpg', caption: 'Flores de ese día' },
        { src: 'assets/images/historia_4.jpg', caption: 'Mano con mano' },
        { src: 'assets/images/historia_5.jpg', caption: 'Ese vestido' },
        { src: 'assets/images/historia_6.jpg',    caption: 'Entre risas' }
      ],
      voltea: [
        { src: 'assets/images/voltea_1.jpg', caption: 'Atardecer juntos' },
        { src: 'assets/images/voltea_2.jpg', caption: 'Cena en casa' },
        { src: 'assets/images/voltea_3.jpg', caption: 'Flores para ti' },
        { src: 'assets/images/voltea_4.jpg', caption: 'Rosas de ese día' },
        { src: 'assets/images/voltea_5.jpg', caption: 'Nuestro lugar' },
        { src: 'assets/images/voltea_6.jpg', caption: 'Noches de fiesta' }
      ],
      globos: [
        { src: 'assets/images/globos_6.jpg', caption: 'Primera sonrisa' },
        { src: 'assets/images/globos_1.jpg', caption: 'Con los amigos' },
        { src: 'assets/images/globos_2.jpg', caption: 'Un paseo' },
        { src: 'assets/images/globos_3.jpg', caption: 'Bajo las estrellas' },
        { src: 'assets/images/globos_4.jpg', caption: 'Brindando' },
        { src: 'assets/images/globos_5.jpg', caption: 'Celebrando' }
      ],
      duo: [
        { src: 'assets/images/mama.jpg', caption: 'Mamá' },
        { src: 'assets/images/papa.jpg', caption: 'Papá' }
      ],
      cinta: [
        { src: 'assets/images/cinta_1.jpg' }, { src: 'assets/images/cinta_2.jpg' },
        { src: 'assets/images/cinta_3.jpg' }, { src: 'assets/images/cinta_4.jpg' },
        { src: 'assets/images/cinta_5.jpg' }, { src: 'assets/images/cinta_6.jpg' },
        { src: 'assets/images/cinta_7.jpg' }, { src: 'assets/images/cinta_8.jpg' }
      ]
    },

    /* Respaldo: se usa en cualquier sección que no tenga su lista en "sets". */
      gallery: [
      { id: '1511285560929-80b456fea0bc', caption: 'Recuerdo' },
      { id: '1529626455594-4ff0802cfb7e', caption: 'Recuerdo' },
      { id: '1524504388940-b1c1722653e1', caption: 'Recuerdo' },
      { id: '1531746020798-e6953c6e8e04', caption: 'Recuerdo' },
      { id: '1490750967868-88aa4486c946', caption: 'Recuerdo' },
      { id: '1492684223066-81342ee5ff30', caption: 'Recuerdo' },
      { id: '1530103862676-de8c9debad1d', caption: 'Recuerdo' },
      { id: '1518895949257-7621c3c786d7', caption: 'Recuerdo' }
    ],

    /* ---------- Vista previa al compartir (Open Graph) ---------- */
    og: {
      title: '¿Niño o niña? · Camila & Diego',
      description: 'Te invitamos a descubrirlo con nosotros el 10 de abril de 2027. ¡Abre tu invitación!',
      siteName: 'Invitaciones Premium',
      imageAlt: 'Invitación a la revelación de género de Camila y Diego'
    }
  }
};

window.DEFAULT_EVENT = 'revelacion-camila-diego';
