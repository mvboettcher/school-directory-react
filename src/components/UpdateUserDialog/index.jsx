import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

const LoginSchema = Yup.object().shape({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  email: Yup.string().required('Required'),
  type: Yup.string().required('Required'),
  sex: Yup.string().required('Required'),
  birthdate: Yup.string().required('Required')
})

const UpdateUserDialog = ({ open, closeDialog, classes, user }) => {
  return (
    <Formik
      initialValues={{
        firstName: user.name.split(' ')[0],
        lastName: user.name.split(' ')[1],
        email: user.email,
        type: user.type,
        sex: user.sex,
        birthdate: user.birthdate
      }}
      validationSchema={LoginSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        console.log({ values })
        const { firstName, lastName, email, type, sex, birthdate } = values
        // updateUser(user._id, {
        //   name: firstName + ' ' + lastName,
        //   email,
        //   type,
        //   sex,
        //   birthdate
        // })

        setSubmitting(false)
        resetForm({})
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting
      }) => (
        <Dialog
          open={open}
          onClose={closeDialog}
          aria-labelledby='form-dialog-title'
        >
          <DialogTitle id='form-dialog-title'>Update User</DialogTitle>
          <Form onSubmit={handleSubmit} classes={classes.form}>
            <DialogContent>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <TextField
                  style={{ width: '45%' }}
                  margin='normal'
                  label='First Name'
                  name='firstName'
                  value={values.firstName}
                  onChange={handleChange('firstName')}
                  autoFocus
                />
                <TextField
                  style={{ width: '45%' }}
                  margin='normal'
                  label='Last Name'
                  name='lastName'
                  value={values.lastName}
                  onChange={handleChange('lastName')}
                  autoFocus
                />
              </div>
              <TextField
                margin='normal'
                fullWidth
                label='Email'
                name='email'
                value={values.email}
                onChange={handleChange('email')}
              />
              <TextField
                margin='normal'
                fullWidth
                label='Type'
                name='type'
                value={values.type}
                onChange={handleChange('type')}
              />
              <TextField
                margin='normal'
                fullWidth
                label='Sex'
                name='sex'
                value={values.sex}
                onChange={handleChange('sex')}
              />
              <TextField
                margin='normal'
                fullWidth
                label='Date of Birth'
                name='birthdate'
                value={values.birthdate}
                onChange={handleChange('birthdate')}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={closeDialog} color='primary'>
                Cancel
              </Button>
              <Button
                type='submit'
                variant='contained'
                onClick={closeDialog}
                color='primary'
              >
                Add User
              </Button>
            </DialogActions>
          </Form>
        </Dialog>
      )}
    </Formik>
  )
}

export default withStyles(styles)(UpdateUserDialog)
