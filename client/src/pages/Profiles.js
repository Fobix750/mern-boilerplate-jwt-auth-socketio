import React, { Component } from 'react';
class profiles extends Component {
  state = { profiles: null };
  componentDidMount() {
    this.fetchprofiles();
  }
  fetchprofiles = async () => {
    const data = await fetch(
      'https://json-placeholder-api.now.sh/api/profiles'
    );
    const fetchedprofiles = await data.json();
    this.setState({ profiles: fetchedprofiles.default.profiles });
  };
  render() {
    return (
      <React.Fragment>
        {!this.state.profiles ? (
          <h3>Loading...</h3>
        ) : (
          this.state.profiles.map((profile) => (
            <h3 key={profile.name}>
              {profile.name} - {profile.username} - {profile.email}
            </h3>
          ))
        )}
      </React.Fragment>
    );
  }
}

export default profiles;
