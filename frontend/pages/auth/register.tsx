import React, { useState } from 'react';
import { Auth as Layout } from '@/components/Layouts';
import { Button, Card, Col, Container, FloatingLabel, Form, Row, Spinner } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { object, ref, string } from 'yup';
import { useFormik } from 'formik';
import { useRegister } from '@/appState/auth';
import { toast } from 'react-toastify';
import { ApiErrorResponseType } from '@/appState/types/api';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();
  const { mutate } = useRegister();

  // const referer = router.query.r;

  const onFinish = (values: any) => {
    setLoading(true);
    console.log({ values });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    mutate(values, {
      onSuccess: () => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        (async () => await push('/auth/login'))();

        toast.success('User logged-in successfully.');
        setLoading(false);
      },
      onError: (err) => {
        const error = err as ApiErrorResponseType;
        toast.error(error.message);
        if (error.message == 'Validation Error' && error.errors) {
          setErrors(error.errors);
        }
        setLoading(false);
        return;
      },
    });
  };

  const dataSchema = object({
    email: string().email().required(),
    password: string().required().min(6),
    password_confirm: string()
      .min(6)
      .oneOf([ref('password'), ''], 'Passwords must match')
      .required(),
    first_name: string().required().max(50).min(3),
    last_name: string().required().max(50).min(3),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      password_confirm: '',
      first_name: '',
      last_name: '',
    },
    validationSchema: dataSchema,
    onSubmit: onFinish,
  });

  const { handleSubmit, handleChange, handleBlur, setErrors, values: formValues, errors: formErrors, touched } = formik;
  // console.log({ formErrors });

  return (
    <section className='py-5 my-5'>
      <Container>
        <Row>
          <Col md={10} className='d-flex flex-column justify-content-center my-sm-2 mx-auto'>
            <div className='my-sm-5'>
              <Card className='rounded-4 shadow-sm border-0 mt-sm-4 bg-secondary-cs'>
                <Card.Body className='p-sm-5'>
                  <Row>
                    <Col md={5}>
                      <div className='p-3'>
                        <h2>Create Account</h2>
                        <p>Enter your details</p>
                      </div>
                    </Col>
                    <Col md className='pt-sm-4'>
                      <Form onSubmit={handleSubmit}>
                        <Form.Group className='mb-3' controlId='formBasicEmail'>
                          <FloatingLabel label='Email address'>
                            <Form.Control
                              type='email'
                              name='email'
                              value={formValues.email}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              isInvalid={touched.email && !!formErrors.email}
                              required
                              placeholder='Enter email address'
                            />
                            <Form.Control.Feedback type='invalid'>{formErrors.email}</Form.Control.Feedback>
                          </FloatingLabel>
                        </Form.Group>

                        <Row>
                          <Col sm>
                            <Form.Group className='mb-3' controlId='formBasicFirstName'>
                              <FloatingLabel label='First Name'>
                                <Form.Control
                                  type='text'
                                  name='first_name'
                                  value={formValues.first_name}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  isInvalid={touched.first_name && !!formErrors.first_name}
                                  required
                                  placeholder='Enter first name'
                                />
                                <Form.Control.Feedback type='invalid'>{formErrors.first_name}</Form.Control.Feedback>
                              </FloatingLabel>
                            </Form.Group>
                          </Col>
                          <Col sm>
                            <Form.Group className='mb-4' controlId='formBasicLastName'>
                              <FloatingLabel label='Last Name'>
                                <Form.Control
                                  type='text'
                                  name='last_name'
                                  value={formValues.last_name}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  isInvalid={touched.last_name && !!formErrors.last_name}
                                  required
                                  placeholder='Enter last name'
                                />
                                <Form.Control.Feedback type='invalid'>{formErrors.last_name}</Form.Control.Feedback>
                              </FloatingLabel>
                            </Form.Group>
                          </Col>
                        </Row>

                        <Row>
                          <Col sm>
                            <Form.Group className='mb-3' controlId='formBasicPassword'>
                              <FloatingLabel controlId='floatingInput' label='Password'>
                                <Form.Control
                                  type='password'
                                  name='password'
                                  value={formValues.password}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  isInvalid={touched.password && !!formErrors.password}
                                  required
                                  placeholder='Enter password'
                                />
                                <Form.Control.Feedback type='invalid'>{formErrors.password}</Form.Control.Feedback>
                              </FloatingLabel>
                            </Form.Group>
                          </Col>
                          <Col sm>
                            <Form.Group className='mb-4' controlId='formBasicConfirmPassword'>
                              <FloatingLabel label='Confirm Password'>
                                <Form.Control
                                  type='password'
                                  name='password_confirm'
                                  value={formValues.password_confirm}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  isInvalid={touched.password_confirm && !!formErrors.password_confirm}
                                  required
                                  placeholder='Enter password again'
                                />
                                <Form.Control.Feedback type='invalid'>
                                  {formErrors.password_confirm}
                                </Form.Control.Feedback>
                              </FloatingLabel>
                            </Form.Group>
                          </Col>
                        </Row>

                        <div className='d-grid g-2 d-sm-flex mt-5'>
                          {loading ? (
                            <Button variant='primary' type='submit' className='px-5 ms-sm-auto' disabled>
                              <Spinner size='sm'></Spinner> Register
                            </Button>
                          ) : (
                            <Button variant='primary' type='submit' className='px-5 ms-sm-auto'>
                              Register
                            </Button>
                          )}

                          <Button variant='link' className='px-5 border my-2 my-sm-0 order-sm-first' href='login'>
                            Login
                          </Button>
                        </div>
                      </Form>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

const Home = () => {
  return (
    <Layout headerFixed={false}>
      <Register />
    </Layout>
  );
};

export default Home;
