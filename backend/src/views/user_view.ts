import Users from '../model/Users'

export default {
  render(user : Users) {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
    }
  }
}