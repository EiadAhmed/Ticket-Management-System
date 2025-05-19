import {
    Box,
    Button,
    Card,
    Container,
    Typography,
    TextField,
    RadioGroup,
    FormControlLabel,
    Radio,
    FormControl,
    FormLabel,
  } from "@mui/material";
  import React from "react";
  import Loader from "./LoadingSpinner";
  import { useNavigate } from "react-router";
  import { useEffect, useState, useContext } from "react";
  import Cookies from "universal-cookie";
  import { DomainContext } from "../DomainContext";
  import { useTheme, useMediaQuery } from "@mui/material";
  import { AuthenticationContext } from "../AuthenticationContext";
  import Logout from './logout';
//   import { ReactMultiEmail } from "react-multi-email";
//   import "react-multi-email/dist/style.css";
  // import edit from "../assets/edit.png";
  // import add from "../assets/add.png";
  // import cost from "../assets/cost.png";
  
  
  function TicketsPage() {
    const [ticketName, setTicketName] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("medium");
    const [loading, setLoading] = useState(false);
    const [tickets, setTickets] = useState([]);
    const [count, setCount] = useState(0);

    const cookies = new Cookies();
    const checkExpiry = useContext(AuthenticationContext);
    const DOMAIN = useContext(DomainContext);
    const navigator = useNavigate();
  
    let Token = cookies.get("Token");

    useEffect(() => {
      if (checkExpiry()) {
        (async () => {
          try {
            setLoading(true);
            const res = await fetch("http://localhost:8000/api/tickets/", {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Token ${Token}`
              }
            });
            setLoading(false);
            const result = await res.json();
            setTickets(result);
            console.log(result);
            if (!res.ok) {
              throw { response: { data: result } };
            }
          } catch(error) {
            console.log(error);
          }
        })();   
      }
    }, [checkExpiry,count,Token]);
  
    if (loading) return <Loader />;

    const handleSubmit = async() => {
      // Handle ticket submission here

    try {
      const res = await fetch("http://localhost:8000/api/tickets/", {
        method: 'POST',
        body: JSON.stringify({
            title: ticketName,
            description: description,
            priority: priority
        }),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Token ${Token}`
        }
      });
      setLoading(false);
      const result = await res.json();
      console.log(result);
      if (!res.ok) {
        throw { response: { data: result } };

      }
      setCount(count + 1);
      setTicketName("");
      setDescription("");
      setPriority("medium");
     } catch(error) {
      console.log(error);
    }
      console.log({ ticketName, description, priority });
    };

    return (
        <>
        
        <Logout />

        <Container sx={{ display: "flex", justifyContent: "space-between",height: "100% !important", 
             flexDirection: {xs: "column", sm: "row"} , alignItems: "center", width: "100%" }}>
   
     <Box sx={{ pt: 15, width:{sm:"60%"}  , minWidth: "300px"}}>
        <Typography variant="h5" sx={{  textAlign: "center", fontWeight: "500" }}>Your Tickets</Typography>
        <Box sx={{ 
          maxHeight: "85vh !important",  
          minHeight: "85vh !important",  

          overflow: "auto",
          "&::-webkit-scrollbar": {
            width: "8px",
            backgroundColor: "#f5f5f5"
          },
          "&::-webkit-scrollbar-thumb": {
            borderRadius: "4px",
            backgroundColor: "#888"
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "transparent"
          },
          msOverflowStyle: "none",  // IE and Edge
          scrollbarWidth: "thin",    // Firefox
        }}>  
    {tickets.length === 0 ? (
        <Typography variant="h5" sx={{ mb: 4, textAlign: "center", fontWeight: "500" ,mt:"100px"  }}>No tickets found</Typography>
    ) : (
        tickets.map((ticket) => (
            <Card key={ticket.id} sx={{ m:5, pt: 2, pb: 2, pl: 2, pr: 2, borderRadius: 2,
             boxShadow: 3 }} onClick={() => navigator(`/tickets/${ticket.id}`)}>
                <Box sx={{ display: 'flex', flexDirection: 'column', p: 2, height: '100%' }}>
                    <Typography variant="h5" sx={{ fontWeight: 500, textAlign: "left" }}>{ticket.title}</Typography>
                    <Typography variant="body1" sx={{ minHeight: "100px", my: 2, flex: 1 }}>{ticket.description}</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 'auto' }}>
                        <Typography variant="body2" sx={{
                            backgroundColor: ticket.priority === 'high' ? '#ffebee' : 
                                          ticket.priority === 'medium' ? '#fff3e0' : '#e8f5e9',
                            px: 2,
                            py: 0.5,
                            borderRadius: 1,
                   
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
                </Box>
            </Card>
      ))
    )}
</Box>

        </Box>

      <Box width={{xs:"100%", sm:"40% !important", pt:0}} height="100% !important">
      <Typography variant="h5" sx={{ mb: 4,paddingBottom:5, textAlign: "center", fontWeight: "500" }}>
            Create New Ticket
          </Typography>
        <Card sx={{ p: 4, mt: 4,pt:0 }}>


          <FormControl fullWidth sx={{ mb: 3 }}>
            <TextField
              label="Ticket Name"
              variant="outlined"
              value={ticketName}
              onChange={(e) => setTicketName(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
            />

            <TextField
              label="Description"
              variant="outlined"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline
              rows={6}
              fullWidth
              sx={{ mb: 3 }}
            />

            <FormLabel sx={{ mb: 1 }}>Priority Level</FormLabel>
            <RadioGroup
              row
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              sx={{
                mb: 3,
                justifyContent: "space-between",
                '& .MuiFormControlLabel-root': {
                  flex: 1,
                  margin: 0,
                }
              }}
            >
              <FormControlLabel 
                value="low" 
                control={<Radio />} 
                label="Low"
                sx={{ 
                  backgroundColor: '#e8f5e9',
                  borderRadius: 1,
                  mx: 1,
                  '&:first-of-type': { ml: 0 },
                }} 
              />
              <FormControlLabel 
                value="medium" 
                control={<Radio />} 
                label="Medium"
                sx={{ 
                  backgroundColor: '#fff3e0',
                  borderRadius: 1,
                  mx: 1,
                }} 
              />
              <FormControlLabel 
                value="high" 
                control={<Radio />} 
                label="High"
                sx={{ 
                  backgroundColor: '#ffebee',
                  borderRadius: 1,
                  mx: 1,
                  '&:last-child': { mr: 0 },
                }} 
              />
            </RadioGroup>

            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{

                backgroundColor: "rgb(8, 141, 110)",
                "&:hover": {
                    backgroundColor: "rgb(8, 10, 141)",
                },
                py: 1.5,
              }}
            >
              Create Ticket
            </Button>
          </FormControl>
        </Card>
      </Box>
      </Container>
      </>
    );
  }
  export default TicketsPage;
  