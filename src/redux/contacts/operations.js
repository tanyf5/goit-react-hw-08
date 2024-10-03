import { createAsyncThunk } from '@reduxjs/toolkit'
import { apiClient } from '../auth/operations'

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const { data: contacts } = await apiClient.get('contacts')
      return contacts
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (contact, { rejectWithValue }) => {
    try {
      const { data: newContact } = await apiClient.post('contacts', contact)
      return newContact
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, { rejectWithValue }) => {
    try {
      await apiClient.delete(`contacts/${contactId}`)
      return contactId
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)