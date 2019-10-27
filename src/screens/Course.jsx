import React, { Component } from "react";
import ReactMde, { commands } from "react-mde";
import * as Showdown from "showdown";
import 'styled-components/macro';
import "react-mde/lib/styles/css/react-mde-all.css";
import { connect } from "react-redux";

// TODO: include LaTeX parsing (https://github.com/obedm503/showdown-katex)

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true
});

const listCommands = [
  {
    commands: [
      commands.orderedListCommand,
      commands.unorderedListCommand,
      commands.checkedListCommand
    ]
  }
];


class CourseEditor extends Component {

  constructor (props) {
    super(props);
    this.state = {
      mode: '',
      selectedTab: 'write',
      course: {
        uid: '',
        title: '',
        description: '',
        tags: [],
        subcategories: [],
        content: '',
      }
    }
  }

  componentDidMount () {

  }

  render () {
    return (
      <div
        css={`
          display: flex;
          flex-direction: column;
          flex: 2;
          margin: 80px 150px;
        `}>
        <ReactMde
          css={`
              margin: 20px 0;
              .mde-text {
                outline: none;
              }
              button {
                outline: none;
              }
            `}
          commands={listCommands}
          value={this.state.course.content}
          onChange={content => console.log(content)}
          selectedTab={this.state.selectedTab}
          onTabChange={selectedTab => this.setState({ selectedTab })}
          generateMarkdownPreview={markdown =>
            Promise.resolve(converter.makeHtml(markdown))
          }
        />
      </div>
    );
  }

}


export default connect(state => ({
  isLoading: state.courses.isLoading,
  error: state.courses.error,
  courses: state.courses.courses,
}), dispatch => ({
  dispatch
}))(CourseEditor);