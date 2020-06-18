import React, { Component } from 'react';
import StoryService from '../../services/story-api-service';
import UserContext from '../../contexts/ApiContext';
import './CreateStoryForm.css';

class CreateStoryForm extends Component {
  static contextType = UserContext;
  keywords = [
    'groceries',
    'food offer',
    'rideshare',
    'transportation',
    'moving',
    'clothing',
  ];
  componentDidMount() {
    StoryService.getAllStories().then(this.context.setStories);
  }
  handleSubmit = (ev) => {
    ev.preventDefault();
    const { flag, issue } = ev.target;

    StoryService.postStory({ flag: flag.value, issue: issue.value })
      .then(this.context.addStory)
      .then(() => {
        issue.value = '';
        this.props.history.push('/dashboard');
        window.location.reload();
      })
      .catch(this.context.setError);
  };

  render() {
    return (
      <form
        aria-label='create-story-form'
        className='createStory'
        onSubmit={this.handleSubmit}
      >
        <h3>Create Story:</h3>
        <br />
        <p>
          Please select the requested type of help from the drop down selections
          menu. Then enter the specifics of the help you are requesting.
        </p>
        <br />
        <p>
          TIP: Create a story for each individual need, additionally please be
          as specific as possible for your requested help.
        </p>
        <br />
        <label htmlFor='select-help-type'>Select Help Type:</label>
        <div className='customSelect'>
          <select aria-label='custom-select' name='flag'>
            {this.keywords.map((keyword) => (
              <option key={keyword} value={keyword}>
                {keyword}
              </option>
            ))}
          </select>
        </div>
        <br />
        <input
          aria-label='enter-issue'
          name='issue'
          type='text'
          placeholder='enter issue'
          required
        />
        <br />
        <button type='submit'>Submit</button>
      </form>
    );
  }
}

export default CreateStoryForm;
