export default function ErrorExample() {
  const undef = undefined as any
  const newVariable = undef.map((x: any) => x.variable)
  return <div>Content of the page does not matter - it will crash anyway. {newVariable}</div>
}
