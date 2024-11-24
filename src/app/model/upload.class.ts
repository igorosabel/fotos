import { UploadInterface } from '@interfaces/interfaces';
import { getDate } from '@osumi/tools';

export default class Upload {
  status: string = 'no';
  uploaded: number = 0;
  creationDate: Date = new Date();

  constructor(
    public src: string = '',
    public date: string = '',
    public exif: string = ''
  ) {
    if (date !== '') {
      let datePieces: string[] = date.split(' ');
      let firstPieces: string[] = datePieces[0].split(':');
      let lastPieces: string[] = datePieces[1].split(':');
      this.creationDate = new Date(
        parseInt(firstPieces[0]),
        parseInt(firstPieces[1]) - 1,
        parseInt(firstPieces[2]),
        parseInt(lastPieces[0]),
        parseInt(lastPieces[1]),
        parseInt(lastPieces[2])
      );
    }
  }

  toInterface(): UploadInterface {
    return {
      src: this.src,
      date: getDate({
        date: this.creationDate,
        separator: '-',
        withSeconds: true,
        pattern: 'ymdhis',
      }),
      exif: this.exif,
    };
  }
}
