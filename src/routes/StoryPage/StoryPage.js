import React, { Component } from 'react'
import {Section, Hyph} from '../../components/Utils/Utils'
import CreateCommentForm from '../../components/CreateCommentForm/CreateCommentForm'
import StoryCard from '../../components/StoryCard/StoryCard'
import CardToolBar from '../../components/Utils/CardToolBar'
import CommentToolBar from '../../components/Utils/CommentToolbar'
import StoryApiService from '../../services/story-api-service'
import CommentApiService from '../../services/comment-api-service'
import ApiContext from '../../contexts/ApiContext'




export default class StoryPage extends Component {

  static defaultProps = {
    match: {params: {} }
  }

  static contextType = ApiContext

  state = {
    story: {},
    comments: [],
    user: {} 
  }

  componentDidMount() {
    
    const story_id = this.props.match.params.id
    const story = StoryApiService.getStoryById(story_id) 
    const comments = CommentApiService.getCommentsByStoryId(story_id) || []
    const user = this.context.user 
    this.setState(
      {
        story,
        comments, 
        user 
      }
    ) 

  }
  
   displayComments({ comments = [] }) {
    return (
      <ul className="comments_list">
        {comments.map( comment => 
          <li key={comment.id} className="comment">
            <p className="comment_text">
              {comment.content}
            </p>
            <Hyph />
            <p>
            {comment.user}
            </p>
            {this.displayComments()}
          </li>)}
      </ul>
    )
  }
  
  renderStory() {
  return (
    <Section className="StoryPage">
    {StoryCard}
    {/*CardToolBar*/}
    {CreateCommentForm}
    {/*CommentToolBar*/}
    {/* resolution? */}
    </Section>
    )
  } 
    
  render() {
    const {error} = this.context 
    let content 
    if (error) {
      content = (error.error === `Story doesn't exist`)
      ? <p className="not_found">Story not found</p>
      : <p className="not_found">Something went wrong</p> 
    }
    else {content = this.renderStory()}
    return (
<<<<<<< HEAD
      <section>
        {/* card itself */}
        {/* CreateCommentForm */}
        {/* comments */}
        {/* resolution? */}
      </section>
    );
=======
      <Section className="StoryPage">
        {content}
      </Section>
    )
>>>>>>> oleg
  }
}
