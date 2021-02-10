import React from 'react';
import { Container, Message, Icon } from 'semantic-ui-react';

const Loader = () => {
  return (
    <Container>
      <Message icon size="big">
        <Icon name="circle notched" loading />
        <Message.Content>
          <Message.Header>थोड़ी प्रतीक्षा करें</Message.Header>
          हम हज़ारों प्रश्नों के महासागर से आपके लिए चुनिंदा प्रश्न ले कर आ रहे हैं. 
भयभीत न हों, हम आपको ये अवसर भी देंगे की आप अपने टेस्ट का कठिनाई स्तर भी चुन पाएंगे.
        </Message.Content>
      </Message>
    </Container>
  );
};

export default Loader;
