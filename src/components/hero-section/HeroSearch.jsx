import {Alert, IconButton, InputAdornment, Snackbar} from "@mui/material";
import location from '../../assets/icons/search-icons/location.svg';
import car from '../../assets/icons/search-icons/car.svg';
import build from '../../assets/icons/search-icons/build.svg';
import {useState} from "react";
import {Add as AddIcon, Remove as RemoveIcon} from '@mui/icons-material';
import {useNavigate} from "react-router-dom";
import StyledTextField from "../customised/StyledTextField";
import StyledButton from "../customised/StyledButton";


function HeroSearch() {
    const [destination, setDestination] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [numberOfRooms, setNumberOfRooms] = useState(1);
    const [snackBarOpen, setSnackBarOpen] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState('');
    const navigate = useNavigate();
    const queryParameter =  new URLSearchParams(window.location.search);

    function handleDestination(e) {
        setDestination(e.target.value);
    }
    function handleCheckIn(e) {
        setCheckIn(e.target.value);
    }
    const handleCheckOut = (e) => {
        setCheckOut(e.target.value);
    };
    const handleAddRooms = () => {
        setNumberOfRooms((prevState) => prevState + 1);
    };
    const handleReduceRooms = () => {
        if (numberOfRooms === 0){
            return
        }
        setNumberOfRooms((prevState) => prevState - 1);
    };
    const handleSearchButtonCLick = () => {
        if (destination && checkIn && checkOut && numberOfRooms) {
            if (new Date(checkIn) > new Date(checkOut)) {
                setSnackBarMessage('Check-out date must be after check-in date');
                setSnackBarOpen(true);
                return;
            }
            let userId = queryParameter.get('clientId');
            let queryString = '';
            if (userId){
                queryString = `?q=${encodeURIComponent(
                    destination
                )}&checkIn=${encodeURIComponent(
                    checkIn
                )}&checkOut=${encodeURIComponent(
                    checkOut
                )}&rooms=${encodeURIComponent(
                    numberOfRooms
                )}&userId=${encodeURIComponent(
                    userId.trim()
                )}
            `;
            }
            else{
                queryString = `?q=${encodeURIComponent(
                    destination
                )}&checkIn=${encodeURIComponent(
                    checkIn
                )}&checkOut=${encodeURIComponent(
                    checkOut
                )}&rooms=${encodeURIComponent(
                    numberOfRooms
                )}
            `;
            }

            navigate(`/hotel-list${queryString}`);
        } else {
            console.log("I am clicked but in else part");
            setSnackBarMessage('Please fill in all fields');
            setSnackBarOpen(true);
        }
    }
    const handleCloseSnackbar = (event, reason) =>{
        if (reason === 'clickaway'){
            return
        }
        setSnackBarOpen(false)
    }

    return (
        <>
            <div className="hero-search-container">
                <h1>Where you want to stay?</h1>
                <div className="hero-search-fields">
                    <StyledTextField
                        className="search-text-field"
                        variant='outlined'
                        label='Enter Destination'
                        id='destination'
                        sx={{width: '260px'}}
                        autoComplete='off'
                        onChange={handleDestination}
                        value={destination}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <img src={location} alt={location}/>
                                </InputAdornment>
                            ),
                        }}
                    >
                    </StyledTextField>
                    <StyledTextField
                        className="search-text-field"
                        type="date"
                        label="Check In"
                        variant="outlined"
                        id="checkIn"
                        value={checkIn}
                        onChange={handleCheckIn}
                        InputLabelProps={{shrink: true}}
                    >
                    </StyledTextField>
                    <StyledTextField
                        className="search-text-field"
                        type="date"
                        label="Check Out"
                        variant="outlined"
                        id="checkOut"
                        value={checkOut}
                        onChange={handleCheckOut}
                        InputLabelProps={{shrink: true}}
                    >
                    </StyledTextField>
                    <StyledTextField
                        value={numberOfRooms}
                        className="search-text-field"
                        label="Rooms"
                        id="noOfRooms"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <img src={car} alt={car}/>
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleAddRooms}>
                                        <AddIcon/>
                                    </IconButton>
                                    <IconButton onClick={handleReduceRooms}>
                                        <RemoveIcon/>
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    >
                    </StyledTextField>
                </div>
            </div>
            <div className="hero-search-button">
                <StyledButton
                    className='search-button'
                    variant="outlined"
                    disableElevation
                    disableRipple
                    onClick={handleSearchButtonCLick}
                    startIcon={<img src={build} alt="Build Icon"/>}
                >
                    Show Places
                </StyledButton>
            </div>
            <Snackbar open={snackBarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="error">{snackBarMessage}</Alert>
            </Snackbar>
        </>
    )
}

export default HeroSearch;