import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Jumbotron } from 'reactstrap';
import ReactHtmlParser, { 
  processNodes, 
  convertNodeToElement, 
  htmlparser2 
} from 'react-html-parser';
import { fetchPage } from '../../actions/page';
import Head from '../../components/Head';

class Home extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.props.dispatch(fetchPage('home'));
  }
  render() {
    const { page } = this.props;
    const title = `${WP_REACT_REDUX.siteName} | ${WP_REACT_REDUX.siteDescription}`;

    return (
      <div>
        <Head title={title} />
        <div className="container">
          <Jumbotron>
            {
              page.data.length
                ?
                page.data.map((data, i) =>
                  <div key={i}>
                    <h2 className="display-3">
                      {data.title.rendered}
                    </h2>
                    <hr className="my-2" />
                    {ReactHtmlParser(data.content.rendered)}
                  </div>
                )
                : ''
            }
          </Jumbotron>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    page: state.page
  }
}

export default connect(
  mapStateToProps
)(Home);
