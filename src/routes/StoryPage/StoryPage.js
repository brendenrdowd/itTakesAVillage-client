import React, { Component } from 'react'
import {Section} from '../../components/Utils'
import CreateCommentForm from '../../components/CreateCommentForm/CreateCommentForm'
import StoryCard from '../../components/StoryCard/StoryCard'
import CardToolBar from '../../components/Utils/CardToolBar'
import CommentToolBar from '../../components/Utils/CommentToolbar'




export default class StoryPage extends Component {
  
  renderStory() {
  return (
    <Section className="StoryPage">
    {StoryCard}
    {CardToolBar}
    {CreateCommentForm}
    {CommentToolBar}
    //logic 
    {/* resolution? */}
    </Section>
    )
  } 
    
  render() {
    const {error} = this.context //doublecheck
    let content 
    if (error) {
      content = (error.error === `Story doesn't exist`)
      ? <p className="not_found">Story not found</p>
      : <p className="not_found">Something went wrong</p> 
    }
    else {content = this.renderStory()}
    return (
      <Section className="StoryPage">
        {content}
      </Section>
    )
  }
}