import React, { useState } from 'react';
// import { AppProvider, DashboardLayout } from '@toolpad/core';
import { AppProvider } from '@toolpad/core';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';

import { NAVIGATION, demoTheme, useRouter } from '../config/config';
import PageContent from './components/PageContent';

const Dashboard: React.FC = () => {
  const router = useRouter('/');
  const [playingDeck, setPlayingDeck] = useState(process.env.REACT_APP_PLAYING_DECK || 1);
  
  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      branding={{
        logo: <img src="" alt="" />,
        title: 'JP21',
      }}
    >
      <DashboardLayout>
        <PageContent pathname={router.pathname} playingDeck={playingDeck as number} setPlayingDeck={setPlayingDeck}  />
      </DashboardLayout>
    </AppProvider>
  );
};

export default Dashboard;
