import React, { Component } from "react";

//redux
import { connect } from "react-redux";
import { fetchCourses } from "../redux/actions/courses";

//styles
import "../scss/screens/Dash.scss";

//components
import ProjectCard, { ProjectCardContainer } from "../components/ProjectCard";

const mapStateToProps = state => {
  const { error, isLoading, courses } = state.courses;

  return {
    error,
    isLoading,
    courses
  };
};

const mapDispatchToProps = dispatch => ({
  fetchCourses: () => fetchCourses(dispatch)
});

class Dash extends Component {
  componentDidMount() {
    this.props.fetchCourses();
  }
  render() {
    return (
      <div>
        <div className="projects">
          {this.props.isLoading && <div>loading</div>}
          {!this.props.error && !this.props.isLoading && this.props.courses && (
            <ProjectCardContainer>
              {this.props.courses.map((course, i) => (
                <ProjectCard
                  key={i}
                  uid={course.uid}
                  name={course.name}
                  categories={course.categories}
                />
              ))}
            </ProjectCardContainer>
          )}
          {this.props.error && <div>{this.props.error}</div>}
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dash);
