import React, { Component } from "react";

// external libs
import { RotateLoader } from "react-spinners";
import FadeIn from "react-fade-in";
import styled from "styled-components";

//redux
import { connect } from "react-redux";
import { fetchCourses } from "../redux/actions/courses";

//components
import ImageTagCard, {
  ImageTagCardContainer
} from "../components/ImageTagCard";

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
    if (this.props.error) {
      return <div className="categories">{this.props.error.toString()}</div>;
    }
    return (
      <Wrapper>
        {this.props.isLoading && (
          <LoadingContainer>
            <FadeIn>
              <RotateLoader />
            </FadeIn>
          </LoadingContainer>
        )}
        {!this.props.error && !this.props.isLoading && this.props.courses && (
          <Container>
            <Categories>
              {this.props.courses.map(category => (
                <div className="category" key={category.uid}>
                  <CategoryHeader>
                    <h1>{category.categoryName}</h1>
                  </CategoryHeader>
                  <div className="body">
                    <ImageTagCardContainer>
                      {category.courses.map((course, i) => (
                        <ImageTagCard
                          key={i}
                          uid={course.uid}
                          name={course.title}
                          imageSrc={
                            course.image ||
                            "https://venturebeat.com/wp-content/uploads/2014/06/google-design-google-plus-cover-material.jpg?fit=578%2C434&strip=all"
                          }
                          tags={course.tags}
                        />
                      ))}
                    </ImageTagCardContainer>
                  </div>
                </div>
              ))}
            </Categories>
          </Container>
        )}
        {this.props.error && <div>{this.props.error}</div>}
      </Wrapper>
    );
  }
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: auto;
`;

const Categories = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const LoadingContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const CategoryHeader = styled.div`
  padding-left: 30px;
`;

export default connect(mapStateToProps, mapDispatchToProps)(Dash);
