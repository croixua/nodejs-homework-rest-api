const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, 'contacts.json');

const updateListContacts = async contacts =>
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async contactId => {
  const contacts = await listContacts();
  const res = contacts.find(({ id }) => id === contactId);

  if (!res) return null;

  return res;
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  updateListContacts(contacts);

  return newContact;
};

const removeContact = async contactId => {
  const contacts = await listContacts();
  const idx = contacts.findIndex(({ id }) => id === contactId);

  if (idx === -1) return null;

  const [removeContact] = contacts.splice(idx, 1);
  updateListContacts(contacts);

  return removeContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const findedContact = contacts.find(({ id }) => id === contactId);
  const updatedContact = {
    ...findedContact,
    ...body,
  };
  const idx = contactId - 1;
  contacts.splice(idx, 1, updatedContact);
  updateListContacts(contacts);

  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
};
