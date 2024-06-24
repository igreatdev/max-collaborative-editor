/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
'use client';
import React, { FC, useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import { QuillBinding } from 'y-quill';
import * as Y from 'yjs';
import 'quill/dist/quill.snow.css';
// import dynamic from 'next/dynamic';
import QuillCursors from 'quill-cursors';
import { UserProfile } from '@/appState/types/auth';
import { Socket, io } from 'socket.io-client';
import Quill from 'quill';
import { debounce } from 'lodash';
import { removeWithRedirect, useUser } from '@/appState/auth';
import { useRouter } from 'next/router';
import { Card, Col, Row } from 'react-bootstrap';

ReactQuill.Quill.register('modules/cursors', QuillCursors);

type CEditorProps = {
  documentId: number;
  user: UserProfile;
};
export const CollaborativeEditor: FC<CEditorProps> = ({ documentId, user }) => {
  const [doc, setDoc] = useState<Y.Doc>();
  const [socket, setSocket] = useState<Socket | null>(null);
  const { data: authUser } = useUser();

  // Set up Yjs
  useEffect(() => {
    const socketIo = io(`ws://localhost:5001/document/${documentId}`, {
      auth: {
        token: authUser?.token,
      },
    });
    setSocket(socketIo);

    const yDoc = new Y.Doc();
    setDoc(yDoc);

    socketIo.on('status', (event: { status: string }) => {
      console.log(event.status); // logs "connected" or "disconnected"
    });

    return () => {
      yDoc?.destroy();
      socketIo.disconnect();
    };
  }, []);

  if (!doc || !socket) {
    return null;
  }

  return <QuillEditor documentId={documentId} doc={doc} socket={socket} user={user} />;
};

type CursorData = {
  range: { index: number; length: number };
  name: string;
  color: string;
};

type EditorProps = {
  documentId: number;
  doc: Y.Doc;
  provider?: any;
  socket: Socket;
  user: UserProfile;
  reactQuillRef?: React.RefObject<ReactQuill>;
};
const QuillEditor: FC<EditorProps> = ({ documentId, doc, socket, user }) => {
  const [users, setUsers] = useState([]);
  const reactQuillRef = useRef<ReactQuill>(null);
  const cursors = useRef(new Map());
  const { asPath } = useRouter();

  const getCursorModule = (quill: Quill) => quill.getModule('cursors') as QuillCursors;

  // Set up Yjs and Quill
  useEffect(() => {
    if (!reactQuillRef.current) {
      return;
    }

    const quill = reactQuillRef.current.getEditor();
    const yText = doc.getText('quill');
    const binding = new QuillBinding(yText, quill);

    console.log({ socket });
    socket.on('document', (state) => {
      Y.applyUpdate(doc, new Uint8Array(state));
    });

    socket.on('usersEditing', ({ users }) => {
      setUsers(users);
    });

    socket.on('documentUpdate', (update) => {
      Y.applyUpdate(doc, new Uint8Array(update));
    });

    socket.on('cursorUpdate', ({ clientId, cursor }: { clientId: string; cursor: CursorData }) => {
      const cursorModule = getCursorModule(quill);
      cursorModule.createCursor(clientId, cursor.name, cursor.color);
      cursorModule.moveCursor(clientId, cursor.range);

      cursors.current.set(clientId, cursor);
    });

    socket.on('userDisconnected', (clientId) => {
      const cursorModule = getCursorModule(quill);
      cursorModule.removeCursor(clientId);
      cursors.current.delete(clientId);
    });

    socket.on('unAuthorized', async () => {
      // Redirect to auth
      console.log('redirect');
      const currentUrl = asPath;
      await removeWithRedirect(currentUrl);
    });

    // const debouncedDocUpdate = () => {}
    quill.on('text-change', () => {
      const update = Y.encodeStateAsUpdate(doc);
      socket.emit('updateDocument', { docId: documentId, update });
    });

    const debouncedCursorUpdate = debounce((range) => {
      if (range) {
        const cursor = { range };
        socket.emit('updateCursor', { docId: documentId, cursor });
      }
    }, 500);
    quill.on('selection-change', (range) => {
      debouncedCursorUpdate(range);
    });

    socket.emit('getDocument', documentId);

    return () => {
      binding?.destroy?.();
      doc.destroy();
    };
  }, [doc, socket, user]);

  return (
    <Row className='my-4'>
      <Col lg={10} className='my-2'>
        <Card className='border-0 text-dark bg-light shadow-sm mb-3'>
          <Card.Body className='p-3'>
            <div className={'editor-container'}>
              <div className={'editor-container-inner'}>
                <ReactQuill
                  className={'editor'}
                  placeholder='Start typing here…'
                  ref={reactQuillRef}
                  theme='snow'
                  modules={{
                    cursors: true,
                    toolbar: [
                      [{ header: '1' }, { header: '2' }, { header: '3' }, { font: [] }],
                      [{ size: [] }],
                      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
                      ['link', 'image'],
                      ['clean'],
                    ],
                    history: {
                      // Local undo shouldn't undo changes from remote users
                      userOnly: true,
                    },
                  }}
                  style={{ minHeight: '400px' }}
                />
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>
      <Col lg={2} className='my-2 ms-auto'>
        <p className='header pb-1'>Users active</p>
        <div className='d-flex flex-column'>
          {users.length
            ? users.map((userAc: { name: string; color: string }, i) => (
                <p key={i} className='small ps-1' style={{ borderLeft: `2px solid ${userAc.color}` }}>
                  {userAc.name}
                </p>
              ))
            : null}
        </div>
      </Col>
    </Row>
  );
};

export default CollaborativeEditor;
