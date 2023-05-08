import PropTypes from 'prop-types';
import { Button, Contact, List } from './ContsctList.styled';

export const ContactList = ({ contacts, onDelete }) => {
  return (
    <List>
      {contacts.map(item => (
        <Contact key={item.id}>
          {item.name}: {item.number}
          <Button type="button" id={item.id} onClick={onDelete}>
            Delete
          </Button>
        </Contact>
      ))}
    </List>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};
