import React, { useState } from 'react';
import { v4 as uuid } from "uuid";
import s from './ContactForm.module.css';
import PropTypes from 'prop-types';

//class ContactForm extends Component {
//    state = {
//        name: '',
//        number: '',
//    };
 //   
//
//    handleInputChange = evt => {
//        const { name, value } = evt.currentTarget;
//        this.setState({
//      [name]: value,
//      id: uuid(),
//        });
//      };
//
 //     handleSubmit = evt => {
//        evt.preventDefault();
//        this.props.onSubmit(this.state);
//        this.reset();
//      };
//      reset = () => {
//        this.setState({
//          name: '',
//          number: '',
//        });
//      };
    
export default function ContactForm({ onAddContact, onCheckContact }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleInputChange = evt => {
    const { name, value } = evt.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    const isValidateForm = validateForm(name, number);
    if (!isValidateForm) {
      return;
    }
    onAddContact({ id: uuid(), name, number });
    reset();
  };

  const validateForm = (name, number) => {
    if (!name.trim() || !number.trim()) {
      alert('Для добавления контакта заполните поля Name и Number');
      return false;
    }
    return onCheckContact(name);
  };

  const reset = () => {
    setName('');
    setNumber('');
       };
           
    return (
            <form className={s.form} onSubmit={handleSubmit}>
            <label className={s.label}>
              Name
         <input className={s.name}
          type="text"
          onChange={handleInputChange}
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        </label>
        
        <label className={s.label}>
              Number
         <input className={s.number}
          type="tel"
          onChange={handleInputChange}
          name="number"
          value={number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
        </label>
        <button className={s.btn} type="submit">
                  Add contact
                </button>
        
        </form> 
        );
    }


ContactForm.propTypes = {
  name: PropTypes.string,
  number: PropTypes.number,
};

//export default ContactForm;