import React, { Component } from "react";
import axios from "axios";
import Main from "../templete/Main";

const headerProps = {
    icon: 'users',
    title: 'Usuários',
    subtitle: 'Cadastro de usuário: , Incluir, Listar, Alterar e Excluir'
}
const baseUrl = 'http://localhost:3001/users'
const initialStage = {
    user: {name:'', email:''},
    list:[]
}

export default  class UserCrud extends Component{
    state = {...initialStage}
    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({list: resp.data})
        })
    }

    clear(){
        this.setState({user: initialStage.user})
    }
    save(){

        const  user = this.state.user
        const method = user.id ? 'put' : 'post'
        const url = user.id ? `${baseUrl}/${user.id}` : baseUrl
        if (user.name && user.email) {
            axios[method](url, user).then(resp => {
                const list = this.getUpdateList(resp.data)
                this.setState({user: initialStage.user, list})
            })
        }
    }
    getUpdateList(user){
        const list = this.state.list.filter(u => u.id !== user.id)
        if(user) list.unshift(user)
        return list
    }
    updateField(event){
        const user = {...this.state.user}
        user[event.target.name]= event.target.value
        this.setState({user})
    }

    load(user){
        this.setState({user})
    }
    remove(user){
        axios.delete(`${baseUrl}/${user.id}`).then(resp => {
            const list = this.state.list.filter(u =>u !== user)
            // const list = this.getUpdateList(null)
            this.setState({list})
        })
    }
    renderForm(){
        return(
            <form role="form">
            <div className='form'>
                <div className='row'>
                    <div className='col-12 col-md-6'>
                        <div className='form-group'>
                            <label>Nome</label>
                            <input type='text' className='form-control' name='name' value={this.state.user.name} onChange={e => this.updateField(e)} required="required" />

                        </div>
                    </div>
                    <div className='col-12 col-md-6'>
                        <div className='form-group'>
                            <label>E-mail</label>
                            <input type='text' className='form-control' name='email' value={this.state.user.email} onChange={e => this.updateField(e)} required="required"/>
                        </div>
                    </div>
                </div>
                <hr/>
                <div className='row'>
                    <div className='col-12 d-flex justify-content-end'>
                        <button className='btn btn-primary' onClick={e => this.save(e)}>
                            Salvar
                        </button>
                        <button className='btn btn-secondary ml-2' onClick={e => this.clear(e)}>
                            Cancelar
                        </button>

                    </div>
                </div>
            </div>
            </form>
        )
    }
    renderTable(){
        return(
            <table className='table mt-4'>
                <thead>
                <tr>
                    <th>Nome</th>
                    <th>E-mail</th>
                    <th>Ações</th>
                </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>

            </table>
        )
    }
    renderRows(){
        return this.state.list.map(
             user => {return(
                 <tr key={user.id}>
                     <td>{user.name}</td>
                     <td>{user.email}</td>
                     <td>
                         <button className='btn btn-warning' onClick={()=> this.load(user)}>
                             <i className='fa fa-pencil'></i>
                         </button>
                         <button className='btn btn-danger ml-2' onClick={()=> this.remove(user)}>
                             <i className='fa fa-trash'></i>
                         </button>
                     </td>
                 </tr>
             )}
        )
    }

    render() {
        return(
            <Main {...headerProps}>
                <h2>Cadastro de Usuário</h2>
                {this.renderForm()}
                {this.renderTable()}

            </Main>
        )
    }
}
