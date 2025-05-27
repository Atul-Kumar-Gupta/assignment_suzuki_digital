import React, { useState } from 'react';
import Head from 'next/head';
import constant from '@/constant';
import styles from '../components/user/UserManagementComponent.module.css'
import Form from '@/components/user/form';
import List from '@/components/user/list';
import Detail from '@/components/user/detail';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Index = ({ title, description, hostUrl }) => {

  const [editIndex, setEditIndex] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [refresh, setRefresh] = useState(false)
  return (
    <React.Fragment>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="keywords" content="PayHoy, Loan, Contact, Financial Services" />
        <meta name="author" content="PayHoy" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${hostUrl}/contact-us`} />
        <meta property="og:image" content={`${hostUrl}/images/og-image.jpg`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={`${hostUrl}/images/twitter-image.jpg`} />
      </Head>

      <ToastContainer />
      <div className={styles.container}>
        <div className={styles.heading}>User Management</div>
        <Form
          setEditIndex={setEditIndex}
          setSelectedUser={setSelectedUser}
          editIndex={editIndex}
          selectedUser={selectedUser}
          setRefresh={setRefresh}
          refresh={refresh}
        />
        <List
          setEditIndex={setEditIndex}
          setSelectedUser={setSelectedUser}
          refresh={refresh}

        />
        <Detail
          selectedUser={selectedUser}
        />

      </div>
    </React.Fragment>
  );
};

// Using getInitialProps
Index.getInitialProps = async (ctx) => {
  const title = constant.component.homePage.title
  const description = constant.component.homePage.description;
  // Extract host URL from request headers
  const hostUrl = ctx.req
    ? `${ctx.req.headers['x-forwarded-proto'] || 'http'}://${ctx.req.headers.host}`
    : ''; // Fallback for client-side rendering

  // Pass dynamic data as props
  return { title, description, hostUrl };
};
export default Index;
