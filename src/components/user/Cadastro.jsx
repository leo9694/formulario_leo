import React, { Component } from "react";
import Main from "../templete/Main";
import axios from "axios";

const headerProps = {
    icon: 'file',
    title: 'Cadastro',
    subtitle: 'Adicione seu cadastro'
}

const baseUrl = 'http://18.228.152.25/user'
const initialStage = {
    user: {name:'', email:''},
    list:[]
}
export default  class Cadastro extends Component{
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
    render() {
        return(
            <Main {...headerProps}>
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
            </Main>
        )
    }
}

