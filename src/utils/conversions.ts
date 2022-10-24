export function convertToShortString(val: number): string {
  // thousands, millions, billions etc..
  const s = ['', 'k', 'm', 'b', 't'];

  // dividing the value by 3.
  const sNum: number = Math.floor(`${val}`.length / 3);

  // calculating the precised value.
  let sVal: string | number = parseFloat(
    (sNum != 0 ? val / Math.pow(1000, sNum) : val).toPrecision(2)
  );

  if (sVal % 1 != 0) {
    sVal = sVal.toFixed(1);
  }

  // appending the letter to precised val.
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  return `${sVal}${s.length ? s[sNum] : ''}`;
}

/* eslint-disable @typescript-eslint/restrict-plus-operands */
export function millisToMinutesAndSeconds(millis: number) {
  const minutes = Math.floor(millis / 60000);
  let seconds = (millis % 60000) / 1000;
  seconds = Number(seconds.toFixed(0));
  return seconds == 60
    ? minutes + 1 + ':00'
    : minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}