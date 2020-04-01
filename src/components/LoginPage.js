import React, {useState} from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik'

import "../assets/sass/login.sass"

export const LoginPage = (props) => {


  return (
    <div className="container">
      <div className="d-flex justify-content-center h-100">
        <div className="card zoomInUp animated">
          <div className="card-header">

            <Formik
              initialValues={{ email: '', password: '' }}
              validate={values => {
                const errors = {};
                if (!values.email) {
                  errors.email = 'Required';
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                  errors.email = 'Invalid email address';
                }
                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  props.onSubmit(values)
                  setSubmitting(false);
                }, 400);
              }}
            >
              {({ isSubmitting }) => (
                <FormikForm>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Field type="email" name="email"  className='form-control'  />
                    <ErrorMessage name="email" component="div" />
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text>
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Field type="password" name="password" className='form-control' />
                    <ErrorMessage name="password" component="div" />
                  </Form.Group>

                  <Button variant="primary" type="submit" disabled={isSubmitting} className="login-btn">
                    Submit
                  </Button>

                </FormikForm>
              )}
            </Formik>

          </div>
        </div>
      </div>
    </div>
  );
}
