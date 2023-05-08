import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from '../ContactForm';
import { Filter } from '../Filter';
import { ContactList } from '../ContactList';
import { GlobalStyle } from '../GlobalStyles';
import { Container, Title } from './App.styled';

const initialContacts = [
  { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
  { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
  { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
  { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
];

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts')) ?? initialContacts;
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleInput = e => {
    setFilter(e.target.value);
  };

  const isInContacts = name => {
    return contacts.some(item => item.name.toLowerCase().includes(name));
  };

  const addContact = ({ name, number }) => {
    const normalizedName = name.toLowerCase();

    if (isInContacts(normalizedName)) {
      alert(`${name} is already in Contacts`);
      return;
    }
    setContacts(prevState => [
      ...prevState,
      {
        name,
        number,
        id: nanoid(),
      },
    ]);
  };

  const deleteContact = e => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== e.target.id)
    );
  };

  const normalizedFilter = filter.toLowerCase();

  const visibleContacts = contacts.filter(item =>
    item.name.toLowerCase().includes(normalizedFilter)
  );

  return (
    <Container>
      <GlobalStyle />
      <Title>Phonebook</Title>
      <ContactForm addContact={addContact} />
      <Title>Contacts</Title>
      <Filter value={filter} onChange={handleInput} />
      <ContactList contacts={visibleContacts} onDelete={deleteContact} />
    </Container>
  );
};
