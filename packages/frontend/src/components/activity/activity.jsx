import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

import './activity.scss';
import { GET_USER_ACTIVITIES } from '../../graphql/queries';
import Loader from '../loader';
import Error from '../error';
import NoContent from '../noContent';
import Pagination from '../pagination';
import { formatTime } from '../../utils';

export class Activity extends Component {
  state = {
    page: 1,
  }

  setPageNumber = (pageNumber) => {
    this.setState({
      page: pageNumber,
    });
  };

  render() {
    const { currentUser } = this.props;
    const { page } = this.state;
    const renderContent = (activities) => (
      activities.map((activity) => (
        <tr className="user-activity" key={activity.id}>
          <td>
            <span className="activity-name">{activity.name}</span>
            <span className="item-name">{activity.item.name}</span>
          </td>
          <td>{activity.item.value}</td>
          <td>{activity.user.firstName}</td>
          <td>{formatTime(activity.createdAt)}</td>
        </tr>
      ))
    );

    return (
      <Query query={GET_USER_ACTIVITIES} variables={{ userId: currentUser.id }}>
        {({ loading, error, data }) => {
          const { results, pageInfo } = data ? data.getUserActivities : {};
          if (loading) return <Loader />;
          if (error) return <Error message="An error occurred" />;

          return (
            <div className="activity-page-wrapper">
              <p className="activity-area__title">
                <span className="title-main">My Activities</span>
                <span className="title-sub">List of activities</span>
              </p>
              {
                results.length < 1
                  ? <NoContent />
                  : (
                    <>
                      <table className="table is-fullwidth">
                        <thead>
                          <tr>
                            <th>Activity</th>
                            <th>Value</th>
                            <th>User</th>
                            <th>Time</th>
                          </tr>
                        </thead>
                        <tbody>
                          {renderContent(results)}
                        </tbody>
                      </table>
                      <div className="pagination-area">
                        <Pagination
                          totalPages={pageInfo.pages}
                          hasNext={pageInfo.hasNextPage}
                          handleData={this.setPageNumber}
                          hasPrevious={pageInfo.hasPrevPage}
                          isFetching={loading}
                          currentPage={page}
                        />
                      </div>
                    </>
                  )
              }
            </div>
          );
        }}
      </Query>
    );
  }
}

Activity.propTypes = {
  currentUser: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ])).isRequired,
};
const mapStateToProps = (state) => {
  const { currentUser } = state.global;
  return { currentUser };
};
const ConnectedActivity = connect(mapStateToProps)(Activity);
export default ConnectedActivity;
