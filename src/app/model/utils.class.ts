export default class Utils {
  static urlencode(str: string): string {
    return encodeURIComponent(str)
      .replace(/\%20/g, '+')
      .replace(/!/g, '%21')
      .replace(/'/g, '%27')
      .replace(/\(/g, '%28')
      .replace(/\)/g, '%29')
      .replace(/\*/g, '%2A')
      .replace(/\~/g, '%7E');
  }

  static urldecode(str: string): string {
    if (!str) {
      return '';
    }
    return decodeURIComponent(
      str
        .replace(/\+/g, '%20')
        .replace(/\%21/g, '!')
        .replace(/\%27/g, "'")
        .replace(/\%28/g, '(')
        .replace(/\%29/g, ')')
        .replace(/\%2A/g, '*')
        .replace(/\%7E/g, '~')
    );
  }

  static formatZeroNumber(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }

  static formatDate(date: Date, forDB: boolean = false): string {
    const year: number = date.getFullYear();
    const month: string = Utils.formatZeroNumber(date.getMonth() + 1);
    const day: string = Utils.formatZeroNumber(date.getDate());
    const hours: string = Utils.formatZeroNumber(date.getHours());
    const minutes: string = Utils.formatZeroNumber(date.getMinutes());
    const seconds: string = Utils.formatZeroNumber(date.getSeconds());

    if (!forDB) {
      return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    }
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
}
