import api from './api'


class App {
    constructor() {
        this.users = []
        this.form = document.getElementById('form')
        this.input = document.getElementById('user-input')
        this.list = document.getElementById('list')

        this.addUser()

        this.registerHandler()
    }

    registerHandler() {
        this.form.onsubmit = (event) => this.addUser(event)
    }

    async addUser(event) {
        event.preventDefault()

        const inputValue = this.input.value

        if (inputValue.length === 0) {
            return;
        }


        try {
            const response = await api.get(`/users/${inputValue}`)

            console.log(response)

            const { avatar_url, name, updated_at } = response.data

            const today = Date.now()
            const lastPull = new Date(updated_at)
            const lastCommitDays = (Math.floor((today - lastPull) / (24 * 60 * 60 * 1000)))
            const lastCommitHours = (Math.floor((today - lastPull) / (60 * 60 * 1000) % 24))
            const lastCommitMinutes = (Math.floor((today - lastPull) / (60 * 1000) % 60))



            this.users.push({
                avatar_url,
                name,
                updated_at,
                lastCommitDays,
                lastCommitHours,
                lastCommitMinutes
            })
            this.render()
            if (this.users.length >= 1) {
                this.users.pop()
            }
        } catch (err) {
            alert('Digite um user válido')
        }



    }


    render() {
        this.list.innerHTML = ''

        this.users.forEach(user => {
            this.list.innerHTML += `
            <li class="user"> 
                <div class="user-avatar">
                    <img class="avatar" src=${user.avatar_url}>
                    <strong class="name">${user.name}</strong>
                </div>
                <div class="time">
                    <div class="days">
                        <span class="days">${user.lastCommitDays}</span>
                        <p>dias</p>
                </div>
                <div class="hours">
                        <span class="hours">${user.lastCommitHours}</span>
                        <p>horas</p> 
                </div>
                    <div class="minutes">
                        <span class="minutes">${user.lastCommitMinutes}</span>
                        <p>minutos</p>
                    </div>
                </div>
                    <span class="text">Sem nenhuma atualização.</span> 
            </li>`


        })
    }

}
new App()