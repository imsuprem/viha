import React from 'react';
import { Container, Segment, Header, Icon } from 'semantic-ui-react';

const Offline = () => {
  window.addEventListener('online', () => window.location.reload());

  return (
    <Container>
      <Segment placeholder>
        <Header icon>
          <Icon name="unlink" />
          <h1>Offline</h1>
          <p>
          कोई इंटरनेट कनेक्शन नहीं है। हम स्वचालित रूप से पुनः लोड करने का प्रयास करेंगे
            एक बार आप ऑनलाइन वापस आ गए!{' '}
            <span role="img" aria-label="signal">
              📶
            </span>
          </p>
        </Header>
      </Segment>
    </Container>
  );
};

export default Offline;
