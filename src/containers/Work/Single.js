import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Jumbotron } from 'reactstrap';
import ReactHtmlParser from 'react-html-parser';
import mapDispatchToProps from '../../actions';
import Head from '../../components/Head';

class WorkSingle extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    const {
      match,
      fetchPost
    } = this.props;

    fetchPost('work', match.params.slug);
  }
  handleHeadData(headTitle) {
    const title = `${headTitle} | Work | ${WP_REACT_REDUX.siteName}`;

    return (
      <Head title={title} />
    )
  }
  render() {
    const { post } = this.props;

    return (
      <div>
        <div className="container">
          <Jumbotron>
            {
              post.data &&
              post.data.map((data, i) =>
                <div key={i}>
                  <h3>Work</h3>
                  <hr className="my-2" />
                  <h2 className="display-3">
                    {data.title.rendered}
                    {::this.handleHeadData(data.title.rendered)}
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
    post: state.post
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkSingle);
