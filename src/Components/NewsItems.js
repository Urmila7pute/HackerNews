import React, { Component } from 'react';
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
        return (
            <div>
                <b>{row.title}</b>
                {row.url &&
                    <span>
                        (<a href={row.url} >{row.url.split("/")[2]}</a>)
                            </span>
                }
                by <b>{row.author}</b>
                <span>
                    {moment(row.created_at, "YYYYMMDD").fromNow()}
                    <span onClick={() => hideNews(row)}> [hide] </span>
                </span>

            </div>
        );
    }
}

export default NewsItems;
