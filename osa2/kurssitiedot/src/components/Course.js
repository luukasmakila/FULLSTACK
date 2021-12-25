import React from "react"
import Header from "./Header"
import Content from "./Content"
import All from "./All"

const Course = ({course}) => {
    const parts = course.parts
    const exercises = parts.map(part => part.exercises)
    const all = exercises.reduce((a,b) => a + b, 0)

    return (
        <div>
            <Header header={course.name}/>
            <div>
                {parts.map(part =>
                    <Content key={part.id} part={part}/>
                )}
            <All value={all}/>
            </div>
        </div>
    )
}

export default Course