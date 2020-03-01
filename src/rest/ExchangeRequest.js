import {apiRequest} from "./ApiRequest";

export function serviceGetExchange() {
  return apiRequest({
    url: 'api/exchangerates/tables/A/',
    method: 'GET'
  })
}

export function serviceGetExchangeByCode(code) {
  return apiRequest({
    url: 'api/exchangerates/rates/A/' + code,
    method: 'GET'
  })
}
