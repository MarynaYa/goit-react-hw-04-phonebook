import React, { useState } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import Section from "./Section/Section";
import ContactForm from "./ContactForm/ContactForm";
import ContactList from "./ContactList/ContactList";
import ContactItem from "./ContactItem/ContactItem";
import Filter from "./Filter/Filter";


const INITIAL_STATE = [
     { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
     { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
     { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ];
  
export const App = () => {
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useLocalStorage('contacts', INITIAL_STATE);

  const handleAddNewContact = nameContact => {
    setContacts([...contacts, nameContact]);
  };

  const handleCheckContact = name => {
    const isExistContact = !!contacts.find(
      contact => contact.name.trim() === name.trim(),
    );
    if (isExistContact) {
      alert('Контакт с таким именем уже существует!');
    }
    return !isExistContact;
  };

  const handleRemoveContact = id =>
  setContacts(contacts.filter(contact => contact.id !== id));

const handleFilter = event => {
  setFilter(event.target.value);
};

const getVisibleContact = () => {
  return contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase()),
  );
};

const visibleContacts = getVisibleContact();


  return (
    <>
   <Section title="Phonebook">
    <ContactForm  
    onAddContact={handleAddNewContact}
    onCheckContact={handleCheckContact} />   
    </Section>

    <Section title="Contacts">
    <Filter filter={filter} onChange={handleFilter} />
    <ContactList>
          <ContactItem contacts={visibleContacts}
          onDeleteContact={handleRemoveContact}/>
        </ContactList>
    </Section>
</>
  
  )
}


