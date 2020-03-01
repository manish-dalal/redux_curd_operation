import { api_response } from './common'
import isEmpty from 'lodash/isEmpty'

export default options => {
  let params = {}
  // get url params
  const routeParams = options.reqUrl.split('?')
  if (routeParams.length > 1) {
    let paramsStr = routeParams[1]
    paramsStr.split('&').map(data => {
      let keyValue = data.split('=')
      params[keyValue[0]] = keyValue[1] ? keyValue[1] : ''
      return ''
    })
  }

  return new Promise(async (resolve, reject) => {
    let response = localStorage.getItem('items')
    if (response === null) {
      response = api_response
      localStorage.setItem('items', JSON.stringify(response))
    } else {
      response = JSON.parse(response)
    }

    if (response.length) {
      if (!isEmpty(params.name)) {
        response = response.filter(item => item['authorName'].toLowerCase().includes(params.name.toLowerCase()))
      }
      return resolve({
        data: {
          content: response
        }
      })
    } else {
      return reject({})
    }
  })
}
