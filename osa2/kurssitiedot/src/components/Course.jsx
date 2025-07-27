const Header = (props) => (
  <h2>{props.course}</h2>
)

const Part = (props) => (
  <p>
    {props.name} {props.exercises}
  </p>
)

const Content = (props) => {
  return (
    <div>
      {props.parts.map(p =>
        <Part key={p.id} name={p.name} exercises={p.exercises} />
      )}
    </div>
  )
}

const Total = (props) => {
  const sum = props.parts.reduce((s, p) => {
    if (s.exercises != undefined) {
      return s.exercises + p.exercises
    }
    return s + p.exercises
  })
  return (
    <div>
      <p><strong>
        Number of exercises {sum}
      </strong></p>
    </div>
  )
}

const Course = (props) => {
  return (
    <div>
      <Header course={props.course.name} />
      <Content parts={props.course.parts} />
      <Total parts={props.course.parts} />
    </div>
  )
}

export default Course