import React from 'react';
import { Container, Message, Icon } from 'semantic-ui-react';
import { useTranslation } from "react-i18next";

const Loader = () => {
  const { t } = useTranslation();
  return (
    <Container>
      <Message icon size="big">
        <Icon name="circle notched" loading />
        <Message.Content>
          <Message.Header>{t('Loader.titleMessage')}</Message.Header>
          {t('Loader.description')}
        </Message.Content>
      </Message>
    </Container>
  );
};

export default Loader;
