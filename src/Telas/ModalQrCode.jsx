import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import { Button, Modal } from 'react-bootstrap';
import api from '../services/api'; // Importe sua instância da API aqui
import { FaMobileAlt } from 'react-icons/fa';

const ModalQrCode = () => {
  const [showModal, setShowModal] = useState(false);

  const [apiUrl, setApiUrl] = useState('');
  const [frontUrl, setFrontUrl] = useState('');
  
  const buscaIpAdress = async () => {
    try {
      const res = await api.get('/api/getIpAddress');
      const ipAddress = res.data.ipAddress;
      const urlFront = `${ipAddress}:3000/login`;
      const urlApi = `${ipAddress}:8800`;
      setFrontUrl(urlFront);
      setApiUrl(urlApi);
      setShowModal(true);
    } catch (error) {
      console.error(error);
    }
  };

  // console.log('urlApi', apiUrl)
  // console.log('urlFront',frontUrl)

  const handleClose = () => setShowModal(false);

  return (
    <div>
      <Button onClick={buscaIpAdress} className={'d-flex'}><FaMobileAlt/></Button>

      <Modal show={showModal} onHide={handleClose} className={'d-flex'}>
        <Modal.Header closeButton>
          <Modal.Title>Acesso Mobile</Modal.Title>
        </Modal.Header>
        <Modal.Body className={'d-flex align-items-center justify-content-center'}>
          {frontUrl && <QRCode value={frontUrl} />}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalQrCode;
