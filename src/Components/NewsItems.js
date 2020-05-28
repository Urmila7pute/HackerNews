import React, { Component } from 'react';
import {  makeStyles } from '@material-ui/core/styles';

import moment from 'moment'

class NewsItems extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newsId: null
        }
    }
    componentDidMount() {
        const { newsId } = this.props;
        this.setState({ newsId, });
    }

    render() {
        const { row, hideNews } = this.props;
        const an={
            cursor: "pointer", 
             textDecoration:"none",
             color: 'inherit'
        }
        return (
            <div>
                <a style={an} href={row.url}><b>{row.title}</b></a>
                {row.url &&
                    <span>
                        (<a style={an} href={row.url} >{row.url.split("/")[2]}</a>)
                            </span>
                }
                by <b>{row.author}</b>
                <span>
                    {moment(row.created_at, "YYYYMMDD").fromNow()}
                    <span onClick={() => hideNews(row)} style={{cursor: "pointer"}}> [hide] </span>
                </span>

            </div>
        );
    }
}

export default NewsItems;
