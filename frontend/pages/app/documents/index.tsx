import React, { useState } from 'react';
import { Main as Layout } from '@/components/Layouts';
import { Button, Card, Container, FloatingLabel, Form, Modal, Spinner, Table } from 'react-bootstrap';
import Link from 'next/link';
import { useCreateDocumentMutation, useGetDocumentsQuery } from '@/appState/hooks';
import Loader from '@/components/Common/loader';
import { object, string } from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { ApiErrorResponseType } from '@/appState/types/api';
import { useRouter } from 'next/router';

const Documents = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { data, isPending, refetch } = useGetDocumentsQuery();
  const { mutate } = useCreateDocumentMutation();
  const { push } = useRouter();

  const closeNewDoc = () => {
    setModalOpen(false);
  };

  const newDocSchema = object({
    title: string().required().min(3),
  });

  const onFinish = (values: any) => {
    console.log({ values });

    setSubmitting(true);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    mutate(values, {
      onSuccess: (res) => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        (async () => {
          await refetch();
          await push(`/app/documents/${res.data.id}`);
        })();

        toast.success('Document created successfully.');
        setSubmitting(false);
      },
      onError: (err: unknown) => {
        console.log({ err });

        const error = err as ApiErrorResponseType;
        toast.error(error.message);
        if (error.message == 'Validation Error' && error.errors) {
          setErrors(error.errors);
        }
        setSubmitting(false);
        return;
      },
    });
  };

  const formik = useFormik({
    initialValues: {
      title: '',
    },
    validationSchema: newDocSchema,
    onSubmit: onFinish,
  });

  const { handleSubmit, handleChange, handleBlur, setErrors, values: formValues, errors: formErrors, touched } = formik;

  return (
    <>
      <main id='main'>
        <Container>
          <h4 className='d-flex'>
            Documents
            <small className='ms-auto'>
              <Button onClick={() => setModalOpen(true)} className='btn btn-sm btn-primary ml-3'>
                New Document
              </Button>
            </small>
          </h4>

          <Card className='border-0 text-dark bg-light my-4'>
            <Card.Body className=''>
              {isPending ? (
                <Loader />
              ) : data && data.items && data.items.length ? (
                <Table hover striped className='bg-white px-3'>
                  <thead className='small'>
                    <tr>
                      <th>Title</th>
                      <th>Owner</th>
                      <th>Last Updated</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.items.map((item, i) => (
                      <tr key={i}>
                        <td>
                          <Link href={`./documents/${item.id}`}>{item.title}</Link>
                        </td>
                        <td>
                          <small>{item.user}</small>
                        </td>
                        <td>
                          <small>{item.updated_at}</small>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <></>
              )}
            </Card.Body>
          </Card>
        </Container>

        <Modal centered show={modalOpen} backdrop='static' onHide={closeNewDoc}>
          <div className=' modal-header'>
            <h5 className=' modal-title' id='exampleModalLabel'>
              Create New Document
            </h5>
          </div>
          <Form name='update-option' onSubmit={handleSubmit}>
            <Modal.Body className=''>
              <Form.Group className='mb-4' controlId='formBasicEmail'>
                <FloatingLabel controlId='floatingInput' label='Document Title'>
                  <Form.Control
                    type='text'
                    name='title'
                    value={formValues.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.title && !!formErrors.title}
                    required
                    placeholder='Document Title'
                  />
                </FloatingLabel>
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant='link' type='button' size='sm' onClick={() => closeNewDoc()}>
                Close
              </Button>
              {submitting ? (
                <Button variant='primary' type='submit' className='ml-auto px-3' disabled>
                  <Spinner size={'sm'}></Spinner> Create
                </Button>
              ) : (
                <Button variant='primary' type='submit' className='ml-auto px-3' size='sm'>
                  Create
                </Button>
              )}
            </Modal.Footer>
          </Form>
        </Modal>
      </main>
    </>
  );
};

const Page = () => {
  return (
    <Layout headerFixed={true}>
      <Documents />
    </Layout>
  );
};

export default Page;
