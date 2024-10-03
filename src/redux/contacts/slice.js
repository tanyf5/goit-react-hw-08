import { createSlice } from '@reduxjs/toolkit'
import { addContact, deleteContact, fetchContacts } from './operations'
import { logoutUser } from '../auth/operations'

const initialState = {
  contacts: [],
  loading: false,
  added: false,
  deleted: false,
  error: null,
}

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    resetFlags: (state) => {
      state.added = false
      state.deleted = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contacts = action.payload
        state.loading = false
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(addContact.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts.push(action.payload)
        state.added = true
        state.loading = false
      })
      .addCase(addContact.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(deleteContact.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts = state.contacts.filter(
          (contact) => contact.id !== action.payload
        )
        state.deleted = true
        state.loading = false
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(logoutUser.fulfilled, () => {
        return initialState
      })
  },
})

export const { resetFlags } = contactsSlice.actions
export const contactsReducer = contactsSlice.reducer