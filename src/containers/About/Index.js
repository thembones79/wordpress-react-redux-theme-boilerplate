import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Jumbotron } from 'reactstrap';
import ReactHtmlParser from 'react-html-parser';
import mapDispatchToProps from '../../actions';
import Head from '../../components/Head';

class About extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    const { fetchPage } = this.props;

    fetchPage('about');
  }
  handleHeadData(headTitle) {
    const title = `${headTitle} | ${WP_REACT_REDUX.siteName}`;

    return (
      <Head title={title} />
    )
  }
  render() {
    const { page } = this.props;

    return (
      <div>
        {::this.handleHeadData('About')}
        <div className="container">
          <Jumbotron>
            {
              page.data &&
              page.data.map((data, i) =>
                <div key={i}>
                  <h2 className="display-3">
                    {data.title.rendered}
                  </h2>
                  <hr className="my-2" />
                  {ReactHtmlParser(data.content.rendered)}
                </div>
              )
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
  mapStateToProps,
  mapDispatchToProps
)(About);
