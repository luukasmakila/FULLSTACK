import { CoursePart } from '../types'

interface CourseProp {
  course: CoursePart
}

const Part = ({course}: CourseProp) => {
  switch (course.kind) {
    case "basic":
      return (
        <div>
          <b>{ course.name } { course.exerciseCount }</b>
          <p><i>{ course.description }</i></p>
        </div>
      )
    case 'group':
      return (
        <div>
          <b>{ course.name } { course.exerciseCount }</b>
          <p>project exercises { course.groupProjectCount }</p>
        </div>
      )
    case 'background':
      return (
        <div>
          <b>{ course.name } { course.exerciseCount }</b>
          <p><i>{ course.description }</i></p>
          <p>submit to {course.backgroundMaterial }</p>
        </div>
      )
    case 'special':
      return (
        <div>
          <b>{ course.name } { course.exerciseCount }</b>
          <p><i>{ course.description }</i></p>
          <p>required skills: { course.requirements.join(', ') }</p>
        </div>
      )
  }
}

export default Part