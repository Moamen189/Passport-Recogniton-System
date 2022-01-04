import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import Box from '@mui/material/Box';
import "./Table.css"
// import jwtDecode from 'jwt-decode'
export default function PassportTable() {
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    // let navigate = useNavigate();


    const [passportsList, setPassportsList] = useState([])

    const [filteredPassports, setFilteredPassports] = useState([])
    const [searchValue, setSearchValue] = useState('');
    let counter = 1;

    useEffect(() => {
        fetchData();
    }, [])

    // useEffect to handle search in the table
    useEffect(() => {
        const copyPassports = [...passportsList];
        const result = copyPassports.filter(passport =>
            passport.Name.toLowerCase().includes(searchValue.toLowerCase()) || passport.Sex.toLowerCase().includes(searchValue.toLowerCase()) || passport.Nationality.toLowerCase().includes(searchValue.toLowerCase()) || passport.Number.toLowerCase().includes(searchValue.toLowerCase())
        );
        setFilteredPassports(result);
    }, [passportsList, searchValue])


    // useEffect(() => {

    //     if (localStorage.getItem('token')) {

    //         const token = localStorage.getItem('token')
    //         const decoded = jwtDecode(token)

    //         const exp_date = new Date(decoded.exp * 1000);
    //         const now_date = new Date();

    //         console.log(decoded.exp)

    //         if (!decoded.role) {
    //             localStorage.clear()
    //             navigate('/login')
    //         } else {
    //             if (exp_date < now_date) {
    //                 localStorage.clear()
    //                 navigate('/login')
    //             }
    //         }

    //     }
    // }, [navigate])

    // func to handle fetching passports in the table
    const fetchData = async () => {
        await axios.get(
            'http://127.0.0.1:5000/api/admin/passports/',
            {
                headers: {
                    "access-token": localStorage.getItem('token')
                }
            }).then(data => {
                console.log(data)

                setPassportsList(data.data);

            })
    }

    const handleDate = (date) => {
        const stringDate = date.toString();

        const year = stringDate.slice(0, 2)
        let y = '19';

        if (year > 30) {
            y += year
        } else if (year < 30) {
            y = '20' + year;
        } else {
            y = ''
        }

        const m = stringDate.slice(2, 4)
        const d = stringDate.slice(4, 6)
        return (`${d}/${m}/${y}`);
    }

    const handleChange = event => {
        setSearchValue(event.target.value);
    };


    const handleAll = () => {
        fetchData()
    }

    const handleWhiteList = async () => {

        await axios.get(
            'http://127.0.0.1:5000/api/admin/passports/',
            {
                headers: {
                    "access-token": localStorage.getItem('token')
                }
            }).then(data => {

                const res_data = data.data;
                const whiteList = res_data.filter(passport => passport.Status === true)

                setPassportsList(whiteList);

            })

    }


    const handleBlackList = async () => {

        await axios.get(
            'http://127.0.0.1:5000/api/admin/passports/',
            {
                headers: {
                    "access-token": localStorage.getItem('token')
                }
            }).then(data => {

                const res_data = data.data;
                const blackList = res_data.filter(passport => passport.Status === false)

                setPassportsList(blackList);

            })
    }


    // handle problem if the valid is false 
    const handleProblem = (passProblem) => {

        if (passProblem === '0') {
            return ''
        } else if (passProblem === '1') {
            return "Invalid date of birth"
        } else if (passProblem === '2') {
            return "Passport has Expired"
        } else if (passProblem === '3') {
            return "Invalid date of birth and Passport has Expired"
        } else if (passProblem === '4') {
            return "Invalid passport number"
        } else if (passProblem === '6') {
            return "Passport has Expired and Invalid passport number"
        } else {
            return "Passport has Expired, Invalid date of birth and Invalid passport number"
        }

    }


    const handleDelete = id => {

        // const id = e.target.id;
        // console.log(id)
        let url = `http://127.0.0.1:5000/api/admin/passports/${id}`;
        console.log(url)

        axios.delete(url
            ,
            {
                headers: {
                    "access-token": localStorage.getItem('token')
                }
            })
            .then(
                window.location.reload()
            )
            .catch(err => {
                // alert('err ', err)
            })


    }

    const handleReload = () => {
        window.location.reload()
    }
    return (
        <div className='mx-auto my-4 container'>
            <div className="input-group my-2 ">
                <span className='input-group-text bg-white border border-primary'>
                    <i className="fas fa-search text-primary"></i>
                </span>

                <input style={{ backgroundColor: 'rgba(255, 255, 255 ,0.05 )', color: '#1976d2', border: "1px solid rgba(25, 118, 210, 0.5)" }} id="SearchPlaceHolder" className="" type="text" placeholder="Search for any passport name, gender, country or passport number" value={searchValue} onChange={handleChange} className="form-control" aria-label="" aria-describedby="basic-addon1" />

                <ButtonGroup variant="outlined" aria-label="outlined button group">
                    <Button sx={{ fontWeight: 'bold' }} onClick={handleReload}><i className="fas fa-sync-alt"></i></Button>
                    <Button sx={{ fontWeight: 'bold' }} onClick={handleAll}>All</Button>
                    <Button sx={{ fontWeight: 'bold' }} onClick={handleWhiteList}>White List</Button>
                    <Button sx={{ fontWeight: 'bold' }} onClick={handleBlackList}>Black List</Button>
                </ButtonGroup>


            </div>
            <TableContainer >
                <Table sx={{ minWidth: 700, }} aria-label="customized table ">
                    <TableHead >
                        <TableRow sx={{ bgcolor: '#1976d2' }} >
                            <StyledTableCell style={{ backgroundColor: 'rgb(0 9 141 / 60%)' }}>#</StyledTableCell>
                            <StyledTableCell style={{ backgroundColor: 'rgb(0 9 141 / 60%)' }} align="" >Name</StyledTableCell>
                            <StyledTableCell style={{ backgroundColor: 'rgb(0 9 141 / 60%)' }} align="right">Sex</StyledTableCell>
                            <StyledTableCell style={{ backgroundColor: 'rgb(0 9 141 / 60%)' }} align="right">Nationality</StyledTableCell>
                            <StyledTableCell style={{ backgroundColor: 'rgb(0 9 141 / 60%)' }} align="right">Date Of Birth</StyledTableCell>
                            <StyledTableCell style={{ backgroundColor: 'rgb(0 9 141 / 60%)' }} align="right">Expiration Date</StyledTableCell>
                            <StyledTableCell style={{ backgroundColor: 'rgb(0 9 141 / 60%)' }} align="right">Number</StyledTableCell>
                            <StyledTableCell style={{ backgroundColor: 'rgb(0 9 141 / 60%)' }} align="right">Valid</StyledTableCell>
                            <StyledTableCell style={{ backgroundColor: 'rgb(0 9 141 / 60%)' }} align="right">Problem</StyledTableCell>
                            <StyledTableCell style={{ backgroundColor: 'rgb(0 9 141 / 60%)' }} align="right">Delete</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            searchValue === '' ? (
                                passportsList.map(passport => (
                                    <StyledTableRow >
                                        <StyledTableCell component="th" scope="row">{counter++}</StyledTableCell>
                                        <StyledTableCell>{passport.Name + ' ' + passport.Surname}</StyledTableCell>
                                        <StyledTableCell>{passport.Sex}</StyledTableCell> {/* === 'M' ? 'Male' : 'Female' */}
                                        <StyledTableCell>{passport.Nationality}</StyledTableCell>
                                        <StyledTableCell>{handleDate(passport.DateOfBirth)}</StyledTableCell>
                                        <StyledTableCell>{handleDate(passport.ExpirationDate)}</StyledTableCell>
                                        <StyledTableCell>{passport.Number}</StyledTableCell>
                                        <StyledTableCell>{passport.Status ? <i className="fas fa-check-circle text-success"></i> : <i className="fas fa-times-circle text-danger"></i>}</StyledTableCell>
                                        <StyledTableCell>
                                            {
                                                handleProblem(passport.Problem)
                                            }
                                        </StyledTableCell>
                                        <StyledTableCell><button className='btn' onClick={() => handleDelete(passport.Number)}><i className="fas fa-trash-alt text-danger"></i></button></StyledTableCell>
                                    </StyledTableRow>

                                ))) : (
                                filteredPassports.map(passport => (
                                    <StyledTableRow key={passport.id}>
                                        <StyledTableCell component="th" scope="row">{counter++}</StyledTableCell>
                                        <StyledTableCell>{passport.Name + ' ' + passport.Surname}</StyledTableCell>
                                        <StyledTableCell>{passport.Sex}</StyledTableCell> {/* === 'M' ? 'Male' : 'Female' */}
                                        <StyledTableCell>{passport.Nationality}</StyledTableCell>
                                        <StyledTableCell>{handleDate(passport.DateOfBirth)}</StyledTableCell>
                                        <StyledTableCell>{handleDate(passport.ExpirationDate)}</StyledTableCell>
                                        <StyledTableCell>{passport.Number}</StyledTableCell>
                                        <StyledTableCell>{passport.Status ? <i className="fas fa-check-circle text-success"></i> : <i className="fas fa-times-circle text-danger"></i>}</StyledTableCell>
                                        <StyledTableCell>
                                            {
                                                handleProblem(passport.Problem)
                                            }
                                        </StyledTableCell>
                                        <StyledTableCell><button className='btn' id={passport.id} onClick={() => handleDelete(passport.Number)}><i className="fas fa-trash-alt text-danger"></i></button></StyledTableCell>
                                    </StyledTableRow>
                                ))
                            )
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <div className="container">
                {
                    passportsList < 1 ? (
                        <h4 className="text-center mt-4">
                            There is no passports yet.
                        </h4>
                    ) : null
                }
            </div>

        </div>
    )
}











// <TableContainer component={Paper}>
//       <Table sx={{ minWidth: 700 }} aria-label="customized table">
//         <TableHead>
//           <TableRow>
//             <StyledTableCell>Dessert (100g serving)</StyledTableCell>
//             <StyledTableCell align="right">Calories</StyledTableCell>
//             <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
//             <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
//             <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rows.map((row) => (
//             <StyledTableRow key={row.name}>
//               <StyledTableCell component="th" scope="row">
//                 {row.name}
//               </StyledTableCell>
//               <StyledTableCell align="right">{row.calories}</StyledTableCell>
//               <StyledTableCell align="right">{row.fat}</StyledTableCell>
//               <StyledTableCell align="right">{row.carbs}</StyledTableCell>
//               <StyledTableCell align="right">{row.protein}</StyledTableCell>
//             </StyledTableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>