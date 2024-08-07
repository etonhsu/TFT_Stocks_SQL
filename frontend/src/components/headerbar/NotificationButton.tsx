import React, {useState} from 'react';

import {ModalContent, ModalOverlay} from "../../containers/multiUse/StyledComponents.tsx";
import {NotificationIcon, NotificationIcon2} from "../../assets/Icons.tsx";
import styled from "styled-components";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  text: string;
}

export const StyledButton = styled.button`
    display: flex;
    align-items: center; /* Vertically center the children */
    justify-content: center; /* Aligns children (icon and text) to the start of the container */
    font-weight: normal;
    font-size: 16px;
    background: #333; // Use the color from your design
    color: #EAEAEA;
    text-decoration: none;
    border: none; // Remove default button border
    border-radius: 4px;
    width: 65px;
    margin-top: 5px;
    cursor: pointer; // Ensure it's recognizable as a clickable button

    svg {
        height: 25px; /* Adjust height to match your design */
        width: 25px; /* Adjust width to maintain aspect ratio */
    }

    &:hover {
        background: #444; // Slightly lighter color on hover
        color: cornflowerblue;
    }

    &:active {
        background: #555; // An even lighter color for active or focus state
    }

    &:focus {
        outline: none; // Removes the outline to match NavLink behavior
    }
`;

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, text }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
          <p>{text}<br/><br/>- 2 Brain Cell</p>
        <button onClick={onClose}>Close</button>
      </ModalContent>
    </ModalOverlay>
  );
};

const currentNotification = {
  message:  "Hey everyone! Been a little while since I've done an update, but congratulations to ozymandias for winning the first " +
            "Monthly League with a total of $5,489,398.88. Thank you to everyone who continues to use the site, I hope to keep improving " +
            "on it potentially adding prizes for future league winners! I know the transition as a league ends hasn't been the smoothest, " +
            "and that's something I'm hoping to clean up in the future as well.",
  version: 10
};

export const ButtonWithModal: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [notificationAcknowledged, setNotificationAcknowledged] = useState(() => {
    const lastSeenVersion = parseInt(localStorage.getItem('lastSeenNotificationVersion') || '0', 10);
    return lastSeenVersion >= currentNotification.version;
  });

  const handleOpenModal = () => {
    setModalOpen(true);
    setNotificationAcknowledged(true);
    localStorage.setItem('lastSeenNotificationVersion', currentNotification.version.toString());
  };
  const handleCloseModal = () => setModalOpen(false);

  return (
    <>
        <div> {/* Container with specific width */}
            <StyledButton onClick={handleOpenModal}>
                {notificationAcknowledged ? <NotificationIcon /> : <NotificationIcon2 />}
            </StyledButton>
        </div>
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}
               text={currentNotification.message}
        />
    </>
  );
};
