import React, { Component } from 'react'
import CreateCommentForm from '../../components/CreateCommentForm/CreateCommentForm'
import StoryCard from '../../components/StoryCard/StoryCard'

export class StoryPage extends Component {
  render() {
    return (
      <section>
        {StoryCard}
        {CreateCommentForm}
        {/* comments */}
        {/* resolution? */}
      </section>
    )
  }
}

export default StoryPage
