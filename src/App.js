import React, { Component } from 'react';

import Search from './components/Search/Search';
import VenuesTable from './components/DataTable/VenuesTable';
import ErrorHandling from './hoc/ErrorHandling';

class App extends Component {

  state = {
    venues: [],
    searchLoc: '',
    errorLoading: null,
    newUser: '',
    participantsVotes: [],
    loading: false
  };
  updateSearchLoc = (searchLoc) => {
    this.setState({ searchLoc: searchLoc });
  }

  fetchAvenues = async () => {
    try {
      const baseURL = 'https://api.foursquare.com/v2/';
      const endpoint = 'venues/explore';
      const loc = this.state.searchLoc;
      const params = `?client_id=${process.env.REACT_APP_LUNCH_PLACE_API_KEY}&client_secret=${process.env.REACT_APP_LUNCH_PLACE_API_KEY_SECRET}&query=lunch&near=${loc}&v=20190816&limit=3`;
      console.log('I will fetch the data from', baseURL + endpoint + params);
      const response = await fetch(baseURL + endpoint + params, { method: 'GET' });
      const data = await response.json();
      if (data.meta.code !== 200) {
        this.showError(data.meta.errorDetail);
      }
      else {
        const venuesIDs = data.response.groups[0].items.map((v) => {
          return v.venue.id;
        });
        const allVenuesDetails = await Promise.all(
          venuesIDs.map(
            async (id) => {
              let s = await fetch(`https://api.foursquare.com/v2/venues/${id}?v=20190816&client_id=${process.env.REACT_APP_LUNCH_PLACE_API_KEY}&client_secret=${process.env.REACT_APP_LUNCH_PLACE_API_KEY_SECRET}`, { method: 'GET' })
              let result = await s.json();
              if (result.meta.code !== 200) {
                //return;
                throw (new Error(result.meta.errorDetail));
              }
              return result;
            })
        );
        const venuesDetails = allVenuesDetails.map((venueDetails) => {
          return {
            name: venueDetails.response.venue.name,
            category: venueDetails.response.venue.categories[0].name,
            url: venueDetails.response.venue.url,
            rating: venueDetails.response.venue.rating,
            clicked: false
          }
        });
        this.setState({ venues: venuesDetails })
      }
    }
    catch (err) { console.error(err) };
  }
  showError = (errorMessage) => {
    this.setState({ errorLoading: errorMessage });
  }
  clearAllStates = () => {
    this.setState({
      venues: [],
      searchLoc: '',
      errorLoading: null,
      newUser: '',
      participantsVotes: [],
      loading: false
    });
  }
  searchHandler = () => {
    this.clearAllStates();
    if (this.state.searchLoc != '') {
      this.setState({loading: true });
      this.fetchAvenues();
      this.setState({loading: false });
    }
  }
  updateUserHandler = (updatedUser) => {
    this.setState({ newUser: updatedUser })
  }
  updateVotesHandler = (key) => {
    if (this.state.newUser != '') {
      let venuesList = [...this.state.venues];
      venuesList[key].clicked = true;
      this.setState({ venues: venuesList });
      let usersList = [...this.state.participantsVotes];
      usersList.push({ name: this.state.newUser, userVote: key });
      this.setState({ participantsVotes: usersList, newUser: '' });
      console.log(key);
    }
  }
  render() {
    if (this.state.errorLoading) {
      return (
        <React.Fragment>
          <Search updateLoc={this.updateSearchLoc} search={this.searchHandler} />
          <div>Error Occured please try again!</div>
        </React.Fragment>
        );
    }
    if (this.state.loading) {
      return (
        <React.Fragment>
          <Search updateLoc={this.updateSearchLoc} search={this.searchHandler} />
          <h2>Loading....</h2>
        </React.Fragment>
      );
    }
    if (this.state.venues.length === 0) {
      return (
        <React.Fragment>
          <Search updateLoc={this.updateSearchLoc} search={this.searchHandler} />
          <h2>Enter a value in the searchbox to find venues for lunch!</h2>
        </React.Fragment>);
    }
    return (
      <div>
        <h2>Lunchplace</h2>
        <Search updateLoc={this.updateSearchLoc} search={this.searchHandler} />
        <VenuesTable
          participants={this.state.participantsVotes}
          venues={this.state.venues}
          updateVotes={this.updateVotesHandler}
          newUser={this.state.newUser}
          updateUser={this.updateUserHandler} />
      </div>
    );
  }
}

export default App;
