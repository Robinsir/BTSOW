import require from './require'

export function withPhone (params) {
  return require({
    url: '/login/cellphone',
    method: 'get',
    params
  })
}

export function withEmail (params) {
  require({
    url: '',
    method: 'put',
    params
  })
}
