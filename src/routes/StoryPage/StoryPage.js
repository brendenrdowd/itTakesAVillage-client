import React, { Component } from 'react'
import CreateCommentForm from '../../components/CreateCommentForm/CreateCommentForm'
import StoryCard from '../../components/StoryCard/StoryCard'

export class StoryPage extends Component {
  render() {
    return (
      <section>
        {StoryCard}
        <nav>
        <button>edit</button>
        <button>delete</button>
        <button>reply</button>
        <button>share</button>
        </nav>
        {CreateCommentForm}
        {/* comments */}
        //logic 
        {/* resolution? */}
      </section>
    )
  }
}

export default StoryPage
