import React from 'react';
import './App.css';


const FormErrors = ({formErrors}) =>
  <div className='formErrors'>
    {Object.keys(formErrors).map((fieldName, i) => {
      if(formErrors[fieldName].length > 0){
        return (
          <p className="errors" key={i}> {formErrors[fieldName]}</p>
        )        
      } else {
        return '';
      }
    })}
  </div>


class Inputs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      login: "",
      tel: "",
      formErrors: {name: '', email: '',login: '',tel: ''},
      nameValid:false,
      emailValid: false,
      loginValid: false,
      telValid: false,
      formValid: false
    }
  }


  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value},
    () => {this.validateField(name, value)});
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let nameValid = this.state.nameValid;
    let emailValid = this.state.emailValid;
    let loginValid = this.state.loginValid;
    let telValid = this.state.telValid;
    
  switch(fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : 'Введите корректный адресс';
        break;
      case 'login':
        loginValid = value.match(/^[A-Za-z0-9 -_]{3,20}$/i);
        fieldValidationErrors.login = loginValid ? '': 'Введите буквы латинского алфавита "-" или "_"';
        console.log(fieldValidationErrors.login)
        break;
      case 'tel':
        telValid = value.match(/\([0-9]{3}\)-[0-9]{3}-[0-9]{2}-[0-9]{2}/);
        fieldValidationErrors.tel = telValid ? '': 'Введите только цифры';
        break;
      case 'name':
        nameValid = value.match(/^[а-яА-ЯёЁ]+$/);
        fieldValidationErrors.name = nameValid ? '': 'Введите буквы русского алфавита';
        break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    emailValid: emailValid,
                    loginValid: loginValid,
                    telValid: telValid,
                    nameValid:nameValid
                  }, this.validateForm);
  }


  validateForm() {
    this.setState({formValid: this.state.nameValid &&
                              this.state.loginValid &&this.state.telValid && this.state.emailValid});
  }

  
  errorClass(error) {
    return(error.length === 0 ? 'not-error' : 'has-error');
 }
              
  render() {
    return (
      <div>
        
        <form action="" className ="form">
        
      <div className={`inputs  ${this.errorClass(this.state.formErrors.login)}`}>
         <label htmlFor=" login">LOGIN</label>
         <input  type="text" name="login" value={this.state.login} onChange={this.handleUserInput}/>
      </div>

      <div className={`inputs  ${this.errorClass(this.state.formErrors.email)}`}>
        <label htmlFor="email">EMAIL</label>
        <input  type="email" name="email" value={this.state.email} onChange={this.handleUserInput}/>
      </div>

      <div className={`inputs  ${this.errorClass(this.state.formErrors.email)}`}>
        <label htmlFor="email">EMAIL CONFIRMATION</label>
        <input  type="email" name="email" value={this.state.email} onChange={this.handleUserInput}/>
      </div>

      <div className={`inputs  ${this.errorClass(this.state.formErrors.name)}`}>
         <label htmlFor="name">NAME</label>
         <input   type="text" name="name" value={this.state.name} onChange={this.handleUserInput}/>
      </div>

      <div className={`inputs  ${this.errorClass(this.state.formErrors.tel)}`}>
        <label htmlFor="tel">TEL</label>
        <input  type="tel" name="tel" value={this.state.tel} onChange={this.handleUserInput} placeholder="(xxx)-xxx-xx-xx"/>
      </div>

      <div>
        <button type="submit" disabled={!this.state.formValid} className="btn btn-primary">Ok</button>
      </div>  
      </form>
      <FormErrors formErrors={this.state.formErrors} />
        <div>
       

      </div>
      </div>

    );
  }
}



export default Inputs;
