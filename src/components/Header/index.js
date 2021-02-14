import React, { useState } from 'react';
import { Menu, Button} from 'semantic-ui-react';
import LanguageSelect from "../LanguageSelect";
import { useTranslation } from "react-i18next";

const Header = () => {
  const [promptEvent, setPromptEvent] = useState(null);
  const [appAccepted, setAppAccepted] = useState(false);

  let isAppInstalled = false;
  const { t } = useTranslation();

  if (window.matchMedia('(display-mode: standalone)').matches || appAccepted) {
    isAppInstalled = true;
  }

  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    setPromptEvent(e);
  });

  const installApp = () => {
    promptEvent.prompt();
    promptEvent.userChoice.then(result => {
      if (result.outcome === 'accepted') {
        setAppAccepted(true);
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
    });
  };

  return (
    <Menu stackable inverted size="massive">
      <Menu.Item header>
        <a href="/"><h1 style={{ color: '#2185D0' }}>{t('title')}</h1>
        <sup> {t('tagLine')}</sup></a>
      </Menu.Item>
    
      
      {promptEvent && !isAppInstalled && (
        <Menu.Item position="right">
          <Button
            color="teal"
            icon="cloud download"
            labelPosition="left"
            content="Install App"
            onClick={installApp}
          />
        </Menu.Item>
      )}

    <Menu.Item position = "right">
     
     <LanguageSelect />

   </Menu.Item>
    </Menu>
  );
};

export default Header;
