import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

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

const AddUserDialog = ({ open, toggleDialog, classes, addUser }) => {
  const closeDialog = () => toggleDialog(false)

  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        email: '',
        type: '',
        sex: '',
        birthdate: ''
      }}
      validationSchema={LoginSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        const { firstName, lastName, email, type, sex, birthdate } = values

        addUser({
          name: firstName + ' ' + lastName,
          email,
          type,
          sex,
          birthdate
        })

        setSubmitting(false)
        closeDialog()
        resetForm({})
      }}
    >
      {({ values, handleChange, handleSubmit, errors }) => (
        <Dialog
          open={open}
          onClose={closeDialog}
          aria-labelledby='form-dialog-title'
        >
          <DialogTitle id='form-dialog-title'>Add New User</DialogTitle>
          <Form onSubmit={handleSubmit} classes={classes.form}>
            <DialogContent>
              <div className={classes.nameContainer}>
                <TextField
                  style={{ width: '45%' }}
                  margin='normal'
                  label='First Name'
                  name='firstName'
                  error={errors.firstName}
                  value={values.firstName}
                  onChange={handleChange('firstName')}
                  autoFocus
                />
                <TextField
                  style={{ width: '45%' }}
                  margin='normal'
                  label='Last Name'
                  name='lastName'
                  error={errors.lastName}
                  value={values.lastName}
                  onChange={handleChange('lastName')}
                />
              </div>
              <TextField
                margin='normal'
                fullWidth
                label='Email'
                name='email'
                error={errors.email}
                value={values.email}
                onChange={handleChange('email')}
              />
              <FormControl
                className={classes.sexFormControl}
                error={errors.sex}
              >
                <InputLabel>Sex</InputLabel>
                <Select value={values.sex} onChange={handleChange('sex')}>
                  <MenuItem value='male'>Male</MenuItem>
                  <MenuItem value='female'>Female</MenuItem>
                </Select>
              </FormControl>
              <FormControl
                className={classes.typeFormControl}
                error={errors.type}
              >
                <InputLabel>Type</InputLabel>
                <Select value={values.type} onChange={handleChange('type')}>
                  <MenuItem value='student'>Student</MenuItem>
                  <MenuItem value='teacher'>Teacher</MenuItem>
                  <MenuItem value='administration'>Administration</MenuItem>
                </Select>
              </FormControl>
              <TextField
                margin='normal'
                fullWidth
                label='Date of Birth'
                name='birthdate'
                placeholder='mm/dd/yyyy'
                error={errors.birthdate}
                value={values.birthdate}
                onChange={handleChange('birthdate')}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={closeDialog} color='primary'>
                Cancel
              </Button>
              <Button type='submit' variant='contained' color='primary'>
                Add User
              </Button>
            </DialogActions>
          </Form>
        </Dialog>
      )}
    </Formik>
  )
}

export default withStyles(styles)(AddUserDialog)
