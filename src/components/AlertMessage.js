import React from 'react';
import { Alert } from 'react-bootstrap'

function AlertMessage({tradeAlert, setTradeAlert}) {  
    if (tradeAlert) {
        return (
        <Alert variant="primary" onClose={() => setTradeAlert('')} dismissible>
          <p>
            {tradeAlert}
          </p>
        </Alert>
      );
    }
    return null;
}
export default AlertMessage;