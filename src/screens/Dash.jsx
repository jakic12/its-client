import React, { Component } from "react";

// external libs
import { RotateLoader } from "react-spinners";
import FadeIn from "react-fade-in";

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
      <div className="dashboard">
        <div className="projects">
          {this.props.isLoading && (
            <div className="loading">
              <FadeIn>
                <RotateLoader />
              </FadeIn>
            </div>
          )}
          {!this.props.error && !this.props.isLoading && this.props.courses && (
            <div className="categories">
              {this.props.courses.map(category => (
                <div className="category">
                  <div className="header">
                    <h1>{category.categoryName}</h1>
                  </div>
                  <div className="body">
                    <ProjectCardContainer>
                      {category.courses.map((course, i) => (
                        <ProjectCard
                          key={i}
                          uid={course.uid}
                          name={course.name}
                          imageSrc={
                            course.imageSrc ||
                            "https://venturebeat.com/wp-content/uploads/2014/06/google-design-google-plus-cover-material.jpg?fit=578%2C434&strip=all"
                          }
                          tags={course.tags}
                        />
                      ))}
                    </ProjectCardContainer>
                  </div>
                </div>
              ))}
            </div>
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
