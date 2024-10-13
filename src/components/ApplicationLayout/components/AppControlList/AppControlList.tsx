import type { HTMLAttributes } from 'react'

export default function AppControlList(props: HTMLAttributes<HTMLUListElement>) {
  return <ul role="menu" {...props} />
}

function AppControlListItem(props: HTMLAttributes<HTMLLIElement>) {
  return <li role="none" {...props} />
}

AppControlList.Item = AppControlListItem
