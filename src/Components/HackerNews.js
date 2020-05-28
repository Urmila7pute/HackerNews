import React, { Component } from 'react';
import { AllStories } from '../Services/HackerNewsAPI';
import NewsItems from './NewsItems';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import moment from 'moment'
import Button from '@material-ui/core/Button';
import Chart from 'chart.js';
import LineChart from './LineChart';


const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: "#d35400",
        color: theme.palette.common.white,
        padding:2,
        fontSize:12,
    },
    body: {
        fontSize: 14,
        padding: 4
    },
    sizeSmall: {
        size: "small"
    }
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    }
}))(TableRow);

class hackerNews extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            AllNews: [],
        }
    }
    componentDidMount() {
        const { page } = this.state;
        this.fetchData(page);
    }

    fetchData = async (page) => {
        try {
            const response = await AllStories(page);
            const AllNews = response.data.hits;
            this.setState({ AllNews, page })
        } catch (error) {
            console.log("error", error);
        }
    }

    hideNews =  row => {
        const { AllNews } = this.state;
        row.isHide = 1;
        localStorage.setItem(`${row.objectID}`, JSON.stringify(row))
        this.setState({ AllNews })
    }

    UpVoteNews = (index, row) => {
        const { AllNews } = this.state;
        const points = localStorage.getItem(row.objectID) ?
            JSON.parse(localStorage.getItem(row.objectID)).points :
            row.points
        row.points = points + 1;
        localStorage.setItem(`${row.objectID}`, JSON.stringify(row));
        this.setState({ AllNews })
    }

    ChangePage = (value) => {
        let { page } = this.state;
        if (value === "next") {
            page++;
        } else { page--; }
        this.fetchData(page);
    }


    render() {
        const { AllNews, page } = this.state;
        const classes = makeStyles({
            table: {
                minWidth: 700,
            },
            tableRow: {
                padding: 4
            },
        });
        let chartData = {};
        chartData.labels = AllNews.map(items => items.objectID)
        chartData.value = AllNews.map(items =>
            localStorage.getItem(items.objectID) ?
                JSON.parse(localStorage.getItem(items.objectID)).points :
                items.points
        );

        return (
            <>
                <TableContainer component={Paper} >
                    <Table className={classes.table}
                        aria-label="customized table">
                        <TableHead >
                            <TableRow >
                                <StyledTableCell>Comments</StyledTableCell>
                                <StyledTableCell >Vote Count</StyledTableCell>
                                <StyledTableCell >Up Vote</StyledTableCell>
                                <StyledTableCell >News Details</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody >
                            {AllNews.map((row, id) => (
                                localStorage.getItem(row.objectID) &&
                                    (JSON.parse(localStorage.getItem(row.objectID)).isHide)
                                    ? <div />
                                    // tm
                                    : (<StyledTableRow key={row.objectID}   >
                                        <StyledTableCell > {row.num_comments} </StyledTableCell>
                                        <StyledTableCell component="th" scope="row">
                                            {localStorage.getItem(row.objectID) ?
                                                JSON.parse(localStorage.getItem(row.objectID)).points :
                                                row.points
                                            }
                                        </StyledTableCell>
                                        <StyledTableCell ><ArrowDropUpIcon style={{cursor: "pointer"}} onClick={() => this.UpVoteNews(id, row)} /></StyledTableCell>
                                        <StyledTableCell >
                                            <NewsItems row={row} hideNews={this.hideNews}></NewsItems>
                                        </StyledTableCell>
                                    </StyledTableRow>)
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer >
                {page !== 0 && <Button size="small" onClick={() => this.ChangePage("prev")}>
                    prev
          </Button>}
                <Button size="small" onClick={() => this.ChangePage("next")} style={button} >
                    next
          </Button>
                {chartData.labels.length && <LineChart chartData={chartData} />}
            </>

        );
    }
}

export default hackerNews;
