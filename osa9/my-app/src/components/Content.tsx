import Part from './Part'
import { CoursePart } from '../types'

interface CoursePartsProp {
  courseParts: CoursePart[]
}

const Content = ({courseParts}: CoursePartsProp) => {
  return (
    <div>
       {courseParts.map(course =>
        <Part key={course.name} course={course} />
      )}
    </div>
  )
}

export default Content