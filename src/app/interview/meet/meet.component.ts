import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { WebrtcService } from '../services/webrtc.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from '../models/message';
import { ProcessorService } from '../services/processor.service';
import { Result } from '../models/result';
import { Statistic } from '../models/statistic';

@Component({
  selector: 'app-meet',
  templateUrl: './meet.component.html',
  styleUrls: ['./meet.component.scss']
})
export class MeetComponent implements OnInit {
  @ViewChild('canvas') canvas: any;
  @ViewChild('localPlayer') video: any;

  private width: any;
  private height: any;
  private context: any;

  // Encapsula el código de la sala de videollamada.
  public roomCode: any;
  // Esta variable indica si el canal de conexión entre pares está listo.
  private isChannelReady = false;
  // Esta variable indica si este par es el iniciador (o primero en ingresar) de la sala.
  private isInitiator = false;
  // Esta variable indica si la conexión entre pares se ha establecido.
  private isStarted = false;
  // Esta variable almacena el stream local.
  private localStream: any;
  // Esta variable almacena el objeto de la conexión entre pares.
  private pc: any;
  // Esta variable almacena el stream del cliente remoto.
  private remoteStream: any;
  // Esta variable indica si el servidor TURN está listo.
  private turnReady: any;
  // Src del reproductor de media local.
  public localVideo: any;
  // Src del reproductor de media remoto.
  public remoteVideo: any;
  // Lista de mensajes de chat
  public chatMessages: Array<Message>;
  // Lista de resultados del análisis en tiempo real
  public statistics: Array<Statistic>;

  // Configuración de conexión a servidores ICE
  private pcConfig = {
      'iceServers': [{ 'urls': 'stun:stun.l.google.com:19302' }]
  }

  // Esta variable contiene las restricciones de medios con los que conectaremos
  public constraints = {
    audio: true,
    video: true
  };

  // Se configura audio y video independientemente de qué dispositivos estén disponibles.
  private sdpConstraints = {
    offerToReceiveAudio: true,
    offerToReceiveVideo: true
  };

  constructor(private _ProcessorService: ProcessorService,
              private _WebrtcService: WebrtcService,
              private _ActiveRoute: ActivatedRoute,
              private _Router: Router) {
    this.width = 640
    this.height = 480

    this.chatMessages = Array<Message>();
    this.statistics = Array<Statistic>();

    this._ActiveRoute.params.subscribe(v => {
      this.roomCode = v.code;
    });

    _WebrtcService.socket.on('ipaddr', this.onIpAddress.bind(this));

    // Escuchador por la notificación de sala creada.  Por lo que se pondrá true en isInitiator.
    _WebrtcService.socket.on('created', this.onCreatedRoom.bind(this));

    // Escuchador de la notificación de sala ocupada.
    _WebrtcService.socket.on('full', this.onOccupiedRoom.bind(this));

    // Escuchador de notificación de solicitud de unión por parte de otro usuario.  Por esto se setea en true
    // la variable isChannelReady, de manera que ahora hay un par con el cual conectarse.
    _WebrtcService.socket.on('join', this.onPeerRequestToJoin.bind(this));

    // Escuchador de notificación que corresponde a cuando el usuario se une correctamente a la sala.
    // En este caso este par no es el creador de la sala, y habiendo ya un par en la sala se setea en true
    // la variable isChannelReady, pues hay un par con el cual conectarse.
    _WebrtcService.socket.on('joined', this.onJoinedPeer.bind(this));

    // Escuchador de notificación que corresponde a mensaje que debe ponerse en el log.
    _WebrtcService.socket.on('log', this.onTraking.bind(this));

    // Este escuchador se dispara cuando este par recibe un mensaje
    _WebrtcService.socket.on('message', this.onReceivedMessage.bind(this));

    // Este escuchador se dispara cuando este par recibe un mensaje de chat
    _WebrtcService.socket.on('chat', this.onReceiveChat.bind(this));

    // Obtenemos los medios de video y audio del dispositivo local.
    // Si hace falta, se le solicitará al usuario el permiso para acceder a ellos.
    this.onStartMedia();

    if (location.hostname.match(/localhost|127\.0\.0/)) {
      this._WebrtcService.sendEmit('ipaddr', '');
    }

    // En caso que se cierre la ventana o se recargue la página se enviará una notificación al servidor
    // de la pérdida de conexión.
    window.onbeforeunload = this.onHangup.bind(this);
  }

  onIpAddress(ipaddr: any) {
    console.log('Server IP address is: ' + ipaddr);
  }

  takepicture(video: any) {
    return () => {
      if (this.width && this.height) {
        this.canvas.nativeElement.width = this.width
        this.canvas.nativeElement.height = this.height
        this.context.drawImage(video, 0, 0, this.width, this.height)
        const jpgQuality = 0.6
        const theDataURL = this.canvas.nativeElement.toDataURL('image/jpeg', jpgQuality)
        this._ProcessorService.sendEmit('frame', theDataURL)
      }
    }
  }

  ngAfterViewInit(): void {
    this.context = this.canvas.nativeElement.getContext('2d')
    this.context.fillStyle = '#333'

    this._ProcessorService.socket.on('results',  (data: any) => {
      data = JSON.parse(data)
      data.forEach((item: { model: string; concept: string; }) => {
        const model = this.statistics.filter(item => item.model == item.model)
        if(model.length > 0) {
          const index = model[0].results.findIndex(i => i.getLabel() == item.concept)
          if(index < 0)
            model[0].results.push(new Result(item.concept, 1));
          else
            model[0].results[index].setIncrement();

          model[0].setIncrement();
        } else {
          this.statistics.push(new Statistic(item.model, 1, [new Result(item.concept, 1)]))
        }
      });
    })
  }

  ngOnInit(): void {

  }

  onCreatedRoom(room: any) {
    this.isInitiator = true;
  }

  onOccupiedRoom(room: any) {
    this.onHangup();
    alert('No le es permitido entrar a la entrevista.');
    this._Router.navigate(['calendar/']);
  }

  onPeerRequestToJoin (room: any){
    console.log("join")
    this.isChannelReady = true;
    this.maybeStart();

    this._WebrtcService.sendMessage('got user media');
  }

  onJoinedPeer(room: any) {
    console.log("joined")
    this.isChannelReady = true;

    //this.maybeStart();
  }

  onTraking(array: any) {
    console.log.apply(console, array);
  }

  onStartMedia(){
    navigator.mediaDevices.getUserMedia(this.constraints)
    .then(this.gotStream.bind(this))
    .catch(function(e) {
      alert('Error al obtener medios de usuario: ' + e.message);
    });
  }

  onReceivedMessage(message: any) {
    console.log("Message: " + message);
    console.log("Message Type: " + message.type);
    if (message === 'got user media') {
      // Si se recibe el mensaje que notifica que la media del usuario remoto está lista,
      // ejecutamos la función para iniciar la comunicación.
      this.maybeStart();
    } else if (message.type === 'offer') {
      // Si se recibe el mensaje que notifica una oferta por parte del par remoto,

      // y si este cliente no es el iniciador, y además no está iniciada alguna comunicación,
      // se ejecuta la función para iniciar el protocolo de conexión.
      if (!this.isInitiator && !this.isStarted) {
        this.maybeStart();
      }

      // Se setea la descripción de la sesión remota parametrizando el mensaje recibido.
      this.pc.setRemoteDescription(new RTCSessionDescription(message));
      // Se le envía respuesta al par remoto con la descripción local de la sesión.
      this.doAnswer();
    } else if (message.type === 'answer' && this.isStarted) {
      // Si se recibe el mensaje que corresponde a una respuesta con la descripción de la sesión por
      // parte del par remoto, se agrega esta información al objeto de la conexión.
      this.pc.setRemoteDescription(new RTCSessionDescription(message));
    } else if (message.type === 'candidate' && this.isStarted) {
      // Si se recibe el mensaje que corresponde a la información del candidato remoto,
      // se agrega al objeto de conexión.
      var candidate = new RTCIceCandidate({
        sdpMLineIndex: message.label,
        candidate: message.candidate
      });

      this.pc.addIceCandidate(candidate);
    } else if (message === 'bye' && this.isStarted) {
      // Se recibe la notificación que el par remoto ha colgado (o abandonado) la llamada.
      this.onRemoteHangup();
    }
  }

  // Esta función se ejecuta si el usuario permitio acceso al periferico de entrada de video.
  // Pone el stream local en el control de video correspondiente.
  gotStream(stream: MediaStream): void {
    this.localStream = stream;
    this.localVideo = stream;

    setInterval(this.takepicture(this.video.nativeElement), 1000 * 3)

    // Enviamos notificación sobre disponibilidad de dispositivos de media en este par.
    console.log("Room: ", this.roomCode);
    this._WebrtcService.connect(this.roomCode);
    // this._WebrtcService.sendMessage('got user media');

    // Si este usuario inicia la sala (o es el primero en acceder a ella),
    // ejecuta la función para iniciar la conexión entre pares.
    /* if (this.isInitiator) {
      this.maybeStart();
    }*/
  }

  // Función que intenta iniciar comunicación entre los pares conforme al marco ICE.
  maybeStart() {
    console.log("maybeStart: ", !this.isStarted && typeof this.localStream !== 'undefined' && this.isChannelReady)
    console.log(this.isStarted, this.localStream, this.isChannelReady)
    if (!this.isStarted && typeof this.localStream !== 'undefined' && this.isChannelReady) {
      // Si no se ha iniciado la comunicación, hay medios locales y el canal está listo (Porque alguien mas está unido a la sala)
      // se ejecuta esta función para crear la conexión entre pares mediante el servidor TURN.
      this.createPeerConnection();
      // Se agrega stream local a la conexión entre pares.  Esta función envia la media local al par remoto.
      this.pc.addStream(this.localStream);
      // Se determina que inicia la comunicación.
      this.isStarted = true;

      if (this.isInitiator) {
        // Si este par es iniciador, se ejecuta la función que crea la oferta.
        this.doCall();
      }
    }
  }

  // Función que se encarga de crear la conexión entre pares mediante el servidor TURN.
  createPeerConnection() {
    try {
      // Se crea objeto RTCPeerConnection parametrizando la configuración del servidor TURN.
      this.pc = new RTCPeerConnection(this.pcConfig);
      // Se asocia la función que se ejecutará en la fase de intercambio de candidatos.
      this.pc.onicecandidate = this.onIceCandidate.bind(this);
      // Se asocia la función que se ejecutará cuando se reciba stream del par remoto.
      this.pc.onaddstream = this.onRemoteStreamAdded.bind(this);
      // Se asocia la función que se ejecutará cuando se elimine el stream remoto.
      this.pc.onremovestream = this.onRemoteStreamRemoved.bind(this);
    } catch (e) {
      alert('No se pudo conectar a la consulta. Inténtelo de nuevo.');
    }
  }

  // Función que se ejecuta en la fase de intercambio de información de candidatos.
  onIceCandidate(event: any) {
    if (event.candidate) {
      this._WebrtcService.sendMessage({
        type: 'candidate',
        label: event.candidate.sdpMLineIndex,
        id: event.candidate.sdpMid,
        candidate: event.candidate.candidate
      });
    }
  }

  onRemoteStreamAdded(event: any) {
    this.remoteStream = event.stream;
    this.remoteVideo = this.remoteStream;
  }

  onRemoteStreamRemoved(event: any) {
    alert('Consulta terminada!');
  }

  // Función que crea la oferta para la comunicación de videollamada.
  doCall() {
    this.pc.createOffer(this.setLocalAndSendMessage.bind(this), this.onCreateOfferError.bind(this), this.sdpConstraints);
  }

  // Se setea la descripción local y se envía la descripción al par remoto.
  setLocalAndSendMessage(sessionDescription: any) {
    this.pc.setLocalDescription(sessionDescription);
    this._WebrtcService.sendMessage(sessionDescription);
  }

  // Función que se ejecuta al fallar la creación de la oferta.
  onCreateOfferError(event: any) {
    alert('Error en la conexión con las configuraciones de los dispositivos.');
  }

  // Función que se ejecuta con la descripción de la sesión en respuesta de la oferta del par remoto.
  doAnswer() {
    this.pc.createAnswer().then(
      this.setLocalAndSendMessage.bind(this),
      this.onCreateSessionDescriptionError.bind(this)
    );
  }

  // Función que se ejecuta cuando no se pueda crear la sesión con el par remoto.
  onCreateSessionDescriptionError(error: any) {
    alert('Por favor, intente entrar nuevamente a la consulta.');
  }

  // El usuario remoto colgó la llamada
  onRemoteHangup() {
    this.stopConnection.bind(this);
    this.isInitiator = false;
  }

  // Se detiene la conexión de pares
  stopConnection() {
    this.isStarted = false;
    this.pc.close();
    this.pc = null;
  }

  // Colgar la llamada
  onHangup() {
    this.stopConnection.bind(this);
    this._WebrtcService.sendMessage('bye');
    this.localStream.getVideoTracks().forEach( (track: any) => { track.stop(); });
    this.localStream.getAudioTracks().forEach( (track: any) => { track.stop(); });
    this._Router.navigate(['interview/calendar']);
  }

  onToggleAudio() {
    this.constraints.audio = !this.constraints.audio;
    if(this.constraints.audio)
      this.onStartMedia();
    else
      this.localStream.getAudioTracks().forEach( (track: any) => {
        track.stop();
      });
  }

  onToggleVideo() {
    this.constraints.video = !this.constraints.video;
    if(this.constraints.video)
      this.onStartMedia();
    else
      this.localStream.getVideoTracks().forEach( (track: any) => {
        track.stop();
      });
  }

  onSendMessage(msg: Message) {
    this._WebrtcService.sendChat(msg);
    this.chatMessages.push(msg);
  }

  onReceiveChat(chat: any) {
    let msg = new Message(chat.content, chat.type, chat.room);
    msg.setType('receive');
    this.chatMessages.push(msg);
  }
}
