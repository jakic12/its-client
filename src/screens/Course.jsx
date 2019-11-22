import React, { Component } from "react";
import * as Showdown from "showdown";
import 'styled-components/macro';
import { connect } from "react-redux";
import { fetchCourses } from "../redux/actions/courses";

// TODO: include LaTeX parsing (https://github.com/obedm503/showdown-katex)

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true
});

class CourseEditor extends Component {

  constructor (props) {
    super(props);
    this.state = {
      html: '<div/>',
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

  componentDidMount = async () => {
    const courseUid = this.props.match.params.uid;
    let course = getCourse(courseUid, this.props.courses);
    if (course === undefined) {
      await fetchCourses(this.props.dispatch);
      course = getCourse(courseUid, this.props.courses);
    }
    this.setState({course});
    this.setState({html: converter.makeHtml(course.content)});
  };

  render () {
    return (
      <div
        css={`
          display: flex;
          flex-direction: column;
          height: 100%;
          padding: 20px;
          overflow-y: auto;
        `}>
        <div
          dangerouslySetInnerHTML={{__html: this.state.html}}
          css={`
            width: 60%;
            margin-left: auto;
            margin-right: auto;
          `}
        />
      </div>
    );
  }

}

function getCourse (uid, categories) {
  for (let category of categories) {
    for (let course of category.courses) {
      if (course.uid === uid) {
        return course;
      }
    }
  }
}


export default connect(state => ({
  isLoading: state.courses.isLoading,
  error: state.courses.error,
  courses: state.courses.courses,
}), dispatch => ({
  dispatch
}))(CourseEditor);