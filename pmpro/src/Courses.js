import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const Courses = () => (
    <Query query={gql`
        {
            allCourses {
                id
                title
                author
                description
                topic
                url
            }
        }
    `}>
        {({loading, error, data}) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error: (</p>;

            // map iterates through list of courses
            return data.allCourses.map(({id, title, author, description, topic, url,}) => (
                <div key={id}>
                    <p>{`${title} by ${author}`}</p>
                </div>
            ));
        }}
    </Query>
);

export default Courses;
