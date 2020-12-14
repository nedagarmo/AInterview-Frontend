import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-meet',
  templateUrl: './meet.component.html',
  styleUrls: ['./meet.component.scss']
})
export class MeetComponent implements OnInit {
  @ViewChild('canvas') canvas: any;
  @ViewChild('canvasFace') canvasFace: any;

  private media: any
  private width: any
  private height: any
  private image: any
  private context: any

  constructor(private socket: Socket) {
    this.width = 640
    this.height = 480
    this.image = new Image()
  }

  takepicture(video: any) {
    return () => {
      if (this.width && this.height) {
        this.canvas.nativeElement.width = this.width
        this.canvas.nativeElement.height = this.height
        this.context.drawImage(video, 0, 0, this.width, this.height)
        const jpgQuality = 0.6
        const theDataURL = this.canvas.nativeElement.toDataURL('image/jpeg', jpgQuality)
        this.socket.emit('frame', theDataURL)
      }
    }
  }

  mediaSuccess(mediaStream: any) {
    const video = document.getElementsByTagName('video')[0]
    video.srcObject = mediaStream
    video.play()
    setInterval(this.takepicture(video), 1000 * 10)
  }

  mediaError(error: any) {
    console.log(error);
  }

  ngAfterViewInit(): void {
    console.log(this.canvas)
    this.context = this.canvas.nativeElement.getContext('2d')
    this.context.fillStyle = '#333'
    this.context.fillText('Loading...', this.canvasFace.nativeElement.width / 2 - 30, this.canvasFace.nativeElement.height / 3)

    this.socket.on('frame',  (data: any) => {
      // Reference: http://stackoverflow.com/questions/24107378/socket-io-began-to-support-binary-stream-from-1-0-is-there-a-complete-example-e/24124966#24124966
      const uint8Arr = new Uint8Array(data.buffer)
      const str = String.fromCharCode.apply(uint8Arr)
      const base64String = btoa(str)

      this.image.onload = () => {
        this.context.drawImage(this.image, 0, 0, this.canvasFace.nativeElement.width, this.canvasFace.nativeElement.height);
      }
      this.image.src = 'data:image/png;base64,' + base64String
    })

    console.log("request media: ", this.media)
    this.media = navigator.getUserMedia({ video: true, audio: false }, this.mediaSuccess.bind(this), this.mediaError.bind(this))
    console.log("post request media: ", this.media)
  }

  ngOnInit(): void {

  }
}
