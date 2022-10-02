export class LogEvent {
  static send(ec: string, ea: string, el: string, ni: number) {
    window.dataLayer.push({
      event: 'interaction',
      ec: ec,
      ea: ea,
      el: el,
      ni: ni,
    });
  }
}
