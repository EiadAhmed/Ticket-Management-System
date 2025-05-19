import React, { useEffect, useState, useContext, memo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Card,
  TextField,
  Button,
} from '@mui/material';
import Cookies from "universal-cookie";
import { AuthenticationContext } from "../AuthenticationContext";
import Loader from "./LoadingSpinner";
import Logout from './logout';

// Then in your component:


// Helper function to get second word
const getOwner = (str) => {
  const words = str.split(' ');
  return words.length > 1 ? words[1] : '';
};

// Separate MessageInput component
const MessageInput = memo(({ onSendMessage }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;
    onSendMessage(message);
    setMessage("");
  };

  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <TextField
        fullWidth
        multiline
        rows={2}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
      />
      <Button 
        variant="contained" 
        onClick={handleSend}
        sx={{
          backgroundColor: "rgb(8, 141, 110)",
          "&:hover": {
            backgroundColor: "rgb(8, 10, 141)",
          }
        }}
      >
        Send
      </Button>
    </Box>
  );
});

// Ticket Messages List component
const TicketMessages = memo(({ messages }) => (
  <Box sx={{ mb: 4 }}>
    <Typography variant="h6" sx={{ mb: 2 }}>Messages</Typography>
    {messages.map((message) => (
      <Card key={message.id} sx={{ 
        mb: 2, 
        p: 2,
        width: '96%',
        height: 'auto',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <Typography 
          variant="body1" 
          sx={{ 
            wordBreak: 'break-word',
            whiteSpace: 'pre-wrap'
          }}
        >
          {message.content}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography 
            variant="caption" 
            color="text.secondary"
          sx={{ 
            fontSize: '12px',
            mt: 1,
            alignSelf: 'flex-start'
          }}
        >
          {getOwner(message.owner)}
        </Typography>
          <Typography 

            variant="caption" 
            color="text.secondary"
          sx={{ 
            fontSize: '12px',
            mt: 1,
            alignSelf: 'flex-end'
          }}
        >
          {new Date(message.created_at).toLocaleString()}
        </Typography>
        </Box>
      </Card>
    ))}
  </Box>
));

function Ticket() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const cookies = new Cookies();
  const Token = cookies.get("Token");
  const checkExpiry = useContext(AuthenticationContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (checkExpiry()) {
      fetchTickets();
    }
  }, []);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const ticketRes = await fetch(`http://localhost:8000/api/tickets/${id}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Token ${Token}`
        }
      });
      
      const ticketData = await ticketRes.json();
      setTicket(ticketData);
      setLoading(false);
      console.log(ticketData);
    } catch (error) {
      console.error(error);
      navigate('/tickets');
    }
  };
  
  const handleSendMessage = async (messageContent) => {
    try {
      const messagesRes = await fetch(`http://localhost:8000/api/messages/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Token ${Token}`
        },
        body: JSON.stringify({
          ticket_id: id,
          content: messageContent
        })
      });

      if (messagesRes.ok) {
        const newMessage = await messagesRes.json();
        setTicket(prevTicket => ({
          ...prevTicket,
          messages: [...prevTicket.messages, newMessage]
        }));
      } else {
        console.error("Error sending message");
      }
    } catch (error) {
      console.error("Error sending message", error);
    }
  };

  if (loading) return <Loader />;
  if (!ticket) return null;

  return (
    <>
    <Logout />
    <Container maxWidth="md" sx={{ py: 4 ,mt:"35px" }}>
   
      <Card sx={{ mb: 4, p: 3 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>{ticket.title}</Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>{ticket.description}</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Typography variant="body2" sx={{
            backgroundColor: ticket.priority === 'high' ? '#ffebee' : 
                          ticket.priority === 'medium' ? '#fff3e0' : '#e8f5e9',
            px: 2,
            py: 0.5,
            borderRadius: 1
          }}>
            {ticket.priority}
          </Typography>
          <Typography variant="body2" sx={{
            backgroundColor: ticket.status === 'open' ? '#e8f5e9' : '#ffebee',
            color: ticket.status === 'open' ? '#2e7d32' : '#d32f2f',
            px: 2,
            py: 0.5,
            borderRadius: 1
          }}>
            {ticket.status}
          </Typography>
        </Box>
      </Card>

      <TicketMessages messages={ticket.messages} />
      <MessageInput onSendMessage={handleSendMessage} />
    </Container>
    </>
  );
}

export default Ticket;
  