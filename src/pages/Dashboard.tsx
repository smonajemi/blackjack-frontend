import React, { useState } from 'react';
import { AppProvider } from '@toolpad/core';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { NAVIGATION, demoTheme, useRouter } from '../config/config';
import PageContent from './components/PageContent';
import useCustomPath from 'src/components/hooks/useCustomPath';

const Dashboard: React.FC = () => {
    const router = useRouter('/blackjack');
    const [playingDeck, setPlayingDeck] = useState<number>(Number(process.env.REACT_APP_PLAYING_DECK) || 1);
  
    return (
        <AppProvider
            navigation={NAVIGATION}
            router={router}
            theme={demoTheme}
            branding={{
                logo: <img src="" alt="Logo" />,
                title: 'JP21',
            }}
        >
            <DashboardLayout>
                <PageContent 
                    pathname={router.pathname} // Use pathname from custom hook
                    playingDeck={playingDeck} 
                    setPlayingDeck={setPlayingDeck} 
                />
            </DashboardLayout>
        </AppProvider>
    );
};

export default Dashboard;
