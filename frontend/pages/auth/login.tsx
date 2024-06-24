import React, { useState } from 'react';
import { Auth as Layout } from '@/components/Layouts';
import { Button, Card, Col, Container, FloatingLabel, Form, Row, Spinner } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useLogin } from '@/appState/auth';
import { ApiErrorResponseType } from '@/appState/types/api';
import { object, string } from 'yup';
import { useFormik } from 'formik';

const Login = () => {
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const { mutate } = useLogin();
  const { push, ...router } = useRouter();

  const referer = router.query.r;

  const onFinish = (values: any) => {
    setLoading(true);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    mutate(values, {
      onSuccess: () => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        (async () => await push(referer && referer.length ? referer.toString() : '/app/documents'))();

        toast.success('User logged-in successfully.');
        setLoading(false);
      },
      onError: (err) => {
        const error = err as ApiErrorResponseType;
        toast.error(error.message);
        setLoading(false);
        return;
      },
    });
  };

  const signInSchema = object({
    email: string().email().required(),
    password: string().required(),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: signInSchema,
    onSubmit: onFinish,
  });

  const { handleSubmit, handleChange, handleBlur, values: formValues, errors: formErrors, touched } = formik;

  return (
    <>
      <section className='py-5 my-5'>
        <Container>
          <Row>
            <Col md={10} className='d-flex flex-column justify-content-center my-sm-2 mx-auto'>
              <div className='my-sm-5'>
                <Card className='rounded-4 shadow-sm border-0 mt-sm-4 bg-secondary-cs'>
                  <Card.Body className='p-sm-5'>
                    <Row>
                      <Col md>
                        <div className='p-3'>
                          <h2>Welcome Back</h2>
                          <p>Login to continue</p>
                        </div>
                      </Col>
                      <Col md className='pt-4'>
                        <Form onSubmit={handleSubmit}>
                          <Form.Group className='mb-4' controlId='formBasicEmail'>
                            <FloatingLabel controlId='floatingInput' label='Email address'>
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
                            </FloatingLabel>
                          </Form.Group>

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
                            </FloatingLabel>
                          </Form.Group>

                          <div className='d-grid d-sm-flex mt-5'>
                            {loading ? (
                              <Button variant='primary' type='submit' className='px-5 ms-sm-auto' disabled>
                                <Spinner size='sm'></Spinner> Login
                              </Button>
                            ) : (
                              <Button variant='primary' type='submit' className='px-5 ms-sm-auto'>
                                Login
                              </Button>
                            )}

                            <Button
                              variant='link'
                              className='px-5 shadow-sm border my-2 my-sm-0 order-sm-first'
                              href='register'
                            >
                              Create Account
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
    </>
  );
};

const Home = () => {
  return (
    <Layout headerFixed={false}>
      <Login />
    </Layout>
  );
};

export default Home;
