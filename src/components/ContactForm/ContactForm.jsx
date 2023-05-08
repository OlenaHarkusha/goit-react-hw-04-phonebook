import PropTypes from 'prop-types';
import { Component } from 'react';
import { Button, Form, Input, Label } from './ContactForm.styled';

export class ContactForm extends Component {
  static propTypes = {
    addContact: PropTypes.func.isRequired,
  };
  state = { name: '', number: '' };

  resetForm = () => {
    this.setState({ name: '', number: '' });
  };

  handleInput = e => {
    this.setState(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.addContact(this.state);
    this.resetForm();
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Label>
          Name
          <Input
            type="text"
            name="name"
            onChange={this.handleInput}
            value={this.state.name}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </Label>
        <Label>
          Number
          <Input
            type="tel"
            name="number"
            onChange={this.handleInput}
            value={this.state.number}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </Label>
        <Button type="submit">Add contact</Button>
      </Form>
    );
  }
}
