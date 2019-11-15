export const LOGIN = 'LOGIN'

export function loginTodo(status) {
  return {
    type: LOGIN,
    status
  }
}