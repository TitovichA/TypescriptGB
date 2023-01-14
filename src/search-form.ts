import { renderBlock } from './lib.js';

export function renderSearchFormBlock(dateCheckIn: string, dateCheckout: string) {
  const TWO_DAYS = 2;
  const ONE_MONTH = 1;
  const TWO_MONTHS = 2;


  const today: Date = new Date;
  // минимально возможная дата заселения и выселения
  const min = `${today.getFullYear()}-${('0' + (today.getMonth() + ONE_MONTH)).slice(-2)}-${today.getDate()}`;

  // максимально возможная дата заселения выселения
  function findMax(objDate: Date): string {
    const lastDayOfNextMonth: Date = new Date(objDate.getFullYear(), objDate.getMonth() + TWO_MONTHS, 0);
    return `${lastDayOfNextMonth.getFullYear()}-${('0' + (lastDayOfNextMonth.getMonth() + ONE_MONTH)).slice(-2)}-${lastDayOfNextMonth.getDate()}`;
  }

  //переведенная в нужный формат дата заезда по умолчанию

  const defaultDCI: Date = new Date(today.setDate(today.getDate() + 1));
  console.log(defaultDCI);
  const transformedDefaultDCI = `${defaultDCI.getFullYear()}-${('0' + (defaultDCI.getMonth() + ONE_MONTH)).slice(-2)}-${defaultDCI.getDate()}`

  //функция возвращает выезд по умолчанию для даты заезда по умолчанию и для введенной даты заезда
  function defaultCheckout(objDate: Date): string {
    const defaultDCO: Date = new Date(objDate.setDate(objDate.getDate() + TWO_DAYS));
    return `${defaultDCO.getFullYear()}-${('0' + (defaultDCO.getMonth() + ONE_MONTH)).slice(-2)}-${('0' + defaultDCO.getDate()).slice(-2)}`;
  }
  let checkIn: string;
  let checkOut: string;
  let maxCheckOut: string;
  let maxDefault: string;
  let minCheckout: string;

  if (dateCheckIn === '') {

    checkIn = transformedDefaultDCI;
    checkOut = (dateCheckout === '') ? defaultCheckout(defaultDCI) : dateCheckout;
    maxDefault = findMax(defaultDCI);
    maxCheckOut = findMax(defaultDCI);
    minCheckout = transformedDefaultDCI
  } else {
    const dciInToObj = new Date(dateCheckIn);
    console.log(dciInToObj);
    const dci = `${dciInToObj.getFullYear()}-${('0' + (dciInToObj.getMonth() + ONE_MONTH)).slice(-2)}-${('0' + dciInToObj.getDate()).slice(-2)}`
    checkIn = dci;
    checkOut = (dateCheckout === '') ? defaultCheckout(dciInToObj) : dateCheckout;
    maxDefault = findMax(dciInToObj)
    minCheckout = dci;
    maxCheckOut = findMax(dciInToObj);
  }

  renderBlock(
    'search-form-block',
    `
    <form id="form">
      <fieldset class="search-filedset">
      <form>
        <div class="row">
          <div>
            <label for="city">Город</label>
            <input id="city" type="text" disabled value="Санкт-Петербург" />
            <input type="hidden" disabled value="59.9386,30.3141" />
          </div>
          <!--<div class="providers">
            <label><input type="checkbox" name="provider" value="homy" checked /> Homy</label>
            <label><input type="checkbox" name="provider" value="flat-rent" checked /> FlatRent</label>
          </div>--!>
        </div>
        <div class="row">
          <div>
            <label for="check-in-date">Дата заезда</label>
            <input id="check-in-date" type="date" value="${checkIn}" 
            min="${min}" max="${maxDefault}" name="checkin" />
  </div>
  <div>
  <label for="check-out-date"> Дата выезда </label>
    <input id="check-out-date" type ="date" value="${checkOut}" min="${minCheckout}" max="${maxCheckOut}" name="checkout"/>
      </div>
      <div>
      <label for="max-price"> Макс.цена суток </label>
        <input id="max-price" type="text" value="" name="price" class="max-price"/>
          </div>
          <div>
          <div><button type="submit">Найти </button></div>
          </div>
          </div>
          </form>
          </fieldset>
          </form>
            `
  );
}