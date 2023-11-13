interface User {
  name: string
  age: number
}

function logUser(user: User) {
  console.log(user.name, user.age)
}
