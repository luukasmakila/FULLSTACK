import React from "react"
import Header from "./Header"
import Content from "./Content"

const Course = ({course}) => {
    const parts = course.parts
    return (
        <div>
            <Header header={course.name}/>
            <div>
                {parts.map(part =>
                    <Content key={part.id} part={part}/>
                )}
            </div>
        </div>
    )
}

export default Course