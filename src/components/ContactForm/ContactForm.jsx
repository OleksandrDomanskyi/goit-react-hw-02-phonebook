import { Component } from 'react';
import { nanoid } from 'nanoid';

import styles from './contact-form.module.scss';

class ContactForm extends Component {

    state = {
        contacts: [
            {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
            {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
            {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
            {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
        ],
        name: '',
        number: '',
    }

    addContact = (e) => {
        e.preventDefault();
        this.setState(prevState => {
            const { name, number, contacts } = prevState;
            const newContact = {
                name,
                number,
                id: nanoid()
            };
            return {
                contacts: [...contacts, newContact],
                name: '',
                number: '',
            };
        })
    };

    handleChange = ({ target }) => {
        const { name, value } = target;
        this.setState({
            [name]: value
        })
    };

    deleteContact = (id) => {
        this.setState(prevState => {
            const { contacts } = prevState;

            return {
                contacts: contacts.filter(contact => contact.id !== id)
            };
        })
    };

    render() {
        const { contacts, name, number } = this.state;
        const { addContact, handleChange, deleteContact } = this;

        const elements = contacts.map(({ id, name, number }) => (
            <li key={id}>{name}: {number}
                <button onClick={() => deleteContact(id)}>Delete</button>
            </li>
        ));

        return (
            <div className={styles.container}>
                <div>
                    <form action="" onSubmit={addContact}>
                        <div>
                            <label htmlFor="">Name</label>
                            <input
                            value={name}
                            type="text"
                            onChange={handleChange}
                            name="name"
                            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                            required
                            />
                        </div>
                        <div>
                            <label htmlFor="">Number</label>
                            <input
                                value={number}
                                type="tel"
                                onChange={handleChange}
                                name="number"
                                pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                                required
                            />
                        </div>
                        <button type='submit'>Add contact</button>
                    </form>
                </div>
                <div>
                    <ul>
                        {elements}
                    </ul>
                </div>
            </div>
        )
    }

};

    
;

export default ContactForm;